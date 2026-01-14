// src/pages/Dashboard.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Satellite, Rocket, Globe as GlobeIcon, AlertTriangle, Sun, Activity, X, Calendar, MapPin, RefreshCw } from 'lucide-react';
import Globe from 'react-globe.gl'; // From Code 2
import * as satellite from 'satellite.js'; // From Code 2

import { cosmicWeather as mockCosmicWeather, dashboardStats as mockDashboardStats, upcomingEvents } from '../data/mockData';
import { fetchCosmicWeather } from '../services/nasaApi';
import { fetchSatelliteStats } from '../services/satelliteApi';

// --- CONSTANTS FROM CODE 2 (For Globe Physics) ---
const EARTH_RADIUS_KM = 6371;
const TIME_STEP = 3 * 1000; // Speed of time loop

// Helper to render icons dynamically
const getIcon = (name) => {
  if (name === 'satellite' || name === '🛰️') return <Satellite size={24} />;
  if (name === 'rocket' || name === '🚀') return <Rocket size={24} />;
  if (name === 'globe' || name === '🌍') return <GlobeIcon size={24} />;
  if (name === 'alert' || name === '⚠️') return <AlertTriangle size={24} />;
  return <Activity size={24} />;
};

const Dashboard = ({ onNavigate }) => {
  const navigate = useNavigate(); // For "Expand Tracker" button
  const globeEl = useRef();

  // --- GLOBE STATE (FROM CODE 2) ---
  const [satData, setSatData] = useState([]); // Raw satellite objects (TLE)
  const [globeTime, setGlobeTime] = useState(new Date()); // Animation time

  // --- DASHBOARD UI STATE (FROM CODE 1) ---
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [cosmicWeather, setCosmicWeather] = useState(mockCosmicWeather);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [lastWeatherUpdate, setLastWeatherUpdate] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(mockDashboardStats);
  const [satelliteLoading, setSatelliteLoading] = useState(false); // Used for spinner
  const [lastSatelliteUpdate, setLastSatelliteUpdate] = useState(null);

  // --- CACHE KEYS (FROM CODE 1) ---
  const WEATHER_CACHE_KEY = 'cosmic_weather_data';
  const WEATHER_TIMESTAMP_KEY = 'cosmic_weather_timestamp';
  const SATELLITE_CACHE_KEY = 'satellite_data'; // For stats numbers
  const SATELLITE_TIMESTAMP_KEY = 'satellite_timestamp';
  const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

  // ---------------------------------------------------------
  // 1. DATA FETCHING LOGIC
  // ---------------------------------------------------------

  // A. FETCH TLE DATA FOR GLOBE DOTS (FROM CODE 2)
  useEffect(() => {
    const TLE_URL = '//unpkg.com/globe.gl/example/datasets/space-track-leo.txt';
    setSatelliteLoading(true); // Show spinner while downloading TLE

    fetch(TLE_URL)
      .then(r => r.text())
      .then(rawData => {
        const tleData = rawData.replace(/\r/g, '')
          .split(/\n(?=[^12])/)
          .filter(d => d)
          .map(tle => tle.split('\n'));

        const satellites = tleData.map(([name, ...tle]) => ({
          satrec: satellite.twoline2satrec(...tle),
          name: name.trim().replace(/^0 /, '')
        }))
        .filter(d => !!satellite.propagate(d.satrec, new Date())?.position);

        setSatData(satellites);
        setSatelliteLoading(false);
      })
      .catch(err => {
        console.error("Failed to load TLE data:", err);
        setSatelliteLoading(false);
      });
  }, []);

  // B. ANIMATION LOOP (FROM CODE 2)
  useEffect(() => {
    let frameId;
    const animate = () => {
      setGlobeTime(prev => new Date(+prev + TIME_STEP));
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // C. COMPUTE POSITIONS (FROM CODE 2)
  const objectsData = useMemo(() => {
    if (!satData.length) return [];
    const gmst = satellite.gstime(globeTime);
    return satData.map(d => {
      const eci = satellite.propagate(d.satrec, globeTime);
      if (eci?.position) {
        const gdPos = satellite.eciToGeodetic(eci.position, gmst);
        return {
          lat: satellite.radiansToDegrees(gdPos.latitude),
          lng: satellite.radiansToDegrees(gdPos.longitude),
          alt: Math.max(gdPos.height / EARTH_RADIUS_KM, 0.05) // Ensure visibility
        };
      }
      return null;
    }).filter(d => d !== null);
  }, [satData, globeTime]);

  // D. FETCH STATS & WEATHER (FROM CODE 1 - Preserving Cache Logic)
  const isWeatherCacheValid = () => {
    const cachedTimestamp = sessionStorage.getItem(WEATHER_TIMESTAMP_KEY);
    if (!cachedTimestamp) return false;
    return (Date.now() - parseInt(cachedTimestamp)) < CACHE_DURATION;
  };

  const loadWeatherFromCache = () => {
    try {
      const cachedData = sessionStorage.getItem(WEATHER_CACHE_KEY);
      const cachedTimestamp = sessionStorage.getItem(WEATHER_TIMESTAMP_KEY);
      if (cachedData && cachedTimestamp) {
        setCosmicWeather(JSON.parse(cachedData));
        setLastWeatherUpdate(new Date(parseInt(cachedTimestamp)));
        return true;
      }
    } catch (err) { console.error(err); }
    return false;
  };

  const loadCosmicWeather = async () => {
    if (isWeatherCacheValid()) {
      if (loadWeatherFromCache()) return;
    }
    setWeatherLoading(true);
    try {
      const result = await fetchCosmicWeather();
      if (result.success && result.data) {
        const updateTime = new Date();
        setCosmicWeather(result.data);
        setLastWeatherUpdate(updateTime);
        sessionStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(result.data));
        sessionStorage.setItem(WEATHER_TIMESTAMP_KEY, updateTime.getTime().toString());
      }
    } catch (err) { console.error(err); } 
    finally { setWeatherLoading(false); }
  };

  const loadSatelliteStats = async () => {
    // Only fetching numbers here, visuals handled by TLE fetch above
    try {
      const result = await fetchSatelliteStats();
      if (result.success) {
        const updatedStats = mockDashboardStats.map(stat => {
          if (stat.label === 'Active Satellites') {
            return { ...stat, value: result.activeSatellites.toLocaleString() };
          }
          return stat;
        });
        setDashboardStats(updatedStats);
        setLastSatelliteUpdate(new Date());
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    loadCosmicWeather();
    loadSatelliteStats();
    
    // Auto-rotate globe
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.pointOfView({ altitude: 3.0 });
    }
  }, []);

  // ---------------------------------------------------------
  // 2. RENDER UI (FROM CODE 1 - Perfect UI)
  // ---------------------------------------------------------
  return (
    <div className="dashboard-page" style={{ position: 'relative' }}>

      {/* --- EVENTS MODAL --- */}
      {showEventsModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s'
        }}>
          <div style={{
            width: '600px', maxHeight: '80vh', background: '#0f172a',
            border: '1px solid #334155', borderRadius: '16px', padding: '24px',
            overflowY: 'auto', position: 'relative', boxShadow: '0 0 50px rgba(0, 212, 255, 0.2)'
          }}>
            <button
              onClick={() => setShowEventsModal(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ fontSize: '24px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar color="#06b6d4" /> Cosmic Events Log
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '25px' }}>Full schedule of celestial activities and flyovers.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {upcomingEvents.map((event) => (
                <div key={event.id} style={{
                  background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px',
                  borderLeft: '4px solid #06b6d4', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#06b6d4', marginBottom: '4px' }}>{event.time || event.date}</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>{event.title || event.name}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={12} /> {event.region || "Global Visibility"}
                    </div>
                  </div>
                  <div className="badge badge-info" style={{ fontSize: '11px' }}>{event.visibility || "Visible"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="page-header">
        <h1 className="page-title">Mission Control</h1>
        <p className="page-subtitle">Real-time space monitoring and cosmic weather updates</p>
      </div>

      {/* --- STATS GRID --- */}
      <div className="stats-grid">
        {dashboardStats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className={`stat-icon card-icon ${stat.color}`}>
              {getIcon(stat.icon)}
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* --- COSMIC WEATHER CARD --- */}
      <div className="weather-card">
        <div className="weather-header">
          <div className="weather-title">
            <Sun className="weather-icon" color="#fbbf24" />
            <span className="weather-label">Cosmic Weather Report</span>
            {weatherLoading && (
              <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite', marginLeft: '8px' }} color="#06b6d4" />
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge ${cosmicWeather.radiationLevel === 'Elevated' ? 'badge-warning' : 'badge-success'}`}>
              {cosmicWeather.radiationLevel || 'NORMAL'}
            </span>
            {lastWeatherUpdate && (
              <span style={{ fontSize: '10px', color: '#64748b' }}>
                Updated {lastWeatherUpdate.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        <div className="weather-grid">
          <div className="weather-item">
            <div className="weather-value">{cosmicWeather.solarWind}</div>
            <div className="weather-name">Solar Wind</div>
          </div>
          <div className="weather-item">
            <div className="weather-value" style={{ color: '#8b5cf6' }}>{cosmicWeather.geomagneticStorm}</div>
            <div className="weather-name">Geomagnetic</div>
          </div>
          <div className="weather-item">
            <div className="weather-value">Kp {cosmicWeather.kpIndex}</div>
            <div className="weather-name">Kp Index</div>
          </div>
          <div className="weather-item">
            <div className="weather-value" style={{ color: '#fbbf24' }}>{cosmicWeather.solarFlareRisk}</div>
            <div className="weather-name">Solar Flare Risk</div>
          </div>
          <div className="weather-item">
            <div className="weather-value">{cosmicWeather.sunspotNumber}</div>
            <div className="weather-name">Sunspots</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* --- [MERGED SECTION] GLOBE + SATELLITE DOTS --- */}
        <div className="globe-section" style={{
          background: 'linear-gradient(135deg, var(--space-navy) 0%, var(--space-dark) 100%)',
          border: '1px solid var(--space-border)', borderRadius: '20px', padding: '21px',
          minHeight: '450px', display: 'flex', flexDirection: 'column'
        }}>
          <div className="card-header" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="card-icon cyan" style={{ fontSize: '16px', width: '32px', height: '32px' }}>🌍</span>
              <span className="card-title" style={{ fontWeight: '600', fontSize: '13px', textTransform: 'uppercase' }}>Real-Time Satellite Tracking</span>
            </div>
            {satelliteLoading && <RefreshCw size={12} style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} color="#06b6d4" />}
            
            {/* ADDED EXPAND TRACKER BUTTON FROM CODE 2 */}
            <button 
               onClick={() => onNavigate('tracker')} // <--- THIS IS THE FIX
               style={{ 
                 color: '#06b6d4', 
                 background: 'rgba(6,182,212,0.1)', 
                 border: '1px solid #06b6d4', 
                 padding: '4px 8px', 
                 borderRadius: 4, 
                 cursor: 'pointer', 
                 fontSize: '11px' 
               }}
            >
              Expand Tracker →
            </button>
          </div>

          <div className="globe-container" style={{ flex: 1, minHeight: '200px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            <Globe
              ref={globeEl}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

              // --- VISUAL SETTINGS FROM CODE 2 (Working Dots) ---
              pointsData={objectsData}
              pointLat="lat"
              pointLng="lng"
              pointAltitude={0.02} // Keeps dots tight to surface
              pointColor={() => '#ffffff'} // White dots
              pointRadius={0.3} // Visible size
              pointsMerge={false} // Clean rendering
              pointResolution={12} // Smooth circles
              pointsTransitionDuration={0} // Snap updates

              // Atmosphere for aesthetic
              atmosphereColor="#0a3d62"
              atmosphereAltitude={0.2}
              atmosphereBlur={0.5}

              width={undefined} // Auto-width
              height={250}      // Fixed height for dashboard
              animateIn={true}
            />

            {/* OVERLAY STATS */}
            <div style={{
              position: 'absolute', bottom: '8px', left: '8px',
              fontSize: '9px', color: '#64748b',
              background: 'rgba(15, 23, 42, 0.8)', padding: '4px 8px', borderRadius: '4px', pointerEvents: 'none'
            }}>
              {objectsData.length > 0 ? `${objectsData.length} Satellites Tracked` : 'Initializing Orbitals...'} <br />
              UTC: {globeTime.toISOString().split('T')[1].split('.')[0]}
            </div>
          </div>
        </div>

        {/* --- EVENTS LIST --- */}
        <div className="events-section" style={{ height: '100%', maxHeight: '438px', overflowY: 'auto' }}>
          <div className="events-header" style={{ marginBottom: '12px' }}>
            <h3 className="events-title" style={{ fontSize: '19px' }}>🗓️ Upcoming Events</h3>
            <button
              className="btn btn-secondary"
              style={{ padding: '8px 10px', fontSize: '17px' }}
              onClick={() => setShowEventsModal(true)}
            >
              View All
            </button>
          </div>

          {upcomingEvents.map((event) => (
            <div key={event.id} className="event-card" style={{ padding: '10px', marginBottom: '8px' }}>
              <div className="event-date" style={{ marginBottom: '2px', fontSize: '10px' }}>{event.time || event.date}</div>
              <div className="event-name" style={{ fontSize: '13px', marginBottom: '2px' }}>{event.title || event.name}</div>
              <div className="event-description" style={{ fontSize: '11px' }}>{event.region || event.visibility || event.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;