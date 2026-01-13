import React, { useState } from 'react';
import { Rocket, Mail, Lock, User, ArrowRight } from 'lucide-react';
import '../styles/landing.css';

const Auth = ({ initialMode = 'login', onLogin }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); // Tells App.jsx to show the dashboard
    }, 1500);
  };

  return (
    <div className="landing-container">
      <div className="stars-overlay"></div>

      {/* Simple Nav */}
      <nav className="landing-nav">
        <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>
          <div style={{ width: 32, height: 32, background: '#06b6d4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Rocket size={20} color="white" />
          </div>
          <span>SpaceScope</span>
        </div>
      </nav>

      <div className="auth-container">
        <div className="auth-card">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
              {mode === 'login' ? 'Welcome Back' : 'Join the Fleet'}
            </h2>
            <p style={{ color: '#94a3b8' }}>
              {mode === 'login' ? 'Enter your credentials to access Mission Control.' : 'Create your cadet profile to begin.'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div>
                <label className="auth-label">CALL SIGN (USERNAME)</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#94a3b8" style={{ position: 'absolute', top: 12, left: 12 }} />
                  <input type="text" className="auth-input" style={{ paddingLeft: 40 }} placeholder="e.g. Maverick" required />
                </div>
              </div>
            )}

            <div>
              <label className="auth-label">EMAIL FREQUENCY</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94a3b8" style={{ position: 'absolute', top: 12, left: 12 }} />
                <input type="email" className="auth-input" style={{ paddingLeft: 40 }} placeholder="cadet@spacescope.com" required />
              </div>
            </div>

            <div>
              <label className="auth-label">SECURITY TOKEN (PASSWORD)</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', top: 12, left: 12 }} />
                <input type="password" className="auth-input" style={{ paddingLeft: 40 }} placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" className="btn-glow" style={{ width: '100%', marginTop: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }} disabled={isLoading}>
              {isLoading ? 'Authenticating...' : (mode === 'login' ? 'Launch Console' : 'Register Account')}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#94a3b8' }}>
            {mode === 'login' ? "Don't have clearance?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer', fontWeight: 600 }}
            >
              {mode === 'login' ? 'Request Access' : 'Log In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;