import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Reveal from '../Reveal.jsx';
import { projects } from '../data/projectsData';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
  })
};

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section id="projects" className="proj-section">
      <div className="proj-bg" />
      <div className="proj-container">
        <Reveal>
          <h2 className="proj-title">Projects</h2>
        </Reveal>
        <p className="proj-subtitle">Things I've built — from compilers to ML systems</p>

        <div className="proj-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="proj-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              whileHover={{ y: -8, boxShadow: `0 20px 40px ${project.color}33` }}
              style={{ borderColor: `${project.color}33` }}
            >
              <div className="proj-card-top">
                <div className="proj-icon" style={{ background: `${project.color}18`, color: project.color }}>
                  {project.icon}
                </div>
                <div className="proj-card-meta">
                  <h3 className="proj-card-title">{project.title}</h3>
                  <p className="proj-card-tagline">{project.tagline}</p>
                </div>
              </div>

              <div className="proj-tags">
                {project.tech.map(t => (
                  <span key={t} className="proj-tag" style={{ background: `${project.color}15`, color: project.color }}>{t}</span>
                ))}
              </div>

              <p className="proj-highlight">"{project.highlight}"</p>

              <div className="proj-card-footer">
                <span
                  className="proj-view"
                  style={{ color: project.color, cursor: 'pointer' }}
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  View Full Design →
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-live"
                      style={{ background: `${project.color}22`, color: project.color, borderColor: `${project.color}44` }}
                    >
                      Live ↗
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-github"
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
