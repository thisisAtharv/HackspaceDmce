// SpaceScope Mock Data

export const cosmicWeather = {
  solarWind: "425 km/s",
  geomagneticStorm: "G1 Minor",
  radiationLevel: "Normal",
  kpIndex: 3,
  sunspotNumber: 147,
  solarFlareRisk: "Low"
};

export const dashboardStats = [
  {
    id: 1,
    icon: "🛰️",
    value: "2,847",
    label: "Active Satellites",
    color: "cyan"
  },
  {
    id: 2,
    icon: "🚀",
    value: "156",
    label: "Missions Active",
    color: "purple"
  },
  {
    id: 3,
    icon: "🌍",
    value: "24/7",
    label: "Earth Monitoring",
    color: "green"
  },
  {
    id: 4,
    icon: "⚠️",
    value: "3",
    label: "Active Alerts",
    color: "orange"
  }
];

export const upcomingEvents = [
  {
    id: 1,
    date: "Jan 15, 2025",
    name: "SpaceX Starship Test Flight",
    description: "Fifth integrated flight test of Starship from Boca Chica"
  },
  {
    id: 2,
    date: "Jan 22, 2025",
    name: "Lunar Eclipse",
    description: "Total lunar eclipse visible from North America"
  },
  {
    id: 3,
    date: "Feb 3, 2025",
    name: "ISS Crew Rotation",
    description: "Expedition 72 crew change via SpaceX Dragon"
  },
  {
    id: 4,
    date: "Feb 18, 2025",
    name: "Mars Conjunction",
    description: "Mars at closest approach to Earth this year"
  }
];

export const missions = [
  {
    id: "M001",
    name: "Artemis III",
    launchDate: "2025-09-15",
    status: "active",
    description: "First crewed lunar landing since Apollo 17.",
    agency: "NASA",
    destination: "Lunar South Pole",
    crew: "4",
    progress: 67
  },
  {
    id: "M002",
    name: "Europa Clipper",
    launchDate: "2024-10-14",
    status: "active",
    description: "Reconnaissance of Jupiter's moon Europa.",
    agency: "NASA",
    destination: "Jupiter - Europa",
    crew: null, // Unmanned
    progress: 23
  },
  {
    id: "M003",
    name: "Mars Sample Return",
    launchDate: "2028-07-01",
    status: "planned",
    description: "Return samples collected by Perseverance.",
    agency: "NASA/ESA",
    destination: "Mars - Jezero Crater",
    crew: null,
    progress: 12
  },
  {
    id: "M004",
    name: "Dragonfly",
    launchDate: "2027-06-01",
    status: "planned",
    description: "Rotorcraft lander to explore Titan.",
    agency: "NASA",
    destination: "Saturn - Titan",
    crew: null,
    progress: 45
  },
  {
    id: "M005",
    name: "Voyager 1",
    launchDate: "1977-09-05",
    status: "completed",
    description: "Exploring interstellar space.",
    agency: "NASA",
    destination: "Interstellar Space",
    crew: null,
    progress: 100
  },
  {
    id: "M006",
    name: "Gaganyaan",
    launchDate: "2025-12-01",
    status: "active",
    description: "India's first crewed space flight.",
    agency: "ISRO",
    destination: "Low Earth Orbit",
    crew: "3",
    progress: 85
  }
];

export const earthImpact = {
  agriculture: {
    title: "Agriculture Monitoring",
    subtitle: "Crop health & food security",
    icon: "🌾",
    stats: [
      { value: "2.3B", label: "Acres Monitored" },
      { value: "98%", label: "Accuracy Rate" },
      { value: "156", label: "Countries" },
      { value: "24h", label: "Update Cycle" }
    ],
    progress: 78,
    progressLabel: "Global Coverage"
  },
  disaster: {
    title: "Disaster Response",
    subtitle: "Early warning & emergency support",
    icon: "🌪️",
    stats: [
      { value: "847", label: "Events Tracked" },
      { value: "12min", label: "Avg Response" },
      { value: "2.1M", label: "Lives Protected" },
      { value: "99.7%", label: "Uptime" }
    ],
    progress: 94,
    progressLabel: "Response Readiness"
  },
  pollution: {
    title: "Pollution Tracking",
    subtitle: "Air quality & emissions monitoring",
    icon: "🏭",
    stats: [
      { value: "45K", label: "Sensors Active" },
      { value: "PM2.5", label: "Primary Focus" },
      { value: "89%", label: "Cities Covered" },
      { value: "1hr", label: "Data Refresh" }
    ],
    progress: 67,
    progressLabel: "Emission Reduction"
  }
};

export const quizzes = [
  {
    id: 1,
    category: "Solar System",
    title: "Planets & Moons",
    description: "Test your knowledge about the planets, moons, and other celestial bodies in our solar system.",
    questions: 15,
    duration: "10 min",
    difficulty: "easy",
    completedBy: 12453
  },
  {
    id: 2,
    category: "Space Exploration",
    title: "Historic Missions",
    description: "From Apollo to Artemis - how well do you know humanity's greatest space achievements?",
    questions: 20,
    duration: "15 min",
    difficulty: "medium",
    completedBy: 8721
  },
  {
    id: 3,
    category: "Astronomy",
    title: "Stars & Galaxies",
    description: "Explore the wonders of stars, galaxies, black holes, and the deep universe.",
    questions: 25,
    duration: "20 min",
    difficulty: "hard",
    completedBy: 4562
  },
  {
    id: 4,
    category: "Technology",
    title: "Rockets & Spacecraft",
    description: "Learn about the engineering marvels that make space exploration possible.",
    questions: 18,
    duration: "12 min",
    difficulty: "medium",
    completedBy: 6834
  },
  {
    id: 5,
    category: "Earth Science",
    title: "Climate & Satellites",
    description: "Understand how space technology helps us monitor and protect our home planet.",
    questions: 12,
    duration: "8 min",
    difficulty: "easy",
    completedBy: 9156
  },
  {
    id: 6,
    category: "Future Space",
    title: "Mars Colonization",
    description: "What do you know about humanity's plans to become a multi-planetary species?",
    questions: 15,
    duration: "10 min",
    difficulty: "medium",
    completedBy: 7423
  }
];

export const globeData = {
  activeSatellites: 2847,
  orbitalDebris: 34000,
  groundStations: 156,
  dataTransferred: "4.7 PB/day"
};

// Add this to src/data/mockData.js

export const quizData = {
  "Solar System": [
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
      fact: "Mars appears red due to iron oxide (rust) on its surface."
    },
    {
      question: "What is the largest moon in the Solar System?",
      options: ["Titan", "Ganymede", "Europa", "Luna"],
      answer: "Ganymede",
      fact: "Ganymede, a moon of Jupiter, is even larger than the planet Mercury."
    },
    {
      question: "Which planet has the most extensive ring system?",
      options: ["Uranus", "Neptune", "Saturn", "Jupiter"],
      answer: "Saturn",
      fact: "Saturn's rings are made mostly of ice particles with some rocky debris."
    }
  ],
  "Space Exploration": [
    {
      question: "What was the first artificial satellite sent into space?",
      options: ["Apollo 11", "Sputnik 1", "Voyager 1", "Hubble"],
      answer: "Sputnik 1",
      fact: "Launched by the Soviet Union in 1957, it triggered the Space Race."
    },
    {
      question: "Who was the first human to travel into space?",
      options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
      answer: "Yuri Gagarin",
      fact: "Yuri Gagarin orbited the Earth aboard Vostok 1 in 1961."
    }
  ],
  // Fallback for others
  "default": [
    {
      question: "What is the closest star to Earth?",
      options: ["Proxima Centauri", "Betelgeuse", "The Sun", "Sirius"],
      answer: "The Sun",
      fact: "Light from the Sun takes about 8 minutes to reach Earth."
    }
  ]
};

// Add to src/data/mockData.js

export const globeMarkers = [
  {
    id: 1,
    lat: 25.997,
    lng: -97.157,
    label: "Starship Launch",
    description: "Boca Chica, TX",
    color: "#f97316", // Orange
    size: 1.5
  },
  {
    id: 2,
    lat: 28.572,
    lng: -80.648,
    label: "ISS Crew Dragon",
    description: "Kennedy Space Center, FL",
    color: "#06b6d4", // Cyan
    size: 1.5
  },
  {
    id: 3,
    lat: 5.142,
    lng: -52.645,
    label: "Ariane 6 Prep",
    description: "Kourou, French Guiana",
    color: "#22c55e", // Green
    size: 1.2
  },
  {
    id: 4,
    lat: 34.632,
    lng: -120.610,
    label: "Vandenberg Ops",
    description: "California, USA",
    color: "#8b5cf6", // Purple
    size: 1.2
  },
  {
    id: 5,
    lat: 35.69,
    lng: 139.69,
    label: "JAXA HQ",
    description: "Tokyo, Japan",
    color: "#ef4444", // Red
    size: 1.0
  }
];

// Add to src/data/mockData.js

export const satelliteData = [
  {
    id: "ISS",
    lat: 15.5,
    lng: 45.2,
    label: "ISS (Zarya)",
    altitude: 0.4, // Higher orbit
    color: "#22c55e", // Green
    status: "Operational",
    type: "Space Station"
  },
  {
    id: "HUBBLE",
    lat: -25.3,
    lng: -60.4,
    label: "Hubble Telescope",
    altitude: 0.6, // Even higher
    color: "#06b6d4", // Cyan
    status: "Transmitting",
    type: "Telescope"
  },
  {
    id: "STARLINK-1",
    lat: 48.8,
    lng: 2.3,
    label: "Starlink-3241",
    altitude: 0.2, // Low orbit
    color: "#f97316", // Orange
    status: "Active",
    type: "Comm. Sat"
  },
  {
    id: "NOAA-19",
    lat: 60.1,
    lng: 100.5,
    label: "NOAA-19 (Weather)",
    altitude: 0.3,
    color: "#8b5cf6", // Purple
    status: "Scanning",
    type: "Weather Sat"
  }
];