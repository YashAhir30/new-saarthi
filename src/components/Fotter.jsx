import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { assets } from '../assets/assets';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 448 512" fill="currentColor">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
)



const SocialBtn = ({ href, icon: Icon, label, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    style={{
      width: '44px', height: '44px', borderRadius: '14px',
      background: 'rgba(255,255,255,0.05)',
      border: `1px solid var(--glass-border)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: `var(--text-muted, rgba(200,215,255,0.60))`,
      transition: 'all 0.3s ease',
      cursor: 'pointer', textDecoration: 'none',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = color || 'rgba(0,102,255,0.15)'
      e.currentTarget.style.borderColor = 'rgba(0,102,255,0.40)'
      e.currentTarget.style.color = `var(--white, #ffffff)`
      e.currentTarget.style.transform = 'translateY(-3px)'
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,102,255,0.25)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
      e.currentTarget.style.borderColor = `var(--glass-strong, rgba(255,255,255,0.10))`
      e.currentTarget.style.color = `var(--text-muted, rgba(200,215,255,0.60))`
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = 'none'
    }}
  >
    <Icon />
  </a>
)

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const Fotter = () => {
  const navigate = useNavigate()
  return (
    <footer style={{
      background: 'linear-gradient(180deg, var(--navy) 0%, #030A14 100%)',
      borderTop: '1px solid rgba(0,102,255,0.12)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Footer glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,102,255,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px) clamp(32px,4vw,48px)', position: 'relative', zIndex: 1 }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px 60px', marginBottom: '60px' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <img
              src={assets.logo}
              alt="Saarthi Homeopathy"
              style={{
                height: '48px',
                width: 'auto',
                objectFit: 'contain',
                marginBottom: '20px'
              }}
            />
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '260px', marginBottom: '24px' }}>
              Trusted homeopathic healing with a modern, personalised approach. Your wellness is our mission.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <SocialBtn href="https://www.instagram.com/saarthihomoeopathy/" icon={InstagramIcon} label="Instagram" />
              <SocialBtn href="https://wa.me/+918733905727" icon={WhatsAppIcon} label="WhatsApp" />

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, color: `var(--white, #ffffff)`, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.map(({ label, to }) => (
                <li key={to}>
                  <button
                    onClick={() => navigate(to)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
                      transition: 'color 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: '8px',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <span style={{ width: '16px', height: '1px', background: 'rgba(0,212,255,0.4)' }} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, color: `var(--white, #ffffff)`, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { Icon: Phone, text: '+91 8733905727', href: 'tel:8733905727' },
                { Icon: Mail, text: 'saarthihomoeopathy.33@gmail.com', href: 'mailto:saarthihomoeopathy.33@gmail.com' },
                { Icon: MapPin, text: 'Surat, Gujarat, India', href: null },
              ].map(({ Icon, text, href }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0, background: `var(--glass-light, rgba(0,102,255,0.12))`, border: `1px solid var(--glass-border-hi)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={14} color="var(--cyan)" />
                  </div>
                  {href ? (
                    <a href={href} style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', marginTop: '6px', transition: 'color 0.2s ease', wordBreak: 'break-all' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >{text}</a>
                  ) : (
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, color: `var(--white, #ffffff)`, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
              Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { day: 'Mon – Sat', time: '9:30 AM – 8:30 PM', open: true },
                { day: 'Sunday', time: '10:00 AM – 1:00 PM', open: true },
                { day: 'Emergency', time: 'WhatsApp 24/7', open: true },
              ].map(({ day, time, open }, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: `var(--text-muted, rgba(200,215,255,0.80))` }}>{day}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: `var(--success-color, #10b981)`, boxShadow: '0 0 6px #10b981' }} />
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,102,255,0.3) 30%, rgba(0,212,255,0.4) 50%, rgba(0,102,255,0.3) 70%, transparent)', marginBottom: '28px' }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
            © {new Date().getFullYear()} Saarthi Homeopathy. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <span key={link} style={{ fontSize: '13px', color: 'var(--text-dim)', cursor: 'pointer', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
              >{link}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Fotter
