import React from 'react';
import { missionsList } from '../data/mockData';

const Missions = () => {
  return (
    <div className="timeline-container">
      <h2 style={{marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '10px'}}>
        Mission Timeline
      </h2>
      
      {missionsList.map(mission => (
        <div key={mission.id} className="mission-card">
          <div className="mission-header">
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span className="agency-tag">{mission.agency}</span>
              <h3 style={{margin: 0, fontSize: '1.2rem'}}>{mission.name}</h3>
            </div>
            <span style={{
              color: mission.color, 
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {mission.status}
            </span>
          </div>
          <div style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px'}}>
            {mission.date}
          </div>
          <p style={{margin: 0, lineHeight: '1.5', color: '#cbd5e1'}}>
            {mission.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Missions;