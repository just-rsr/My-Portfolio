import { motion } from 'framer-motion';
import Reveal from '../Reveal.jsx';
import SkillGraph from '../components/SkillGraph.jsx';

// Skill groups organized by how they're actually used together
const skillGroups = [
  {
    id: 'compiler',
    label: 'Compiler & Systems',
    context: 'Built CruxLang — a compiler from scratch',
    projectRef: 'CruxLang',
    projectLink: '#projects',
    proficiency: 'Production',
    proficiencyColor: '#26d0ce',
    skills: [
      { name: 'Rust', logo: 'https://cdn.simpleicons.org/rust/DEA584' },
      { name: 'Compiler Design', logo: null, dot: '#E67E22' },
      { name: 'LLVM', logo: null, dot: '#8E44AD' },
      { name: 'AST / Parsing', logo: null, dot: '#3498DB' },
    ],
  },
  {
    id: 'ml',
    label: 'ML & Data',
    context: 'Recipe recommender + Carbon emission predictor',
    projectRef: 'Recipe Rec, CEP',
    projectLink: '#projects',
    proficiency: 'Production',
    proficiencyColor: '#26d0ce',
    skills: [
      { name: 'Python', logo: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'Scikit-learn', logo: 'https://cdn.simpleicons.org/scikitlearn/F7931E' },
      { name: 'Pandas', logo: 'https://cdn.simpleicons.org/pandas/150458' },
      { name: 'Machine Learning', logo: null, dot: '#26d0ce' },
    ],
  },
  {
    id: 'fullstack',
    label: 'Full-Stack Web',
    context: 'Fintrek — finance tracker with analytics',
    projectRef: 'Fintrek',
    projectLink: '#projects',
    proficiency: 'Production',
    proficiencyColor: '#26d0ce',
    skills: [
      { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Express', logo: 'https://cdn.simpleicons.org/express/ffffff' },
    ],
  },
  {
    id: 'java-backend',
    label: 'Java Backend',
    context: 'Secure Notes — AES encryption + JWT auth',
    projectRef: 'Secure Notes',
    projectLink: '#projects',
    proficiency: 'Production',
    proficiencyColor: '#26d0ce',
    skills: [
      { name: 'Java', logo: 'https://cdn.simpleicons.org/openjdk/f89820' },
      { name: 'Spring Boot', logo: 'https://cdn.simpleicons.org/springboot/6DB33F' },
      { name: 'JWT / Auth', logo: null, dot: '#F05032' },
      { name: 'AES Encryption', logo: null, dot: '#8E44AD' },
    ],
  },
  {
    id: 'systems',
    label: 'System Design',
    context: 'Netflix, Uber, Payment system designs',
    projectRef: 'Systems Thinking',
    projectLink: '#systems',
    proficiency: 'Projects',
    proficiencyColor: '#a78bfa',
    skills: [
      { name: 'Distributed Systems', logo: null, dot: '#1ABC9C' },
      { name: 'Redis', logo: 'https://cdn.simpleicons.org/redis/FF4438' },
      { name: 'Kafka', logo: 'https://cdn.simpleicons.org/apachekafka/ffffff' },
      { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/336791' },
    ],
  },
  {
    id: 'ai-llm',
    label: 'AI & LLM Engineering',
    context: 'Building agent frameworks and RAG pipelines',
    projectRef: null,
    projectLink: null,
    proficiency: 'Production',
    proficiencyColor: '#26d0ce',
    skills: [
      { name: 'LLM Engineering', logo: null, dot: '#00A67E' },
      { name: 'RAG Pipelines', logo: null, dot: '#3498DB' },
      { name: 'Prompt Engineering', logo: null, dot: '#8E44AD' },
      { name: 'AI Agents', logo: null, dot: '#26d0ce' },
    ],
  },
  {
    id: 'infra',
    label: 'Infra & Tooling',
    context: 'Used across all projects for deployment and dev',
    projectRef: null,
    projectLink: null,
    proficiency: 'Comfortable',
    proficiencyColor: '#34d399',
    skills: [
      { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
      { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'AWS', logo: 'https://cdn.simpleicons.org/amazonwebservices/FF9900' },
      { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
    ],
  },
];

const proficiencyOrder = ['Production', 'Comfortable', 'Projects', 'Learning'];

function SkillLogo({ skill }) {
  if (skill.logo) {
    return (
      <img
        src={skill.logo}
        alt={skill.name}
        width={18}
        height={18}
        style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px', flexShrink: 0 }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: skill.dot || '#a8a8a8',
        marginRight: '8px',
        flexShrink: 0,
      }}
    />
  );
}

export default function Skills() {
  return (
    <section className="skills-section">
      <div className="skills-container">
        <Reveal>
          <motion.h2
            className="skills-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Skills & Stack
          </motion.h2>
        </Reveal>

        <Reveal>
          <p className="skills-personal-note">
            I learn by building — every tool here came from needing it to solve a real problem, not from following a roadmap.
          </p>
        </Reveal>

        {/* Proficiency legend */}
        <motion.div
          className="skills-legend"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Production', color: '#26d0ce', desc: 'shipped in real projects' },
            { label: 'Comfortable', color: '#34d399', desc: 'used regularly' },
            { label: 'Projects', color: '#a78bfa', desc: 'applied in designs/side work' },
            { label: 'Learning', color: '#fbbf24', desc: 'actively exploring' },
          ].map((p) => (
            <span key={p.label} className="skills-legend-item" title={p.desc}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block', marginRight: 6 }} />
              {p.label}
            </span>
          ))}
        </motion.div>

        {/* Bento-style grid — larger cards for Production groups */}
        <motion.div
          className="skills-bento"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.id}
              className={`skills-card skills-card--${group.proficiency.toLowerCase()}`}
              data-size={group.proficiency === 'Production' ? 'large' : 'normal'}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Header row */}
              <div className="skills-card__header">
                <span className="skills-card__label">{group.label}</span>
                <span
                  className="skills-card__proficiency"
                  style={{ color: group.proficiencyColor, borderColor: group.proficiencyColor + '44' }}
                >
                  {group.proficiency}
                </span>
              </div>

              {/* Context line */}
              <p className="skills-card__context">
                {group.projectRef ? (
                  <>
                    {group.projectLink ? (
                      <a href={group.projectLink} className="skills-card__ref">
                        {group.projectRef}
                      </a>
                    ) : (
                      <span className="skills-card__ref">{group.projectRef}</span>
                    )}
                    {' — '}
                  </>
                ) : null}
                {group.context}
              </p>

              {/* Skill tags */}
              <div className="skills-card__tags">
                {group.skills.map((skill) => (
                  <span key={skill.name} className="skills-tag">
                    <SkillLogo skill={skill} />
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Graph + Stack side by side */}
        <motion.div
          className="skills-bottom"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Left — graph */}
          <div className="skills-graph-wrapper">
            <div className="skills-graph-header">
              <span className="skills-graph-title">Skill Connections</span>
              <span className="skills-graph-hint">Hover a node · Drag to explore</span>
            </div>
            <SkillGraph />
          </div>

          {/* Right — stack */}
          <div className="skills-stack-wrapper">
            <div className="skills-graph-header">
              <span className="skills-graph-title">Skill Stack</span>
              <span className="skills-graph-hint">Foundation → Advanced</span>
            </div>

            <div className="skills-stack">
              {[
                {
                  tier: 'Advanced',
                  color: '#26d0ce',
                  width: '55%',
                  skills: ['Rust', 'Compiler Design', 'LLM Engineering', 'Distributed Systems'],
                },
                {
                  tier: 'Proficient',
                  color: '#a78bfa',
                  width: '70%',
                  skills: ['Python', 'Java', 'System Design', 'ML Pipelines', 'Spring Boot'],
                },
                {
                  tier: 'Comfortable',
                  color: '#34d399',
                  width: '82%',
                  skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'PostgreSQL', 'Redis'],
                },
                {
                  tier: 'Foundation',
                  color: '#fbbf24',
                  width: '100%',
                  skills: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Git', 'AWS'],
                },
              ].map((layer, i) => (
                <motion.div
                  key={layer.tier}
                  className="skills-stack__layer"
                  initial={{ opacity: 0, scaleX: 0.6 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  style={{ width: layer.width }}
                >
                  <div
                    className="skills-stack__block"
                    style={{
                      borderColor: layer.color + '55',
                      background: layer.color + '12',
                    }}
                  >
                    <span className="skills-stack__tier" style={{ color: layer.color }}>
                      {layer.tier}
                    </span>
                    <div className="skills-stack__pills">
                      {layer.skills.map(s => (
                        <span
                          key={s}
                          className="skills-stack__pill"
                          style={{ borderColor: layer.color + '44', color: '#d0d0e0' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* connector line down */}
                  {i < 3 && (
                    <div className="skills-stack__connector" style={{ borderColor: layer.color + '33' }} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

