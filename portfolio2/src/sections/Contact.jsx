import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <h3>Contact</h3>
      <p>Let's build something amazing together!</p>
      <motion.a
        className="contact-btn"
        href="mailto:jane.doe@email.com"
        whileHover={{ background: 'linear-gradient(90deg, #fff 0%, #26d0ce 100%)', color: '#1a2980', scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Email Me
      </motion.a>
    </section>
  );
} 