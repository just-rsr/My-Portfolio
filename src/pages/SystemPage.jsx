import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { systems } from '../data/systemsData';
import './SystemPage.css';

export default function SystemPage() {
  const { systemId } = useParams();
  const navigate = useNavigate();
  const system = systems.find(s => s.id === systemId);
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
  }, [systemId]);

  if (!system) return <div className="sp-notfound">System not found</div>;

  return (
    <div className="sp-root">
      <button className="sp-back" onClick={() => navigate('/#systems')}>← Back</button>

      <motion.div
        className="sp-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ borderColor: `${system.color}44` }}
      >
        <div className="sp-header-top">
          <div className="sp-icon" style={{ background: `${system.color}18` }}>{system.icon}</div>
          <div>
            <h1 className="sp-title" style={{ color: system.color === '#000000' ? '#e0e0e0' : system.color }}>
              {system.title}
            </h1>
            <p className="sp-tagline">{system.tagline}</p>
          </div>
        </div>

        <div className="sp-components">
          {system.components.map(c => (
            <span key={c} className="sp-tag" style={{ background: `${system.color}15`, color: system.color === '#000000' ? '#a8a8a8' : system.color }}>
              {c}
            </span>
          ))}
        </div>

        <div className="sp-challenges">
          <span className="sp-challenges-label">Key Challenges:</span>
          {system.challenges.map(ch => (
            <span key={ch} className="sp-challenge">⚡ {ch}</span>
          ))}
        </div>

        <div className="sp-header-footer">
          <p className="sp-highlight">💣 "{system.highlight}"</p>
          <a href={system.githubLink} target="_blank" rel="noopener noreferrer" className="sp-github">
            GitHub ↗
          </a>
        </div>
      </motion.div>

      <div className="sp-sections" ref={sectionsRef}>
        {system.sections.map((sec, i) => (
          <motion.div
            key={sec.label}
            className="sp-section-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ borderColor: `${system.color === '#000000' ? '#ffffff' : system.color}22` }}
          >
            <div className="sp-section-label" style={{ color: system.color === '#000000' ? '#26d0ce' : system.color }}>
              {sec.label}
            </div>
            <p className="sp-section-content">{sec.content}</p>
          </motion.div>
        ))}

        {system.images && system.images.length > 0 && (
          <motion.div
            className="sp-section-card sp-images-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: system.sections.length * 0.08 }}
          >
            <div className="sp-section-label" style={{ color: '#a8a8a8' }}>📝 My Diagrams & Derivations</div>
            <p className="sp-diagrams-intro">These diagrams represent my step-by-step derivation of the system from first principles.</p>
            <div className="sp-images-grid">
              {system.images.map((img, i) => (
                <div key={i} className="sp-diagram-card" onClick={() => setModalImg(img)}>
                  <img src={img.src} alt={img.caption} className="sp-diagram-img" />
                  <div className="sp-diagram-caption">{img.caption}</div>
                  {img.insight && (
                    <div className="sp-diagram-insight">
                      <span className="sp-insight-label">💡 Why this diagram</span>
                      <p>{img.insight}</p>
                    </div>
                  )}
                  <span className="sp-diagram-expand">Click to expand ↗</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalImg && (
          <motion.div
            className="sp-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImg(null)}
          >
            <motion.div
              className="sp-modal-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="sp-modal-close" onClick={() => setModalImg(null)}>✕</button>
              <img src={modalImg.src} alt={modalImg.caption} className="sp-modal-img" />
              <div className="sp-modal-caption">{modalImg.caption}</div>
              {modalImg.insight && (
                <div className="sp-modal-insight">
                  <span className="sp-insight-label">💡 Why this diagram</span>
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
