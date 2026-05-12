import { motion } from 'framer-motion';

export default function Projects({ projects }) {
  return (
    <section className="projects" id="projects">
      <h3>Featured Projects</h3>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.div
            className="project-card"
            key={project.title}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 48px #26d0cecc' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src={project.image} alt={project.title} />
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <div className="project-links">
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ background: '#fff', color: '#1a2980', scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Live Demo
              </motion.a>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ background: '#fff', color: '#1a2980', scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                GitHub
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 