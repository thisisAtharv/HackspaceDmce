import React from 'react';
import { Wind, Activity } from 'lucide-react';
import GlobeView from '../components/GlobeView';
import { upcomingEvents } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="grid-container">
      {/* Weather Card */}
      <div className="card">
        <div className="card-title"><Wind size={18} /> Cosmic Weather</div>
        <div className="weather-grid">
          <div>
            <small style={{color: '#94a3b8'}}>Solar Wind</small>
            <p className="stat-value">450 <span style={{fontSize: '1rem'}}>km/s</span></p>
          </div>
          <div>
            <small style={{color: '#94a3b8'}}>Kp Index</small>
            <p className="stat-value">4.5</p>
          </div>
        </div>
        <div style={{marginTop: '10px'}}>
          <span className="status-badge warning">Moderate Storm</span>
        </div>
      </div>

      {/* The 3D Globe */}
      <div className="card globe-card">
        <GlobeView />
      </div>

      {/* Events List */}
        <div className="card" style={{ gridColumn: 'span 3' }}>
          <div className="card-title"><Activity size={18} /> Upcoming Events</div>
          {upcomingEvents.map(event => (
            <div key={event.id} className="event-item">
              <div>
                <strong>{event.title}</strong>
                {/* NEW: Show the Region explicitly */}
                <div style={{fontSize: '0.85rem', color: '#fbbf24', marginTop: '4px'}}>
                   📍 {event.region}
                </div>
                <div style={{fontSize: '0.8rem', color: '#94a3b8'}}>{event.time}</div>
              </div>
              <div style={{color: '#06b6d4'}}>{event.visibility}</div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Dashboard;