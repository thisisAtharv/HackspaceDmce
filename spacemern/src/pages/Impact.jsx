import React from 'react';
import { earthImpact } from '../data/mockData';

const Impact = () => {
  const impactData = [
    { ...earthImpact.agriculture, key: 'agriculture', colorClass: 'green' },
    { ...earthImpact.disaster, key: 'disaster', colorClass: 'red' },
    { ...earthImpact.pollution, key: 'pollution', colorClass: 'orange' }
  ];

  return (
    <div className="impact-page">
      <div className="page-header">
        <h1 className="page-title">Earth Impact</h1>
        <p className="page-subtitle">How space technology protects and monitors our planet</p>
      </div>

      <div className="grid-3">
        {impactData.map((impact) => (
          <div key={impact.key} className="impact-card">
            <div className="impact-header">
              <div className={`impact-icon ${impact.key}`}>
                {impact.icon}
              </div>
              <div>
                <h3 className="impact-title">{impact.title}</h3>
                <p className="impact-subtitle">{impact.subtitle}</p>
              </div>
            </div>

            <div className="impact-stats">
              {impact.stats.map((stat, index) => (
                <div key={index} className="impact-stat">
                  <div className="impact-stat-value">{stat.value}</div>
                  <div className="impact-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="impact-progress">
              <div className="impact-progress-label">
                <span>{impact.progressLabel}</span>
                <span>{impact.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${impact.colorClass === 'red' ? 'orange' : impact.colorClass}`}
                  style={{ width: `${impact.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="card" style={{ marginTop: '32px' }}>
        <div className="card-header">
          <div className="card-icon blue">📡</div>
          <div className="card-title">Satellite Network Status</div>
        </div>
        <div className="grid-4" style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--space-cyan)' }}>847</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Earth Observation</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--space-green)' }}>99.9%</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Uptime</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--space-purple)' }}>15TB</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Daily Data</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--space-orange)' }}>192</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Countries Served</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
