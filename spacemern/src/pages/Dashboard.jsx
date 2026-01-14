// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Satellite, Rocket, Globe, AlertTriangle, Sun, Activity, X, Calendar, MapPin, RefreshCw } from 'lucide-react';
import GlobeView from '../components/GlobeView';
import { cosmicWeather as mockCosmicWeather, dashboardStats as mockDashboardStats, upcomingEvents } from '../data/mockData';
import { fetchCosmicWeather } from '../services/nasaApi';
import { fetchSatelliteStats } from '../services/satelliteApi';

// Helper to render icons dynamically
const getIcon = (name) => {
  if (name === 'satellite' || name === '🛰️') return <Satellite size={24} />;
  if (name === 'rocket' || name === '🚀') return <Rocket size={24} />;
  if (name === 'globe' || name === '🌍') return <Globe size={24} />;
  if (name === 'alert' || name === '⚠️') return <AlertTriangle size={24} />;
  return <Activity size={24} />;
};

const Dashboard = () => {
  // State for modal
  const [showEventsModal, setShowEventsModal] = useState(false);
  
  // State for cosmic weather
  const [cosmicWeather, setCosmicWeather] = useState(mockCosmicWeather);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [lastWeatherUpdate, setLastWeatherUpdate] = useState(null);
  
  // State for satellite data
  const [dashboardStats, setDashboardStats] = useState(mockDashboardStats);
  const [satelliteMarkers, setSatelliteMarkers] = useState([]);
  const [satelliteLoading, setSatelliteLoading] = useState(false);
  const [lastSatelliteUpdate, setLastSatelliteUpdate] = useState(null);
  
  // Cache constants
  const WEATHER_CACHE_KEY = 'cosmic_weather_data';
  const WEATHER_TIMESTAMP_KEY = 'cosmic_weather_timestamp';
  const SATELLITE_CACHE_KEY = 'satellite_data';
  const SATELLITE_TIMESTAMP_KEY = 'satellite_timestamp';
  const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  // Check if cached weather data is still valid
  const isWeatherCacheValid = () => {
    const cachedTimestamp = sessionStorage.getItem(WEATHER_TIMESTAMP_KEY);
    if (!cachedTimestamp) return false;
    
    const timeDiff = Date.now() - parseInt(cachedTimestamp);
    return timeDiff < CACHE_DURATION;
  };

  // Check if cached satellite data is still valid
  const isSatelliteCacheValid = () => {
    const cachedTimestamp = sessionStorage.getItem(SATELLITE_TIMESTAMP_KEY);
    if (!cachedTimestamp) return false;
    
    const timeDiff = Date.now() - parseInt(cachedTimestamp);
    return timeDiff < CACHE_DURATION;
  };

  // Load weather from session storage
  const loadWeatherFromCache = () => {
    try {
      const cachedData = sessionStorage.getItem(WEATHER_CACHE_KEY);
      const cachedTimestamp = sessionStorage.getItem(WEATHER_TIMESTAMP_KEY);
      
      if (cachedData && cachedTimestamp) {
        const parsedData = JSON.parse(cachedData);
        setCosmicWeather(parsedData);
        setLastWeatherUpdate(new Date(parseInt(cachedTimestamp)));
        return true;
      }
    } catch (err) {
      console.error('Error loading weather from cache:', err);
    }
    return false;
  };

  // Save weather to session storage
  const saveWeatherToCache = (data, timestamp) => {
    try {
      sessionStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(data));
      sessionStorage.setItem(WEATHER_TIMESTAMP_KEY, timestamp.getTime().toString());
    } catch (err) {
      console.error('Error saving weather to cache:', err);
    }
  };

  // Load satellite data from session storage
  const loadSatelliteFromCache = () => {
    try {
      const cachedStats = sessionStorage.getItem(SATELLITE_CACHE_KEY);
      const cachedTimestamp = sessionStorage.getItem(SATELLITE_TIMESTAMP_KEY);
      
      if (cachedStats && cachedTimestamp) {
        const { stats, markers } = JSON.parse(cachedStats);
        setDashboardStats(stats);
        setSatelliteMarkers(markers || []);
        setLastSatelliteUpdate(new Date(parseInt(cachedTimestamp)));
        return true;
      }
    } catch (err) {
      console.error('Error loading satellite data from cache:', err);
    }
    return false;
  };

  // Save satellite data to session storage
  const saveSatelliteToCache = (stats, markers, timestamp) => {
    try {
      sessionStorage.setItem(SATELLITE_CACHE_KEY, JSON.stringify({ stats, markers }));
      sessionStorage.setItem(SATELLITE_TIMESTAMP_KEY, timestamp.getTime().toString());
    } catch (err) {
      console.error('Error saving satellite data to cache:', err);
    }
  };

  // Fetch cosmic weather from NASA API
  const loadCosmicWeather = async () => {
    // Check cache first
    if (isWeatherCacheValid()) {
      console.log('Using cached cosmic weather data');
      const loaded = loadWeatherFromCache();
      if (loaded) return;
    }

    setWeatherLoading(true);
    
    try {
      const result = await fetchCosmicWeather();
      
      if (result.success && result.data) {
        const updateTime = new Date();
        setCosmicWeather(result.data);
        setLastWeatherUpdate(updateTime);
        saveWeatherToCache(result.data, updateTime);
      } else {
        // Fallback to mock data
        setCosmicWeather(mockCosmicWeather);
      }
    } catch (err) {
      console.error('Failed to load cosmic weather:', err);
      setCosmicWeather(mockCosmicWeather);
    } finally {
      setWeatherLoading(false);
    }
  };

  // Fetch satellite data
  const loadSatelliteData = async () => {
    // Check cache first
    if (isSatelliteCacheValid()) {
      console.log('Using cached satellite data');
      const loaded = loadSatelliteFromCache();
      if (loaded) return;
    }

    setSatelliteLoading(true);
    
    try {
      const result = await fetchSatelliteStats();
      
      if (result.success) {
        const updateTime = new Date();
        
        // Update dashboard stats with live satellite count
        const updatedStats = mockDashboardStats.map(stat => {
          if (stat.label === 'Active Satellites') {
            return {
              ...stat,
              value: result.activeSatellites.toLocaleString()
            };
          }
          return stat;
        });
        
        setDashboardStats(updatedStats);
        setSatelliteMarkers(result.satellites || []);
        setLastSatelliteUpdate(updateTime);
        saveSatelliteToCache(updatedStats, result.satellites, updateTime);
      } else {
        // Fallback to mock data
        setDashboardStats(mockDashboardStats);
      }
    } catch (err) {
      console.error('Failed to load satellite data:', err);
      setDashboardStats(mockDashboardStats);
    } finally {
      setSatelliteLoading(false);
    }
  };

  // Load weather and satellite data on mount and set up 2-hour refresh interval
  useEffect(() => {
    loadCosmicWeather();
    loadSatelliteData();
    
    // Set up interval to refresh every 2 hours
    const intervalId = setInterval(() => {
      loadCosmicWeather();
      loadSatelliteData();
    }, CACHE_DURATION);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-page" style={{ position: 'relative' }}>

      {/* --- MODAL START --- */}
      {showEventsModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s'
        }}>
          <div style={{
            width: '600px',
            maxHeight: '80vh',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '24px',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 0 50px rgba(0, 212, 255, 0.2)'
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
                  background: 'rgba(255,255,255,0.05)',
                  padding: '15px',
                  borderRadius: '12px',
                  borderLeft: '4px solid #06b6d4',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#06b6d4', marginBottom: '4px' }}>{event.time || event.date}</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>{event.title || event.name}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={12} /> {event.region || "Global Visibility"}
                    </div>
                  </div>
                  <div className="badge badge-info" style={{ fontSize: '11px' }}>
                    {event.visibility || "Visible"}
                  </div>
                </div>
              ))}

              {/* Dummy events to make the list look "Full" for the demo */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', borderLeft: '4px solid #64748b' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Mar 12, 2025</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#94a3b8' }}>Venus Transit</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Predicted Calculation...</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* --- MODAL END --- */}

      <div className="page-header">
        <h1 className="page-title">Mission Control</h1>
        <p className="page-subtitle">Real-time space monitoring and cosmic weather updates</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {dashboardStats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className={`stat-icon card-icon ${stat.color}`}>
              {/* Restore the dynamic icon function */}
              {getIcon(stat.icon)}
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Cosmic Weather Card */}
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

      {/* Main Content Grid */}
      <div className="dashboard-grid">

        {/* GLOBE SECTION (COMPACT) */}
        <div className="globe-section" style={{
          background: 'linear-gradient(135deg, var(--space-navy) 0%, var(--space-dark) 100%)',
          border: '1px solid var(--space-border)',
          borderRadius: '20px',
          padding: '16px',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div className="card-header" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="card-icon cyan" style={{ fontSize: '16px', width: '32px', height: '32px' }}>🌍</span>
            <span className="card-title" style={{ fontWeight: '600', fontSize: '13px', textTransform: 'uppercase' }}>Real-Time Satellite Tracking</span>
            {satelliteLoading && (
              <RefreshCw size={12} style={{ animation: 'spin 1s linear infinite', marginLeft: 'auto' }} color="#06b6d4" />
            )}
          </div>

          <div className="globe-container" style={{ flex: 1, minHeight: '200px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            {satelliteMarkers.length > 0 ? (
              <GlobeView markers={satelliteMarkers} />
            ) : (
              <GlobeView />
            )}
            {lastSatelliteUpdate && (
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                fontSize: '9px',
                color: '#64748b',
                background: 'rgba(15, 23, 42, 0.8)',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                {satelliteMarkers.length} satellites tracked • Updated {lastSatelliteUpdate.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        {/* EVENTS SECTION */}
        <div className="events-section" style={{ height: '100%', maxHeight: '438px', overflowY: 'auto' }}>
          <div className="events-header" style={{ marginBottom: '12px' }}>
            <h3 className="events-title" style={{ fontSize: '19px' }}>🗓️ Upcoming Events</h3>
            {/* 2. CONNECT BUTTON TO STATE */}
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