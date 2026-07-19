import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Phone, CalendarDays } from 'lucide-react'
import ScrollReveal from './animations/ScrollReveal'
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate()
  return (
    <section style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ScrollReveal className="reveal-scale">
          <div style={{
            position: 'relative', borderRadius: '40px', overflow: 'hidden',
            background: 'var(--grad-hero)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-glow)',
          }}>
            {/* Background lights */}
            <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <div style={{
                position: 'absolute', top: '-30%', right: '-5%',
                width: 500, height: 500, borderRadius: '50%',
                background: 'var(--mesh-color-1, radial-gradient(circle, rgba(0,102,255,0.20) 0%, transparent 65%))',
                filter: 'blur(60px)',
              }} />
              <div style={{
                position: 'absolute', bottom: '-20%', left: '10%',
                width: 400, height: 400, borderRadius: '50%',
                background: 'var(--mesh-color-2, radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 65%))',
                filter: 'blur(70px)',
              }} />
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'var(--grad-primary, linear-gradient(90deg, transparent, rgba(0,212,255,0.50) 50%, transparent))',
              }} />
            </div>

            <div style={{
              position: 'relative', zIndex: 1,
              display: 'flex', flexWrap: 'wrap', alignItems: 'center',
              padding: 'clamp(40px, 6vw, 72px)',
              gap: '48px',
            }}>
              {/* Left Text */}
              <div style={{ flex: '1 1 380px' }}>
                <div className="section-label" style={{ marginBottom: '20px' }}>
                  <CalendarDays size={11} /> Book Your Consultation
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05,
                  color: `var(--white, #ffffff)`, marginBottom: '16px',
                }}>
                  Start Your Healing{' '}
                  <span style={{
                    background: 'var(--grad-primary)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>Journey Today</span>
                </h2>
                <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '440px' }}>
                  Take the first step towards natural, lasting wellness.
                  Dr. Yogin Baldaniya offers personalised homeopathic consultations for a wide range of conditions.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                  <button onClick={() => navigate('/contact')} className="btn-primary">
                    <Phone size={16} /> Contact Us <ArrowRight size={16} />
                  </button>
                  <a href="tel:8733905727" className="btn-outline">
                    <Phone size={16} /> Call Us
                  </a>
                </div>
              </div>

              {/* Right — appointment image with glass overlay */}
              <div style={{ flex: '1 1 280px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  position: 'relative',
                  borderRadius: '24px', overflow: 'hidden',
                  border: '1px solid var(--glass-border-hi)',
                  boxShadow: 'var(--shadow-card)',
                  maxWidth: '380px', width: '100%',
                }}>
                  <img
                    src={assets.appointment_img}
                    alt="Book appointment"
                    style={{
                      width: "100%",
                      height: "260px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* glass overlay card */}
                  <div style={{
                    position: 'absolute', bottom: '16px', left: '16px', right: '16px',
                    background: 'var(--glass-mid, rgba(5,13,26,0.75))', backdropFilter: 'blur(20px)',
                    borderRadius: '16px', padding: '16px 20px',
                    border: '1px solid var(--glass-border)',
                    display: 'flex', alignItems: 'center', gap: '14px',
                  }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%',
                      background: 'var(--grad-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <CalendarDays size={20} color={`var(--white, #ffffff)`} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '15px', color: `var(--white, #ffffff)`, margin: 0 }}>Next Available Slot</p>
                      <p style={{ fontSize: '12px', color: 'var(--cyan)', margin: 0, fontWeight: 600 }}>Today · From 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Banner
