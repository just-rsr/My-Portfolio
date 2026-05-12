import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TopicPage from './pages/TopicPage.jsx'
import ProblemPage from './pages/ProblemPage.jsx'
import SystemPage from './pages/SystemPage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dsa/:topicId" element={<TopicPage />} />
        <Route path="/dsa/:topicId/:problemName" element={<ProblemPage />} />
        <Route path="/systems/:systemId" element={<SystemPage />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
