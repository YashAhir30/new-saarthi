import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Stethoscope, ArrowRight, Thermometer, Wind, Activity, Dna, HeartPulse, 
  Droplets, Bone, Brain, Sparkles, Heart, Baby, Smile, ShieldCheck, Coffee, Infinity
} from 'lucide-react'
import ScrollReveal from './animations/ScrollReveal'
import { useTheme } from '../context/ThemeContext'
import { diseasesData } from '../data/diseases'

const CategoryIconMap = {
  'general-diseases': Thermometer,
  'respiratory-diseases': Wind,
  'digestive-diseases': Activity,
  'endocrine-metabolic-disorders': Dna,
  'heart-blood-pressure': HeartPulse,
  'kidney-urinary-diseases': Droplets,
  'bone-joint-muscle-disorders': Bone,
  'neurological-disorders': Brain,
  'skin-diseases': Sparkles,
  'womens-health': Heart,
  'mens-health': Activity,
  'child-health': Baby,
  'mental-emotional-health': Smile,
  'allergy-immune-disorders': ShieldCheck,
  'lifestyle-disorders': Coffee,
  'chronic-diseases': Infinity
};

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
  const Icon = CategoryIconMap[item.slug] || Activity;
  return (
    <div
      ref={tiltRef}
      className="speciality-card"
      style={{
        padding: '32px 20px', width: '150px', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
        animation: `fade-up 0.6s ease ${0.1 + index * 0.05}s both`,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        transform: 'translateZ(0)',
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
        <Icon size={36} color="var(--cyan)" strokeWidth={1.5} />
      </div>
      <p style={{ 
        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, 
        color: 'var(--text-muted)', lineHeight: 1.4, margin: 0,
        height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
      }}>
        {item.title}
      </p>
    </div>
  )
}

const SpecialityMenu = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Split data based on screen size
  const row1 = isMobile ? diseasesData : diseasesData.slice(0, 8);
  const row2 = isMobile ? [] : diseasesData.slice(8, 16);

  const renderMarqueeTrack = (items, direction) => {
    if (!items.length) return null;
    // Duplicate 4 times for seamless math on ultra-wide screens (even number of copies required)
    const trackItems = [...items, ...items, ...items, ...items];
    return (
      <div className={`marquee-track ${direction}`}>
        {trackItems.map((item, i) => (
          <div key={`${item.slug}-${i}`} onClick={() => navigate(`/disease/${item.slug}`)} style={{ cursor: 'pointer' }}>
            <TiltCard item={item} index={i} />
          </div>
        ))}
      </div>
    );
  };
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
            color: 'var(--text-main)', marginBottom: '16px',
          }}>
            What We Treat <span style={{
              background: `var(--grad-primary)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Best</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
            Holistic homoeopathic care across a wide spectrum of conditions — delivered with precision and compassion.
          </p>
        </ScrollReveal>

        {/* Infinite Marquee Cards */}
        <div className="marquee-wrapper">
          <div className="marquee-container">
            {renderMarqueeTrack(row1, 'left')}
            {renderMarqueeTrack(row2, 'right')}
          </div>
        </div>

        {/* View all CTA */}
        <ScrollReveal delay={0.4} style={{ textAlign: 'center', marginTop: '48px' }}>
          <button 
            onClick={() => navigate('/contact')} 
            className="btn-outline"
            style={{ color: theme === 'light' ? '#0F172A' : 'var(--text-main)' }}
          >
            Book for Any Condition <ArrowRight size={16} />
          </button>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default SpecialityMenu
