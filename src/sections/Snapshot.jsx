import { motion } from 'framer-motion';
import profilePhoto from '../../images/2213087 (1).jpg';
import './Snapshot.css';

const knownFor = [
  'Building ambitious systems projects from scratch',
  '500+ LeetCode problems, focus on graphs and dynamic programming',
  'Rust backend and systems development',
  'Compiler and database engineering',
  'Consistency in learning and execution',
  'Full-stack to systems — React frontends to Rust compilers',
];

export default function Snapshot() {
  return (
    <section className="snapshot-section">
      <div className="snapshot-container">

        {/* LEFT — identity text */}
        <motion.div
          className="snapshot-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* Role badge */}
          <div className="snapshot-role-badge">
            <span className="snapshot-role-dot" />
            Rust · Systems · ML · Full-Stack
          </div>

          {/* Values */}
          <div className="snapshot-block">
            <h3 className="snapshot-block-title">Values</h3>
            <p className="snapshot-block-text">
              I believe in discipline, consistency, and building things that create real impact.
              I value deep problem-solving, continuous learning, ownership, and high standards
              in both engineering and life. My focus is always on execution, growth, and
              long-term excellence.
            </p>
          </div>

          {/* What I Stand For */}
          <div className="snapshot-block">
            <h3 className="snapshot-block-title">What I Stand For</h3>
            <p className="snapshot-block-text">
              I stand for ambition, innovation, merit, and relentless self-improvement.
              I believe in creating rather than consuming, solving hard problems instead
              of avoiding them, and maintaining high standards in everything I build.
            </p>
          </div>

          {/* What I'm Known For */}
          <div className="snapshot-block">
            <h3 className="snapshot-block-title">What I'm Known For</h3>
            <ul className="snapshot-known-list">
              {knownFor.map((item, i) => (
                <motion.li
                  key={i}
                  className="snapshot-known-item"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  viewport={{ once: true }}
                >
                  <span className="snapshot-known-dot" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* RIGHT — photo */}
        <motion.div
          className="snapshot-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="snapshot-photo-wrapper">
            <div className="snapshot-photo-ring" />
            <img
              src={profilePhoto}
              alt="Ranit Srivastava"
              className="snapshot-photo"
            />
            <div className="snapshot-photo-label">
              <span className="snapshot-photo-label-dot" />
              Open to opportunities
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
