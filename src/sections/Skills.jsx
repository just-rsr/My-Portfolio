import { motion } from 'framer-motion';
import Reveal from '../Reveal.jsx';

const skills = [
  { name: 'Java', icon: '☕', level: 85, color: '#f89820' },
{ name: 'Python', icon: '🐍', level: 90, color: '#3776AB' },
  { name: 'Rust', icon: '🦀', level: 90, color: '#DEA584' },
{ name: 'Machine Learning', icon: '🧮', level: 80, color: '#FF6F00' },
{ name: 'Artificial Intelligence', icon: '🤖', level: 75, color: '#8E44AD' },
{ name: 'LLM Engineering', icon: '🧠', level: 80, color: '#00A67E' },
{ name: 'System Design', icon: '🏗️', level: 85, color: '#3498DB' },
{ name: 'React', icon: '⚛️', level: 95, color: '#61DAFB' },
{ name: 'Node.js', icon: '🟢', level: 90, color: '#339933' },
  { name: 'TypeScript', icon: '📘', level: 88, color: '#3178C6' },
  { name: 'JavaScript', icon: '🟡', level: 95, color: '#F7DF1E' },
  { name: 'CSS3', icon: '🎨', level: 92, color: '#1572B6' },
  { name: 'HTML5', icon: '🌐', level: 90, color: '#E34F26' },
  { name: 'MongoDB', icon: '🍃', level: 85, color: '#47A248' },
  { name: 'PostgreSQL', icon: '🐘', level: 82, color: '#336791' },
  { name: 'Git', icon: '📝', level: 88, color: '#F05032' },
  { name: 'Docker', icon: '🐳', level: 80, color: '#2496ED' },
  { name: 'AWS', icon: '☁️', level: 75, color: '#FF9900' },
  { name: 'Monaco Editor', icon: '💻', level: 80, color: '#007ACC' },
{ name: 'Distributed Systems', icon: '🌐', level: 80, color: '#1ABC9C' },
{ name: 'Compiler Design', icon: '⚙️', level: 85, color: '#E67E22' }
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { rotate: 0, scale: 0.8 },
    visible: { 
      rotate: 360, 
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 0.3
      }
    }
  };

  return (
    <section className="skills-section">
      <motion.div
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Reveal>
          <motion.h2 
            className="skills-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>
        </Reveal>
        
        <motion.div 
          className="skills-grid"
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-item"
              variants={skillVariants}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                boxShadow: `0 15px 35px rgba(255, 106, 0, 0.3)`
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="skill-icon"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </div>
              <div className="skill-name">{skill.name}</div>
              <motion.div 
                className="skill-level"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div 
                  className="skill-progress"
                  style={{ backgroundColor: skill.color }}
                ></div>
              </motion.div>
              <span className="skill-percentage">{skill.level}%</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="skills-summary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            Continuously learning and adapting to new technologies. 
            Passionate about clean code, performance optimization, and user experience.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
} 