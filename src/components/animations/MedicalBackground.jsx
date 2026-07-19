import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  DNAHelix, HeartIcon, BrainIcon, LungsIcon, KidneyIcon,
  MedicalCross, CapsuleIcon, MoleculeIcon, StethoscopeIcon, HexGrid
} from './MedicalIcons';

/* ─── Luxury Medical Background ──────────────────────────────────────────────
   6 layers, all pointer-events:none, GPU-accelerated.
   Mouse parallax uses direct DOM manipulation (zero React re-renders).

   Layer 1 — Aurora Gradient Mesh     (auroraRef,  depth ×0.25)
   Layer 2 — Huge Glowing Circles     (circlesRef, depth ×0.45)
   Layer 3 — Medical Grid             (gridRef,    depth ×0.15)
   Layer 4 — Floating Glass Icons     (iconsRef,   depth ×0.70)
   ─────────────────────────────────────────────────────────────────────────── */

/* Strategic icon placement — not random, each position chosen for balance */
const ICONS_CONFIG = [
  { C: DNAHelix,       size: 40, top: '9%',  left: '2.5%',  anim: 'icon-luxury-float',     dur: '22s', delay: '0s',  spin: 'slow-spin',         spinDur: '50s' },
  { C: HeartIcon,      size: 36, top: '22%', right: '2.5%', anim: 'icon-luxury-float-alt',  dur: '19s', delay: '3s',  spin: 'slow-spin-reverse', spinDur: '55s' },
  { C: BrainIcon,      size: 42, top: '55%', left: '2%',    anim: 'icon-luxury-float',     dur: '25s', delay: '7s',  spin: 'slow-spin',         spinDur: '60s' },
  { C: LungsIcon,      size: 38, top: '62%', right: '3%',   anim: 'icon-luxury-float-alt',  dur: '21s', delay: '2s',  spin: 'slow-spin-reverse', spinDur: '48s' },
  { C: MedicalCross,   size: 30, top: '38%', left: '4%',    anim: 'icon-luxury-float',     dur: '28s', delay: '10s', spin: 'slow-spin',         spinDur: '70s' },
  { C: CapsuleIcon,    size: 28, bottom:'18%', right:'5%',  anim: 'icon-luxury-float-alt',  dur: '17s', delay: '5s',  spin: 'slow-spin-reverse', spinDur: '45s' },
  { C: MoleculeIcon,   size: 38, top: '7%',  right: '22%',  anim: 'icon-luxury-float',     dur: '23s', delay: '4s',  spin: 'slow-spin',         spinDur: '52s' },
  { C: KidneyIcon,     size: 34, bottom:'12%', left:'18%',  anim: 'icon-luxury-float-alt',  dur: '20s', delay: '8s',  spin: 'slow-spin-reverse', spinDur: '58s' },
  { C: StethoscopeIcon,size: 40, top: '80%', left: '48%',   anim: 'icon-luxury-float',     dur: '26s', delay: '6s',  spin: 'slow-spin',         spinDur: '65s' },
];

const MedicalBackground = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  /* Refs for direct DOM parallax — no React re-renders in the animation loop */
  const auroraRef  = useRef(null);
  const circlesRef = useRef(null);
  const gridRef    = useRef(null);
  const iconsRef   = useRef(null);
  const rafRef     = useRef(null);
  const target     = useRef({ x: 0, y: 0 });
  const current    = useRef({ x: 0, y: 0 });

  /* Viewport resize */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Smooth parallax via lerp + rAF — touches DOM directly, zero React overhead */
  useEffect(() => {
    if (isMobile || shouldReduceMotion) return;

    const onMouse = (e) => {
      target.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 36,
        y: (e.clientY / window.innerHeight - 0.5) * 36,
      };
    };

    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.04;   // lerp factor — higher = snappier
      c.y += (t.y - c.y) * 0.04;

      const { x, y } = c;
      if (auroraRef.current)
        auroraRef.current.style.transform  = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      if (circlesRef.current)
        circlesRef.current.style.transform = `translate(${x * 0.40}px, ${y * 0.40}px)`;
      if (gridRef.current)
        gridRef.current.style.transform    =
          `perspective(900px) rotateX(16deg) translate(${x * 0.12}px, ${y * 0.12}px)`;
      if (iconsRef.current)
        iconsRef.current.style.transform   = `translate(${x * 0.65}px, ${y * 0.65}px)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  /* On mobile: show 3 icons only */
  const icons = isMobile ? ICONS_CONFIG.slice(0, 3) : ICONS_CONFIG;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* ─── Layer 1: Aurora Gradient Mesh ──────────────────────────────── */}
      <div ref={auroraRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
        {/* Top-left — deep blue */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-8%',
          width: isMobile ? 320 : 600, height: isMobile ? 320 : 600,
          borderRadius: '50%',
          background: 'var(--mesh-color-1, radial-gradient(circle, rgba(37,99,235,0.10) 0%, rgba(37,99,235,0.04) 50%, transparent 70%))',
          filter: 'blur(70px)',
          animation: 'aurora-1 32s ease-in-out infinite',
          willChange: 'transform',
        }}/>
        {/* Top-right — cyan */}
        <div style={{
          position: 'absolute', top: '-5%', right: '-10%',
          width: isMobile ? 280 : 520, height: isMobile ? 280 : 520,
          borderRadius: '50%',
          background: 'var(--mesh-color-2, radial-gradient(circle, rgba(8,145,178,0.09) 0%, rgba(8,145,178,0.03) 50%, transparent 70%))',
          filter: 'blur(80px)',
          animation: 'aurora-2 40s ease-in-out infinite',
          willChange: 'transform',
        }}/>
        {/* Bottom-center — pale blue / white */}
        <div style={{
          position: 'absolute', bottom: '-8%', left: '30%',
          width: isMobile ? 260 : 480, height: isMobile ? 260 : 480,
          borderRadius: '50%',
          background: 'var(--mesh-color-3, radial-gradient(circle, rgba(147,197,253,0.08) 0%, rgba(186,230,253,0.04) 50%, transparent 70%))',
          filter: 'blur(90px)',
          animation: 'aurora-3 36s ease-in-out infinite',
          willChange: 'transform',
        }}/>
        {/* Middle — very soft white glow */}
        {!isMobile && (
          <div style={{
            position: 'absolute', top: '35%', left: '40%',
            width: 400, height: 400,
            borderRadius: '50%',
            background: 'var(--mesh-color-4, radial-gradient(circle, rgba(224,242,254,0.06) 0%, transparent 65%))',
            filter: 'blur(100px)',
            animation: 'aurora-4 45s ease-in-out infinite',
            willChange: 'transform',
          }}/>
        )}
      </div>

      {/* ─── Layer 2: Huge Glowing Blurred Circles ──────────────────────── */}
      <div ref={circlesRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
        <div style={{
          position: 'absolute', top: '15%', left: '5%',
          width: isMobile ? 240 : 520, height: isMobile ? 240 : 520,
          borderRadius: '50%',
          background: 'var(--mesh-color-2, rgba(8,145,178,0.065))',
          filter: 'blur(100px)',
          animation: 'circle-breathe 12s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}/>
        <div style={{
          position: 'absolute', bottom: '10%', right: '8%',
          width: isMobile ? 200 : 460, height: isMobile ? 200 : 460,
          borderRadius: '50%',
          background: 'var(--mesh-color-1, rgba(37,99,235,0.055))',
          filter: 'blur(110px)',
          animation: 'circle-breathe-offset 15s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}/>
        {!isMobile && (
          <div style={{
            position: 'absolute', top: '50%', left: '42%',
            width: 380, height: 380,
            borderRadius: '50%',
            background: 'var(--mesh-color-3, rgba(14,165,233,0.045))',
            filter: 'blur(120px)',
            animation: 'circle-breathe 18s ease-in-out 3s infinite',
            willChange: 'transform, opacity',
          }}/>
        )}
      </div>

      {/* ─── Layer 3: Medical Grid ───────────────────────────────────────── */}
      {!isMobile && (
        <div
          ref={gridRef}
          style={{
            position: 'absolute', inset: '-30%',
            transformOrigin: '50% 0%',
            transform: 'perspective(900px) rotateX(16deg)',
            /* Mask: transparent at top/bottom edges, visible in middle */
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.9) 55%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.9) 55%, transparent 100%)',
            animation: 'grid-breathe 10s ease-in-out infinite',
            willChange: 'transform, opacity',
            zIndex: 0,
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="med-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                {/* Grid lines */}
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="var(--mesh-color-3, rgba(8,145,178,0.7))" strokeWidth="0.5"/>
                {/* Corner dot */}
                <circle cx="0" cy="0" r="1.5" fill="var(--mesh-color-3, rgba(8,145,178,0.5))"/>
                {/* Subtle medical cross at every other intersection */}
                <line x1="28" y1="22" x2="28" y2="34" stroke="var(--mesh-color-3, rgba(8,145,178,0.30))" strokeWidth="0.6"/>
                <line x1="22" y1="28" x2="34" y2="28" stroke="var(--mesh-color-3, rgba(8,145,178,0.30))" strokeWidth="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#med-grid)"/>
          </svg>
        </div>
      )}

      {/* ─── Layer 4: Floating Glass Medical Icons ───────────────────────── */}
      <div ref={iconsRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
        {icons.map(({ C, size, anim, dur, delay, spin, spinDur, ...pos }, i) => (
          <div
            key={i}
            className="glass-icon"
            style={{
              position: 'absolute',
              ...pos,
              color: 'var(--icon-color, rgba(8,145,178,0.75))',
              opacity: 0.85,
              /* Float animation wraps a rotation inner div */
              animation: `${anim} ${dur} ease-in-out ${delay} infinite`,
              willChange: 'transform',
            }}
          >
            {/* Inner wrapper rotates independently — creates 3D depth feel */}
            <div style={{
              animation: `${spin} ${spinDur} linear infinite`,
              willChange: 'transform',
            }}>
              <C size={size} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalBackground;
