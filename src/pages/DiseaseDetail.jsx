import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { diseasesData } from '../data/diseases';
import { specialityData, assets } from '../assets/assets';
import ScrollReveal from '../components/animations/ScrollReveal';
import useSEO from '../hooks/useSEO';
import { 
  ChevronRight, ArrowRight, Phone, CheckCircle2, Activity, HeartPulse, 
  ShieldCheck, Plus, Minus, Star, MapPin, Clock, AlertTriangle, 
  Share2, Printer, Download, ThumbsUp, ThumbsDown, Calendar, 
  Clock3, X, ChevronLeft, Shield, Award, CheckCircle, FileText
} from 'lucide-react';

const Accordion = ({ question, answer, isOpen, onClick }) => (
  <div onClick={onClick} className="glass-card" style={{ padding: '0', cursor: 'pointer', overflow: 'hidden', marginBottom: '12px', transition: 'all 0.3s ease' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
      <h4 style={{ fontSize: '15px', fontWeight: 700, color: isOpen ? 'var(--cyan)' : 'var(--text-main)', margin: 0 }}>{question}</h4>
      <div style={{ color: isOpen ? 'var(--cyan)' : 'var(--text-muted)' }}>{isOpen ? <Minus size={18} /> : <Plus size={18} />}</div>
    </div>
    <div style={{ maxHeight: isOpen ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.45s ease', padding: isOpen ? '0 24px 24px' : '0 24px 0' }}>
      <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.7, color: 'var(--text-muted)' }}>{answer}</p>
    </div>
  </div>
);

const Lightbox = ({ image, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: '30px', right: '30px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}>
        <X size={24} />
      </button>
      <button onClick={onPrev} style={{ position: 'absolute', left: '30px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '16px', borderRadius: '50%', cursor: 'pointer' }}>
        <ChevronLeft size={32} />
      </button>
      <motion.img 
        initial={{ scale: 0.9 }} animate={{ scale: 1 }}
        src={image} alt="Enlarged" 
        style={{ maxWidth: '90%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '16px' }} 
      />
      <button onClick={onNext} style={{ position: 'absolute', right: '30px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '16px', borderRadius: '50%', cursor: 'pointer' }}>
        <ChevronRight size={32} />
      </button>
    </motion.div>
  );
};

const DiseaseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const disease = diseasesData.find(d => d.slug === slug);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Reading Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useSEO({
    title: disease?.seo?.title || 'Disease Detail | Saarthi Homeopathy',
    description: disease?.seo?.description || 'Learn more about homeopathy treatment.',
    schemaData: disease ? {
      "@type": "MedicalCondition",
      "name": disease.title,
      "description": disease.overview,
      "signOrSymptom": disease.symptoms.map(s => ({ "@type": "MedicalSymptom", "name": s })),
      "possibleTreatment": {
        "@type": "MedicalTherapy",
        "name": "Constitutional Homeopathy",
        "description": disease.homeopathyTreatment
      }
    } : null
  });

  // Scroll Spy & Scroll to Top logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });
      if(current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!disease) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Disease not found</div>;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if(el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({ title: disease.title, url: window.location.href });
    }
  };

  const printArticle = () => window.print();
  const downloadPdf = () => {
    alert("To save as PDF, please change the 'Destination' in the print dialog to 'Save as PDF'.");
    window.print();
  };

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'symptoms', label: 'Symptoms' },
    { id: 'causes', label: 'Causes' },
    { id: 'types', label: 'Types & Diagnosis' },
    { id: 'treatment', label: 'Homeopathy' },
    { id: 'gallery', label: 'Before & After' },
    { id: 'faq', label: 'FAQ' }
  ];

  const relatedDiseases = diseasesData.filter(d => d.slug !== slug).slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '60px', position: 'relative' }}
    >
      {/* Reading Progress Bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--grad-primary)', transformOrigin: '0%', scaleX, zIndex: 1000 }} />

      {/* Floating Buttons */}
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence>
          {showScrollTop && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="glass-card" style={{ padding: '14px', borderRadius: '50%', cursor: 'pointer', border: '1px solid var(--glass-border-hi)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={24} style={{ transform: 'rotate(-90deg)', color: 'var(--cyan)' }} />
            </motion.button>
          )}
        </AnimatePresence>
        <button onClick={() => navigate('/contact')} className="btn-primary" style={{ padding: '16px 24px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,102,255,0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Phone size={18} /> <span style={{ display: window.innerWidth > 768 ? 'block' : 'none' }}>Book Consultation</span>
        </button>
      </div>

      <AnimatePresence>
        {lightboxImg && (
          <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} onNext={() => setLightboxImg(lightboxImg)} onPrev={() => setLightboxImg(lightboxImg)} />
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(120px, 15vw, 180px) clamp(20px,5vw,60px) clamp(60px,10vw,100px)', background: 'var(--grad-hero)', borderRadius: '0 0 40px 40px' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'var(--mesh-color-1)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'var(--mesh-color-2)', filter: 'blur(90px)' }} />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '32px', fontWeight: 600 }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => navigate('/')}>Home</span> <ChevronRight size={14} />
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => navigate('/diseases')}>Diseases</span> <ChevronRight size={14} />
            <span style={{ color: 'var(--cyan)' }}>{disease.title}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 500px' }}>
              <ScrollReveal>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <div className="section-label"><HeartPulse size={12} /> {disease.category}</div>
                  <div className="section-label" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', borderColor: 'rgba(16,185,129,0.2)' }}><Clock3 size={12} /> {disease.readTime}</div>
                  <div className="section-label" style={{ background: 'rgba(255,255,255,0.05)' }}><Calendar size={12} /> Updated: {disease.lastUpdated}</div>
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: '24px' }}>
                  {disease.title}
                </h1>
                <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '540px' }}>
                  {disease.subtitle}
                </p>
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                  <button onClick={() => navigate('/contact')} className="btn-primary" style={{ padding: '16px 28px', fontSize: '15px' }}>
                    Consult Doctor <ArrowRight size={16} />
                  </button>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={shareArticle} className="btn-ghost" title="Share" style={{ padding: '12px', borderRadius: '50%' }}><Share2 size={18} /></button>
                    <button onClick={printArticle} className="btn-ghost" title="Print" style={{ padding: '12px', borderRadius: '50%' }}><Printer size={18} /></button>
                    <button onClick={downloadPdf} className="btn-ghost" title="Download PDF" style={{ padding: '12px', borderRadius: '50%' }}><FileText size={18} /></button>
                  </div>
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
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '60px clamp(20px,5vw,60px)', display: 'flex', alignItems: 'flex-start', gap: '60px' }}>
        
        {/* Left Sidebar - Sticky TOC */}
        <aside style={{ flex: '0 0 240px', position: 'sticky', top: '100px', display: window.innerWidth > 1024 ? 'block' : 'none' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)', marginBottom: '16px' }}>Table of Contents</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sections.map(s => (
                <li key={s.id}>
                  <button 
                    onClick={() => scrollTo(s.id)}
                    style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '14.5px', fontWeight: activeSection === s.id ? 700 : 500, color: activeSection === s.id ? 'var(--cyan)' : 'var(--text-muted)', transition: 'color 0.3s' }}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right Content */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '80px', minWidth: 0 }}>
          
          <section id="overview">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>Overview</h2>
              <div className="glass-card" style={{ padding: '32px' }}>
                <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--text-muted)', margin: 0 }}>{disease.overview}</p>
              </div>
            </ScrollReveal>
          </section>

          <section id="symptoms">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px' }}>Common Symptoms</h2>
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

          <section id="causes">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px' }}>Causes & Risk Factors</h2>
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

          <section id="types" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            <div style={{ flex: '1 1 300px' }}>
              <ScrollReveal>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>Types</h2>
                <div className="glass-card" style={{ padding: '32px' }}>
                  <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15.5px', lineHeight: 1.6 }}>
                    {disease.types.map((type, i) => <li key={i}>{type}</li>)}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <ScrollReveal delay={0.2}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>Diagnosis</h2>
                <div className="glass-card" style={{ padding: '32px' }}>
                  <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15.5px', lineHeight: 1.6 }}>
                    {disease.diagnosis.map((diag, i) => <li key={i}>{diag}</li>)}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section id="treatment">
            <ScrollReveal>
              <div style={{ background: 'var(--grad-icon)', borderRadius: '32px', padding: 'clamp(40px,6vw,60px)', border: '1px solid var(--glass-border-hi)', boxShadow: 'var(--shadow-glow)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>Homeopathic Treatment</h2>
                <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#fff', opacity: 0.9, margin: 0, maxWidth: '800px' }}>{disease.homeopathyTreatment}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {disease.benefits.map((benefit, i) => (
                  <div key={i} className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><ShieldCheck size={18} color="#fff" /></div>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* Lightbox Gallery */}
          {disease.beforeAfterGallery && disease.beforeAfterGallery.length > 0 && (
            <section id="gallery">
              <ScrollReveal>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px' }}>Clinical Results</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {disease.beforeAfterGallery.map((item, i) => (
                    <React.Fragment key={i}>
                      <div className="glass-card glass-card-hover" onClick={() => setLightboxImg(item.before)} style={{ overflow: 'hidden', padding: 0, cursor: 'pointer', position: 'relative' }}>
                        <span style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, zIndex: 1 }}>BEFORE</span>
                        <img src={item.before} alt="Before Treatment" style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.4s' }} />
                      </div>
                      <div className="glass-card glass-card-hover" onClick={() => setLightboxImg(item.after)} style={{ overflow: 'hidden', padding: 0, cursor: 'pointer', position: 'relative' }}>
                        <span style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, zIndex: 1 }}>AFTER</span>
                        <img src={item.after} alt="After Treatment" style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.4s' }} />
                      </div>
                      <p style={{ gridColumn: '1 / -1', fontSize: '15px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', margin: '8px 0 0' }}>"{item.caption}"</p>
                    </React.Fragment>
                  ))}
                </div>
              </ScrollReveal>
            </section>
          )}

          {/* Trust & Doctor Section */}
          <section>
            <ScrollReveal>
              <div className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '40px', gap: '40px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--cyan)', filter: 'blur(80px)', opacity: 0.1, borderRadius: '50%' }} />
                <div style={{ flexShrink: 0, width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--glass-border)' }}>
                  <img src={assets.profile_pic} alt="Dr. Yogin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1 1 300px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Dr. Yogin Baldaniya</h3>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}><Award size={14} color="var(--cyan)"/> BHMS</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}><Shield size={14} color="var(--cyan)"/> 10+ Years Exp</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}><CheckCircle size={14} color="var(--cyan)"/> 5000+ Happy Patients</span>
                  </div>
                  <blockquote style={{ fontSize: '16px', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--text-muted)', margin: 0, borderLeft: '3px solid var(--cyan)', paddingLeft: '16px' }}>
                    "{disease.doctorAdvice}"
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>
          </section>

          <section id="faq">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px' }}>Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {disease.faq.map((item, i) => (
                  <Accordion key={i} question={item.q} answer={item.a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* Feedback & CTA */}
          <section style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '40px' }}>
            <ScrollReveal>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', marginBottom: '60px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>Was this article helpful?</span>
                  {!feedbackGiven ? (
                    <>
                      <button onClick={() => setFeedbackGiven(true)} className="btn-ghost" style={{ padding: '8px 16px', fontSize: '14px' }}><ThumbsUp size={16} /> Yes</button>
                      <button onClick={() => setFeedbackGiven(true)} className="btn-ghost" style={{ padding: '8px 16px', fontSize: '14px' }}><ThumbsDown size={16} /> No</button>
                    </>
                  ) : (
                    <span style={{ color: 'var(--cyan)', fontSize: '14px', fontWeight: 600 }}>Thank you for your feedback!</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>Share:</span>
                  <button onClick={shareArticle} className="btn-ghost" style={{ padding: '10px', borderRadius: '50%' }}><Share2 size={16} /></button>
                </div>
              </div>

              <div style={{ background: 'var(--grad-hero)', borderRadius: '32px', padding: 'clamp(40px,8vw,80px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'var(--mesh-color-1)', filter: 'blur(60px)', opacity: 0.5, pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 40px)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>Still suffering from {disease.title.toLowerCase()}?</h2>
                  <p style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>Book your consultation today and receive personalized, root-cause homeopathic treatment from anywhere in the world.</p>
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <button onClick={() => navigate('/contact')} className="btn-primary" style={{ padding: '16px 32px' }}>Book Appointment</button>
                    <a href="tel:8733905727" className="btn-outline" style={{ padding: '16px 32px', textDecoration: 'none' }}>Call Now</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Related Diseases */}
          <section>
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>Related Treatments</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {relatedDiseases.map((rel, i) => (
                  <div key={i} onClick={() => navigate(`/disease/${rel.slug}`)} className="glass-card glass-card-hover" style={{ padding: '24px', cursor: 'pointer', textAlign: 'center' }}>
                    <img src={rel.heroImage} alt={rel.title} style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '16px' }} />
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>{rel.title}</h4>
                    <span style={{ fontSize: '13px', color: 'var(--cyan)', fontWeight: 600 }}>Read More &rarr;</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

        </div>
      </div>
    </motion.div>
  );
};

export default DiseaseDetail;
