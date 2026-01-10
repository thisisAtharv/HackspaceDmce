// src/pages/Impact.jsx
import React from 'react';
import { Sprout, CloudRain, AlertTriangle } from 'lucide-react';

const Impact = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Space for Earth</h2>
        <p style={{ color: '#94a3b8' }}>How satellite data solves real-world problems.</p>
      </div>

      {/* LAYOUT FIX: Changed gridTemplateColumns to '1fr 1fr 1fr' to force single line */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        
        {/* Card 1: Agriculture */}
        <div className="card" style={{ 
            background: `linear-gradient(to right, rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0.7)), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #22c55e',
            minHeight: '250px', // Ensures consistent height
            display: 'flex',
            flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4ade80' }}>
                <Sprout size={24} />
                <h3>Agriculture</h3>
             </div>
             <span style={{ fontSize: '0.7rem', background: '#22c55e', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
               SOURCE: LANDSAT-9
             </span>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            Infrared scanning detects crop diseases early, optimizing water usage.
          </p>
        </div>

        {/* Card 2: Disaster Response */}
        <div className="card" style={{ 
            background: `linear-gradient(to right, rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0.6)), url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #ef4444',
            minHeight: '250px',
            display: 'flex',
            flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f87171' }}>
                <AlertTriangle size={24} />
                <h3>Disaster Relief</h3>
             </div>
             <span style={{ fontSize: '0.7rem', background: '#ef4444', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
               SOURCE: SAR / SENTINEL-1
             </span>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            Radar satellites see through clouds to map floods during emergencies like the Kerala floods.
          </p>
        </div>

        {/* Card 3: Pollution */}
        <div className="card" style={{ 
            background: `linear-gradient(to right, rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0.6)), url('https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1600&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #60a5fa',
            minHeight: '250px',
            display: 'flex',
            flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#60a5fa' }}>
                <CloudRain size={24} />
                <h3>Pollution</h3>
             </div>
             <span style={{ fontSize: '0.7rem', background: '#60a5fa', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
               SOURCE: SENTINEL-5P
             </span>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            Tracks Nitrogen Dioxide levels daily to identify urban pollution hotspots.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Impact;