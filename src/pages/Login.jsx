import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, UserPlus, Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { assets } from '../assets/assets'

const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--text-muted)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '8px',
  }
  const baseInput = {
    padding: '15px 44px 15px 44px',
    borderRadius: '14px',
  }

  const FieldWrap = ({ icon: Icon, children, right }) => (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', zIndex: 1 }}>
        <Icon size={16} />
      </div>
      {children}
      {right && (
        <button type="button" onClick={right.action} style={{ position: 'absolute', top: '50%', right: '14px', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
          {right.icon}
        </button>
      )}
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--navy)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 20px 60px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div aria-hidden style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 500, borderRadius: '50%', background: `var(--mesh-color-2, radial-gradient(ellipse, rgba(0,102,255, 0.1), transparent 65%))`, filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: `var(--mesh-color-2, radial-gradient(circle, rgba(0,212,255, 0.1), transparent 65%))`, filter: 'blur(70px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px', animation: 'fade-up 0.7s ease 0.1s both' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <img src={assets.logo} alt="Saarthi Homoeopathy" style={{ height: '44px', marginBottom: '24px' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: '8px' }}>
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {state === 'Sign Up' ? 'Join Saarthi for personalised care' : 'Sign in to your account'}
          </p>
        </div>

        <div className="glass-card" style={{ padding: 'clamp(28px,4vw,40px)' }}>
          <form onSubmit={onSubmitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {state === 'Sign Up' && (
              <div>
                <label style={labelStyle}>Full Name</label>
                <FieldWrap icon={User}>
                  <input className="form-input" type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your full name" style={baseInput} />
                </FieldWrap>
              </div>
            )}

            <div>
              <label style={labelStyle}>Email Address</label>
              <FieldWrap icon={Mail}>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" style={baseInput} />
              </FieldWrap>
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <FieldWrap icon={Lock} right={{ action: () => setShowPass(!showPass), icon: showPass ? <EyeOff size={16} /> : <Eye size={16} /> }}>
                <input className="form-input" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={{ ...baseInput, paddingRight: '44px' }} />
              </FieldWrap>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px', marginTop: '8px' }}>
              {state === 'Sign Up' ? <><UserPlus size={17} /> Create Account</> : <><LogIn size={17} /> Sign In</>}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', borderTop: `1px solid var(--glass-border)`, paddingTop: '24px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              {state === 'Sign Up' ? 'Already have an account? ' : 'New here? '}
              <button
                onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyan)', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-body)', padding: 0 }}
              >
                {state === 'Sign Up' ? 'Sign in' : 'Create account'} <ArrowRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
