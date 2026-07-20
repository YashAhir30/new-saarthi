import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import reportWebVitals from './reportWebVitals'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/Saarthi-App/'>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
)

// Log metrics to console for monitoring (in production this could send to an analytics endpoint)
reportWebVitals(console.log);
