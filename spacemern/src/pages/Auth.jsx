import React, { useState } from 'react';
import { Rocket, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import '../styles/landing.css';
import Dashboard from './Dashboard';

const Auth = ({ initialMode = 'login', onLogin }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      let result;
      
      if (mode === 'login') {
        result = await login(email, password);
      } else {
        if (username.length < 3) {
          setError('Username must be at least 3 characters');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        result = await signup(email, password, username);
      }
      
      if (result.success) {
        // Navigate to dashboard after successful authentication
        if (onLogin) {
          onLogin(<Dashboard />);
        }
      } else {
        // Format error messages to be user-friendly
        let errorMessage = result.error || 'Authentication failed';
        
        if (errorMessage.includes('email-already-in-use')) {
          errorMessage = 'This email is already registered. Please login instead.';
        } else if (errorMessage.includes('invalid-email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (errorMessage.includes('weak-password')) {
          errorMessage = 'Password is too weak. Use at least 6 characters.';
        } else if (errorMessage.includes('user-not-found')) {
          errorMessage = 'No account found with this email.';
        } else if (errorMessage.includes('wrong-password')) {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (errorMessage.includes('too-many-requests')) {
          errorMessage = 'Too many attempts. Please try again later.';
        }
        
        setError(errorMessage);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
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

          {/* Error Message */}
          {error && (
            <div style={{ 
              padding: '12px', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid #ef4444',
              borderRadius: '8px',
              color: '#ef4444',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              <span style={{ fontSize: '14px' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div>
                <label className="auth-label">CALL SIGN (USERNAME)</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#94a3b8" style={{ position: 'absolute', top: 12, left: 12 }} />
                  <input 
                    type="text" 
                    className="auth-input" 
                    style={{ paddingLeft: 40 }} 
                    placeholder="e.g. Maverick" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>
              </div>
            )}

            <div>
              <label className="auth-label">EMAIL FREQUENCY</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94a3b8" style={{ position: 'absolute', top: 12, left: 12 }} />
                <input 
                  type="email" 
                  className="auth-input" 
                  style={{ paddingLeft: 40 }} 
                  placeholder="cadet@spacescope.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div>
              <label className="auth-label">SECURITY TOKEN (PASSWORD)</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', top: 12, left: 12 }} />
                <input 
                  type="password" 
                  className="auth-input" 
                  style={{ paddingLeft: 40 }} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
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