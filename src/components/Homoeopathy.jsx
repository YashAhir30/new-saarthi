import React from 'react'
import { Leaf, ShieldCheck, Clock, FlaskConical, Heart, Sparkles } from 'lucide-react'
import ScrollReveal from './animations/ScrollReveal'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Zero Side Effects',
    description: 'Homoeopathy uses highly diluted natural substances — completely safe for all ages, including infants, pregnant women, and the elderly.',
    number: '100%',
    numberLabel: 'Natural',
  },
  {
    icon: Leaf,
    title: 'Root-Cause Healing',
    description: 'We treat the underlying cause of illness, not just the symptoms — leading to lasting, permanent relief rather than temporary suppression.',
    number: '98%',
    numberLabel: 'Satisfaction',
  },
  {
    icon: Heart,
    title: 'Individualised Care',
    description: 'Every patient receives a personalised treatment plan. We account for your physical, emotional, and lifestyle profile.',
    number: '5000+',
    numberLabel: 'Patients',
  },
  {
    icon: FlaskConical,
    title: 'Science-Backed',
    description: 'Rooted in 200+ years of clinical practice and supported by modern research. Effective for acute, chronic, and complex conditions.',
    number: '200+',
    numberLabel: 'Years Proven',
  },
  {
    icon: Clock,
    title: 'Flexible Appointments',
    description: 'Mon–Sat 9:30 AM – 8:30 PM. Sunday 10:00 AM – 1:00 PM. WhatsApp & phone consultations available.',
    number: '7',
    numberLabel: 'Days a Week',
  },
  {
    icon: Sparkles,
    title: 'Holistic Wellness',
    description: 'We guide you on diet, lifestyle, and mental wellness alongside your treatment for a truly transformative healing experience.',
    number: '360°',
    numberLabel: 'Approach',
  },
]

const Homoeopathy = () => {
  return (
    <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '30%', left: '-5%',
        width: 600, height: 600, borderRadius: '50%',
        background: `var(--mesh-color-2, radial-gradient(circle, rgba(0,102,255, 0.1), transparent 65%))`,
        filter: 'blur(90px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <ScrollReveal style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-label" style={{ marginBottom: '20px' }}>
            <Sparkles size={11} /> Why Homoeopathy
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0,
            color: 'var(--text-main)', marginBottom: '16px',
          }}>
            Why Choose{' '}
            <span style={{
              background: `var(--grad-primary)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Saarthi</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Experience a fundamentally different approach to healthcare — one that treats you as a whole person.
          </p>
        </ScrollReveal>

        {/* 2-column benefits grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {benefits.map((b, i) => (
            <ScrollReveal key={i} delay={i * 0.08} className="reveal">
              <div className="benefit-card" style={{ height: '100%' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div style={{
                    width: '54px', height: '54px', borderRadius: '18px', flexShrink: 0,
                    background: `var(--grad-icon)`,
                    border: '1px solid rgba(0,212,255,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(0,102,255,0.15)',
                  }}>
                    <b.icon size={24} color="var(--cyan)" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                      {b.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '22px', fontWeight: 700,
                        background: `var(--grad-primary)`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}>{b.number}</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{b.numberLabel}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: 'var(--text-muted)', margin: 0 }}>
                  {b.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Homoeopathy
