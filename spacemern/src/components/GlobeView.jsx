// src/components/GlobeView.jsx
import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { upcomingEvents } from '../data/mockData';

const GlobeView = () => {
    const globeEl = useRef();

    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.6;
            
            // ZOOM OUT: Increased altitude to 3.5 to make globe appear smaller
            // ADJUST ANGLE: Changed lat/lng to center the view better
            globeEl.current.pointOfView({ lat: 20, lng: 72, altitude: 3.5 });
        }
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative', // This keeps the text anchored to the CARD, not the globe
            overflow: 'hidden',   // Hides any globe overflow
            borderRadius: '16px'  // Matches your card radius
        }}>
            
            {/* 1. THE TEXT OVERLAY (Stays Fixed) */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 20, // High z-index ensures it sits ON TOP of the globe
                background: 'rgba(0,0,0,0.6)',
                padding: '5px 10px',
                borderRadius: '5px',
                fontWeight: 'bold',
                color: 'white',
                pointerEvents: 'none' // Lets clicks pass through to the map
            }}>
                LIVE EARTH VIEW
            </div>

            {/* 2. THE GLOBE CONTAINER (Shifted & Resized) */}
            <div style={{
                width: '100%',        // Fit the card width
                height: '100%',       // Fit the card height
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // If you still need to nudge it left/right, use transform:
                transform: 'translateX(-1%)' // Moves globe slightly left. Change to positive to move right.
            }}>
                <Globe
                    ref={globeEl}
                    backgroundColor="rgba(0,0,0,0)" // Fully transparent
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    atmosphereColor="#3b82f6"
                    atmosphereAltitude={0.25} // Reduced glow slightly

                    pointsData={upcomingEvents}
                    pointLat="lat"
                    pointLng="lng"
                    pointColor="color"
                    pointAltitude="alt"
                    pointRadius={0.6}

                    ringsData={upcomingEvents}
                    ringLat="lat"
                    ringLng="lng"
                    ringColor="color"
                    ringMaxRadius={5}
                    ringPropagationSpeed={2}
                    ringRepeatPeriod={800}
                />
            </div>
        </div>
    );
};

export default GlobeView;