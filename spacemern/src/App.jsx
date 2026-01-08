// src/App.jsx
import React, { useState } from 'react';
import { LayoutDashboard, Rocket, BookOpen, Wind, Activity } from 'lucide-react';
import './App.css'; // Import the CSS file
import GlobeView from './components/GlobeView';
import ImpactView from './components/ImpactView';
import { upcomingEvents, missionsList } from './data/mockData';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">

      {/* Sidebar */}
      <nav className="sidebar">
        <div className="brand">
          <Rocket size={28} /> SPACESCOPE
        </div>
        <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <LayoutDashboard size={20} /> Command Center
        </button>
        <button className={`nav-btn ${activeTab === 'missions' ? 'active' : ''}`} onClick={() => setActiveTab('missions')}>
          <Rocket size={20} /> Missions
        </button>
        <button className={`nav-btn ${activeTab === 'impact' ? 'active' : ''}`} onClick={() => setActiveTab('impact')}>
          <Activity size={20} /> Earth Impact
        </button>
        <button className={`nav-btn ${activeTab === 'learn' ? 'active' : ''}`} onClick={() => setActiveTab('learn')}>
          <BookOpen size={20} /> Learn
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Welcome back, Captain.</h1>
          <p style={{ color: '#94a3b8' }}>System Status: Nominal</p>
        </header>

        {/* 1. DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="grid-container">

            {/* Weather Card */}
            <div className="card">
              <div className="card-title"><Wind size={18} /> Cosmic Weather</div>
              <div className="weather-grid">
                <div>
                  <small style={{ color: '#94a3b8' }}>Solar Wind</small>
                  <p className="stat-value">450 <span style={{ fontSize: '1rem' }}>km/s</span></p>
                </div>
                <div>
                  <small style={{ color: '#94a3b8' }}>Kp Index</small>
                  <p className="stat-value">4.5</p>
                </div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span className="status-badge warning">Moderate Storm</span>
              </div>
            </div>

            {/* The 3D Globe (Spans 2 columns) */}
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
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{event.time}</div>
                  </div>
                  <div style={{ color: '#06b6d4' }}>{event.visibility}</div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 2. MISSIONS VIEW */}
        {activeTab === 'missions' && (
          <div className="timeline-container">
            <h2 style={{ marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
              Mission Timeline
            </h2>

            {missionsList.map(mission => (
              <div key={mission.id} className="mission-card">
                <div className="mission-header">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="agency-tag">{mission.agency}</span>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{mission.name}</h3>
                  </div>
                  <span style={{
                    color: mission.color,
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    {mission.status}
                  </span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px' }}>
                  {mission.date}
                </div>
                <p style={{ margin: 0, lineHeight: '1.5', color: '#cbd5e1' }}>
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        )}
        {/* 3. IMPACT VIEW */}
        {activeTab === 'impact' && <ImpactView />}

        {/* 4. LEARN VIEW (Placeholder) */}
        {activeTab === 'learn' && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
            <BookOpen size={48} style={{ margin: '0 auto 20px', opacity: 0.5 }} />
            <h2>Knowledge Base Offline</h2>
            <p>Accessing Galactic Archives...</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;