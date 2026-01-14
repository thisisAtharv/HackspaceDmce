import React, { useState, useEffect } from 'react';
import './styles/main.css';
import './styles/App.css';
import './styles/landing.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

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
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';


const AppContent = () => {
  const { currentUser, logout } = useAuth();
  const [view, setView] = useState('landing'); // 'landing', 'login', 'signup', 'dashboard'
  const [activeTab, setActiveTab] = useState('dashboard'); // For sidebar navigation

  // Update view based on authentication state - only on initial load and logout
  useEffect(() => {
    if (currentUser) {
      // User is authenticated, go to dashboard
      setView('dashboard');
    }
    // Note: We don't set view to 'landing' here when currentUser is null
    // because that would interrupt the login/signup flow
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    setView('landing');
  };

  // --- VIEW 1: LANDING PAGE ---
  if (view === 'landing' && !currentUser) {
    return <Landing onNavigate={(page) => setView(page)} />;
  }

  // --- VIEW 2: AUTH PAGE (Login/Signup) ---
  if ((view === 'login' || view === 'signup') && !currentUser) {
    return (
      <Auth
        initialMode={view}
        onLogin={() => setView('dashboard')} // Success -> Go to Dashboard
      />
    );
  }

  // --- VIEW 3: DASHBOARD (Logged In) ---
  if (currentUser) {
    return (
      <div className="app-container">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
        />
        <main className="main-content">
          {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
          {activeTab === 'missions' && <Missions />}
          {activeTab === 'impact' && <Impact />}
          {activeTab === 'learn' && <Learn />}
          {activeTab === 'moon' && <MoonPhases />}
          {activeTab === 'calendar' && <Calendar />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'tracker' && <SatelliteTracker />}
        </main>
      </div>
    );
  }

  // Loading or default state
  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;