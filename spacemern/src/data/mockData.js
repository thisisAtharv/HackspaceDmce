export const upcomingEvents = [
  {
    id: 1,
    title: "Aurora Borealis (Northern Lights)", // Explicitly mentioned in PS
    time: "Tonight, 22:00 - 04:00",
    lat: 64.9631, lng: -19.0208, // Iceland coordinates
    alt: 0.2, color: "#4ade80", // Green Glow
    visibility: "High (Kp Index 7)",
    type: "aurora"
  },
  {
    id: 2,
    title: "Planetary Alignment (Mars-Venus)", // Explicitly mentioned in PS
    time: "Jan 15, 05:30 AM",
    lat: 19.0760, lng: 72.8777, // Mumbai
    alt: 0.5, color: "#facc15", // Yellow
    visibility: "Visible in East",
    type: "alignment"
  },
  {
    id: 3,
    title: "Sentinel-1 Flood Scan", // Connects to "Disaster Prediction"
    time: "Live Pass",
    lat: 20.5937, lng: 78.9629,
    alt: 0.8, color: "#ef4444", // Red for emergency
    visibility: "Scanning Data...",
    type: "satellite"
  }
];

// Append this to the bottom of src/data/mockData.js

export const missionsList = [
  {
    id: 201,
    name: "Artemis II",
    agency: "NASA",
    date: "Sep 2025",
    status: "Upcoming",
    description: "The first crewed mission to the Moon in over 50 years. It will fly around the Moon and return to Earth.",
    color: "#fbbf24" // Amber
  },
  {
    id: 202,
    name: "Chandrayaan-3",
    agency: "ISRO",
    date: "Aug 23, 2023",
    status: "Success",
    description: "India's historic lunar lander that successfully touched down on the Moon's south pole.",
    color: "#4ade80" // Green
  },
  {
    id: 203,
    name: "James Webb Telescope",
    agency: "NASA/ESA",
    date: "Active",
    status: "Operational",
    description: "The largest optical telescope in space, currently observing the oldest galaxies in the universe.",
    color: "#60a5fa" // Blue
  }
];