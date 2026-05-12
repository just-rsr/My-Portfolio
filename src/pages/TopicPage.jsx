import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { topics } from '../data/dsaData';
import './TopicPage.css';

const difficultyColor = { Easy: '#47A248', Medium: '#6366f1', Hard: '#06b6d4' };

export default function TopicPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = topics.find(t => t.id === topicId);
  const problemsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      const el = problemsRef.current;
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [topicId]);

  if (!topic) return <div className="tp-notfound">Topic not found</div>;

  return (
    <div className="tp-root">
      <div className="tp-header" style={{ borderColor: topic.color }}>
        <button className="tp-back" onClick={() => navigate(-1)}>← Back</button>
        <div className="tp-header-content">
          <span className="tp-icon">{topic.icon}</span>
          <div>
            <h1 className="tp-title" style={{ color: topic.color }}>{topic.name}</h1>
            <p className="tp-patterns">Core patterns: {topic.patterns}</p>
          </div>
          <div className="tp-count" style={{ color: topic.color }}>{topic.solved}+ solved</div>
        </div>
        <div className="tp-links">
          <a href={topic.leetcodeLink} target="_blank" rel="noopener noreferrer" className="tp-link lc">LeetCode Profile →</a>
          <a href={topic.githubLink} target="_blank" rel="noopener noreferrer" className="tp-link gh">GitHub Solutions →</a>
        </div>
      </div>

      <div className="tp-body">
        <h2 className="tp-section-title" ref={problemsRef}>Featured Problems <span>(with full approach)</span></h2>
        <div className="tp-curated">
          {topic.curated.map((p, i) => (
            <motion.div
              key={p.name}
              className="tp-problem-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/dsa/${topicId}/${encodeURIComponent(p.name)}`)}
              style={{ borderColor: `${topic.color}33`, cursor: 'pointer' }}
            >
              <div className="tp-problem-header">
                <span className="tp-problem-name">{p.name}</span>
                <span className="tp-difficulty" style={{ color: difficultyColor[p.difficulty] }}>{p.difficulty}</span>
              </div>
              <p className="tp-problem-pattern">Pattern: {p.pattern}</p>
              <p className="tp-problem-complexity">{p.complexity}</p>
              <span className="tp-view">View Approach →</span>
            </motion.div>
          ))}
        </div>

        <h2 className="tp-section-title">All Problems</h2>
        <div className="tp-all">
          {topic.allProblems.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="tp-all-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ borderColor: `${topic.color}22` }}
            >
              <span>{p.name}</span>
              <span className="tp-all-arrow" style={{ color: topic.color }}>↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}


