import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Fotter from './components/Fotter'
import { AppProvider } from './context/AppProvider'
import ScrollToTop from './components/ScrollToTop'

// Lazy load the dynamic disease pages
const DiseaseDetail = lazy(() => import('./pages/DiseaseDetail'))
const Diseases = lazy(() => import('./pages/Diseases'))

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Suspense fallback={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--glass-border)', borderTopColor: '#0066FF', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        }>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/"       element={<Home />} />
              <Route path="/about"  element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/diseases" element={<Diseases />} />
              <Route path="/disease/:slug" element={<DiseaseDetail />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Fotter />
      </div>
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
