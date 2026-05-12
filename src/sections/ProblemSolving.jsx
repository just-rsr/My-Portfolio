import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Reveal from '../Reveal.jsx';
import { topics } from '../data/dsaData';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' }
  })
};

export default function ProblemSolving() {
  const navigate = useNavigate();

  return (
    <section className="ps-section">
      <div className="ps-bg" />
      <div className="ps-container">
        <Reveal>
          <h2 className="ps-title">Problem Solving</h2>
        </Reveal>
        <p className="ps-subtitle">500+ Problems solved · Focused on Deriving Optimal Solutions From First Principles</p>

        <div className="ps-grid">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.name}
              className="ps-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              whileHover={{ y: -8, boxShadow: `0 20px 40px ${topic.color}33` }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/dsa/${topic.id}`)}
              style={{ borderColor: `${topic.color}22`, cursor: 'pointer' }}
            >
              <div className="ps-card-icon" style={{ background: `${topic.color}18`, color: topic.color }}>
                {topic.icon}
              </div>
              <div className="ps-card-body">
                <h3 className="ps-card-name">{topic.name}</h3>
                <span className="ps-card-patterns">{topic.patterns}</span>
              </div>
              <div className="ps-card-right">
                <div className="ps-card-count" style={{ color: topic.color }}>{topic.solved}+</div>
                <span className="ps-card-solved">solved</span>
                <span className="ps-card-view">View Problems →</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="https://leetcode.com/u/ranit_sri_80/"
          target="_blank"
          rel="noopener noreferrer"
          className="ps-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          View LeetCode Profile →
        </motion.a>
      </div>
    </section>
  );
}
