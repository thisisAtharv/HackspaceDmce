// src/pages/Dashboard.jsx
import React, { useState } from 'react'; // Import useState
import { Satellite, Rocket, Globe, AlertTriangle, Sun, Activity, X, Calendar, MapPin } from 'lucide-react'; // Add X, Calendar, MapPin
import GlobeView from '../components/GlobeView';
import { cosmicWeather, dashboardStats, upcomingEvents } from '../data/mockData';

// Helper to render icons dynamically
const getIcon = (name) => {
  if (name === 'satellite' || name === '🛰️') return <Satellite size={24} />;
  if (name === 'rocket' || name === '🚀') return <Rocket size={24} />;
  if (name === 'globe' || name === '🌍') return <Globe size={24} />;
  if (name === 'alert' || name === '⚠️') return <AlertTriangle size={24} />;
  return <Activity size={24} />;
};

const Dashboard = () => {
  // 1. ADD STATE FOR MODAL
  const [showEventsModal, setShowEventsModal] = useState(false);

  return (
    <div className="dashboard-page" style={{ position: 'relative' }}>

      {/* --- MODAL START --- */}
      {showEventsModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s'
        }}>
          <div style={{
            width: '600px',
            maxHeight: '80vh',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '24px',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 0 50px rgba(0, 212, 255, 0.2)'
          }}>
            <button
              onClick={() => setShowEventsModal(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '24px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar color="#06b6d4" /> Cosmic Events Log
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '25px' }}>Full schedule of celestial activities and flyovers.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {upcomingEvents.map((event) => (
                <div key={event.id} style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '15px',
                  borderRadius: '12px',
                  borderLeft: '4px solid #06b6d4',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#06b6d4', marginBottom: '4px' }}>{event.time || event.date}</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>{event.title || event.name}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={12} /> {event.region || "Global Visibility"}
                    </div>
                  </div>
                  <div className="badge badge-info" style={{ fontSize: '11px' }}>
                    {event.visibility || "Visible"}
                  </div>
                </div>
              ))}

              {/* Dummy events to make the list look "Full" for the demo */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', borderLeft: '4px solid #64748b' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Mar 12, 2025</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#94a3b8' }}>Venus Transit</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Predicted Calculation...</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* --- MODAL END --- */}

      <div className="page-header">
        <h1 className="page-title">Mission Control</h1>
        <p className="page-subtitle">Real-time space monitoring and cosmic weather updates</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {dashboardStats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className={`stat-icon card-icon ${stat.color}`}>
              {/* Restore the dynamic icon function */}
              {getIcon(stat.icon)}
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Cosmic Weather Card */}
      <div className="weather-card">
        <div className="weather-header">
          <div className="weather-title">
            <Sun className="weather-icon" color="#fbbf24" />
            <span className="weather-label">Cosmic Weather Report</span>
          </div>
          <span className="badge badge-success">NORMAL</span>
        </div>
        <div className="weather-grid">
          <div className="weather-item">
            <div className="weather-value">{cosmicWeather.solarWind}</div>
            <div className="weather-name">Solar Wind</div>
          </div>
          <div className="weather-item">
            <div className="weather-value" style={{ color: '#8b5cf6' }}>{cosmicWeather.geomagneticStorm}</div>
            <div className="weather-name">Geomagnetic</div>
          </div>
          <div className="weather-item">
            <div className="weather-value">Kp {cosmicWeather.kpIndex}</div>
            <div className="weather-name">Kp Index</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">

        {/* GLOBE SECTION (COMPACT) */}
        <div className="globe-section" style={{
          background: 'linear-gradient(135deg, var(--space-navy) 0%, var(--space-dark) 100%)',
          border: '1px solid var(--space-border)',
          borderRadius: '20px',
          padding: '16px',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div className="card-header" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="card-icon cyan" style={{ fontSize: '16px', width: '32px', height: '32px' }}>🌍</span>
            <span className="card-title" style={{ fontWeight: '600', fontSize: '13px', textTransform: 'uppercase' }}>Real-Time Earth Monitoring</span>
          </div>

          <div className="globe-container" style={{ flex: 1, minHeight: '200px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            <GlobeView />
          </div>
        </div>

        {/* EVENTS SECTION */}
        <div className="events-section" style={{ height: '100%', maxHeight: '438px', overflowY: 'auto' }}>
          <div className="events-header" style={{ marginBottom: '12px' }}>
            <h3 className="events-title" style={{ fontSize: '19px' }}>🗓️ Upcoming Events</h3>
            {/* 2. CONNECT BUTTON TO STATE */}
            <button
              className="btn btn-secondary"
              style={{ padding: '8px 10px', fontSize: '17px' }}
              onClick={() => setShowEventsModal(true)}
            >
              View All
            </button>
          </div>

          {upcomingEvents.map((event) => (
            <div key={event.id} className="event-card" style={{ padding: '10px', marginBottom: '8px' }}>
              <div className="event-date" style={{ marginBottom: '2px', fontSize: '10px' }}>{event.time || event.date}</div>
              <div className="event-name" style={{ fontSize: '13px', marginBottom: '2px' }}>{event.title || event.name}</div>
              <div className="event-description" style={{ fontSize: '11px' }}>{event.region || event.visibility || event.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;