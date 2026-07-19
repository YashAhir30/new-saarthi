import React, { useState, useEffect } from 'react'
import { CheckCircle, CalendarDays } from 'lucide-react'
import ScrollReveal from '../components/animations/ScrollReveal'

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Appointment = () => {
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [booked, setBooked] = useState(false)

  const getAvailableSlots = () => {
    const today = new Date()
    const slotsArray = []
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      currentDate.setDate(today.getDate() + i)
      const day = currentDate.getDay()
      const timeSlots = []
      const startTime = new Date(currentDate)
      const endTime = new Date(currentDate)
      if (day === 0) {
        startTime.setHours(10, 0, 0, 0)
        endTime.setHours(13, 0, 0, 0)
      } else {
        startTime.setHours(9, 30, 0, 0)
        endTime.setHours(20, 30, 0, 0)
      }
      if (i === 0) {
        const h = today.getHours(), m = today.getMinutes()
        startTime.setHours(h, m, 0, 0)
        if (h >= 13 && h < 17) startTime.setHours(17, 0, 0, 0)
      }
      while (startTime < endTime) {
        const ft = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        if (!(startTime.getHours() >= 13 && startTime.getHours() < 17))
          timeSlots.push({ datetime: new Date(startTime), time: ft })
        startTime.setMinutes(startTime.getMinutes() + 30)
      }
      slotsArray.push(timeSlots)
    }
    setDocSlots(slotsArray)
  }
  useEffect(() => { getAvailableSlots() }, [])

  return (
    <div style={{ background: 'var(--navy)', paddingTop: '80px', minHeight: '100vh' }}>

      {/* Background light */}
      <div aria-hidden style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: `var(--mesh-color-2, radial-gradient(ellipse, rgba(0,102,255, 0.1), transparent 65%))`, filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(40px,5vw,60px) clamp(20px,5vw,60px)', position: 'relative', zIndex: 1 }}>

        {/* Doctor Info */}
        <ScrollReveal style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
            {/* Image */}
            <div style={{ flex: '0 0 auto', width: 'min(260px,100%)' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', border: `1px solid var(--glass-border-hi)`, boxShadow: `var(--shadow-card)`, background: `var(--grad-icon)`, padding: '6px' }}>
                <img src="./src/assets/yoginAppoinment.jpg" alt="Dr. Yogin" style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '20px', display: 'block' }} />
              </div>
            </div>
            {/* Info card */}
            <div className="glass-card" style={{ flex: '1 1 340px', padding: 'clamp(24px,3vw,36px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: `var(--white, #ffffff)`, margin: 0 }}>Dr. Yogin Baldaniya</h1>
                <CheckCircle size={20} color="var(--cyan)" />
              </div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cyan)', marginBottom: '20px' }}>B.H.M.S · S.C.P.H (ICHM, UNITED NATION) · 3 Years Experience</p>
              <p style={{ fontSize: '14.5px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '540px' }}>
                Dr. Yogin Baldaniya, a dedicated homoeopathic practitioner, completed his studies at Pioneer Homoeopathic Medical College, gaining in-depth knowledge of holistic healing with a strong clinical foundation.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', margin: 0 }}>
                  Consultation Fee: <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: `var(--white, #ffffff)`, marginLeft: '4px' }}>₹500</span>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Booking Section */}
        <ScrollReveal>
          <div className="glass-card" style={{ padding: 'clamp(28px,4vw,44px)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: `var(--white, #ffffff)`, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CalendarDays size={22} color="var(--cyan)" /> Choose Your Slot
            </h2>

            {/* Date pills */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '28px', scrollbarWidth: 'none' }}>
              {docSlots.map((item, i) => (
                <button key={i} onClick={() => { setSlotIndex(i); setSlotTime('') }} style={{
                  minWidth: '72px', padding: '18px 10px', borderRadius: '18px',
                  cursor: 'pointer', border: 'none', textAlign: 'center',
                  background: slotIndex === i ? 'linear-gradient(135deg, #0066FF, #00D4FF)' : 'rgba(255,255,255,0.04)',
                  border: slotIndex === i ? '1px solid transparent' : `1px solid var(--glass-border)`,
                  boxShadow: slotIndex === i ? `var(--shadow-glow)` : 'none',
                  color: slotIndex === i ? `var(--white, #ffffff)` : `var(--text-muted, rgba(200,215,255,0.65))`,
                  transition: 'all 0.25s ease',
                }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, marginBottom: '4px', opacity: slotIndex === i ? 1 : 0.7 }}>
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, lineHeight: 1 }}>
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </button>
              ))}
            </div>

            {/* Time pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px', minHeight: '56px' }}>
              {docSlots.length > 0 && docSlots[slotIndex]?.length > 0 ? (
                docSlots[slotIndex].map((item, i) => (
                  <button key={i} onClick={() => setSlotTime(item.time)} style={{
                    padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600,
                    cursor: 'pointer', border: 'none', transition: 'all 0.2s ease',
                    background: item.time === slotTime ? 'linear-gradient(135deg, #0066FF, #00D4FF)' : 'rgba(255,255,255,0.05)',
                    border: item.time === slotTime ? '1px solid transparent' : `1px solid var(--glass-border)`,
                    color: item.time === slotTime ? `var(--white, #ffffff)` : `var(--text-muted, rgba(200,215,255,0.70))`,
                    boxShadow: item.time === slotTime ? '0 4px 14px rgba(0,102,255,0.35)' : 'none',
                  }}>
                    {item.time}
                  </button>
                ))
              ) : (
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', alignSelf: 'center' }}>No slots available for this day.</p>
              )}
            </div>

            {booked ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 28px', borderRadius: '18px', background: `var(--success-bg, rgba(16,185,129,0.10))`, border: '1px solid rgba(16,185,129,0.30)' }}>
                <CheckCircle size={24} color="#10b981" />
                <div>
                  <p style={{ fontWeight: 700, color: `var(--success-color, #10b981)`, marginBottom: '2px' }}>Appointment Confirmed!</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>We'll contact you to confirm your slot time.</p>
                </div>
              </div>
            ) : (
              <button
                className="btn-primary"
                onClick={() => slotTime && setBooked(true)}
                disabled={!slotTime}
                style={{ padding: '16px 40px', fontSize: '16px', opacity: slotTime ? 1 : 0.45, cursor: slotTime ? 'pointer' : 'not-allowed' }}
              >
                <CalendarDays size={18} />
                {slotTime ? `Book for ${slotTime}` : 'Select a Time Slot'}
              </button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default Appointment
