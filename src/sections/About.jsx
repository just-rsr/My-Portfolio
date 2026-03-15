import { motion } from 'framer-motion';
import Reveal from '../Reveal.jsx';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="about-section">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
      >
        <Reveal>
          <motion.h2 
            className="about-title"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
        </Reveal>
        
        <motion.div 
          className="about-content"
          variants={itemVariants}
        >
          <motion.div 
            className="about-avatar"
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              boxShadow: "0 25px 50px rgba(255, 106, 0, 0.4)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              👨‍💻
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="about-text"
            variants={itemVariants}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Hi! I'm <span className="highlight">Ranit</span>, Software Engineer passionate about building scalable systems and intelligent applications. I enjoy solving complex problems and turning ideas into efficient, real-world software.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              My expertise includes <span className="tech-highlight">Data Structures & Algorithms</span>, 
    <span className="tech-highlight"> Artificial Intelligence & Machine Learning</span>, and <span className="tech-highlight"> Modern Backend and Web Development.  </span> 
    
              I build applications that not only look great but also provide exceptional 
              user experiences. I'm always eager to learn new technologies and take on 
              challenging projects that push the boundaries of what's possible on the web.
            </motion.p>
            <motion.div 
              className="about-stats"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Leetcode Questions</span>
              </div>
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 