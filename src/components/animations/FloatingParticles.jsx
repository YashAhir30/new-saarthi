import React, { useMemo } from 'react';

/* Lightweight CSS-only particle system.
   Renders small floating dots with randomized positions and animation delays.
   GPU-accelerated via transform + will-change. */

const FloatingParticles = ({ 
  count = 20, 
  color = 'rgba(8, 145, 178, 0.5)', 
  maxOpacity = 0.12,
  areaWidth = '100%',
  areaHeight = '100%',
  className = '' 
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      top: `${Math.random() * 95}%`,
      size: 2 + Math.random() * 4,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      driftX: (Math.random() - 0.5) * 120,
      driftY: (Math.random() - 0.5) * 120,
      opacity: (0.3 + Math.random() * 0.7) * maxOpacity,
    }));
  }, [count, maxOpacity]);

  return (
    <div 
      className={`medical-bg-layer ${className}`}
      style={{ width: areaWidth, height: areaHeight }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: p.opacity,
            animation: `particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            '--drift-x': `${p.driftX}px`,
            '--drift-y': `${p.driftY}px`,
            willChange: 'transform, opacity',
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
