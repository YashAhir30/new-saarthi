import React from 'react';

/* ─── Medical SVG Icon Library ───────────────────────────────────────────────
   All icons are lightweight inline SVG.
   Designed for opacity 8-14% on white backgrounds.
   ─────────────────────────────────────────────────────────────────────────── */

export const DNAHelix = ({ size = 40, className = '' }) => (
  <svg width={size} height={size * 2.2} viewBox="0 0 40 88" fill="none" className={className}>
    {/* Strand A */}
    <path d="M10 4 C10 4, 30 16, 30 22 S10 36, 10 44 S30 56, 30 62 S10 76, 10 84"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.65"/>
    {/* Strand B */}
    <path d="M30 4 C30 4, 10 16, 10 22 S30 36, 30 44 S10 56, 10 62 S30 76, 30 84"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.65"/>
    {/* Base pairs / rungs */}
    {[11,22,33,44,55,66,77].map((y,i) => (
      <line key={i} x1="13" y1={y} x2="27" y2={y}
            stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
    ))}
    {/* Nodes */}
    {[4,22,44,66,84].map((y,i) => (
      <circle key={i} cx="10" cy={y} r="2" fill="currentColor" opacity="0.4"/>
    ))}
    {[4,22,44,66,84].map((y,i) => (
      <circle key={`b${i}`} cx="30" cy={y} r="2" fill="currentColor" opacity="0.4"/>
    ))}
  </svg>
);

/* Large DNA helix for doctor section background */
export const DNAHelixLarge = ({ size = 200, color = 'rgba(8,145,178,0.12)', className = '' }) => {
  const h = size * 2.5;
  const cx = size / 2;
  const amp = cx * 0.7; // amplitude
  const steps = 16;
  const segH = h / steps;

  // Generate path points for two strands
  const strandA = Array.from({ length: steps + 1 }, (_, i) => ({
    x: cx + amp * Math.sin((i / steps) * Math.PI * 4),
    y: i * segH,
  }));
  const strandB = Array.from({ length: steps + 1 }, (_, i) => ({
    x: cx + amp * Math.sin((i / steps) * Math.PI * 4 + Math.PI),
    y: i * segH,
  }));

  const toPath = (pts) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <svg width={size} height={h} viewBox={`0 0 ${size} ${h}`} fill="none" className={className}>
      <path d={toPath(strandA)} stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <path d={toPath(strandB)} stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Rungs every 2 steps */}
      {Array.from({ length: Math.floor(steps / 2) }, (_, i) => {
        const idx = i * 2 + 1;
        if (idx > steps) return null;
        return (
          <line key={i}
            x1={strandA[idx].x.toFixed(1)} y1={strandA[idx].y.toFixed(1)}
            x2={strandB[idx].x.toFixed(1)} y2={strandB[idx].y.toFixed(1)}
            stroke={color} strokeWidth="1.5" opacity="0.5"/>
        );
      })}
    </svg>
  );
};

export const HeartIcon = ({ size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 34 C20 34, 5 24, 5 14 C5 8, 12 5, 20 12 C28 5, 35 8, 35 14 C35 24, 20 34, 20 34Z"
          stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.08" opacity="0.55"/>
    {/* ECG line inside */}
    <path d="M11 18 L14 18 L16 13 L18 23 L20 18 L23 18 L25 15 L27 18 L29 18"
          stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

export const BrainIcon = ({ size = 44, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" className={className}>
    <path d="M22 38 L22 22" stroke="currentColor" strokeWidth="1.2" opacity="0.3"/>
    <path d="M14 14 C9 14, 7 18, 9 22 C6 25, 7 31, 11 31 C11 35, 17 37, 20 33"
          stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.55"/>
    <path d="M30 14 C35 14, 37 18, 35 22 C38 25, 37 31, 33 31 C33 35, 27 37, 24 33"
          stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.55"/>
    <path d="M16 8 C16 5, 22 4, 22 8 C22 4, 28 5, 28 8"
          stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.4"/>
    <circle cx="17" cy="20" r="2" fill="currentColor" opacity="0.3"/>
    <circle cx="27" cy="20" r="2" fill="currentColor" opacity="0.3"/>
    <line x1="17" y1="22" x2="27" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
  </svg>
);

export const LungsIcon = ({ size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 7 L20 28" stroke="currentColor" strokeWidth="1.6" opacity="0.45"/>
    <path d="M18 13 L11 18 C7 20, 5 27, 7 31 C9 35, 16 35, 18 31 L18 22"
          stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.06" opacity="0.55"/>
    <path d="M22 13 L29 18 C33 20, 35 27, 33 31 C31 35, 24 35, 22 31 L22 22"
          stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.06" opacity="0.55"/>
    {/* Airway detail */}
    <path d="M17 23 C15 25, 13 27, 12 29" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
    <path d="M23 23 C25 25, 27 27, 28 29" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
  </svg>
);

export const KidneyIcon = ({ size = 38, className = '' }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 38 42" fill="none" className={className}>
    <path d="M22 6 C30 6, 35 12, 33 21 C31 30, 24 34, 20 34 C17 34, 15 30, 16 26 C17 22, 15 18, 13 18 C11 18, 9 22, 11 28 C13 34, 9 36, 7 32 C5 28, 7 12, 22 6Z"
          stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.07" opacity="0.55"/>
    {/* Inner ureter */}
    <path d="M19 26 C18 22, 19 16, 22 14" stroke="currentColor" strokeWidth="0.9" opacity="0.3"/>
  </svg>
);

export const MedicalCross = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="9" y="2" width="10" height="24" rx="2.5"
          fill="currentColor" fillOpacity="0.10" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    <rect x="2" y="9" width="24" height="10" rx="2.5"
          fill="currentColor" fillOpacity="0.10" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
  </svg>
);

export const CapsuleIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size * 1.7} viewBox="0 0 22 36" fill="none" className={className}>
    <rect x="3" y="4" width="16" height="28" rx="8"
          stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.5"/>
    <line x1="3" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
    <rect x="3" y="4" width="16" height="14" rx="8"
          fill="currentColor" fillOpacity="0.08"/>
    {/* Shine */}
    <path d="M6 8 Q8 6 10 7" stroke="currentColor" strokeWidth="0.8" opacity="0.3" strokeLinecap="round"/>
  </svg>
);

export const MoleculeIcon = ({ size = 42, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 42 42" fill="none" className={className}>
    <circle cx="21" cy="21" r="5" stroke="currentColor" strokeWidth="1.6" opacity="0.55"/>
    <circle cx="9"  cy="9"  r="3.5" stroke="currentColor" strokeWidth="1.2" opacity="0.40"/>
    <circle cx="33" cy="9"  r="3.5" stroke="currentColor" strokeWidth="1.2" opacity="0.40"/>
    <circle cx="9"  cy="34" r="3"   stroke="currentColor" strokeWidth="1"   opacity="0.35"/>
    <circle cx="34" cy="32" r="2.5" stroke="currentColor" strokeWidth="1"   opacity="0.35"/>
    <line x1="17" y1="17" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
    <line x1="25" y1="17" x2="30" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
    <line x1="17" y1="25" x2="11" y2="32" stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
    <line x1="25" y1="25" x2="32" y2="31" stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
  </svg>
);

export const StethoscopeIcon = ({ size = 44, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" className={className}>
    <path d="M12 9 C12 5, 17 5, 17 9 L17 22 C17 29, 27 29, 27 22 L27 9 C27 5, 32 5, 32 9"
          stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.55"/>
    <circle cx="32" cy="25" r="4" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.08" opacity="0.45"/>
    <path d="M32 29 L32 35 C32 39, 24 41, 20 39"
          stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.45"/>
    <circle cx="12" cy="9" r="2" fill="currentColor" opacity="0.35"/>
    <circle cx="32" cy="9" r="2" fill="currentColor" opacity="0.35"/>
  </svg>
);

/* Hexagonal medical grid — for Layer 3 */
export const HexGrid = ({ size = 300, className = '' }) => {
  const cols = 8, rows = 6, rh = 18, rw = 20;
  const hexes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * rw * 1.75 + (r % 2 === 1 ? rw * 0.875 : 0);
      const cy = r * rh * 1.5;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 180) * (60 * i - 30);
        return `${(cx + rw * Math.cos(angle)).toFixed(1)},${(cy + rh * Math.sin(angle)).toFixed(1)}`;
      }).join(' ');
      hexes.push(<polygon key={`${r}-${c}`} points={pts} fill="none"
                          stroke="rgba(8,145,178,0.6)" strokeWidth="0.6" opacity="0.8"/>);
    }
  }
  const svgW = cols * rw * 1.75 + rw;
  const svgH = rows * rh * 1.5 + rh;
  return (
    <svg width={size} height={size * (svgH / svgW)} viewBox={`0 0 ${svgW} ${svgH}`}
         fill="none" className={className}>
      {hexes}
    </svg>
  );
};
