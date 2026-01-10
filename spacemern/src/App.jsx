import React, { useState } from 'react';
import './styles/main.css'; // Importing the moved CSS

// Components
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Missions from './pages/Missions';
import Impact from './pages/Impact'; // Formerly ImpactView
import Learn from './pages/Learn';   // Formerly LearnView

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">
      {/* Sidebar handles navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <h1>Welcome back, Captain.</h1>
          <p style={{ color: '#94a3b8' }}>System Status: Nominal</p>
        </header>

        {/* Conditional Rendering of Pages */}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'missions' && <Missions />}
        {activeTab === 'impact' && <Impact />}
        {activeTab === 'learn' && <Learn />}
        
      </main>
    </div>
  );
};

export default App;