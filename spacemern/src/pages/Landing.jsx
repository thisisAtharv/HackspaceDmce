import React from 'react';
import { Rocket, Shield, Globe, ChevronRight } from 'lucide-react';
import PlanetHero from '../components/PlanetHero';
import '../styles/landing.css';

const Landing = ({ onNavigate }) => {
  return (
    <div className="landing-container">
      <div className="stars-overlay"></div>
      
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <div style={{ width: 32, height: 32, background: '#06b6d4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Rocket size={20} color="white" />
          </div>
          <span>SpaceScope</span>
        </div>
        <div className="nav-links">
          <button className="btn-outline" style={{padding: '8px 16px', fontSize: '14px'}} onClick={() => onNavigate('login')}>Log In</button>
          <button className="btn-glow" style={{padding: '8px 16px', fontSize: '14px'}} onClick={() => onNavigate('signup')}>Sign Up</button>
        </div>
      </nav>

      {/* Hero Section with Mars Side by Side */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '80px 40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        minHeight: '600px'
      }}>
        
        {/* Left: Hero Content */}
        <div className="hero-section" style={{ 
          margin: 0, 
          padding: 0,
          textAlign: 'left'
        }}>
            {/* if you want you can remove hero badge */}
          <div className="hero-badge">System Status: Nominal</div>
          <h1 className="hero-title">
            Explore the Cosmos<br />
            <span style={{ color: '#06b6d4', background: 'none', WebkitTextFillColor: '#06b6d4' }}>In Real-Time</span>
          </h1>
          <p className="hero-subtitle">
            Advanced telemetry, orbital tracking, and mission control for the modern space age. 
            Join the fleet and monitor Earth, Satellites, and Deep Space missions.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-glow" onClick={() => onNavigate('signup')}>
              Initialize Mission <ChevronRight size={18} />
            </button>
            <button className="btn-outline" onClick={() => window.open('https://github.com/thisisAtharv/HackspaceDmce', '_blank')}>
              View Documentation
            </button>
          </div>
        </div>

        {/* Right: Mars Globe */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <PlanetHero />
        </div>

      </div>

      {/* Feature Grid with Smooth Hover */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', position: 'relative', zIndex: 5 }}>
        
        <div className="feature-card">
          <Globe size={32} color="#06b6d4" style={{marginBottom: 16}} />
          <h3 style={{fontSize: 20, marginBottom: 8, fontWeight: 'bold'}}>3D Tracking</h3>
          <p style={{color: '#94a3b8', lineHeight: 1.5}}>Live visualization of satellites and orbital debris using WebGL globe rendering.</p>
        </div>
        <div className="feature-card">
          <Rocket size={32} color="#8b5cf6" style={{marginBottom: 16}} />
          <h3 style={{fontSize: 20, marginBottom: 8, fontWeight: 'bold'}}>Mission Registry</h3>
          <p style={{color: '#94a3b8', lineHeight: 1.5}}>Track Artemis, SpaceX, and ISRO missions with real-time telemetry updates.</p>
        </div>
        <div className="feature-card">
          <Shield size={32} color="#22c55e" style={{marginBottom: 16}} />
          <h3 style={{fontSize: 20, marginBottom: 8, fontWeight: 'bold'}}>Earth Impact</h3>
          <p style={{color: '#94a3b8', lineHeight: 1.5}}>Monitor agricultural health, disaster response, and pollution via satellite data.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;