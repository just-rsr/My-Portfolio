import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Reveal from '../Reveal.jsx';
import { systems } from '../data/systemsData';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
  })
};

export default function SystemsThinking() {
  const navigate = useNavigate();

  return (
    <section className="st-section">
      <div className="st-bg" />
      <div className="st-container">
        <Reveal>
          <h2 className="st-title">Systems Thinking</h2>
        </Reveal>
        <p className="st-subtitle">
          I follow a structured approach to break down complex systems into scalable, fault-tolerant components.
        </p>

        <div className="st-grid">
          {systems.map((system, i) => (
            <motion.div
              key={system.id}
              className="st-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              whileHover={{ y: -8, boxShadow: `0 20px 40px ${system.color}44` }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/systems/${system.id}`)}
              style={{ borderColor: `${system.color}33`, cursor: 'pointer' }}
            >
              <div className="st-card-top">
                <div className="st-card-icon" style={{ background: `${system.color}18` }}>
                  {system.icon}
                </div>
                <div className="st-card-meta">
                  <h3 className="st-card-title">{system.title}</h3>
                  <p className="st-card-tagline">{system.tagline}</p>
                </div>
              </div>

              <div className="st-card-components">
                {system.components.map(c => (
                  <span key={c} className="st-tag" style={{ background: `${system.color}15`, color: system.color === '#000000' ? '#a8a8a8' : system.color }}>
                    {c}
                  </span>
                ))}
              </div>

              <p className="st-card-highlight">"{system.highlight}"</p>

              <div className="st-card-footer">
                <span className="st-view" style={{ color: system.color === '#000000' ? '#26d0ce' : system.color }}>
                  View Full Design →
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {system.live && (
                    <a
                      href={system.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-live"
                      style={{ background: `${system.color === '#000000' ? '#26d0ce' : system.color}22`, color: system.color === '#000000' ? '#26d0ce' : system.color, borderColor: `${system.color === '#000000' ? '#26d0ce' : system.color}44` }}
                      onClick={e => e.stopPropagation()}
                    >
                      Live ↗
                    </a>
                  )}
                  <a
                    href={system.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="st-github"
                    onClick={e => e.stopPropagation()}
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
