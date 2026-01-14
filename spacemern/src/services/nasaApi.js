// Space Missions API Service
const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov';
const ISRO_API_URL = 'https://services.isrostats.in/api/spacecraft';

/**
 * Fetch ISRO spacecraft data
 */
const fetchISROSpacecraft = async () => {
  try {
    const response = await fetch(ISRO_API_URL);
    if (!response.ok) throw new Error('ISRO API failed');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ISRO spacecraft:', error);
    return null;
  }
};

/**
 * Transform ISRO spacecraft data to mission format
 */
const transformISROToMissions = (spacecraftList) => {
  if (!spacecraftList || !Array.isArray(spacecraftList)) return [];

  // Sort by launch date (most recent first) and take top spacecraft
  const sortedSpacecraft = spacecraftList
    .filter(sc => sc.launch_date) // Filter out entries without launch dates
    .sort((a, b) => new Date(b.launch_date) - new Date(a.launch_date));

  return sortedSpacecraft.map(spacecraft => {
    // Determine status based on various fields
    let status = 'completed';
    const currentDate = new Date();
    const launchDate = new Date(spacecraft.launch_date);
    
    if (spacecraft.status) {
      const statusLower = spacecraft.status.toLowerCase();
      if (statusLower.includes('active') || statusLower.includes('operational') || statusLower.includes('orbit')) {
        status = 'active';
      } else if (statusLower.includes('planned') || statusLower.includes('upcoming') || launchDate > currentDate) {
        status = 'planned';
      }
    } else if (launchDate > currentDate) {
      status = 'planned';
    } else {
      // Calculate age to determine if likely still active
      const ageInYears = (currentDate - launchDate) / (1000 * 60 * 60 * 24 * 365);
      if (ageInYears < 10) {
        status = 'active'; // Assume spacecraft less than 10 years old are active
      }
    }

    // Calculate progress
    let progress = 0;
    if (status === 'completed') {
      progress = 100;
    } else if (status === 'active') {
      const ageInYears = (currentDate - launchDate) / (1000 * 60 * 60 * 24 * 365);
      progress = Math.min(95, Math.max(15, Math.floor(ageInYears * 15)));
    } else if (status === 'planned') {
      progress = Math.floor(Math.random() * 30) + 10; // 10-40% for planned missions
    }

    // Determine destination
    let destination = spacecraft.destination || 'Earth Orbit';
    if (spacecraft.orbit_type) {
      destination = spacecraft.orbit_type;
    }
    if (spacecraft.mission_type && !destination.includes(spacecraft.mission_type)) {
      destination = `${destination} - ${spacecraft.mission_type}`;
    }

    // Build description
    let description = spacecraft.description || spacecraft.mission_objectives || 
                     `${spacecraft.name} mission by ISRO.`;
    
    if (spacecraft.mission_duration) {
      description += ` Mission duration: ${spacecraft.mission_duration}.`;
    }

    return {
      id: `ISRO-${spacecraft.id || spacecraft.name.replace(/\s+/g, '-').toUpperCase()}`,
      name: spacecraft.name,
      launchDate: spacecraft.launch_date,
      status: status,
      description: description.length > 200 ? description.substring(0, 197) + '...' : description,
      agency: 'ISRO',
      destination: destination,
      crew: spacecraft.crew_members || null,
      progress: progress,
      mass: spacecraft.mass || null,
      launchVehicle: spacecraft.launch_vehicle || null
    };
  });
};

/**
 * Fetch upcoming and ongoing missions from multiple space agencies
 * Combines NASA, ISRO, and other international missions
 */
export const fetchNASAMissions = async () => {
  try {
    // Fetch ISRO spacecraft data
    const isroData = await fetchISROSpacecraft();
    
    let isroMissions = [];

    // Process ISRO spacecraft
    if (isroData && Array.isArray(isroData)) {
      const allIsroMissions = transformISROToMissions(isroData);
      // Limit ISRO missions to most recent/important ones
      const activeIsro = allIsroMissions.filter(m => m.status === 'active').slice(0, 5);
      const plannedIsro = allIsroMissions.filter(m => m.status === 'planned').slice(0, 2);
      const completedIsro = allIsroMissions.filter(m => m.status === 'completed').slice(0, 2);
      
      isroMissions = [...activeIsro, ...plannedIsro, ...completedIsro];
    }

    // NASA and International missions (existing missions to keep)
    const nasaInternationalMissions = [
      {
        id: 'NASA-ISS',
        name: 'International Space Station',
        launchDate: '1998-11-20',
        status: 'active',
        description: 'Continuous human presence in low Earth orbit conducting scientific research.',
        agency: 'NASA/ESA/Roscosmos',
        destination: 'Low Earth Orbit',
        crew: '7',
        progress: 95
      },
      {
        id: 'NASA-JWST',
        name: 'James Webb Space Telescope',
        launchDate: '2021-12-25',
        status: 'active',
        description: 'Revolutionary infrared telescope observing the earliest galaxies and exoplanet atmospheres.',
        agency: 'NASA/ESA/CSA',
        destination: 'L2 Lagrange Point',
        crew: null,
        progress: 88
      },
      {
        id: 'NASA-ARTEMIS-III',
        name: 'Artemis III',
        launchDate: '2026-09-15',
        status: 'planned',
        description: 'First crewed lunar landing since Apollo 17. Foundation for sustained lunar exploration.',
        agency: 'NASA',
        destination: 'Lunar South Pole',
        crew: '4',
        progress: 45
      },
      {
        id: 'NASA-EUROPA-CLIPPER',
        name: 'Europa Clipper',
        launchDate: '2024-10-14',
        status: 'active',
        description: 'Reconnaissance orbiter studying Jupiter\'s icy moon Europa and its subsurface ocean.',
        agency: 'NASA',
        destination: 'Jupiter - Europa',
        crew: null,
        progress: 15
      },
      {
        id: 'NASA-DRAGONFLY',
        name: 'Dragonfly',
        launchDate: '2028-07-01',
        status: 'planned',
        description: 'Rotorcraft lander mission to explore Saturn\'s largest moon Titan.',
        agency: 'NASA',
        destination: 'Saturn - Titan',
        crew: null,
        progress: 28
      },
      {
        id: 'NASA-PSYCHE',
        name: 'Psyche',
        launchDate: '2023-10-13',
        status: 'active',
        description: 'Journey to a unique metal-rich asteroid orbiting the Sun between Mars and Jupiter.',
        agency: 'NASA',
        destination: 'Asteroid Belt - Psyche',
        crew: null,
        progress: 8
      },
      {
        id: 'NASA-MARS-PERSEVERANCE',
        name: 'Mars Perseverance Rover',
        launchDate: '2020-07-30',
        status: 'active',
        description: 'Exploring Mars\' Jezero Crater, collecting samples and searching for signs of ancient life.',
        agency: 'NASA',
        destination: 'Mars - Jezero Crater',
        crew: null,
        progress: 82
      },
      {
        id: 'SPACEX-STARSHIP',
        name: 'Starship Development',
        launchDate: '2026-03-01',
        status: 'planned',
        description: 'Next-generation fully reusable spacecraft for missions to Moon, Mars and beyond.',
        agency: 'SpaceX',
        destination: 'Earth Orbit / Moon / Mars',
        crew: '100',
        progress: 62
      },
      {
        id: 'ESA-JUICE',
        name: 'Jupiter Icy Moons Explorer',
        launchDate: '2023-04-14',
        status: 'active',
        description: 'European mission to study Jupiter and its three large ocean-bearing moons.',
        agency: 'ESA',
        destination: 'Jupiter System',
        crew: null,
        progress: 12
      },
      {
        id: 'CNSA-TIANGONG',
        name: 'Tiangong Space Station',
        launchDate: '2021-04-29',
        status: 'active',
        description: 'China\'s modular space station in low Earth orbit, supporting long-duration missions.',
        agency: 'CNSA',
        destination: 'Low Earth Orbit',
        crew: '3',
        progress: 90
      }
    ];

    // Combine ISRO missions with NASA and international missions
    const allMissions = [...nasaInternationalMissions, ...isroMissions];

    return {
      success: true,
      missions: allMissions,
      lastUpdated: new Date().toISOString(),
      source: 'NASA + ISRO + International'
    };

  } catch (error) {
    console.error('Error fetching missions:', error);
    return {
      success: false,
      error: error.message,
      missions: []
    };
  }
};

/**
 * Fetch additional details about a specific mission
 */
export const fetchMissionDetails = async (missionId) => {
  try {
    // For Mars rovers, fetch latest photos
    if (missionId.includes('MARS')) {
      const roverName = missionId.includes('PERSEVERANCE') ? 'perseverance' : 
                       missionId.includes('CURIOSITY') ? 'curiosity' : 'perseverance';
      
      const response = await fetch(
        `${NASA_BASE_URL}/mars-photos/api/v1/rovers/${roverName}/latest_photos?api_key=${NASA_API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          photos: data.latest_photos.slice(0, 10),
          rover: data.latest_photos[0]?.rover
        };
      }
    }

    return { success: false, message: 'No additional details available' };
  } catch (error) {
    console.error('Error fetching mission details:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch APOD (Astronomy Picture of the Day) - bonus feature
 */
export const fetchAPOD = async () => {
  try {
    const response = await fetch(
      `${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`
    );
    
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data: data
      };
    }
    
    return { success: false };
  } catch (error) {
    console.error('Error fetching APOD:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch Cosmic Weather data from NASA DONKI API
 * Includes solar flares, geomagnetic storms, and space weather conditions
 */
export const fetchCosmicWeather = async () => {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const startDate = thirtyDaysAgo.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    // Fetch multiple space weather data sources in parallel
    const [gstResponse, solarFlareResponse, cmeResponse] = await Promise.all([
      // Geomagnetic Storm data
      fetch(`${NASA_BASE_URL}/DONKI/GST?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`).catch(() => null),
      // Solar Flare data
      fetch(`${NASA_BASE_URL}/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`).catch(() => null),
      // Coronal Mass Ejection data
      fetch(`${NASA_BASE_URL}/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`).catch(() => null)
    ]);

    const weatherData = {
      solarWind: '425 km/s', // Default value
      geomagneticStorm: 'G0 Quiet',
      radiationLevel: 'Normal',
      kpIndex: 2,
      sunspotNumber: 0,
      solarFlareRisk: 'Low',
      lastUpdate: new Date().toISOString()
    };

    // Process Geomagnetic Storm data
    if (gstResponse && gstResponse.ok) {
      const gstData = await gstResponse.json();
      if (gstData && gstData.length > 0) {
        const latestGST = gstData[gstData.length - 1];
        
        // Extract KP index from latest event
        if (latestGST.allKpIndex && latestGST.allKpIndex.length > 0) {
          const kpValues = latestGST.allKpIndex.map(k => k.kpIndex);
          const maxKp = Math.max(...kpValues);
          weatherData.kpIndex = maxKp;
          
          // Determine storm level based on KP index
          if (maxKp >= 5 && maxKp < 6) {
            weatherData.geomagneticStorm = 'G1 Minor';
          } else if (maxKp >= 6 && maxKp < 7) {
            weatherData.geomagneticStorm = 'G2 Moderate';
          } else if (maxKp >= 7 && maxKp < 8) {
            weatherData.geomagneticStorm = 'G3 Strong';
          } else if (maxKp >= 8) {
            weatherData.geomagneticStorm = 'G4 Severe';
          }
        }
      }
    }

    // Process Solar Flare data
    if (solarFlareResponse && solarFlareResponse.ok) {
      const flareData = await solarFlareResponse.json();
      if (flareData && flareData.length > 0) {
        const recentFlares = flareData.slice(-10); // Last 10 flares
        const xClassFlares = recentFlares.filter(f => f.classType && f.classType.startsWith('X'));
        const mClassFlares = recentFlares.filter(f => f.classType && f.classType.startsWith('M'));
        
        if (xClassFlares.length > 0) {
          weatherData.solarFlareRisk = 'Extreme';
          weatherData.radiationLevel = 'Elevated';
        } else if (mClassFlares.length > 2) {
          weatherData.solarFlareRisk = 'High';
          weatherData.radiationLevel = 'Moderate';
        } else if (mClassFlares.length > 0) {
          weatherData.solarFlareRisk = 'Moderate';
        }
        
        weatherData.sunspotNumber = recentFlares.length * 15; // Estimate
      }
    }

    // Process CME data for solar wind estimation
    if (cmeResponse && cmeResponse.ok) {
      const cmeData = await cmeResponse.json();
      if (cmeData && cmeData.length > 0) {
        const recentCMEs = cmeData.slice(-5);
        const fastCMEs = recentCMEs.filter(c => c.speed && c.speed > 500);
        
        if (fastCMEs.length > 0) {
          const avgSpeed = fastCMEs.reduce((sum, c) => sum + c.speed, 0) / fastCMEs.length;
          weatherData.solarWind = `${Math.round(avgSpeed)} km/s`;
        }
      }
    }

    return {
      success: true,
      data: weatherData,
      lastUpdated: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error fetching cosmic weather:', error);
    return {
      success: false,
      error: error.message,
      data: {
        solarWind: '425 km/s',
        geomagneticStorm: 'Unknown',
        radiationLevel: 'Unknown',
        kpIndex: 0,
        sunspotNumber: 0,
        solarFlareRisk: 'Unknown',
        lastUpdate: new Date().toISOString()
      }
    };
  }
};

// Helper function to get date string in YYYY-MM-DD format
const getDateString = (daysOffset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
};

export default {
  fetchNASAMissions,
  fetchMissionDetails,
  fetchAPOD,
  fetchCosmicWeather
};
