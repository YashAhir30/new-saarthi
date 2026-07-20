import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { ShieldCheck, Star, Heart, GraduationCap, Award, Users, Clock, BadgeCheck, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/animations/ScrollReveal'
import { useNavigate } from 'react-router-dom'

/* ── Animated Counter ── */
const Counter = ({ target, suffix = '', duration = 2000 }) => {
  const ref = React.useRef(null)
  const started = React.useRef(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1)
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suffix
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, suffix, duration])
  return <span ref={ref}>0{suffix}</span>
}

/* ── FAQ Accordion ── */
const FAQ = ({ question, answer }) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="accordion-panel"
      data-open={open}
      style={{ cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', gap: '16px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 700, color: open ? 'var(--cyan)' : 'var(--text-main)', margin: 0, flex: 1, lineHeight: 1.4 }}>
          {question}
        </h4>
        <div style={{ flexShrink: 0, color: open ? 'var(--cyan)' : 'var(--text-muted)', transition: 'color 0.3s ease' }}>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      <div style={{
        maxHeight: open ? '300px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.45s cubic-bezier(0.23,1,0.32,1)',
      }}>
        <p style={{ padding: '0 24px 24px', fontSize: '14.5px', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

const faqs = [
  {
    question: 'Is homoeopathy scientifically proven?',
    answer: 'Homoeopathy has been practiced for over 200 years and is supported by a growing body of clinical research. While it works differently from conventional medicine, many studies demonstrate its effectiveness for a wide range of acute and chronic conditions.',
  },
  {
    question: 'Are there side effects to homoeopathic treatments?',
    answer: 'One of the greatest strengths of homoeopathy is its safety profile. Remedies are highly diluted and non-toxic, making them safe for infants, pregnant women, the elderly, and those on other medications.',
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Acute conditions (like colds, fevers) often respond within hours to days. Chronic conditions may require several weeks to months, as we address the root cause rather than suppressing symptoms.',
  },
  {
    question: 'Can homoeopathy be taken alongside conventional medicine?',
    answer: 'Yes, homoeopathic remedies are generally compatible with conventional medications. We recommend informing both your homoeopath and conventional doctor about all treatments for the best coordinated care.',
  },
  {
    question: 'What makes Saarthi Homoeopathy different?',
    answer: 'We combine classical homoeopathic principles with a modern, personalised approach. Every patient receives a comprehensive assessment, and treatment plans are continuously refined based on your progress.',
  },
]

const milestones = [
  { year: '2015', title: 'Foundation', desc: 'Saarthi Homoeopathy was founded with a mission to bring accessible, personalised homoeopathic care to Surat.' },
  { year: '2017', title: 'First 500 Patients', desc: 'Reached a milestone of 500 successfully treated patients, building trust through consistent results.' },
  { year: '2019', title: 'Expanded Specialities', desc: 'Extended our practice to cover complex chronic conditions — including thyroid disorders, kidney diseases, and cancer support care.' },
  { year: '2022', title: 'Online Consultations', desc: 'Launched online consultation services, enabling patients across India to access expert homoeopathic care from home.' },
  { year: '2025', title: '5000+ Healings', desc: 'Over 5000 patients healed and counting — a testament to the power of compassionate, holistic healthcare.' },
]

const About = () => {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--navy)', paddingTop: '80px' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(60px,8vw,120px) clamp(20px,5vw,60px)' }}>
        {/* Background lights */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: `var(--mesh-color-2, radial-gradient(ellipse, rgba(0,102,255, 0.1), transparent 65%))`, filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: '-5%', width: 400, height: 400, borderRadius: '50%', background: `var(--mesh-color-2, radial-gradient(circle, rgba(0,212,255, 0.1), transparent 65%))`, filter: 'blur(70px)' }} />
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <div className="section-label" style={{ marginBottom: '20px', display: 'inline-flex' }}>About Us</div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95,
              color: 'var(--text-main)', marginBottom: '24px',
            }}>
              Healing with{' '}
              <span style={{ background: `var(--grad-primary)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Purpose
              </span>
            </h1>
            <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 32px' }}>
              Saarthi Homoeopathy was built on a simple but powerful belief — that every person deserves healthcare that treats them as a whole human being, not just a collection of symptoms.
            </p>
              <button onClick={() => navigate('/contact')} className="btn-primary">
              Meet the Doctor <ArrowRight size={16} />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: 'clamp(40px,5vw,60px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {[
              { label: 'Patients Healed', value: 1000, suffix: '+', icon: Users },
              { label: 'Years Experience', value: 5, suffix: '+', icon: Award },
              { label: 'Success Rate', value: 98, suffix: '%', icon: Star },
              { label: 'Conditions Treated', value: 50, suffix: '+', icon: Heart },
            ].map(({ label, value, suffix, icon: Icon }, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="reveal-scale">
                <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
                  <div className="icon-circle" style={{ margin: '0 auto 16px' }}><Icon size={22} color={'var(--text-main)'} /></div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, lineHeight: 1, background: `var(--grad-primary)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    <Counter target={value} suffix={suffix} />
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            {[
              { icon: ShieldCheck, title: 'Our Mission', color: '#0066FF', body: 'To provide personalised, evidence-based homoeopathic care that heals from the root — empowering every patient to achieve optimal health, naturally and safely.' },
              { icon: Star, title: 'Our Vision', color: '#00D4FF', body: 'To be India\'s most trusted name in integrative homoeopathic healthcare — where ancient wisdom meets modern science for a healthier tomorrow.' },
              { icon: Heart, title: 'Our Values', color: '#A78BFA', body: 'Compassion, integrity, and individualised attention guide every consultation. We believe that healing begins with truly listening to each patient.' },
            ].map(({ icon: Icon, title, color, body }, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="reveal" style={{ flex: '1 1 280px' }}>
                <div className="glass-card glass-card-hover" style={{ padding: '36px', height: '100%' }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '18px', background: `linear-gradient(135deg, ${color}22, ${color}11)`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: `0 8px 20px ${color}20` }}>
                    <Icon size={24} color={color} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>{title}</h3>
                  <p style={{ fontSize: '14.5px', lineHeight: 1.8, color: 'var(--text-muted)' }}>{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', left: '-5%', top: '20%', width: 500, height: 500, borderRadius: '50%', background: `var(--mesh-color-2, radial-gradient(circle, rgba(0,102,255, 0.1), transparent 65%))`, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{ marginBottom: '20px', display: 'inline-flex' }}>Our Journey</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.035em', color: 'var(--text-main)' }}>
              A Decade of <span style={{ background: `var(--grad-primary)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Healing</span>
            </h2>
          </ScrollReveal>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '20px', top: '24px', bottom: '24px', width: '2px', background: 'linear-gradient(to bottom, rgba(0,102,255,0.8), rgba(0,212,255,0.2))', borderRadius: '2px' }} />

            {milestones.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.12} className="reveal-left" style={{ paddingLeft: '56px', marginBottom: '40px', position: 'relative' }}>
                {/* Dot */}
                <div style={{ position: 'absolute', left: '11px', top: '8px', width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #0066FF, #00D4FF)', boxShadow: '0 0 0 4px rgba(0,102,255,0.15), 0 0 16px rgba(0,102,255,0.30)' }} />
                <div className="glass-card" style={{ padding: '24px 28px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{m.year}</div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>{m.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTOR STORY ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
            <ScrollReveal className="reveal-left" style={{ flex: '1 1 300px', position: 'relative' }}>
              <div style={{
                borderRadius: '24px', overflow: 'hidden',
                border: `1px solid var(--glass-border-hi)`,
                boxShadow: `var(--shadow-card)`,
              }}>
                <img src={assets.yoginAppoinment} alt="Dr. Yogin Baldaniya" style={{ width: '100%', height: '500px', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              </div>
              {/* premium floating badge */}
              <div style={{
                position: 'absolute', bottom: '24px', right: '-20px',
                background: 'var(--glass-mid)', backdropFilter: 'blur(16px)',
                borderRadius: '20px', padding: '20px 24px',
                border: `1px solid var(--glass-border-hi)`,
                boxShadow: 'var(--shadow-card)',
                display: 'flex', alignItems: 'flex-start', gap: '14px',
                maxWidth: '290px'
              }}>
                <BadgeCheck size={24} color="#0EA5E9" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '20px', color: 'var(--text-main)', margin: 0, lineHeight: 1.2, marginBottom: '6px' }}>Dr. Yogin Baldaniya</h4>
                  <p style={{ fontWeight: 500, fontSize: '14px', color: 'var(--text-secondary)', margin: 0, marginBottom: '2px' }}>B.H.M.S (Consultant Homoeopath)</p>
                  <p style={{ fontWeight: 500, fontSize: '14px', color: 'var(--text-secondary)', margin: 0, marginBottom: '2px' }}>M.D (Hom)</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>S.C.P.H (ICHM, UN)</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="reveal-right" style={{ flex: '1 1 380px' }}>
              <div className="section-label" style={{ marginBottom: '20px' }}>The Story</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: '20px' }}>
                Dr. Yogin's<br />
                <span style={{ background: `var(--grad-primary)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Healing Philosophy</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                {[
                  'Dr. Yogin Baldaniya\'s journey into Homoeopathy began with a personal conviction — that the human body has an innate ability to heal itself when given the right support.',
                  'After completing his B.H.M.S at Pioneer Homoeopathic Medical College, earning his M.D (Hom), and his S.C.P.H from ICHM United Nation, he undertook extensive clinical training across Surat\'s leading homoeopathic clinics.',
                  'Today, Dr. Yogin blends classical homoeopathic principles with a modern, evidence-informed approach — listening deeply to each patient, addressing emotional and physical dimensions together.',
                ].map((text, i) => (
                  <p key={i} style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--text-muted)' }}>{text}</p>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                {[
                  { label: 'B.H.M.S', icon: GraduationCap },
                  { label: 'M.D (Hom)', icon: GraduationCap },
                  { label: 'S.C.P.H (ICHM, UN)', icon: GraduationCap },
                  { label: '5+ Years Experience', icon: Clock },
                  { label: '1000+ Happy Patients', icon: Heart }
                ].map((tag, i) => (
                  <div key={i} style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    background: 'var(--glass-mid)', border: '1px solid rgba(14,165,233,0.3)', 
                    color: 'var(--text-main)', padding: '8px 20px', borderRadius: '999px',
                    fontSize: '14px', fontWeight: 600, transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)', cursor: 'default'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(14,165,233,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)' }}
                  >
                    <tag.icon size={16} color="#0EA5E9" /> {tag.label}
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/contact')} className="btn-primary">
                Book Consultation <ArrowRight size={16} />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-label" style={{ marginBottom: '20px', display: 'inline-flex' }}>FAQ</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
              Common <span style={{ background: `var(--grad-primary)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Questions</span>
            </h2>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.06} className="reveal">
                <FAQ question={f.question} answer={f.answer} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
