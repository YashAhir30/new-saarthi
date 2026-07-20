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
    color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
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
            alt="Saarthi Homoeopathy"
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
              background: `var(--glass-light, var(--glass-light))`,
              border: '1px solid var(--glass-border)',
              borderRadius: '14px',
              padding: '9px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
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
            className={theme === 'light' ? 'mobile-menu-btn-light' : ''}
            style={{
              background: `var(--glass-light, var(--glass-light))`,
              border: '1px solid var(--glass-border)',
              borderRadius: '14px',
              padding: '9px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
              transition: 'all 0.25s ease',
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer Overlay & Container ── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(15,23,42,0.35)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: showMenu ? 1 : 0,
          pointerEvents: showMenu ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        onClick={() => setShowMenu(false)}
      >
        {/* ── Mobile Side Drawer ── */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`mobile-nav-drawer ${theme === 'light' ? 'mobile-drawer-light' : ''}`}
          style={{
            position: 'absolute', top: '16px', bottom: '16px', right: '16px',
            borderRadius: '24px',
            display: 'flex', flexDirection: 'column', padding: '24px 20px',
            transform: showMenu ? 'translateX(0)' : 'translateX(120%)',
            transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
            background: theme === 'dark' ? '#0F172A' : undefined,
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : undefined,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <img
              src={assets.logo}
              alt="Saarthi"
              style={{ height: "32px" }}
            />
            <button onClick={() => setShowMenu(false)} className={theme === 'light' ? 'mobile-menu-btn-light' : ''} style={{
              background: `var(--glass-light, var(--glass-light))`,
              border: '1px solid var(--glass-border)',
              borderRadius: '12px', padding: '8px',
              cursor: 'pointer', color: 'var(--text-muted)',
              transition: 'all 0.25s ease',
            }}>
              <X size={20} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {NAV_LINKS.map(({ to, label }, i) => (
              <NavLink key={to} to={to} onClick={() => setShowMenu(false)} style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                  <div 
                    className={theme === 'light' ? `mobile-nav-link-light ${isActive ? 'active' : ''}` : ''}
                    style={{
                    padding: '14px 18px',
                    borderRadius: '14px',
                    fontSize: '18px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    color: theme === 'dark' ? (isActive ? 'var(--text-main)' : 'rgba(200,215,255,0.6)') : undefined,
                    background: theme === 'dark' ? (isActive ? 'rgba(0,102,255,0.15)' : 'transparent') : undefined,
                    borderLeft: theme === 'dark' ? (isActive ? '3px solid #0066FF' : '3px solid transparent') : undefined,
                    transition: 'all 0.25s ease',
                    animation: showMenu ? `fade-up 0.4s ease ${i * 0.05}s both` : 'none',
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
            className={theme === 'light' ? 'theme-btn-light' : ''}
            style={{
              background: `var(--glass-light, var(--glass-light))`,
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              color: 'var(--text-main)',
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
            className={theme === 'light' ? 'call-btn-light' : 'btn-primary'}
            onClick={() => setShowMenu(false)}
            style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '17px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Phone size={16} />
            Call Us Now
          </a>
        </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          #nav-hamburger { display: none !important; }
          .mobile-nav-drawer { max-width: 360px !important; }
        }
        .mobile-nav-drawer {
          width: 75%;
          max-width: 320px;
        }
        .mobile-menu-btn-light {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          color: #0f172a !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
        }
        .mobile-menu-btn-light:hover {
          background: #f8fafc !important;
          border-color: #3b82f6 !important;
          color: #2563eb !important;
        }
        .mobile-drawer-light {
          background: rgba(255, 255, 255, 0.96) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid #e2e8f0 !important;
          box-shadow: -10px 0 30px rgba(0,0,0,0.05) !important;
        }
        .mobile-nav-link-light {
          color: #334155 !important;
          border-left: 3px solid transparent !important;
        }
        .mobile-nav-link-light:hover {
          background: #f8fafc !important;
          color: #0284c7 !important;
        }
        .mobile-nav-link-light.active {
          background: #e0f2fe !important;
          border-left: 3px solid #0284c7 !important;
          color: #0284c7 !important;
        }
        .theme-btn-light {
          background: linear-gradient(135deg, #0ea5e9, #38bdf8) !important;
          color: #ffffff !important;
          border: none !important;
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3) !important;
        }
        .theme-btn-light:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4) !important;
        }
        .call-btn-light {
          background: linear-gradient(135deg, #0ea5e9, #38bdf8) !important;
          border-radius: 9999px !important;
          color: #ffffff !important;
          border: none !important;
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3) !important;
          transition: all 0.3s ease;
        }
        .call-btn-light:hover {
          box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  )
}

export default Navbar
