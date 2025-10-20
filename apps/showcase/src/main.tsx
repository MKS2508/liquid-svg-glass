import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { DebugPage } from './pages/DebugPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/liquid-svg-glass">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/debug" element={<DebugPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
