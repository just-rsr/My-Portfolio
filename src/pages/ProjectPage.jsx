import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projectsData';
import './ProjectPage.css';

export default function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);
  const sectionsRef = useRef(null);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      const el = sectionsRef.current;
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [projectId]);

  if (!project) return <div className="pp2-notfound">Project not found</div>;

  return (
    <div className="pp2-root">
      <button className="pp2-back" onClick={() => navigate(-1)}>← Back</button>

      <motion.div
        className="pp2-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ borderColor: `${project.color}44` }}
      >
        <div className="pp2-header-top">
          <div className="pp2-icon" style={{ background: `${project.color}18`, color: project.color }}>{project.icon}</div>
          <div>
            <h1 className="pp2-title" style={{ color: project.color }}>{project.title}</h1>
            <p className="pp2-tagline">{project.tagline}</p>
          </div>
        </div>

        <div className="pp2-tags">
          {project.tech.map(t => (
            <span key={t} className="pp2-tag" style={{ background: `${project.color}15`, color: project.color }}>{t}</span>
          ))}
        </div>

        <p className="pp2-highlight">💣 "{project.highlight}"</p>

        <div className="pp2-header-footer">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="pp2-github">GitHub ↗</a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="pp2-live" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}99)` }}>
              Live Demo →
            </a>
          )}
        </div>
      </motion.div>

      <div className="pp2-sections" ref={sectionsRef}>
        {project.sections.map((sec, i) => (
          <motion.div
            key={sec.label}
            className="pp2-section-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ borderColor: `${project.color}22` }}
          >
            <div className="pp2-section-label" style={{ color: project.color }}>{sec.label}</div>
            <p className="pp2-section-content">{sec.content}</p>
          </motion.div>
        ))}

        {project.images && project.images.length > 0 && (
          <motion.div
            className="pp2-section-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: project.sections.length * 0.08 }}
          >
            <div className="pp2-section-label" style={{ color: '#a8a8a8' }}>📝 My Diagrams & Notes</div>
            <p className="pp2-diagrams-intro">Step-by-step derivation and architecture diagrams from my notes.</p>
            <div className="pp2-images-grid">
              {project.images.map((img, i) => (
                <div key={i} className="pp2-diagram-card" onClick={() => setModalImg(img)}>
                  <img src={img.src} alt={img.caption} className="pp2-diagram-img" />
                  <div className="pp2-diagram-caption">{img.caption}</div>
                  {img.insight && (
                    <div className="pp2-diagram-insight">
                      <span className="pp2-insight-label">💡 Why this diagram</span>
                      <p>{img.insight}</p>
                    </div>
                  )}
                  <span className="pp2-diagram-expand">Click to expand ↗</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {modalImg && (
          <motion.div className="pp2-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalImg(null)}>
            <motion.div className="pp2-modal-content" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <button className="pp2-modal-close" onClick={() => setModalImg(null)}>✕</button>
              <img src={modalImg.src} alt={modalImg.caption} className="pp2-modal-img" />
              <div className="pp2-modal-caption">{modalImg.caption}</div>
              {modalImg.insight && (
                <div className="pp2-modal-insight">
                  <span className="pp2-insight-label">💡 Why this diagram</span>
                  <p>{modalImg.insight}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
