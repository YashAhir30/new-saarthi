import React from 'react';

/* SVG ECG heartbeat pulse line.
   Animated via stroke-dasharray/dashoffset CSS animation.
   Pure SVG — no JS animation loop needed. */

const ECGPulse = ({ 
  width = '100%', 
  height = 60, 
  color = 'rgba(255, 255, 255, 0.15)', 
  strokeWidth = 1.5,
  duration = 4,
  className = '' 
}) => {
  // Realistic ECG PQRST waveform pattern repeated
  const ecgPath = `
    M0,30 L40,30 L45,30 L50,28 L55,30 L60,30 
    L65,30 L68,30 L70,10 L72,50 L74,25 L76,30 
    L80,30 L85,32 L90,28 L95,30 L100,30 
    L140,30 L145,30 L150,28 L155,30 L160,30 
    L165,30 L168,30 L170,10 L172,50 L174,25 L176,30 
    L180,30 L185,32 L190,28 L195,30 L200,30 
    L240,30 L245,30 L250,28 L255,30 L260,30 
    L265,30 L268,30 L270,10 L272,50 L274,25 L276,30 
    L280,30 L285,32 L290,28 L295,30 L300,30
    L340,30 L345,30 L350,28 L355,30 L360,30 
    L365,30 L368,30 L370,10 L372,50 L374,25 L376,30 
    L380,30 L385,32 L390,28 L395,30 L400,30
    L440,30 L445,30 L450,28 L455,30 L460,30 
    L465,30 L468,30 L470,10 L472,50 L474,25 L476,30 
    L480,30 L485,32 L490,28 L495,30 L500,30
  `;

  return (
    <div 
      className={`medical-bg-layer ${className}`}
      style={{ width, height, display: 'flex', alignItems: 'center' }}
      aria-hidden="true"
    >
      <svg 
        width="100%" 
        height={height} 
        viewBox="0 0 500 60" 
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        {/* Glow layer */}
        <path
          d={ecgPath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 3}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: 'blur(4px)',
            strokeDasharray: 1000,
            strokeDashoffset: 0,
            animation: `ecg-dash ${duration}s linear infinite`,
          }}
        />
        {/* Main line */}
        <path
          d={ecgPath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 0,
            animation: `ecg-dash ${duration}s linear infinite`,
          }}
        />
      </svg>
    </div>
  );
};

export default ECGPulse;
