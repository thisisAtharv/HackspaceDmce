import React from 'react';
import { Sprout, CloudRain, AlertTriangle } from 'lucide-react';

const ImpactView = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Space for Earth</h2>
        <p style={{ color: '#94a3b8' }}>How satellite data solves real-world problems.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Card 1: Agriculture */}
        <div className="card" style={{ background: 'linear-gradient(145deg, rgba(20, 83, 45, 0.4), rgba(15, 23, 42, 0.6))', border: '1px solid #22c55e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: '#4ade80' }}>
            <Sprout size={24} />
            <h3>Agriculture Monitoring</h3>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            Satellites like <strong>Landsat-9</strong> scan crop health using infrared light. This helps farmers detect diseases early and optimize water usage, increasing global food security.
          </p>
        </div>

        {/* Card 2: Disaster Prediction */}
        <div className="card" style={{ background: 'linear-gradient(145deg, rgba(127, 29, 29, 0.4), rgba(15, 23, 42, 0.6))', border: '1px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: '#f87171' }}>
            <AlertTriangle size={24} />
            <h3>Disaster Response</h3>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            During the <strong>Kerala Floods</strong>, radar satellites (SAR) could see through clouds to map flooded areas. This data guided rescue teams to stranded villages.
          </p>
        </div>

        {/* Card 3: Climate Analysis */}
        <div className="card" style={{ background: 'linear-gradient(145deg, rgba(30, 58, 138, 0.4), rgba(15, 23, 42, 0.6))', border: '1px solid #60a5fa' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: '#60a5fa' }}>
            <CloudRain size={24} />
            <h3>Pollution Tracking</h3>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            The <strong>Sentinel-5P</strong> satellite tracks Nitrogen Dioxide levels daily. It helps cities identify pollution hotspots and measure the effectiveness of green policies.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ImpactView;