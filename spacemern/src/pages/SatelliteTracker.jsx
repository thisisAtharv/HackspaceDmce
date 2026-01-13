import React, { useState } from 'react';
import GlobeView from '../components/GlobeView';
import { satelliteData } from '../data/mockData';
import { Satellite, Radio } from 'lucide-react';

const SatelliteTracker = () => {
  const [selectedSat, setSelectedSat] = useState(null);

  return (
    // MAIN CONTAINER: Fixed height to prevent page scrolling
    <div className="dashboard-page" style={{ height: 'calc(100vh - 20px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      <div className="page-header" style={{ marginBottom: '16px', flexShrink: 0 }}>
        <h1 className="page-title">Orbital Tracking Network</h1>
        <p className="page-subtitle">Real-time telemetry and orbital parameters</p>
      </div>

      {/* CONTENT GRID: Takes up all remaining space */}
      <div className="grid-2" style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        flex: 1, 
        minHeight: 0, // CRITICAL for nested flex scrolling
        gap: '20px',
        paddingBottom: '20px'
      }}>
        
        {/* LEFT: 3D Globe - Now Centers Perfectly */}
        <div className="card" style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          padding: 0, 
          border: '1px solid var(--space-border)',
          display: 'flex',        // Ensure container can center content
          alignItems: 'center',   // Vertical center
          justifyContent: 'center' // Horizontal center
        }}>
           <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
              <span className="badge badge-success animate-pulse">LIVE FEED ACTIVE</span>
           </div>
           
           {/* Globe Container: Fills the card */}
           <div style={{ width: '100%', height: '100%' }}>
              <GlobeView markers={satelliteData} />
           </div>
        </div>

        {/* RIGHT: Satellite List - Fixed Layout */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
           <div className="card-header" style={{ flexShrink: 0 }}>
              <div className="card-icon cyan"><Satellite size={20} /></div>
              <span className="card-title">Tracked Objects</span>
           </div>

           {/* SCROLLABLE LIST: Only this part scrolls */}
           <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px', marginBottom: '10px' }}>
              {satelliteData.map((sat) => (
                <div 
                  key={sat.id}
                  onClick={() => setSelectedSat(sat)}
                  style={{
                    background: selectedSat?.id === sat.id ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255,255,255,0.03)',
                    border: selectedSat?.id === sat.id ? '1px solid #06b6d4' : '1px solid transparent',
                    padding: '12px',
                    borderRadius: '12px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                >
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: sat.color, fontSize: '14px' }}>{sat.label}</span>
                      <Radio size={14} color={sat.color} />
                   </div>
                   <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{sat.type}</span>
                      <span>Alt: {sat.altitude * 1000} km</span>
                   </div>
                </div>
              ))}
           </div>

           {/* BOTTOM PANEL: Fixed at bottom */}
           <div style={{ 
             marginTop: 'auto', 
             paddingTop: '15px', 
             borderTop: '1px solid var(--space-border)',
             flexShrink: 0 
           }}>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Selected Telemetry
              </div>
              
              {selectedSat ? (
                <div className="grid-2" style={{ gap: '10px' }}>
                   <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>LATITUDE</div>
                      <div style={{ fontWeight: 'bold' }}>{selectedSat.lat.toFixed(4)}° N</div>
                   </div>
                   <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>LONGITUDE</div>
                      <div style={{ fontWeight: 'bold' }}>{selectedSat.lng.toFixed(4)}° W</div>
                   </div>
                   <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>STATUS</div>
                      <div style={{ color: '#22c55e', fontSize: '13px' }}>{selectedSat.status}</div>
                   </div>
                   <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>SIGNAL</div>
                      <div style={{ color: '#06b6d4', fontSize: '13px' }}>Strong</div>
                   </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                   Select a satellite to view live data
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default SatelliteTracker;