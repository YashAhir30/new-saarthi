import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import { Calendar, MapPin, CreditCard, X, Clock } from 'lucide-react'
import ScrollReveal from '../components/animations/ScrollReveal'

const MyAppointment = () => {
  const { doctors } = useContext(AppContext)
  return (
    <div style={{ background: 'var(--navy)', paddingTop: '80px', minHeight: '100vh' }}>
      <div aria-hidden style={{ position: 'fixed', top: '25%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: `var(--mesh-color-2, radial-gradient(circle, rgba(0,102,255, 0.1), transparent 65%))`, filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(40px,5vw,60px) clamp(20px,5vw,60px)', position: 'relative', zIndex: 1 }}>

        <ScrollReveal style={{ marginBottom: '40px' }}>
          <div className="section-label" style={{ marginBottom: '16px', display: 'inline-flex' }}><Clock size={11} /> Upcoming</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
            My Appointments
          </h1>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {doctors.slice(0, 3).map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1} className="reveal">
              <div className="glass-card" style={{ padding: '28px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
                {/* Image */}
                <div style={{ flexShrink: 0, width: '100px', height: '100px', borderRadius: '20px', overflow: 'hidden', border: `1px solid var(--glass-border-hi)`, background: `var(--grad-icon)`, padding: '3px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '18px' }} />
                </div>
                {/* Info */}
                <div style={{ flex: '1 1 200px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>{item.name}</h3>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cyan)', marginBottom: '12px' }}>{item.speciality}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <MapPin size={13} color="var(--text-muted)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.address.line1}, {item.address.line2}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={13} color="var(--text-muted)" />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>25 July, 2025 · 8:30 PM</span>
                    </div>
                  </div>
                </div>
                {/* Badge */}
                <div style={{ display: 'none' }} className="appt-status" />
                {/* Actions */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '150px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '100px', background: `var(--success-bg, rgba(16,185,129,0.10))`, border: '1px solid rgba(16,185,129,0.25)', width: 'fit-content' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: `var(--success-color, #10b981)`, boxShadow: '0 0 6px #10b981' }} />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: `var(--success-color, #10b981)` }}>Confirmed</span>
                  </div>
                  <button className="btn-primary" style={{ padding: '11px 16px', fontSize: '13px', justifyContent: 'center' }}>
                    <CreditCard size={14} /> Pay Online
                  </button>
                  <button className="btn-ghost" style={{ padding: '10px 16px', fontSize: '13px', justifyContent: 'center', color: `var(--error-color, #ef4444)`, borderColor: `var(--error-border, rgba(239,68,68,0.25))`, background: `var(--error-bg, rgba(239,68,68,0.06))` }}>
                    <X size={14} /> Cancel
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyAppointment
