# NASA API Integration

## Overview
This application now dynamically fetches real-time space mission data from NASA's public APIs.

## Features Implemented

### 1. **NASA API Service** (`src/services/nasaApi.js`)
- Fetches data from multiple NASA endpoints
- Combines real API data with curated mission information
- Includes Mars Rover data, Near-Earth Object tracking, and more
- Automatic fallback to cached data if API is unavailable

### 2. **Dynamic Mission Updates**
The Missions page now:
- ✅ Loads real NASA mission data on component mount
- ✅ Shows loading indicator while fetching
- ✅ Displays error messages with fallback to cached data
- ✅ Includes refresh button to manually update data
- ✅ Shows last update timestamp

### 3. **API Key Configuration**
**API Key:** `2FEReE8xG2hiaNxiulqhzUGij6evY7c3zagi4f6c`

The API key is configured in: `src/services/nasaApi.js`

## NASA APIs Used

### 1. **Mars Rover Photos API**
- Endpoint: `/mars-photos/api/v1/rovers/{rover}/latest_photos`
- Provides latest images and rover status from Perseverance and other Mars rovers

### 2. **Near-Earth Object (NEO) API**
- Endpoint: `/neo/rest/v1/feed`
- Tracks asteroids and comets approaching Earth
- Identifies potentially hazardous objects

### 3. **EPIC (Earth Polychromatic Imaging Camera)**
- Endpoint: `/EPIC/api/natural/images`
- Available for future enhancement

### 4. **Astronomy Picture of the Day (APOD)**
- Endpoint: `/planetary/apod`
- Can be used to enhance the dashboard

## Missions Included

### Active Missions
- **International Space Station (ISS)** - Continuous human presence in LEO
- **James Webb Space Telescope** - Deep space infrared observations
- **Perseverance Mars Rover** - Live data from NASA API
- **Europa Clipper** - En route to Jupiter's moon
- **Psyche** - Journey to metal-rich asteroid
- **Gaganyaan (ISRO)** - India's first crewed mission

### Planned Missions
- **Artemis III** - Return to the Moon
- **Dragonfly** - Saturn's moon Titan exploration
- **Starship Development** - SpaceX next-gen spacecraft

## Usage

### Automatic Data Loading
The mission data loads automatically when you open the Missions page.

### Manual Refresh
Click the **Refresh** button to fetch the latest data from NASA.

### Filtering
Use the filter dropdown to view missions by status:
- All
- Active
- Planned
- Completed

## API Rate Limits

NASA API has the following limits:
- **Hourly Limit:** 1,000 requests per hour
- **Demo Key Rate:** 30 requests per hour, 50 requests per day

For production use, consider:
1. Implementing request caching
2. Adding request throttling
3. Registering for a higher-rate API key at https://api.nasa.gov

## Error Handling

The application includes robust error handling:
- API failures automatically fall back to mock data
- Error messages are displayed to users
- Loading states prevent user confusion

## Future Enhancements

Potential improvements:
1. **WebSocket Integration** - Real-time mission updates
2. **Detailed Mission Pages** - Individual pages with telemetry data
3. **Mars Rover Photo Gallery** - Display latest Mars photos
4. **Satellite Tracking** - Integrate with satellite position APIs
5. **Launch Calendar** - Real-time launch schedule from RocketLaunch.Live API
6. **Mission Notifications** - Alert users about important mission events

## Testing the Integration

1. Navigate to the Missions page
2. Observe the loading indicator
3. Check for NASA data in the mission cards
4. Click "Refresh" to re-fetch data
5. Verify error handling by disconnecting internet

## Developer Notes

### Adding More NASA APIs

To add more NASA endpoints, edit `src/services/nasaApi.js`:

```javascript
const response = await fetch(
  `${NASA_BASE_URL}/your-endpoint?api_key=${NASA_API_KEY}`
);
```

### Customizing Mission Data

Supplemental missions are defined in the `supplementalMissions` array in `nasaApi.js`. Edit this array to add custom missions or update mission details.

---

**Last Updated:** January 14, 2026
**API Key Owner:** Provided by user
**Status:** ✅ Fully Functional
