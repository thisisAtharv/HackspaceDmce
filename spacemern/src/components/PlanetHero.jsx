import React from 'react';

const PlanetHero = () => {
  return (
    <>
      <style>{`
        /* --- MAIN CONTAINER --- */
        .globe-section {
          margin-left: 40px;
          background: transparent;
          border: none;
          box-shadow: none;
          width: 100%;
          overflow: visible !important;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          perspective: 1000px;
          z-index: 1; 
        }

        /* --- THE CENTER ANCHOR --- */
        .planet-wrapper {
          position: relative;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          z-index: 10;
        }

        /* --- MARS --- */
        .globe {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, 
            #d4694a 0%, #c25a3c 20%, #a34830 40%, 
            #8b3a26 60%, #6d2c1d 80%, #4a1f15 100%
          );
          position: absolute;
          top: 0; left: 0;
          transform: translate(-50%, -50%);
          z-index: 5;
          box-shadow: 
            inset -30px -30px 60px rgba(0, 0, 0, 0.8),
            inset 10px 10px 30px rgba(255, 150, 100, 0.2);
          animation: floatPlanet 6s ease-in-out infinite;
        }

        /* --- ATMOSPHERE GLOW (FIXED) --- */
        .mars-atmosphere {
          /* FIX: Made container much larger to prevent square cutout */
          width: 400px; 
          height: 400px;
          border-radius: 50%;
          
          /* FIX: Gradient stops earlier (60%) so it fades before edge */
          background: radial-gradient(circle, rgba(200, 80, 40, 0.3) 0%, transparent 60%);
          
          position: absolute;
          top: 0; left: 0;
          transform: translate(-50%, -50%);
          z-index: 1; 
          
          /* Softer shadow that stays within bounds */
          box-shadow: 0 0 50px 20px rgba(180, 60, 20, 0.1); 
          animation: floatPlanet 6s ease-in-out infinite;
        }

        /* --- RINGS --- */
        .orbit-ring {
          position: absolute;
          top: 0; left: 0;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          transform-style: preserve-3d;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.02);
        }

        .orbit-ring.ring-1 {
          width: 450px; height: 450px;
          animation: spin-orbit-1 25s linear infinite;
        }

        .orbit-ring.ring-2 {
          width: 700px; height: 700px;
          animation: spin-orbit-2 35s linear infinite;
        }

        /* --- ORBITER CONTAINER --- */
        .orbiter {
          position: absolute;
          top: 50%; left: 50%;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* --- MOONS --- */
        .moon {
          position: absolute;
          border-radius: 50%;
          background: #e5e7eb;
          box-shadow: inset -2px -2px 4px rgba(0,0,0,0.8);
        }
        
        .moon.phobos { width: 14px; height: 14px; transform: translate(220px, 0); }
        .moon.deimos { width: 10px; height: 10px; transform: translate(-345px, 0); }

        /* --- MOON LABELS (FIXED) --- */
        .moon-label {
          position: absolute;
          color: rgba(255, 255, 255, 0.7);
          font-size: 11px;
          font-family: 'Inter', sans-serif; /* Cleaner font */
          letter-spacing: 1px;
          white-space: nowrap;
          text-transform: uppercase;
          font-weight: 600;
          text-shadow: 0 2px 4px black;
        }

        /* FIX: Added rotateX(-75deg) to counter the ring's tilt.
           This makes the text stand up straight facing the screen.
        */
        .phobos-label { transform: translate(220px, -20px) rotateX(-75deg); }
        .deimos-label { transform: translate(-345px, -20px) rotateX(-75deg); }

        /* --- PARTICLES --- */
        .particle {
          position: absolute;
          width: 5px; height: 5px;
          background: #06b6d4;
          border-radius: 50%;
          box-shadow: 0 0 10px #06b6d4;
        }
        .p1 { transform: translate(160px, 160px); }
        .p2 { transform: translate(-240px, 240px); }

        /* --- ANIMATIONS --- */
        @keyframes floatPlanet {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-15px); }
        }

        @keyframes spin-orbit-1 {
          from { transform: translate(-50%, -50%) rotateX(75deg) rotateY(15deg) rotateZ(0deg); }
          to   { transform: translate(-50%, -50%) rotateX(75deg) rotateY(15deg) rotateZ(360deg); }
        }

        @keyframes spin-orbit-2 {
          from { transform: translate(-50%, -50%) rotateX(75deg) rotateY(-15deg) rotateZ(360deg); }
          to   { transform: translate(-50%, -50%) rotateX(75deg) rotateY(-15deg) rotateZ(0deg); }
        }
      `}</style>

      <div className="globe-section">
        <div className="planet-wrapper">
          
          {/* Layer 1: Glow */}
          <div className="mars-atmosphere"></div>
          
          {/* Layer 2: Rings */}
          <div className="orbit-ring ring-1">
            <div className="orbiter">
              <div className="moon phobos"></div>
              {/* Label inside Orbiter, if you want to display moon names then you can uncomment these 2 divs easily*/}
              {/* <div className="moon-label phobos-label">Phobos</div> */}
            </div>
            <div className="orbiter"><div className="particle p1"></div></div>
          </div>

          <div className="orbit-ring ring-2">
            <div className="orbiter">
              <div className="moon deimos"></div>
              {/* <div className="moon-label deimos-label">Deimos</div> */}
            </div>
            <div className="orbiter"><div className="particle p2"></div></div>
          </div>

          {/* Layer 3: Planet */}
          <div className="globe"></div>
          
        </div>
      </div>
    </>
  );
};

export default PlanetHero;