import React, { useState } from 'react';
import { Rocket, Target, Calendar, Users, Filter, ChevronRight, X, Clock, MapPin, FileText } from 'lucide-react';
import { missions } from '../data/mockData';

const Missions = () => {
  // --- STATE MANAGEMENT ---
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'active', 'planned', 'completed'
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null); // For the Details Modal

  // --- FILTER LOGIC ---
  const filteredMissions = missions.filter(mission => {
    if (activeFilter === 'All') return true;
    return mission.status.toLowerCase() === activeFilter.toLowerCase();
  });

  // Helper for status styling
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'active';
      case 'planned': return 'planned';
      case 'completed': return 'completed';
      default: return 'planned';
    }
  };

  return (
    <div className="dashboard-page" style={{ position: 'relative' }}>
      
      {/* --- MISSION DETAILS MODAL --- */}
      {selectedMission && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.3s'
        }}>
          <div style={{
            width: '700px', maxHeight: '90vh', background: '#0f172a',
            border: '1px solid #334155', borderRadius: '16px', padding: '30px',
            overflowY: 'auto', position: 'relative', boxShadow: '0 0 50px rgba(6, 182, 212, 0.15)'
          }}>
            <button 
              onClick={() => setSelectedMission(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'start', marginBottom: '30px' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '16px', 
                background: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(6, 182, 212, 0.3)'
              }}>
                <Rocket size={40} color="#06b6d4" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#06b6d4', fontWeight: 'bold', marginBottom: '4px' }}>MISSION BRIEFING</div>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, lineHeight: 1.1 }}>{selectedMission.name}</h2>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                   <span className={`status-badge ${getStatusClass(selectedMission.status)}`}>{selectedMission.status}</span>
                   <span className="agency-badge" style={{fontSize: '11px', padding: '4px 8px'}}>{selectedMission.agency}</span>
                </div>
              </div>
            </div>

            {/* Modal Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
               <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', color: '#94a3b8', fontSize: '12px' }}>
                    <Target size={14} /> TARGET
                  </div>
                  <div style={{ fontWeight: 'bold' }}>{selectedMission.destination}</div>
               </div>
               <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', color: '#94a3b8', fontSize: '12px' }}>
                    <Calendar size={14} /> LAUNCH DATE
                  </div>
                  <div style={{ fontWeight: 'bold' }}>{selectedMission.launchDate}</div>
               </div>
               <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', color: '#94a3b8', fontSize: '12px' }}>
                    <Users size={14} /> CREW COMPLEMENT
                  </div>
                  <div style={{ fontWeight: 'bold' }}>{selectedMission.crew ? `${selectedMission.crew} Astronauts` : "Unmanned"}</div>
               </div>
               <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', color: '#94a3b8', fontSize: '12px' }}>
                    <Clock size={14} /> DURATION
                  </div>
                  <div style={{ fontWeight: 'bold' }}>Ongoing</div>
               </div>
            </div>

            {/* Description & Logs */}
            <h3 style={{ fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} /> Mission Overview
            </h3>
            <p style={{ lineHeight: '1.6', color: '#cbd5e1', marginBottom: '20px' }}>
              {selectedMission.description} This mission represents a critical step in our exploration capabilities. 
              Telemetry data is being streamed live to the dashboard.
            </p>
            
            <div style={{ padding: '15px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px', borderLeft: '3px solid #06b6d4' }}>
              <div style={{ fontSize: '12px', color: '#06b6d4', fontWeight: 'bold', marginBottom: '5px' }}>LATEST LOG ENTRY</div>
              <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>
                &gt; Systems Nominal. Trajectory alignment confirmed.<br/>
                &gt; Data transmission rate: 450 Mbps.
              </div>
            </div>
            
            <button 
               onClick={() => setSelectedMission(null)}
               className="btn btn-primary" 
               style={{ width: '100%', marginTop: '25px', justifyContent: 'center', height: '45px' }}
            >
              Close Briefing
            </button>
          </div>
        </div>
      )}

      {/* --- MAIN PAGE CONTENT --- */}
      <div className="mission-header-row">
        <div>
          <h1 className="page-title">Mission Registry</h1>
          <p className="page-subtitle">Active and planned space exploration missions</p>
        </div>
        <div className="mission-filters" style={{ position: 'relative' }}>
          
          {/* Filter Button */}
          <button 
            className={`btn ${showFilterMenu ? 'btn-primary' : 'btn-secondary'}`} 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Filter size={16} /> {activeFilter === 'All' ? 'Filter Status' : activeFilter}
          </button>

          {/* Filter Dropdown Menu */}
          {showFilterMenu && (
            <div style={{
              position: 'absolute', top: '110%', right: 0,
              background: '#1e293b', border: '1px solid #334155', borderRadius: '8px',
              padding: '8px', width: '150px', zIndex: 10,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
            }}>
              {['All', 'Active', 'Planned', 'Completed'].map(status => (
                <div 
                  key={status}
                  onClick={() => { setActiveFilter(status); setShowFilterMenu(false); }}
                  style={{
                    padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', fontSize: '13px',
                    color: activeFilter === status ? '#06b6d4' : '#cbd5e1',
                    background: activeFilter === status ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
                  }}
                >
                  {status}
                </div>
              ))}
            </div>
          )}

          {/* <button className="btn btn-primary">
            <Rocket size={16} /> New Mission
          </button> */}
        </div>
      </div>

      {/* Stats Row */}
      <div className="mission-stats-grid">
        <div className="stat-box">
          <div className="stat-box-label">Active</div>
          <div className="stat-box-value" style={{color: '#4ade80'}}>
             {missions.filter(m => m.status === 'active').length}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-box-label">Planned</div>
          <div className="stat-box-value" style={{color: '#06b6d4'}}>
             {missions.filter(m => m.status === 'planned').length}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-box-label">Completed</div>
          <div className="stat-box-value" style={{color: '#94a3b8'}}>
             {missions.filter(m => m.status === 'completed').length}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-box-label">Total Crew</div>
          <div className="stat-box-value" style={{color: '#fbbf24'}}>12</div>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="mission-grid">
        {filteredMissions.map((mission) => (
          <div key={mission.id} className="mission-card">
            
            <div className="mission-top">
              <div style={{display: 'flex', gap: '15px'}}>
                <div className={`card-icon ${getStatusClass(mission.status) === 'active' ? 'green' : 'blue'}`}>
                  <Rocket size={24} />
                </div>
                <div>
                  <h3 className="card-title" style={{fontSize: '18px', color: '#fff'}}>{mission.name}</h3>
                  <span className="agency-badge">{mission.agency}</span>
                  <div style={{fontSize: '11px', color: '#64748b', marginTop: '2px'}}>{mission.id}</div>
                </div>
              </div>
              <span className={`status-badge ${getStatusClass(mission.status)}`}>
                {mission.status}
              </span>
            </div>

            <div className="mission-details">
              <div className="detail-row">
                <Target size={14} color="#64748b" />
                <span>{mission.destination}</span>
              </div>
              <div className="detail-row">
                <Calendar size={14} color="#64748b" />
                <span>{mission.launchDate}</span>
              </div>
              {mission.crew && (
                <div className="detail-row">
                  <Users size={14} color="#64748b" />
                  <span>Crew: {mission.crew}</span>
                </div>
              )}
            </div>

            <p style={{fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '20px'}}>
              {mission.description}
            </p>

            <div className="mission-progress-container">
              <div className="progress-header">
                <span>Mission Progress</span>
                <span style={{color: '#06b6d4', fontWeight: 'bold'}}>{mission.progress}%</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${mission.progress}%`,
                    background: mission.status === 'completed' ? '#94a3b8' : 'linear-gradient(90deg, #2563eb, #06b6d4)'
                  }} 
                />
              </div>
            </div>

            {/* ACTION: View Details Button - NOW WORKING */}
            <button 
              className="btn btn-secondary" 
              style={{width: '100%', marginTop: '20px', justifyContent: 'center'}}
              onClick={() => setSelectedMission(mission)} // <--- Triggers Modal
            >
              View Details <ChevronRight size={16} />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;