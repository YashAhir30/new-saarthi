import React from 'react';

/* Animated concentric rings with orbiting dots and gradient halo.
   Used behind the doctor profile image for a futuristic medical look. */

const MedicalRings = ({ 
  size = 400, 
  color = 'rgba(8, 145, 178, 0.2)',
  className = '' 
}) => {
  const rings = [
    { radius: size * 0.28, duration: 3, delay: 0, strokeWidth: 1.5, opacity: 0.3 },
    { radius: size * 0.36, duration: 4, delay: 0.8, strokeWidth: 1, opacity: 0.2 },
    { radius: size * 0.44, duration: 5, delay: 1.6, strokeWidth: 0.8, opacity: 0.12 },
  ];

  const orbitDots = [
    { radius: size * 0.28, duration: 12, delay: 0, dotSize: 4 },
    { radius: size * 0.36, duration: 18, delay: 2, dotSize: 3 },
    { radius: size * 0.44, duration: 24, delay: 4, dotSize: 2.5 },
    { radius: size * 0.32, duration: 15, delay: 6, dotSize: 3.5 },
  ];

  const floatingDots = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 80,
    y: 50 + (Math.random() - 0.5) * 80,
    size: 2 + Math.random() * 3,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 5,
  }));

  const center = size / 2;

  return (
    <div 
      className={`${className}`} 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* Gradient halo */}
      <div style={{
        position: 'absolute',
        width: size * 0.8,
        height: size * 0.8,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, rgba(8, 145, 178, 0.03) 50%, transparent 70%)`,
        animation: 'glow-pulse 4s ease-in-out infinite',
      }} />

      {/* SVG rings and dots */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute' }}>
        {/* Pulsing concentric rings */}
        {rings.map((ring, i) => (
          <circle
            key={`ring-${i}`}
            cx={center}
            cy={center}
            r={ring.radius}
            fill="none"
            stroke={color}
            strokeWidth={ring.strokeWidth}
            opacity={ring.opacity}
            strokeDasharray="8 4"
            style={{
              animation: `pulse-ring ${ring.duration}s ease-in-out ${ring.delay}s infinite`,
              transformOrigin: `${center}px ${center}px`,
            }}
          />
        ))}

        {/* Orbiting dots */}
        {orbitDots.map((dot, i) => (
          <circle
            key={`orbit-${i}`}
            cx={center}
            cy={center}
            r={dot.dotSize}
            fill={color}
            opacity="0.5"
            style={{
              '--orbit-radius': `${dot.radius}px`,
              animation: `orbit ${dot.duration}s linear ${dot.delay}s infinite`,
              transformOrigin: `${center}px ${center}px`,
            }}
          />
        ))}
      </svg>

      {/* Floating dots */}
      {floatingDots.map((dot) => (
        <div
          key={`float-${dot.id}`}
          style={{
            position: 'absolute',
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 ${dot.size * 3}px ${color}`,
            animation: `float ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default MedicalRings;
