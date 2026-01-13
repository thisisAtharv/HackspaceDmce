import React, { useState } from 'react';
import './styles/main.css';
import './styles/App.css';
import './styles/landing.css';

// Components
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';

// Pages
import Dashboard from './pages/Dashboard';
import Missions from './pages/Missions';
import Impact from './pages/Impact';
import Learn from './pages/Learn';
import SatelliteTracker from './pages/SatelliteTracker';
import MoonPhases from './pages/MoonPhases';
import Settings from './pages/Settings';


const App = () => {
  // Navigation State
  const [view, setView] = useState('landing'); // 'landing', 'login', 'signup', 'dashboard'
  const [activeTab, setActiveTab] = useState('dashboard'); // For sidebar navigation

  // --- VIEW 1: LANDING PAGE ---
  if (view === 'landing') {
    return <Landing onNavigate={(page) => setView(page)} />;
  }

  // --- VIEW 2: AUTH PAGE (Login/Signup) ---
  if (view === 'login' || view === 'signup') {
    return (
      <Auth
        initialMode={view}
        onLogin={() => setView('dashboard')} // Success -> Go to Dashboard
      />
    );
  }

  // --- VIEW 3: DASHBOARD (Logged In) ---
  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => setView('landing')}
      />
      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'missions' && <Missions />}
        {activeTab === 'impact' && <Impact />}
        {activeTab === 'learn' && <Learn />}
        {activeTab === 'moon' && <MoonPhases />}
        {activeTab === 'settings' && <Settings />}
        {activeTab === 'tracker' && <SatelliteTracker />}
      </main>
    </div>
  );
};

export default App;