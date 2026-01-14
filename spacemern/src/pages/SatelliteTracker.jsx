import React, { useState, useEffect } from 'react';
import GlobeView from '../components/GlobeView';
import { Satellite, Radio, RefreshCw } from 'lucide-react';

const API_KEY = import.meta.env.VITE_N2YO_API_KEY;
const BASE_URL = import.meta.env.VITE_N2YO_BASE_URL;
const CORS_PROXY = import.meta.env.VITE_CORS_PROXY; // CORS proxy to bypass browser restrictions

// Popular satellite NORAD IDs for tracking from various space agencies
const SATELLITES = [
  // NASA Satellites
  { id: 25544, name: 'ISS (ZARYA)', type: 'NASA Space Station', color: '#06b6d4' },
  { id: 28654, name: 'HUBBLE SPACE TELESCOPE', type: 'NASA Observatory', color: '#ec4899' },
  { id: 39084, name: 'TERRA', type: 'NASA Earth Observation', color: '#8b5cf6' },
  { id: 27424, name: 'GOES 13', type: 'NASA Weather', color: '#ef4444' },
  { id: 37820, name: 'NOAA 19', type: 'NASA Weather', color: '#f59e0b' },
  { id: 43435, name: 'TESS', type: 'NASA Exoplanet Hunter', color: '#14b8a6' },
  
  // SpaceX Starlink Satellites
  { id: 48274, name: 'STARLINK-1007', type: 'SpaceX Communication', color: '#10b981' },
  { id: 44238, name: 'STARLINK-1019', type: 'SpaceX Communication', color: '#22c55e' },
  { id: 46494, name: 'STARLINK-1600', type: 'SpaceX Communication', color: '#84cc16' },
  
  // ISRO Satellites (Indian Space Research Organisation)
  { id: 39635, name: 'CARTOSAT-2', type: 'ISRO Earth Observation', color: '#f97316' },
  { id: 40613, name: 'GSAT-17', type: 'ISRO Communication', color: '#fb923c' },
  { id: 41588, name: 'CARTOSAT-2E', type: 'ISRO Remote Sensing', color: '#fdba74' },
  
  // ESA Satellites (European Space Agency)
  { id: 39634, name: 'SENTINEL-1A', type: 'ESA Earth Observation', color: '#3b82f6' },
  { id: 41456, name: 'SENTINEL-2A', type: 'ESA Earth Observation', color: '#60a5fa' },
  { id: 42063, name: 'SENTINEL-3A', type: 'ESA Earth Observation', color: '#93c5fd' },
  
  // JAXA Satellites (Japan Aerospace Exploration Agency)
  { id: 33492, name: 'GOSAT', type: 'JAXA Climate Monitoring', color: '#a855f7' },
  { id: 38337, name: 'ALOS-2', type: 'JAXA Earth Observation', color: '#c084fc' },
  { id: 40267, name: 'HIMAWARI-9', type: 'JAXA Weather', color: '#d8b4fe' },
  
  // Other Notable Satellites
  { id: 43013, name: 'GLOBALSTAR M089', type: 'Communication', color: '#eab308' },
];

const SatelliteTracker = () => {
  const [selectedSat, setSelectedSat] = useState(null);
  const [satelliteData, setSatelliteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);

  // Observer location (default: center of US)
  const observerLat = 39.0;
  const observerLng = -98.0;
  const observerAlt = 0;

  // Cache duration: 1 hour in milliseconds
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
  const CACHE_KEY = 'satellite_tracking_data';
  const CACHE_TIMESTAMP_KEY = 'satellite_tracking_timestamp';

  // Fetch satellite position
  const fetchSatellitePosition = async (satellite) => {
    try {
      const apiUrl = `${BASE_URL}/positions/${satellite.id}/${observerLat}/${observerLng}/${observerAlt}/1/?apiKey=${API_KEY}`;
      const url = `${CORS_PROXY}${encodeURIComponent(apiUrl)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.positions && data.positions.length > 0) {
        const position = data.positions[0];
        return {
          id: satellite.id,
          label: satellite.name,
          type: satellite.type,
          color: satellite.color,
          lat: position.satlatitude,
          lng: position.satlongitude,
          altitude: position.sataltitude / 1000, // Convert to km
          azimuth: position.azimuth,
          elevation: position.elevation,
          ra: position.ra,
          dec: position.dec,
          timestamp: position.timestamp,
          status: 'Active'
        };
      }
      return null;
    } catch (err) {
      console.error(`Error fetching ${satellite.name}:`, err);
      return null;
    }
  };

  // Check if cached data is still valid (less than 1 hour old)
  const isCacheValid = () => {
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!cachedTimestamp) return false;
    
    const timeDiff = Date.now() - parseInt(cachedTimestamp);
    return timeDiff < CACHE_DURATION;
  };

  // Load data from cache
  const loadFromCache = () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (cachedData && cachedTimestamp) {
        const parsedData = JSON.parse(cachedData);
        setSatelliteData(parsedData);
        setLastUpdate(new Date(parseInt(cachedTimestamp)));
        return true;
      }
    } catch (err) {
      console.error('Error loading from cache:', err);
    }
    return false;
  };

  // Save data to cache
  const saveToCache = (data, timestamp) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp.getTime().toString());
    } catch (err) {
      console.error('Error saving to cache:', err);
    }
  };

  // Fetch all satellites
  const fetchAllSatellites = async (forceRefresh = false) => {
    // Check cache first unless force refresh
    if (!forceRefresh && isCacheValid()) {
      console.log('Using cached satellite data');
      const loaded = loadFromCache();
      if (loaded) {
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const promises = SATELLITES.map(sat => fetchSatellitePosition(sat));
      const results = await Promise.all(promises);
      const validResults = results.filter(r => r !== null);
      
      if (validResults.length === 0) {
        setError('Unable to fetch satellite data. Please check your API connection.');
      } else {
        const updateTime = new Date();
        setSatelliteData(validResults);
        setLastUpdate(updateTime);
        saveToCache(validResults, updateTime);
      }
    } catch (err) {
      setError('Failed to fetch satellite data: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount (page refresh)
  useEffect(() => {
    fetchAllSatellites();
  }, []);

  return (
    // MAIN CONTAINER: Fixed height to prevent page scrolling
    <div className="dashboard-page" style={{ height: 'calc(100vh - 20px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      <div className="page-header" style={{ marginBottom: '16px', flexShrink: 0 }}>
        <h1 className="page-title">Orbital Tracking Network</h1>
        <p className="page-subtitle">Real-time telemetry and orbital parameters</p>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          padding: '12px', 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid #ef4444',
          borderRadius: '8px',
          color: '#ef4444',
          marginBottom: '16px',
          flexShrink: 0
        }}>
          {error}
        </div>
      )}

      {/* CONTENT GRID: Takes up all remaining space */}
      <div className="grid-2" style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        flex: 1, 
        minHeight: 0, // CRITICAL for nested flex scrolling
        gap: '20px',
        paddingBottom: '20px'
      }}>
        
        {/* LEFT: 3D Globe - Now Centers Perfectly */}
        <div className="card" style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          padding: 0, 
          border: '1px solid var(--space-border)',
          display: 'flex',        // Ensure container can center content
          alignItems: 'center',   // Vertical center
          justifyContent: 'center' // Horizontal center
        }}>
           <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span className="badge badge-success animate-pulse">LIVE FEED ACTIVE</span>
              {lastUpdate && (
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Updated: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
              {isLoading && (
                <RefreshCw size={14} className="animate-spin" color="#06b6d4" />
              )}
           </div>
           <button
              onClick={() => fetchAllSatellites(true)}
              disabled={isLoading}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                zIndex: 10,
                padding: '8px 16px',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid #06b6d4',
                borderRadius: '6px',
                color: '#06b6d4',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '500',
                opacity: isLoading ? 0.5 : 1
              }}
           >
              <RefreshCw size={14} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
              Force Refresh
           </button>
           
           {/* Globe Container: Fills the card */}
           <div style={{ width: '100%', height: '100%' }}>
              {satelliteData.length > 0 ? (
                <GlobeView markers={satelliteData} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}>
                  {isLoading ? 'Loading satellite data...' : 'No satellite data available'}
                </div>
              )}
           </div>
        </div>

        {/* RIGHT: Satellite List - Fixed Layout */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
           <div className="card-header" style={{ flexShrink: 0 }}>
              <div className="card-icon cyan"><Satellite size={20} /></div>
              <span className="card-title">Tracked Objects</span>
           </div>

           {/* SCROLLABLE LIST: Only this part scrolls */}
           <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px', marginBottom: '10px' }}>
              {isLoading && satelliteData.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>
                  Loading satellites...
                </div>
              ) : satelliteData.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>
                  No satellites available
                </div>
              ) : (
                satelliteData.map((sat) => (
                  <div 
                    key={sat.id}
                    onClick={() => setSelectedSat(sat)}
                    style={{
                      background: selectedSat?.id === sat.id ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255,255,255,0.03)',
                      border: selectedSat?.id === sat.id ? '1px solid #06b6d4' : '1px solid transparent',
                      padding: '12px',
                      borderRadius: '12px',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      transition: '0.2s'
                    }}
                  >
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 'bold', color: sat.color, fontSize: '14px' }}>{sat.label}</span>
                        <Radio size={14} color={sat.color} />
                     </div>
                     <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>{sat.type}</span>
                        <span>Alt: {sat.altitude.toFixed(2)} km</span>
                     </div>
                     <div style={{ fontSize: '10px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Lat: {sat.lat.toFixed(4)}°</span>
                        <span>Lng: {sat.lng.toFixed(4)}°</span>
                     </div>
                  </div>
                ))
              )}
           </div>

           {/* BOTTOM PANEL: Fixed at bottom */}
           <div style={{ 
             marginTop: 'auto', 
             paddingTop: '15px', 
             borderTop: '1px solid var(--space-border)',
             flexShrink: 0 
           }}>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Selected Telemetry
              </div>
              
              {selectedSat ? (
                <div className="grid-2" style={{ gap: '10px' }}>
                   <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>LATITUDE</div>
                      <div style={{ fontWeight: 'bold' }}>{selectedSat.lat.toFixed(4)}°</div>
                   </div>
                   <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>LONGITUDE</div>
                      <div style={{ fontWeight: 'bold' }}>{selectedSat.lng.toFixed(4)}°</div>
                   </div>
                   <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>ALTITUDE</div>
                      <div style={{ color: '#06b6d4', fontSize: '13px' }}>{selectedSat.altitude.toFixed(2)} km</div>
                   </div>
                   <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>STATUS</div>
                      <div style={{ color: '#22c55e', fontSize: '13px' }}>{selectedSat.status}</div>
                   </div>
                   <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>AZIMUTH</div>
                      <div style={{ color: '#f59e0b', fontSize: '13px' }}>{selectedSat.azimuth?.toFixed(2)}°</div>
                   </div>
                   <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>ELEVATION</div>
                      <div style={{ color: '#8b5cf6', fontSize: '13px' }}>{selectedSat.elevation?.toFixed(2)}°</div>
                   </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                   Select a satellite to view live data
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default SatelliteTracker;