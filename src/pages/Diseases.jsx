import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Activity, Stethoscope } from 'lucide-react';
import { diseasesData } from '../data/diseases';
import useSEO from '../hooks/useSEO';
import ScrollReveal from '../components/animations/ScrollReveal';

// Extract unique categories
const categories = ["All", ...new Set(diseasesData.map(d => d.category))];

const Diseases = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useSEO({
    title: 'Explore Diseases & Treatments | Saarthi Homeopathy',
    description: 'Browse our comprehensive list of diseases and homeopathic treatments. Filter by category, symptoms, or search directly for your condition.',
    schemaData: {
      "@type": "MedicalWebPage",
      "name": "Diseases & Treatments Directory",
      "description": "Comprehensive list of diseases treated at Saarthi Homeopathy."
    }
  });

  // Debounce logic
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setIsLoading(false);
    }, 600); // 600ms debounce

    return () => clearTimeout(handler);
  }, [searchTerm, activeCategory]);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filter diseases based on search and category
  const filteredDiseases = useMemo(() => {
    return diseasesData.filter(disease => {
      const matchCategory = activeCategory === "All" || disease.category === activeCategory;
      const searchLower = debouncedSearch.toLowerCase();
      
      const matchSearch = 
        disease.title.toLowerCase().includes(searchLower) ||
        disease.category.toLowerCase().includes(searchLower) ||
        disease.symptoms.some(sym => sym.toLowerCase().includes(searchLower));
        
      return matchCategory && matchSearch;
    });
  }, [debouncedSearch, activeCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px,5vw,60px)' }}>
        
        {/* Header & Search */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <ScrollReveal>
            <div className="section-label" style={{ marginBottom: '20px', display: 'inline-flex' }}><Stethoscope size={14} /> Medical Directory</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>
              Find Your <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Treatment</span>
            </h1>
            
            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search diseases, symptoms, or categories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '20px 20px 20px 54px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--glass-border-hi)',
                  color: 'var(--text-main)',
                  fontSize: '16px',
                  outline: 'none',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-hi)'}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Categories */}
        <ScrollReveal delay={0.1}>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '40px', scrollbarWidth: 'none' }} className="hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '30px',
                  background: activeCategory === cat ? 'var(--cyan)' : 'rgba(255,255,255,0.05)',
                  color: activeCategory === cat ? '#0f172a' : 'var(--text-main)',
                  border: `1px solid ${activeCategory === cat ? 'var(--cyan)' : 'var(--glass-border)'}`,
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  boxShadow: activeCategory === cat ? '0 0 20px rgba(0,212,255,0.4)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal delay={0.2}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity size={24} color="var(--cyan)" /> 
            {searchTerm ? 'Search Results' : 'Most Common Diseases'}
          </h2>
        </ScrollReveal>

        {/* Grid / Skeletons */}
        <div style={{ minHeight: '400px' }}>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="glass-card" style={{ padding: '24px', height: '400px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '100%', height: '200px', background: 'var(--glass-bg)', borderRadius: '16px', marginBottom: '20px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    <div style={{ width: '60%', height: '24px', background: 'var(--glass-bg)', borderRadius: '8px', marginBottom: '12px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    <div style={{ width: '100%', height: '16px', background: 'var(--glass-bg)', borderRadius: '8px', marginBottom: '8px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    <div style={{ width: '80%', height: '16px', background: 'var(--glass-bg)', borderRadius: '8px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    <div style={{ marginTop: 'auto', width: '120px', height: '40px', background: 'var(--glass-bg)', borderRadius: '20px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                  </div>
                ))}
              </motion.div>
            ) : filteredDiseases.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}
              >
                {filteredDiseases.map((disease, i) => (
                  <motion.div 
                    key={disease.id}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    className="glass-card glass-card-hover" 
                    style={{ padding: '24px', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                    onClick={() => navigate(`/disease/${disease.slug}`)}
                  >
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--grad-primary)', filter: 'blur(60px)', opacity: 0.1, borderRadius: '50%' }} />
                    
                    <div style={{ width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', background: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={disease.heroImage} alt={disease.title} style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
                    </div>
                    
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                      {disease.category}
                    </span>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>{disease.title}</h3>
                    <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {disease.subtitle}
                    </p>
                    
                    <button className="btn-ghost" style={{ marginTop: 'auto', padding: '10px 0', width: 'fit-content', gap: '6px' }}>
                      Read More <ChevronRight size={16} />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="no-results"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="glass-card"
                style={{ padding: '60px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={40} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)' }}>No Diseases Found</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', lineHeight: 1.6 }}>
                  We couldn't find any results matching "{searchTerm}". Try adjusting your search terms or exploring the categories.
                </p>
                <button onClick={() => {setSearchTerm(''); setActiveCategory('All')}} className="btn-primary" style={{ marginTop: '12px' }}>
                  Clear Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};

export default Diseases;
