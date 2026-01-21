import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import 'highlight.js/styles/github-dark-dimmed.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProjectsPage from './pages/ProjectsPage'
import NotesPage from './pages/NotesPage'
import NoteDetailPage from './pages/NoteDetailPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:slug" element={<NoteDetailPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
