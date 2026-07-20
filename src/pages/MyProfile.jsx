import React, { useState } from 'react'
import { Camera, Mail, Phone, MapPin, User, Calendar, Save, Edit3 } from 'lucide-react'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Yogin Baldaniya',
    image: './src/assets/yoginAppoinment.jpg',
    email: 'yoginbaldaniya30@gmail.com',
    phone: '+91 8238905727',
    address: { line1: '51, nandanvan row house', line2: 'surat, gujarat, india' },
    gender: 'Male',
    dob: '2000-10-30',
  })
  const [isEdit, setIsEdit] = useState(false)

  const inp = {
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '14px',
  }

  const InfoRow = ({ icon: Icon, label, children }) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px 0', borderBottom: `1px solid var(--glass-border)` }}>
      <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '12px', background: `var(--glass-light, rgba(0,102,255,0.12))`, border: `1px solid var(--glass-border-hi)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
        <Icon size={15} color="var(--cyan)" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>{label}</p>
        {children}
      </div>
    </div>
  )

  return (
    <div style={{ background: 'var(--navy)', paddingTop: '80px', minHeight: '100vh' }}>
      <div aria-hidden style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 500, borderRadius: '50%', background: `var(--mesh-color-2, radial-gradient(ellipse, rgba(0,102,255, 0.1), transparent 65%))`, filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(40px,5vw,60px) clamp(20px,5vw,40px)', position: 'relative', zIndex: 1, animation: 'fade-up 0.7s ease 0.1s both' }}>

        {/* Profile header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', padding: '4px', background: 'linear-gradient(135deg, #0066FF, #00D4FF)', boxShadow: '0 0 0 4px rgba(0,102,255,0.15), 0 12px 30px rgba(0,102,255,0.25)' }}>
              <img src={userData.image} alt={userData.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            {isEdit && (
              <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #0066FF, #00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,102,255,0.40)' }}>
                <Camera size={14} color={'var(--text-main)'} />
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            {isEdit ? (
              <input className="form-input" type="text" value={userData.name} onChange={e => setUserData(p => ({ ...p, name: e.target.value }))} style={{ ...inp, fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '4px', padding: '10px 16px' }} />
            ) : (
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>{userData.name}</h1>
            )}
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Saarthi Homoeopathy Patient</p>
          </div>
          <button
            onClick={() => setIsEdit(!isEdit)}
            className={isEdit ? 'btn-primary' : 'btn-ghost'}
            style={{ padding: '10px 22px', fontSize: '14px' }}
          >
            {isEdit ? <><Save size={14} /> Save</> : <><Edit3 size={14} /> Edit</>}
          </button>
        </div>

        {/* Info card */}
        <div className="glass-card" style={{ padding: '8px 28px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '2px', textTransform: 'uppercase', padding: '20px 0 4px' }}>Contact Information</p>

          <InfoRow icon={Mail} label="Email">
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{userData.email}</p>
          </InfoRow>

          <InfoRow icon={Phone} label="Phone">
            {isEdit ? (
              <input className="form-input" type="tel" value={userData.phone} onChange={e => setUserData(p => ({ ...p, phone: e.target.value }))} style={inp} />
            ) : (
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{userData.phone}</p>
            )}
          </InfoRow>

          <InfoRow icon={MapPin} label="Address">
            {isEdit ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input className="form-input" type="text" value={userData.address.line1} onChange={e => setUserData(p => ({ ...p, address: { ...p.address, line1: e.target.value } }))} style={inp} />
                <input className="form-input" type="text" value={userData.address.line2} onChange={e => setUserData(p => ({ ...p, address: { ...p.address, line2: e.target.value } }))} style={inp} />
              </div>
            ) : (
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{userData.address.line1}<br />{userData.address.line2}</p>
            )}
          </InfoRow>

          <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '2px', textTransform: 'uppercase', padding: '20px 0 4px' }}>Basic Information</p>

          <InfoRow icon={User} label="Gender">
            {isEdit ? (
              <select value={userData.gender} onChange={e => setUserData(p => ({ ...p, gender: e.target.value }))} style={{ ...inp, width: 'auto' }} onFocus={foc} onBlur={bl}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{userData.gender}</p>
            )}
          </InfoRow>

          <InfoRow icon={Calendar} label="Date of Birth">
            {isEdit ? (
              <input className="form-input" type="date" value={userData.dob} onChange={e => setUserData(p => ({ ...p, dob: e.target.value }))} style={{ ...inp, width: 'auto', colorScheme: 'dark' }} />
            ) : (
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{userData.dob}</p>
            )}
          </InfoRow>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
