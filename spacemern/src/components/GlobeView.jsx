import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { globeMarkers } from '../data/mockData';

const GlobeView = ({ markers }) => {
  const globeEl = useRef();
  const containerRef = useRef(); // New ref for the container
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 }); // Default state

  // Use passed markers, OR default to launch sites
  const activeData = markers || globeMarkers;

  useEffect(() => {
    // 1. Auto-rotate
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }

    // 2. Resize Logic (The Fix)
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    // Initial measure
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Globe
        ref={globeEl}
        width={dimensions.width}   // Pass the dynamic width
        height={dimensions.height} // Pass the dynamic height
        
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Data Layers
        pointsData={activeData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={(d) => {
          // Scale altitude for visualization - satellites beyond 1000km get smaller rods
          const alt = d.altitude || 0.1;
          return alt > 1 ? 0.15 : alt; // Cap high-altitude satellites at 0.15 for visibility
        }}
        pointRadius={(d) => {
          // Adjust point size based on altitude - higher = smaller but still visible
          const alt = d.altitude || 0.1;
          return alt > 1 ? 0.8 : 1.5; // Smaller radius for high-altitude satellites
        }}
        
        labelsData={activeData}
        labelLat="lat"
        labelLng="lng"
        labelText="label"
        labelSize={1.5}
        labelDotRadius={0.5}
        labelColor={() => 'rgba(255, 255, 255, 0.75)'}
        labelResolution={2}
        labelAltitude={(d) => {
          const alt = d.altitude || 0.1;
          return alt > 1 ? 0.2 : (alt + 0.1); // Keep labels close to surface for high-altitude satellites
        }}

        ringsData={markers ? [] : globeMarkers}
        ringLat="lat"
        ringLng="lng"
        ringColor="color"
        ringMaxRadius={5}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1000}

        atmosphereColor="#06b6d4"
        atmosphereAltitude={0.2}
        backgroundColor="rgba(0,0,0,0)"
      />
    </div>
  );
};

export default GlobeView;