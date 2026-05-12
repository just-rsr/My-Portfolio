import { motion } from 'framer-motion';
import Reveal from '../Reveal.jsx';

export default function Contact() {
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

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'hi.ranitworks@gmail.com',
      link: 'hi.ranitworks@email.com',
      color: '#6366f1'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/ranit-srivastava',
      link: 'https://www.linkedin.com/in/ranit-srivastava/',
      color: '#0077B5'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'github.com/just-rsr',
      link: 'https://github.com/just-rsr',
      color: '#333'
    }
  ];

  return (
    <section className="contact-section">
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
      >
        <Reveal>
          <motion.h2 
            className="contact-title"
            variants={itemVariants}
          >
            Let's Connect
          </motion.h2>
        </Reveal>
        
        <motion.div
          className="contact-content"
          variants={itemVariants}
        >
          <motion.p 
            className="contact-text"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            I'm always interested in new opportunities and exciting projects. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </motion.p>
          
          <motion.div 
            className="contact-methods"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.link}
                className="contact-method"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: `0 10px 25px ${method.color}40`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="contact-icon"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ color: method.color }}
                >
                  {method.icon}
                </motion.div>
                <div className="contact-info">
                  <span className="contact-label">{method.label}</span>
                  <span className="contact-value">{method.value}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div
            className="contact-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:hi.ranitworks@gmail.com?subject=Opportunity%20for%20you"
              className="contact-button"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 15px 35px rgba(38, 208, 206, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                animate={{ 
                  x: [0, 5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Get In Touch →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 

