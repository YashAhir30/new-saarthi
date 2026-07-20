import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Fotter from './components/Fotter'
import { AppProvider } from './context/AppProvider'
import ScrollToTop from './components/ScrollToTop'

// Lazy load the dynamic disease detail page
const DiseaseDetail = lazy(() => import('./pages/DiseaseDetail'))

const App = () => {
  return (
    <AppProvider>
      <ScrollToTop />
      <Navbar />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Suspense fallback={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--glass-border)', borderTopColor: '#0066FF', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        }>
          <Routes>
            <Route path="/"       element={<Home />} />
            <Route path="/about"  element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/disease/:slug" element={<DiseaseDetail />} />
          </Routes>
        </Suspense>
        <Fotter />
      </div>
    </AppProvider>
  )
}

export default App
