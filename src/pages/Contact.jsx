import React, { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, ChevronRight } from 'lucide-react'

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="currentColor">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
  </svg>
)
import ScrollReveal from '../components/animations/ScrollReveal'

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
)

const workingHours = [
  { day: 'Monday',    time: '9:30 AM – 1:00 PM · 5:00 PM – 8:30 PM', open: true },
  { day: 'Tuesday',   time: '9:30 AM – 1:00 PM · 5:00 PM – 8:30 PM', open: true },
  { day: 'Wednesday', time: '9:30 AM – 1:00 PM · 5:00 PM – 8:30 PM', open: true },
  { day: 'Thursday',  time: '9:30 AM – 1:00 PM · 5:00 PM – 8:30 PM', open: true },
  { day: 'Friday',    time: '9:30 AM – 1:00 PM · 5:00 PM – 8:30 PM', open: true },
  { day: 'Saturday',  time: '9:30 AM – 1:00 PM · 5:00 PM – 8:30 PM', open: true },
  { day: 'Sunday',    time: '10:00 AM – 1:00 PM',                      open: true },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid var(--glass-border)`,
    borderRadius: '14px',
    padding: '16px 20px',
    color: `var(--white, #ffffff)`,
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    fontWeight: 500,
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
  }

  const focusInput = (e) => {
    e.target.style.background = 'rgba(255,255,255,0.07)'
    e.target.style.borderColor = 'rgba(0,102,255,0.60)'
    e.target.style.boxShadow = '0 0 0 3px rgba(0,102,255,0.10), 0 0 20px rgba(0,102,255,0.08)'
  }
  const blurInput = (e) => {
    e.target.style.background = 'rgba(255,255,255,0.04)'
    e.target.style.borderColor = `var(--glass-strong, rgba(255,255,255,0.10))`
    e.target.style.boxShadow = 'none'
  }

  return (
    <div style={{ background: 'var(--navy)', paddingTop: '80px' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)' }}>
        <div aria-hidden style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, borderRadius: '50%', background: `var(--mesh-color-2, radial-gradient(ellipse, rgba(0,102,255, 0.1), transparent 65%))`, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <div className="section-label" style={{ marginBottom: '20px', display: 'inline-flex' }}>Get In Touch</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, color: `var(--white, #ffffff)`, marginBottom: '20px' }}>
              Let's Start Your{' '}
              <span style={{ background: `var(--grad-primary)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Healing</span>
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto' }}>
              Have questions or want to book an appointment? We're here to help. Reach out through any of the channels below.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTACT CARDS ROW ── */}
      <section style={{ padding: '0 clamp(20px,5vw,60px) clamp(60px,6vw,80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '60px' }}>
            {[
              { Icon: Phone, label: 'Call Us', value: '+91 8733905727', href: 'tel:8733905727', color: '#0066FF' },
              { Icon: WhatsAppIcon, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/+918733905727', color: '#25D366' },
              { Icon: Mail, label: 'Email', value: 'saarthihomoeopathy.33@gmail.com', href: 'mailto:saarthihomoeopathy.33@gmail.com', color: '#00D4FF' },
              { Icon: InstagramIcon, label: 'Instagram', value: '@saarthihomoeopathy', href: 'https://www.instagram.com/saarthihomoeopathy/', color: '#E1306C' },
            ].map(({ Icon, label, value, href, color }, i) => (
              <ScrollReveal key={i} delay={i * 0.08} className="reveal-scale">
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="glass-card glass-card-hover" style={{ padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '18px', background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: color }}>
                      <Icon />
                    </div>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>{label}</p>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: `var(--text-muted, rgba(200,215,255,0.85))`, wordBreak: 'break-all' }}>{value}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* ── SPLIT: Form + Info ── */}
          <div id="contact-form" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>

            {/* LEFT — Contact Form */}
            <ScrollReveal className="reveal-left" style={{ flex: '1 1 420px' }}>
              <div className="glass-card" style={{ padding: 'clamp(28px,4vw,44px)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, color: `var(--white, #ffffff)`, marginBottom: '8px' }}>Send a Message</h2>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>We'll get back to you within 24 hours.</p>

                {sent ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div className="icon-circle" style={{ margin: '0 auto 20px' }}><Send size={22} color={`var(--white, #ffffff)`} /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: `var(--white, #ffffff)`, marginBottom: '10px' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. We'll respond soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: `var(--text-muted, rgba(200,215,255,0.7))`, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Full Name</label>
                      <input type="text" required placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: `var(--text-muted, rgba(200,215,255,0.7))`, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Email</label>
                        <input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: `var(--text-muted, rgba(200,215,255,0.7))`, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Phone</label>
                        <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: `var(--text-muted, rgba(200,215,255,0.7))`, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Message</label>
                      <textarea required placeholder="Tell us about your condition or question..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} onFocus={focusInput} onBlur={blurInput} />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px', marginTop: '8px' }}>
                      <Send size={16} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* RIGHT — Clinic Info */}
            <ScrollReveal className="reveal-right" style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Clinic image */}
              <div style={{ borderRadius: '24px', overflow: 'hidden', border: `1px solid var(--glass-border-hi)`, boxShadow: `var(--shadow-card)` }}>
                <img src="./src/assets/contact_image.png" alt="Saarthi Clinic" loading="lazy" decoding="async" width="340" height="220" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
              </div>

              {/* Address */}
              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div className="icon-circle-sm"><MapPin size={16} color="var(--cyan)" /></div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: `var(--white, #ffffff)`, marginBottom: '6px' }}>Visit Our Clinic</h4>
                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)' }}>Surat, Gujarat, India</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ marginTop: '14px', padding: '8px 18px', fontSize: '13px' }}>
                      Open in Maps <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Emergency */}
              <div className="glass-card" style={{ padding: '24px', borderColor: `var(--glass-border, rgba(0,212,255,0.25))` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div className="icon-circle-sm" style={{ background: 'rgba(0,212,255,0.12)', borderColor: `var(--glass-border, rgba(0,212,255,0.25))` }}><MessageCircle size={16} color="var(--cyan)" /></div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: `var(--white, #ffffff)`, marginBottom: '6px' }}>Emergency Consultation</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>For urgent concerns, WhatsApp us any time — we respond within 2 hours.</p>
                    <a href="https://wa.me/+918733905727?text=Hi, I need urgent consultation" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>
                      <WhatsAppIcon /> WhatsApp Now
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── WORKING HOURS ── */}
      <section style={{ padding: 'clamp(40px,5vw,60px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollReveal style={{ marginBottom: '32px', textAlign: 'center' }}>
            <div className="section-label" style={{ display: 'inline-flex', marginBottom: '16px' }}><Clock size={11} /> Working Hours</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, color: `var(--white, #ffffff)`, letterSpacing: '-0.03em' }}>When We're <span style={{ background: `var(--grad-primary)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Available</span></h2>
          </ScrollReveal>
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            {workingHours.map((h, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 28px',
                borderBottom: i < workingHours.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
              }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: `var(--text-muted, rgba(200,215,255,0.85))` }}>{h.day}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: `var(--success-color, #10b981)`, boxShadow: '0 0 8px #10b981', animation: 'halo-breathe 3s ease-in-out infinite' }} />
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>{h.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE MAPS & CLINIC INFO ── */}
      <section id="clinic-location" style={{ padding: 'clamp(40px,5vw,80px) clamp(20px,5vw,60px) clamp(60px,8vw,100px)', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Title & Subtitle */}
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
              Visit Our Clinic or Connect Online
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              We proudly provide online homeopathic consultation for patients across the world, while our physical clinic is located in Surat, Gujarat, India.
            </p>
          </ScrollReveal>

          {/* Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {/* Card 1: Online */}
            <ScrollReveal delay={0.1} style={{ height: '100%' }}>
              <div className="glass-card glass-card-hover" style={{ padding: '32px', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--grad-primary)', filter: 'blur(60px)', opacity: 0.15, borderRadius: '50%' }} />
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🌍</div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>Online Consultation</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Receive expert homeopathic consultation from anywhere in the world through secure online appointments.
                </p>
                <span style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(0,102,255,0.1)', color: 'var(--cyan)', fontSize: '12px', fontWeight: 700, borderRadius: '8px', border: '1px solid rgba(0,102,255,0.2)' }}>
                  Available Worldwide
                </span>
              </div>
            </ScrollReveal>

            {/* Card 2: Offline */}
            <ScrollReveal delay={0.2} style={{ height: '100%' }}>
              <div className="glass-card glass-card-hover" style={{ padding: '32px', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--cyan)', filter: 'blur(60px)', opacity: 0.1, borderRadius: '50%' }} />
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>📍</div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>Offline Clinic</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Visit our clinic in Surat for personalized face-to-face consultation and treatment.
                </p>
                <span style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(0,212,255,0.1)', color: 'var(--cyan)', fontSize: '12px', fontWeight: 700, borderRadius: '8px', border: '1px solid rgba(0,212,255,0.2)' }}>
                  Surat, Gujarat
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Map with Floating Badges */}
          <ScrollReveal delay={0.3}>
            <div style={{ borderRadius: '32px', overflow: 'hidden', border: `1px solid var(--glass-border-hi)`, boxShadow: `var(--shadow-card)`, position: 'relative' }}>
              
              {/* Floating Badge: Location (Top Right) */}
              <div className="glass-card" style={{ 
                position: 'absolute', top: '24px', right: '24px', zIndex: 10, padding: '12px 16px', 
                display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '16px', 
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)' 
              }}>
                <span style={{ fontSize: '18px' }}>📍</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clinic Location</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>Surat, Gujarat, India</div>
                </div>
              </div>

              {/* Floating Badge: Online (Bottom Left) */}
              <div className="glass-card" style={{ 
                position: 'absolute', bottom: '24px', left: '24px', zIndex: 10, padding: '12px 16px', 
                display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '16px', 
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)' 
              }}>
                <span style={{ fontSize: '18px' }}>🌍</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Online Consultation</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>Available Worldwide</div>
                </div>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119063.86396917065!2d72.73123085!3d21.1646883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 'none', display: 'block', filter: 'invert(0.9) hue-rotate(180deg) brightness(0.85) contrast(1.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Saarthi Homeopathy Location"
              />
            </div>
          </ScrollReveal>

          {/* CTA Section Below Map */}
          <ScrollReveal delay={0.4} style={{ textAlign: 'center', marginTop: '60px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
              Need Treatment?
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 32px' }}>
              Whether you're in Surat or anywhere around the world, we're here to help you with personalized homeopathic care.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <button onClick={() => { document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-primary" style={{ padding: '16px 28px', fontSize: '15px' }}>
                Book Online Consultation
              </button>
              <button onClick={() => { document.getElementById('clinic-location')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-outline" style={{ padding: '16px 28px', fontSize: '15px' }}>
                Visit Surat Clinic
              </button>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  )
}

export default Contact
