import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { topics } from '../data/dsaData';
import './ProblemPage.css';

const difficultyColor = { Easy: '#47A248', Medium: '#6366f1', Hard: '#FF003C' };

export default function ProblemPage() {
  const { topicId, problemName } = useParams();
  const navigate = useNavigate();
  const topic = topics.find(t => t.id === topicId);
  const problem = topic?.curated.find(p => p.name === decodeURIComponent(problemName));

  if (!problem) return <div className="pp-notfound">Problem not found</div>;

  const cards = [
    { label: '🧠 Intuition', content: problem.intuition, color: '#6366f1' },
    { label: '❌ Brute Force', content: problem.brute, color: '#6366f1' },
    { label: '🚀 Optimal Approach', content: problem.optimal, color: '#47A248' },
    { label: '🔥 Key Insight', content: problem.keyInsight, color: '#FFD700' },
  ];

  return (
    <div className="pp-root">
      <button className="pp-back" onClick={() => navigate(-1)}>← Back to {topic.name}</button>

      <motion.div className="pp-header" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pp-title-row">
          <h1 className="pp-title">{problem.name}</h1>
          <span className="pp-difficulty" style={{ color: difficultyColor[problem.difficulty] }}>{problem.difficulty}</span>
        </div>
        <div className="pp-meta">
          <span className="pp-tag" style={{ background: `${topic.color}22`, color: topic.color }}>Pattern: {problem.pattern}</span>
          <span className="pp-tag" style={{ background: 'rgba(255,255,255,0.05)', color: '#a8a8a8' }}>⏱ {problem.complexity}</span>
        </div>
        <a href={problem.link} target="_blank" rel="noopener noreferrer" className="pp-lc-link">View on LeetCode ↗</a>
      </motion.div>

      <div className="pp-cards">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            className="pp-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            style={{ borderColor: `${card.color}33` }}
          >
            <div className="pp-card-label" style={{ color: card.color }}>{card.label}</div>
            <p className="pp-card-content">{card.content}</p>
          </motion.div>
        ))}

        {problem.image && (
          <motion.div
            className="pp-card pp-derivation"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="pp-card-label" style={{ color: '#a8a8a8' }}>📝 My Derivation</div>
            <img src={problem.image} alt={`${problem.name} derivation`} className="pp-derivation-img" />
          </motion.div>
        )}
      </div>
    </div>
  );
}


