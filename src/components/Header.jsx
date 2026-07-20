import React, { useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Star, ShieldCheck, HeartPulse, Sparkles, Phone } from 'lucide-react'

/* ── Animated Ring ── */
const Ring = ({ size, delay, color = 'rgba(0,102,255,0.22)', dashed = false }) => (
  <div style={{
    position: 'absolute', top: '50%', left: '50%',
    width: size, height: size,
    marginTop: -size / 2, marginLeft: -size / 2,
    borderRadius: '50%',
    border: `1.5px ${dashed ? 'dashed' : 'solid'} ${color}`,
    animation: `ring-expand-fade ${5 + size / 70}s ease-out ${delay} infinite`,
    willChange: 'transform, opacity',
  }} />
)

/* ── Stat Card in hero ── */
const StatCard = ({ number, label, delay }) => (
  <div className="stat-card" style={{ animation: `fade-up 0.7s ease ${delay}s both` }}>
    <div style={{
      fontFamily: 'var(--font-display)',
      fontSize: '28px', fontWeight: 700, lineHeight: 1,
      background: 'var(--grad-primary)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    }}>{number}</div>
    <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', marginTop: '6px' }}>{label}</div>
  </div>
)

const Header = () => {
  const navigate = useNavigate()
  const imageWrapRef = useRef(null)
  const heroRef = useRef(null)
  const rafRef = useRef(null)
  const targetTilt = useRef({ x: 0, y: 0 })
  const currentTilt = useRef({ x: 0, y: 0 })
  const glowRef = useRef(null)

  /* 3D Tilt — rAF loop, zero re-renders */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      targetTilt.current = {
        x: ((e.clientY - r.top) / r.height - 0.5) * -16,
        y: ((e.clientX - r.left) / r.width - 0.5) * 16,
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX - r.left}px`
        glowRef.current.style.top = `${e.clientY - r.top}px`
        glowRef.current.style.opacity = '1'
      }
    }
    const onLeave = () => {
      targetTilt.current = { x: 0, y: 0 }
      if (glowRef.current) glowRef.current.style.opacity = '0'
    }
    const tick = () => {
      const c = currentTilt.current, t = targetTilt.current
      c.x += (t.x - c.x) * 0.07
      c.y += (t.y - c.y) * 0.07
      if (imageWrapRef.current)
        imageWrapRef.current.style.transform =
          `perspective(1200px) rotateX(${c.x.toFixed(2)}deg) rotateY(${c.y.toFixed(2)}deg) scale(1.02)`
      rafRef.current = requestAnimationFrame(tick)
    }
    hero.addEventListener('mousemove', onMove, { passive: true })
    hero.addEventListener('mouseleave', onLeave, { passive: true })
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: '0 0 40px 40px',
        margin: '0',
        background: 'var(--grad-hero)',
        backgroundSize: '300% 300%',
        animation: 'gradient-shift 15s ease infinite',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Cursor glow */}
      <div ref={glowRef} aria-hidden style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'var(--mesh-color-3, radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%))',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 0,
        opacity: 0, transition: 'opacity 0.5s ease', filter: 'blur(30px)',
      }} />

      {/* Background layers */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-25%', right: '-10%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'var(--mesh-color-1, radial-gradient(circle, rgba(0,102,255,0.16) 0%, transparent 65%))',
          filter: 'blur(80px)', animation: 'aurora-1 30s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', left: '-8%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'var(--mesh-color-2, radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 65%))',
          filter: 'blur(70px)', animation: 'aurora-3 38s ease-in-out 5s infinite',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '35%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'var(--mesh-color-3, radial-gradient(circle, rgba(0,180,255,0.07) 0%, transparent 65%))',
          filter: 'blur(60px)', animation: 'aurora-2 25s ease-in-out 10s infinite',
        }} />
        {/* Top rim light */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.5) 40%, rgba(0,212,255,0.7) 60%, transparent)',
        }} />
        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)',
          animation: 'scan-line 8s linear infinite',
        }} />
      </div>

      {/* Main row */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        padding: 'clamp(100px,12vw,160px) clamp(20px,5vw,72px) clamp(60px,8vw,100px)',
        gap: '48px', flex: 1,
      }}>

        {/* LEFT */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

         

          {/* Heading */}
          <div style={{ animation: 'fade-up 0.7s ease 0.2s both' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 78px)',
              fontWeight: 700,
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              color: 'var(--text-main)',
              margin: 0,
            }}>
              Trusted<br />
              Healing,{' '}
              <span style={{
                background: 'var(--grad-primary, linear-gradient(135deg, #00D4FF 0%, #0066FF 100%))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Modern
              </span>
              <br />Approach
            </h1>
          </div>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)', lineHeight: 1.75,
            color: 'var(--text-muted)', maxWidth: '460px', margin: 0,
            animation: 'fade-up 0.7s ease 0.3s both',
          }}>
            Personalised homoeopathic care with Dr. Yogin Baldaniya.
            Safe, science-backed treatment — tailored to your unique needs.
          </p>

          {/* CTA Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', animation: 'fade-up 0.7s ease 0.4s both' }}>
            <button onClick={() => navigate('/contact')} className="btn-primary" style={{ fontSize: '15px' }}>
              Book Consultation <ArrowRight size={16} />
            </button>
            <a href="tel:8733905727" className="btn-outline">
              <Phone size={16} /> Call Us
            </a>
          </div>

          {/* Trust Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', animation: 'fade-up 0.7s ease 0.5s both' }}>
            <div className="trust-badge"><ShieldCheck size={13} /> Verified Doctor</div>
            <div className="trust-badge"><Star size={13} /> 1000+ Patients</div>
            <div className="trust-badge"><HeartPulse size={13} /> 98% Success Rate</div>
          </div>

          {/* Stat Cards */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <StatCard number="5+" label="Years of Experience" delay={0.6} />
            <StatCard number="1K+" label="Happy Patients" delay={0.7} />
            <StatCard number="98%" label="Success Rate" delay={0.8} />
          </div>
        </div>

        {/* RIGHT — Doctor image */}
        <div style={{
          flex: '1 1 320px', position: 'relative',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          minHeight: '460px',
        }}>
          {/* Rings & aura */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute', inset: '-10%',
              background: 'var(--mesh-color-2, radial-gradient(ellipse at center, rgba(0,102,255,0.18) 0%, rgba(0,212,255,0.06) 45%, transparent 68%))',
              animation: 'halo-breathe 7s ease-in-out infinite',
            }} />
            <Ring size={280} delay="0s" color="var(--glass-border-hi, rgba(0,102,255,0.22))" />
            <Ring size={380} delay="1.6s" color="var(--glass-border-hi, rgba(0,102,255,0.16))" />
            <Ring size={480} delay="3.2s" color="var(--glass-border-hi, rgba(0,212,255,0.10))" dashed />
            <Ring size={580} delay="4.8s" color="var(--glass-border-hi, rgba(0,102,255,0.07))" />
            {/* Light rays */}
            <div style={{
              position: 'absolute', inset: '-20%',
              background: `var(--grad-rays, conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,102,255,0.06) 20deg, transparent 40deg, rgba(0,212,255,0.04) 80deg, transparent 100deg, rgba(0,102,255,0.05) 140deg, transparent 160deg, rgba(0,102,255,0.04) 200deg, transparent 220deg, rgba(0,212,255,0.05) 260deg, transparent 280deg, rgba(0,102,255,0.04) 320deg, transparent 340deg, rgba(0,102,255,0.05) 360deg))`,
              animation: 'ray-rotate 40s linear infinite',
            }} />
          </div>

          {/* 3D tilt image */}
          <div
            ref={imageWrapRef}
            style={{
              position: 'relative', zIndex: 1,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              animation: 'float-gentle 8s ease-in-out infinite',
            }}
          >

            <img
              src={assets.header_img}
              alt="Dr. Yogin Baldaniya"
              fetchpriority="high"
              loading="eager"
              decoding="async"
              width="600"
              height="800"
              style={{
                position: 'relative', zIndex: 1,
                maxHeight: '500px', width: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 25px 40px rgba(0,120,255,0.18))',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,.95) 88%, rgba(0,0,0,.65) 94%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,.95) 88%, rgba(0,0,0,.65) 94%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
        background: 'linear-gradient(to bottom, transparent, var(--navy))',
        pointerEvents: 'none', zIndex: 2,
      }} />
    </section>
  )
}

export default Header
