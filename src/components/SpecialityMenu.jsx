import React, { useRef, useEffect } from 'react'
import { specialityData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, ArrowRight } from 'lucide-react'
import ScrollReveal from './animations/ScrollReveal'
import { useTheme } from '../context/ThemeContext'

/* Vanilla JS tilt effect — no deps */
const useTilt = () => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    let target = { x: 0, y: 0 }
    let current = { x: 0, y: 0 }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      target = {
        x: ((e.clientY - rect.top) / rect.height - 0.5) * -14,
        y: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
      }
    }
    const onLeave = () => { target = { x: 0, y: 0 } }
    const tick = () => {
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08
      el.style.transform = `perspective(800px) rotateX(${current.x.toFixed(2)}deg) rotateY(${current.y.toFixed(2)}deg) scale(1.02)`
      raf = requestAnimationFrame(tick)
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])
  return ref
}

const TiltCard = ({ item, index }) => {
  const tiltRef = useTilt()
  return (
    <div
      ref={tiltRef}
      className="speciality-card"
      style={{
        padding: '32px 20px', width: '150px', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
        animation: `fade-up 0.6s ease ${0.1 + index * 0.07}s both`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Gradient border glow on hover via CSS */}
      <div style={{
        width: '80px', height: '80px', borderRadius: '24px',
        background: 'var(--grad-icon, linear-gradient(135deg, rgba(0,102,255,0.16), rgba(0,212,255,0.08)))',
        border: '1px solid var(--glass-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'var(--shadow-glow)',
        transition: 'all 0.4s ease',
      }}>
        <img src={item.image} alt={item.speciality} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
      </div>
      <p style={{ 
        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, 
        color: `var(--text-muted, rgba(200,215,255,0.90))`, lineHeight: 1.4, margin: 0,
        height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
      }}>
        {item.speciality}
      </p>
    </div>
  )
}

const SpecialityMenu = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()
  return (
    <section id="speciality" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 400, borderRadius: '50%',
        background: 'var(--mesh-color-1, radial-gradient(ellipse, rgba(0,102,255,0.08) 0%, transparent 65%))',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <ScrollReveal style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-label" style={{ marginBottom: '20px' }}>
            <Stethoscope size={11} /> Specialised Care
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0,
            color: `var(--white, #ffffff)`, marginBottom: '16px',
          }}>
            What We Treat <span style={{
              background: `var(--grad-primary)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Best</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
            Holistic homeopathic care across a wide spectrum of conditions — delivered with precision and compassion.
          </p>
        </ScrollReveal>

        {/* Cards */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {specialityData.map((item, i) => (
            <div key={i} onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>
              <TiltCard item={item} index={i} />
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <ScrollReveal delay={0.4} style={{ textAlign: 'center', marginTop: '48px' }}>
          <button 
            onClick={() => navigate('/contact')} 
            className="btn-outline"
            style={{ color: theme === 'light' ? '#0F172A' : '#ffffff' }}
          >
            Book for Any Condition <ArrowRight size={16} />
          </button>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default SpecialityMenu
