import React, { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Shield, User, Globe } from 'lucide-react';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  // Toggle Theme Logic
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">System Configuration</h1>
        <p className="page-subtitle">Manage interface preferences and account settings</p>
      </div>

      <div style={{ maxWidth: '800px' }}>
        
        {/* Appearance Section */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="card-header">
            <div className="card-icon purple"><Sun size={20} /></div>
            <span className="card-title">Appearance</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Interface Theme</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {isDarkMode ? 'Currently using Dark Mission Mode' : 'Currently using Light Day Mode'}
              </div>
            </div>
            <button 
              onClick={toggleTheme}
              className="btn"
              style={{ 
                background: isDarkMode ? '#334155' : '#fbbf24', 
                color: isDarkMode ? '#fff' : '#000',
                minWidth: '120px',
                justifyContent: 'center'
              }}
            >
              {isDarkMode ? <><Moon size={16} /> Dark</> : <><Sun size={16} /> Light</>}
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <div className="card-header">
            <div className="card-icon blue"><Bell size={20} /></div>
            <span className="card-title">Notifications</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--space-border)' }}>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Mission Alerts</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Get notified about upcoming launches</div>
            </div>
            <div 
              onClick={() => setNotifications(!notifications)}
              style={{ 
                width: '40px', height: '20px', 
                background: notifications ? '#22c55e' : '#475569', 
                borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: '0.3s'
              }}
            >
              <div style={{ 
                width: '16px', height: '16px', background: '#fff', borderRadius: '50%', 
                position: 'absolute', top: '2px', left: notifications ? '22px' : '2px', transition: '0.3s'
              }} />
            </div>
          </div>
        </div>

        {/* Account Section (Mock) */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon cyan"><User size={20} /></div>
            <span className="card-title">Captain's Profile</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
              C
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Captain Atharv</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Level 5 Access Clearance</div>
              <div className="badge badge-success" style={{ marginTop: '8px', display: 'inline-block' }}>Active Duty</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;