import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Fotter from './components/Fotter'
import { AppProvider } from './context/AppProvider'

const App = () => {
  return (
    <AppProvider>
      <Navbar />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/"       element={<Home />} />
          <Route path="/about"  element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Fotter />
      </div>
    </AppProvider>
  )
}

export default App
