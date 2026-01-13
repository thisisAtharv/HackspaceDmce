import React, { useState } from 'react';
import { Calendar, Cloud, Info, ChevronRight, ChevronLeft } from 'lucide-react';

const MoonPhases = () => {
  const [day, setDay] = useState(15); // Start at Full Moon (approx day 15)
  
  // Calculate phase data based on "day" (0-30 cycle)
  const getPhaseData = (d) => {
    if (d <= 1) return { name: "New Moon", illumination: "0%", type: "New" };
    if (d < 7) return { name: "Waxing Crescent", illumination: `${Math.round((d/15)*100)}%`, type: "Waxing" };
    if (d === 7) return { name: "First Quarter", illumination: "50%", type: "Waxing" };
    if (d < 15) return { name: "Waxing Gibbous", illumination: `${Math.round((d/15)*100)}%`, type: "Waxing" };
    if (d === 15) return { name: "Full Moon", illumination: "100%", type: "Full" };
    if (d < 22) return { name: "Waning Gibbous", illumination: `${Math.round(((30-d)/15)*100)}%`, type: "Waning" };
    if (d === 22) return { name: "Last Quarter", illumination: "50%", type: "Waning" };
    return { name: "Waning Crescent", illumination: `${Math.round(((30-d)/15)*100)}%`, type: "Waning" };
  };

  const phase = getPhaseData(day);

  // CSS trick to simulate moon shadow
  const getShadowStyle = (d) => {
    // This is a simplified visual approximation for the demo
    const percent = (d / 30) * 100;
    const x = (percent - 50) * 2; // -100 to 100
    return {
      boxShadow: `inset ${x * -2.5}px 0px 40px 10px rgba(0,0,0,0.9)`
    };
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">Lunar Operations</h1>
        <p className="page-subtitle">Real-time lunar cycle tracking and visibility data</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        
        {/* Left: The Visual Moon */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '400px', justifyContent: 'center' }}>
          <div className="card-header" style={{ width: '100%', justifyContent: 'space-between' }}>
             <span className="card-title">Interactive Phase Cycle</span>
             <span className="badge badge-info">{phase.type}</span>
          </div>

          {/* The Moon */}
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'url(https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_1k.jpg)',
            backgroundSize: 'cover',
            position: 'relative',
            boxShadow: '0 0 50px rgba(255,255,255,0.1)',
            marginBottom: '30px',
            transition: 'box-shadow 0.2s',
            ...getShadowStyle(day)
          }}>
          </div>

          <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>{phase.name}</h2>
          <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Illumination: {phase.illumination}</p>

          {/* Controls */}
          <div style={{ width: '100%', padding: '0 20px' }}>
            <label style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px', display: 'block' }}>
              Cycle Day: {day} / 30
            </label>
            <input 
              type="range" 
              min="1" 
              max="30" 
              value={day} 
              onChange={(e) => setDay(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#06b6d4' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
               <button className="btn btn-secondary" onClick={() => setDay(d => d > 1 ? d - 1 : 30)}><ChevronLeft size={16}/></button>
               <button className="btn btn-secondary" onClick={() => setDay(d => d < 30 ? d + 1 : 1)}><ChevronRight size={16}/></button>
            </div>
          </div>
        </div>

        {/* Right: Data & Calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="card">
             <div className="card-title" style={{marginBottom: '15px'}}>Current Lunar Stats</div>
             <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                   <div style={{ fontSize: '12px', color: '#94a3b8' }}>Distance</div>
                   <div style={{ fontSize: '18px', fontWeight: 'bold' }}>384,400 km</div>
                </div>
                <div>
                   <div style={{ fontSize: '12px', color: '#94a3b8' }}>Age</div>
                   <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{day} Days</div>
                </div>
                <div>
                   <div style={{ fontSize: '12px', color: '#94a3b8' }}>Visibility</div>
                   <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Excellent</div>
                </div>
                <div>
                   <div style={{ fontSize: '12px', color: '#94a3b8' }}>Next Full Moon</div>
                   <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fbbf24' }}>Jan 24</div>
                </div>
             </div>
          </div>

          <div className="card">
             <div className="card-title" style={{marginBottom: '15px'}}>Phase Calendar</div>
             {[
               { date: "Jan 15", event: "First Quarter", color: "#fff" },
               { date: "Jan 24", event: "Full Moon", color: "#fbbf24" },
               { date: "Jan 31", event: "Last Quarter", color: "#fff" },
               { date: "Feb 08", event: "New Moon", color: "#94a3b8" }
             ].map((item, i) => (
               <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#94a3b8' }}>{item.date}</span>
                  <span style={{ fontWeight: 'bold', color: item.color }}>{item.event}</span>
               </div>
             ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MoonPhases;