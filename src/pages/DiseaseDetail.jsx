import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { diseasesData } from '../data/diseases';
import { specialityData, assets } from '../assets/assets';
import ScrollReveal from '../components/animations/ScrollReveal';
import useSEO from '../hooks/useSEO';
import { 
  ChevronRight, ArrowRight, Phone, CheckCircle2, 
  Activity, HeartPulse, Shield, Plus, Minus, Star, MapPin, Clock, AlertTriangle, ShieldCheck
} from 'lucide-react';

const Accordion = ({ question, answer, isOpen, onClick }) => (
  <div 
    onClick={onClick} 
    className="glass-card"
    style={{ 
      padding: '0', cursor: 'pointer', overflow: 'hidden', 
      marginBottom: '12px', transition: 'all 0.3s ease' 
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
      <h4 style={{ fontSize: '15px', fontWeight: 700, color: isOpen ? 'var(--cyan)' : 'var(--text-main)', margin: 0 }}>
        {question}
      </h4>
      <div style={{ color: isOpen ? 'var(--cyan)' : 'var(--text-muted)' }}>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </div>
    </div>
    <div style={{ 
      maxHeight: isOpen ? '300px' : '0', 
      overflow: 'hidden', 
      transition: 'max-height 0.45s ease',
      padding: isOpen ? '0 24px 24px' : '0 24px 0'
    }}>
      <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.7, color: 'var(--text-muted)' }}>{answer}</p>
    </div>
  </div>
);

const DiseaseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const disease = diseasesData.find(d => d.slug === slug);
  const [openFaq, setOpenFaq] = useState(0);

  useSEO({
    title: disease?.seo?.title || 'Disease Detail | Saarthi Homeopathy',
    description: disease?.seo?.description || 'Learn more about homeopathy treatment.'
  });

  if (!disease) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <h2 style={{ color: 'var(--text-main)' }}>Disease not found</h2>
      </div>
    );
  }

  const relatedDiseases = specialityData.filter(d => d.slug !== slug).slice(0, 4);

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        position: 'relative', overflow: 'hidden', padding: 'clamp(120px, 15vw, 180px) clamp(20px,5vw,60px) clamp(60px,10vw,100px)',
        background: 'var(--grad-hero)', borderRadius: '0 0 40px 40px'
      }}>
        {/* Background Meshes */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'var(--mesh-color-1)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'var(--mesh-color-2)', filter: 'blur(90px)' }} />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '32px', fontWeight: 600 }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => navigate('/')}>Home</span>
            <ChevronRight size={14} />
            <span>Diseases</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--cyan)' }}>{disease.title}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 500px' }}>
              <ScrollReveal>
                <div className="section-label" style={{ marginBottom: '20px' }}>
                  <HeartPulse size={12} /> Specialized Care
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: '24px' }}>
                  {disease.title}
                </h1>
                <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '540px' }}>
                  {disease.subtitle}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <button onClick={() => navigate('/contact')} className="btn-primary" style={{ padding: '16px 28px', fontSize: '15px' }}>
                    Book Consultation <ArrowRight size={16} />
                  </button>
                  <a href="tel:8733905727" className="btn-outline" style={{ padding: '16px 28px', fontSize: '15px', textDecoration: 'none' }}>
                    <Phone size={16} /> Call Now
                  </a>
                </div>
              </ScrollReveal>
            </div>
            
            <div style={{ flex: '1 1 350px', display: 'flex', justifyContent: 'center' }}>
              <ScrollReveal delay={0.2} style={{ position: 'relative' }}>
                <div style={{ width: '320px', height: '320px', borderRadius: '50%', background: 'var(--grad-icon)', padding: '40px', boxShadow: 'var(--shadow-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                  <img src={disease.heroImage} alt={disease.title} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,102,255,0.2))' }} />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px clamp(20px,5vw,60px)', display: 'flex', flexDirection: 'column', gap: '100px' }}>
        
        {/* 2. OVERVIEW */}
        <section>
          <ScrollReveal>
            <div className="section-label" style={{ marginBottom: '20px' }}>Overview</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>
              Understanding {disease.title}
            </h2>
            <div className="glass-card" style={{ padding: '32px 40px' }}>
              <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>
                {disease.overview}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. SYMPTOMS */}
        <section>
          <ScrollReveal>
            <div className="section-label" style={{ marginBottom: '20px' }}>Signs to watch for</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px' }}>
              Common Symptoms
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {disease.symptoms.map((sym, i) => (
                <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <CheckCircle2 size={24} color="var(--cyan)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '15.5px', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.5 }}>{sym}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 4. CAUSES */}
        <section>
          <ScrollReveal>
            <div className="section-label" style={{ marginBottom: '20px' }}>Why it happens</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px' }}>
              Root Causes & Risk Factors
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {disease.causes.map((cause, i) => (
                <div key={i} className="glass-card" style={{ padding: '32px 24px', borderTop: '3px solid var(--cyan)' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>{cause.title}</h4>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{cause.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 5. TYPES & 6. DIAGNOSIS (Two Columns) */}
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ flex: '1 1 400px' }}>
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>Types</h2>
              <div className="glass-card" style={{ padding: '32px 40px' }}>
                <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15.5px', lineHeight: 1.6 }}>
                  {disease.types.map((type, i) => <li key={i}>{type}</li>)}
                </ul>
              </div>
            </ScrollReveal>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <ScrollReveal delay={0.2}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>Diagnosis</h2>
              <div className="glass-card" style={{ padding: '32px 40px' }}>
                <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15.5px', lineHeight: 1.6 }}>
                  {disease.diagnosis.map((diag, i) => <li key={i}>{diag}</li>)}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 7. HOMEOPATHY APPROACH */}
        <section>
          <ScrollReveal>
            <div style={{ background: 'var(--grad-icon)', borderRadius: '32px', padding: 'clamp(40px,6vw,60px)', border: '1px solid var(--glass-border-hi)', boxShadow: 'var(--shadow-glow)' }}>
              <div className="section-label" style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.1)' }}>Our Approach</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--white, #fff)', marginBottom: '24px' }}>
                Homeopathic Treatment
              </h2>
              <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--white, #fff)', opacity: 0.9, margin: 0, maxWidth: '800px' }}>
                {disease.homeopathyTreatment}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* 9. BENEFITS */}
        <section>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px', textAlign: 'center' }}>
              Treatment Benefits
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {disease.benefits.map((benefit, i) => (
                <div key={i} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={20} color="#fff" />
                  </div>
                  <span style={{ fontSize: '15.5px', fontWeight: 600, color: 'var(--text-main)' }}>{benefit}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 10. DIET PLAN */}
        <section>
          <ScrollReveal>
            <div className="section-label" style={{ marginBottom: '20px', textAlign: 'center', display: 'block', margin: '0 auto 20px' }}>Nutrition</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '40px', textAlign: 'center' }}>
              Dietary Guidelines
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              {/* Eat */}
              <div style={{ flex: '1 1 400px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#10b981', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} /> Foods to Eat
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {disease.dietToEat.map((food, i) => (
                    <div key={i} style={{ padding: '16px 20px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px', color: 'var(--text-main)', fontSize: '15px', fontWeight: 500 }}>
                      {food}
                    </div>
                  ))}
                </div>
              </div>
              {/* Avoid */}
              <div style={{ flex: '1 1 400px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ef4444', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertTriangle size={20} /> Foods to Avoid
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {disease.foodsToAvoid.map((food, i) => (
                    <div key={i} style={{ padding: '16px 20px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '16px', color: 'var(--text-main)', fontSize: '15px', fontWeight: 500 }}>
                      {food}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 11. LIFESTYLE TIPS */}
        <section>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px' }}>
              Lifestyle Modifications
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {disease.lifestyleTips.map((tip, i) => (
                <div key={i} className="glass-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', margin: '0 auto 16px', borderRadius: '50%', background: 'rgba(0,102,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)' }}>
                    <Activity size={24} />
                  </div>
                  <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px' }}>{tip.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{tip.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 12. DOCTOR ADVICE */}
        <section>
          <ScrollReveal>
            <div className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '40px', gap: '40px' }}>
              <div style={{ flexShrink: 0, width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--glass-border)', boxShadow: 'var(--shadow-glow)' }}>
                <img src={assets.profile_pic} alt="Dr. Yogin Baldaniya" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Dr. Yogin Baldaniya
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--cyan)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Chief Homeopathic Physician</p>
                <blockquote style={{ fontSize: '18px', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--text-muted)', margin: 0, borderLeft: '4px solid var(--cyan)', paddingLeft: '20px' }}>
                  "{disease.doctorAdvice}"
                </blockquote>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 14. FAQ */}
        <section>
          <ScrollReveal>
            <div className="section-label" style={{ marginBottom: '20px' }}>Common Questions</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {disease.faq.map((item, i) => (
                <Accordion 
                  key={i} 
                  question={item.q} 
                  answer={item.a} 
                  isOpen={openFaq === i} 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                />
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 8. BEFORE & AFTER (Placeholders) & 13. TESTIMONIALS (Placeholders) */}
        {/* Skipping heavy visual placeholders to keep clean, integrating minimal reviews */}
        <section>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px', textAlign: 'center' }}>
              Patient Success Stories
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card" style={{ padding: '32px 28px' }}>
                  <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}>
                    <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                  </div>
                  <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px' }}>
                    "The homeopathic treatment completely changed my approach to dealing with my condition. The care and attention from Dr. Yogin was exceptional."
                  </p>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>— Verified Patient</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 15. RELATED DISEASES */}
        <section>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>
              Explore Other Specialities
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {relatedDiseases.map((rel, i) => (
                <div key={i} onClick={() => navigate(`/disease/${rel.slug}`)} className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', flex: '1 1 250px' }}>
                  <img src={rel.image} alt={rel.speciality} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>{rel.speciality}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 16. BOOK CONSULTATION CTA */}
        <section>
          <ScrollReveal>
            <div style={{ background: 'var(--grad-hero)', borderRadius: '32px', padding: 'clamp(40px,8vw,80px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'var(--mesh-color-1)', filter: 'blur(60px)', opacity: 0.5, pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
                  Experiencing Similar Symptoms?
                </h2>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                  Don't ignore early signs. Book your consultation today and take the first step towards holistic healing.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <button onClick={() => navigate('/contact')} className="btn-primary" style={{ padding: '18px 32px', fontSize: '16px' }}>
                    Book Appointment
                  </button>
                  <a href="tel:8733905727" className="btn-outline" style={{ padding: '18px 32px', fontSize: '16px', textDecoration: 'none' }}>
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 17. CLINIC INFO & 18. DISCLAIMER */}
        <section>
          <ScrollReveal>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginBottom: '60px' }}>
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'var(--text-main)' }}>
                  <MapPin size={20} color="var(--cyan)" />
                  <h4 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Clinic Location</h4>
                </div>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, paddingLeft: '32px' }}>
                  1st Floor, Saarthi Complex, Near Medical College,<br />Gujarat, India
                </p>
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'var(--text-main)' }}>
                  <Clock size={20} color="var(--cyan)" />
                  <h4 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Working Hours</h4>
                </div>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, paddingLeft: '32px' }}>
                  Monday - Saturday: 9:00 AM - 8:00 PM<br />Sunday: Closed
                </p>
              </div>
            </div>
            
            <div style={{ padding: '24px', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6, opacity: 0.7 }}>
                <strong>Medical Disclaimer:</strong> The information provided on this page is intended for educational purposes only and should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personalized guidance regarding any medical condition. Homeopathic treatment efficacy varies by individual.
              </p>
            </div>
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
};

export default DiseaseDetail;
