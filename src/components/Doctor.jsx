import React, { useEffect, useRef } from 'react'
import { BadgeCheck, Star, GraduationCap, UserCheck, CalendarDays, Award } from 'lucide-react'
import ScrollReveal from './animations/ScrollReveal'
import profilePic from "../assets/profile_pic.JPG";
/* Animated number counter */
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const ref = useRef(null)
  const startedRef = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const val = Math.floor(eased * target)
          el.textContent = val + suffix
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, duration])
  return <span ref={ref}>0{suffix}</span>
}

/* Expand ring */
const Ring = ({ size, delay, color = 'rgba(0,102,255,0.20)', dashed }) => (
  <div style={{
    position: 'absolute', top: '50%', left: '50%',
    width: size, height: size, marginTop: -size / 2, marginLeft: -size / 2,
    borderRadius: '50%', border: `1.5px ${dashed ? 'dashed' : 'solid'} ${color}`,
    animation: `ring-expand-fade ${5 + size / 80}s ease-out ${delay} infinite`,
  }} />
)

const statItems = [
  { icon: Star, label: 'Happy Patients', value: 5000, suffix: '+' },
  { icon: Award, label: 'Years of Excellence', value: 10, suffix: '+' },
  { icon: BadgeCheck, label: 'Success Rate', value: 98, suffix: '%' },
  { icon: UserCheck, label: 'Recoveries', value: 4800, suffix: '+' },
]

const Doctor = () => {
  return (
    <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>

      {/* Section glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '20%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: `var(--mesh-color-2, radial-gradient(circle, rgba(0,102,255, 0.1), transparent 65%))`,
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>

          {/* LEFT — image with rings */}
          <ScrollReveal className="reveal-left" style={{ flex: '1 1 320px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '460px' }}>

            {/* Layer 5 decorations */}
            <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div style={{
                position: 'absolute', inset: '-15%',
                background: 'radial-gradient(ellipse at center, rgba(0,102,255,0.14) 0%, rgba(0,212,255,0.05) 45%, transparent 65%)',
                animation: 'halo-breathe 7s ease-in-out infinite',
              }} />
              <div style={{
                position: 'absolute', inset: '-15%',
                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,102,255,0.05) 20deg, transparent 40deg, rgba(0,212,255,0.04) 80deg, transparent 100deg, rgba(0,102,255,0.04) 140deg, transparent 160deg, rgba(0,212,255,0.04) 220deg, transparent 240deg, rgba(0,102,255,0.05) 300deg, transparent 320deg)`,
                animation: 'ray-rotate 45s linear infinite',
              }} />
              <Ring size={230} delay="0s" />
              <Ring size={310} delay="2s" color="rgba(0,102,255,0.15)" />
              <Ring size={390} delay="4s" color="rgba(0,212,255,0.09)" dashed />
              <Ring size={460} delay="1s" color="rgba(0,102,255,0.06)" />
              {/* DNA helix SVG */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.06, animation: 'slow-spin-rev 60s linear infinite', color: 'var(--cyan)' }}>
                <svg width="180" height="180" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20,10 Q50,30 80,10 Q50,30 20,50 Q50,70 80,50 Q50,70 20,90 Q50,70 80,90" />
                  <path d="M80,10 Q50,30 20,10 Q50,30 80,50 Q50,70 20,50 Q50,70 80,90 Q50,70 20,90" />
                </svg>
              </div>
            </div>

            {/* Circular image in glass frame */}
            <div style={{
              position: 'relative', zIndex: 1,
              background: `var(--grad-icon)`,
              borderRadius: '50%', padding: '8px',
              boxShadow: '0 0 0 1px rgba(0,102,255,0.15), 0 24px 60px rgba(0,102,255,0.25)',
            }}>
              <img
                src={profilePic}
                alt="Dr. Yogin Baldaniya"
                style={{
                  width: "280px",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  display: "block",
                  filter: "drop-shadow(0 12px 40px rgba(0,102,255,0.30))",
                }}
              />
            </div>
          </ScrollReveal>

          {/* RIGHT — content */}
          <ScrollReveal className="reveal-right" style={{ flex: '1 1 380px' }}>
            <div className="section-label" style={{ marginBottom: '20px' }}>
              Meet Your Healer
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 4vw, 52px)',
              fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0,
              color: `var(--white, #ffffff)`, marginBottom: '10px',
            }}>
              Dr. Yogin<br />Baldaniya
            </h2>
            <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cyan)', marginBottom: '24px', letterSpacing: '0.5px' }}>
              BHMS · Pioneer Homoeopathic Medical College
            </p>

            <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '500px' }}>
              Dr. Yogin Baldaniya, a dedicated homoeopathic practitioner, completed his studies at Pioneer Homoeopathic Medical College, gaining in-depth knowledge of holistic healing. With a strong foundation in treating various diseases, he has enriched his clinical experience through multiple internships — including training at Satyam, Shreeji, and Samarth Homoeopathy clinics.
            </p>

            {/* Animated Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {statItems.map(({ icon: Icon, label, value, suffix }, i) => (
                <div key={i} className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px', fontWeight: 700, lineHeight: 1,
                    background: `var(--grad-primary)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    <AnimatedCounter target={value} suffix={suffix} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
              {[
                [BadgeCheck, 'Verified Doctor'],
                [GraduationCap, 'BHMS Certified'],
              ].map(([Icon, label], i) => (
                <div key={i} className="trust-badge"><Icon size={14} />{label}</div>
              ))}
            </div>

            <button style={{ display: 'none' }} /> {/* preserve routing anchor */}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default Doctor
