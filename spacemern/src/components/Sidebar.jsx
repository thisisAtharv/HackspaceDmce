import React from 'react';
import { LayoutDashboard, Rocket, BookOpen, Activity } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="sidebar">
      <div className="brand">
        <Rocket size={28} /> SPACESCOPE
      </div>
      
      <button 
        className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} 
        onClick={() => setActiveTab('dashboard')}
      >
        <LayoutDashboard size={20} /> Command Center
      </button>

      <button 
        className={`nav-btn ${activeTab === 'missions' ? 'active' : ''}`} 
        onClick={() => setActiveTab('missions')}
      >
        <Rocket size={20} /> Missions
      </button>

      <button 
        className={`nav-btn ${activeTab === 'impact' ? 'active' : ''}`} 
        onClick={() => setActiveTab('impact')}
      >
        <Activity size={20} /> Earth Impact
      </button>

      <button 
        className={`nav-btn ${activeTab === 'learn' ? 'active' : ''}`} 
        onClick={() => setActiveTab('learn')}
      >
        <BookOpen size={20} /> Learn
      </button>
    </nav>
  );
};

export default Sidebar;