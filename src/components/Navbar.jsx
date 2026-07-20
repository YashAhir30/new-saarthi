import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Phone, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { assets } from "../assets/assets";
const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showMenu])

  const linkStyle = (isActive) => ({
    position: 'relative',
    padding: '8px 18px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: isActive ? 600 : 500,
    color: isActive ? `var(--white, #ffffff)` : `var(--text-muted, rgba(200,215,255,0.65))`,
    background: isActive ? 'rgba(0,102,255,0.22)' : 'transparent',
    border: isActive ? '1px solid rgba(0,102,255,0.35)' : '1px solid transparent',
    transition: 'all 0.25s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  })

  return (
    <>
      {/* ── Floating Navbar ── */}
      <nav
        className={`navbar-glass${scrolled ? ' scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: scrolled ? '12px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(calc(100% - 40px), 1100px)',
          zIndex: 1000,
          padding: scrolled ? '10px 20px' : '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'top 0.4s ease, padding 0.4s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <img
            src={assets.logo}
            alt="Saarthi Homeopathy"
            style={{
              height: scrolled ? "34px" : "40px",
              width: "auto",
              transition: "height 0.4s ease",
            }}
          />
        </button>

        {/* Desktop Links */}
        <ul
          className="desktop-nav"
          style={{ display: 'none', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <li style={linkStyle(isActive)}>
                  {label}
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)',
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0066FF, #00D4FF)',
                      boxShadow: '0 0 6px rgba(0,212,255,0.8)',
                    }} />
                  )}
                </li>
              )}
            </NavLink>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="tel:8733905727"
            className="btn-primary"
            style={{ fontSize: '13px', padding: '10px 22px', textDecoration: 'none' }}
            id="nav-call-btn"
          >
            <Phone size={14} />
            Call Us
          </a>

          <button
            onClick={toggleTheme}
            style={{
              background: `var(--glass-light, rgba(255,255,255,0.06))`,
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '14px',
              padding: '9px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: `var(--text-muted, rgba(200,215,255,0.80))`,
              transition: 'all 0.5s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: theme === 'dark' ? 'translateY(0)' : 'translateY(30px)',
              opacity: theme === 'dark' ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)',
              position: theme === 'dark' ? 'relative' : 'absolute',
            }}>
              <Moon size={20} />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: theme === 'light' ? 'translateY(0)' : 'translateY(-30px)',
              opacity: theme === 'light' ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)',
              position: theme === 'light' ? 'relative' : 'absolute',
            }}>
              <Sun size={20} />
            </div>
          </button>

          <button
            onClick={() => setShowMenu(true)}
            id="nav-hamburger"
            style={{
              background: theme === 'light' ? '#ffffff' : `var(--glass-light, rgba(255,255,255,0.06))`,
              border: theme === 'light' ? '1px solid #dbeafe' : '1px solid rgba(255,255,255,0.12)',
              borderRadius: '14px',
              padding: '9px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: theme === 'light' ? '#0f172a' : `var(--text-muted, rgba(200,215,255,0.80))`,
              boxShadow: theme === 'light' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.25s ease',
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <div
        className="mobile-nav-overlay"
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          display: 'flex', flexDirection: 'column', padding: '28px 24px',
          transform: showMenu ? 'translateX(0)' : 'translateX(100%)',
          transition: 'all 0.45s cubic-bezier(0.23,1,0.32,1)',
          background: theme === 'light' ? 'rgba(248, 251, 255, 0.95)' : 'rgba(5, 13, 26, 0.97)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
          <img
            src={assets.logo}
            alt="Saarthi"
            style={{ height: "38px" }}
          />
          <button onClick={() => setShowMenu(false)} style={{
            background: theme === 'light' ? '#ffffff' : `var(--glass-light, rgba(255,255,255,0.06))`,
            border: theme === 'light' ? '1px solid #dbeafe' : '1px solid rgba(255,255,255,0.12)',
            borderRadius: '14px', padding: '9px',
            cursor: 'pointer', color: theme === 'light' ? '#0f172a' : `var(--text-muted, rgba(200,215,255,0.80))`,
            boxShadow: theme === 'light' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
          }}>
            <X size={22} />
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {NAV_LINKS.map(({ to, label }, i) => (
            <NavLink key={to} to={to} onClick={() => setShowMenu(false)} style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <div style={{
                  padding: '20px 24px',
                  borderRadius: '16px',
                  fontSize: '22px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: isActive 
                    ? (theme === 'light' ? '#0284c7' : '#ffffff') 
                    : (theme === 'light' ? '#475569' : 'rgba(200,215,255,0.6)'),
                  background: isActive 
                    ? (theme === 'light' ? '#e0f2fe' : 'rgba(0,102,255,0.15)') 
                    : 'transparent',
                  borderLeft: isActive 
                    ? (theme === 'light' ? '3px solid #0284c7' : '3px solid #0066FF') 
                    : '3px solid transparent',
                  transition: 'all 0.25s ease',
                  animation: `fade-up 0.5s ease ${i * 0.08}s both`,
                }}>
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: theme === 'light' ? '#ffffff' : `var(--glass-light, rgba(255,255,255,0.06))`,
              border: theme === 'light' ? '1px solid #dbeafe' : '1px solid rgba(255,255,255,0.12)',
              borderRadius: '16px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              color: theme === 'light' ? '#0284c7' : `var(--white, #ffffff)`,
              boxShadow: theme === 'light' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              transition: 'all 0.5s ease',
            }}
          >
            {theme === 'dark' ? <><Moon size={20} /> Switch to Light Mode</> : <><Sun size={20} /> Switch to Dark Mode</>}
          </button>

          <a
            href="tel:8733905727"
            className="btn-primary"
            onClick={() => setShowMenu(false)}
            style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '17px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Phone size={18} />
            Call Us Now
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          #nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar
