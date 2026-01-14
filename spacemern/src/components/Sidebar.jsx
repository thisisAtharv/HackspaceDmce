import React from 'react';
import { LayoutDashboard, Rocket, Activity, BookOpen, Moon, Settings, LogOut, Satellite, Calendar } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'missions', icon: <Rocket size={20} />, label: 'Missions' },
    { id: 'impact', icon: <Activity size={20} />, label: 'Earth Impact' },
    { id: 'learn', icon: <BookOpen size={20} />, label: 'Learn' }
  ];

  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
             <Rocket size={24} color="white" />
          </div>
          <div className="logo-text">
            Space<span>Scope</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav" style={{ flex: 1 }}>
        <div className="nav-section">
          <div className="nav-section-title">Navigation</div>
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Tools</div>
          <div className={`nav-item ${activeTab === 'tracker' ? 'active' : ''}`} onClick={() => setActiveTab('tracker')}>
            <span className="nav-icon"><Satellite size={18} /></span>
            <span className="nav-label">Satellite Tracker</span>
          </div>
          <div className={`nav-item ${activeTab === 'moon' ? 'active' : ''}`} onClick={() => setActiveTab('moon')}>
            <span className="nav-icon"><Moon size={18} /></span>
            <span className="nav-label">Moon Phases</span>
          </div>
          <div className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
            <span className="nav-icon"><Calendar size={18} /></span>
            <span className="nav-label">Event Calendar</span>
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <span className="nav-icon"><Settings size={18} /></span>
            <span className="nav-label">Settings</span>
          </div>
        </div>
      </nav>

      {/* FOOTER SECTION */}
      <div className="sidebar-footer" style={{ marginTop: 'auto' }}>
        
        {/* LOGOUT BUTTON */}
        <div 
          className="nav-item" 
          onClick={onLogout}
          style={{ 
            color: '#ef4444', // Red color for logout
            marginBottom: '15px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            background: 'rgba(239, 68, 68, 0.05)'
          }}
        >
          <span className="nav-icon"><LogOut size={18} /></span>
          <span className="nav-label">Abort Session</span>
        </div>

        <div className="live-indicator">
          <div className="live-dot"></div>
          <span className="live-text">Systems Online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;