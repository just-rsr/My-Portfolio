import { motion } from 'framer-motion';
import DSAVisualizer from './components/DSAVisualizer.jsx';

export default function Hero3D() {
  return (
    <div className="hero-enhanced" style={{ 
      width: '100%', 
      height: '100vh', 
      background: 'radial-gradient(circle at 60% 40%, #232946 0%, #16161a 100%)', 
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>

      {/* LEFT — text content */}
      <div className="hero-left" style={{ 
        position: 'relative',
        zIndex: 2,
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 clamp(2rem, 7vw, 8rem)',
      }}>

        {/* Name block */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          style={{ lineHeight: 1 }}
        >
          {/* "Ranit" — white */}
          <div style={{
            fontSize: 'clamp(4rem, 9vw, 8rem)',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
          }}>
            Ranit
          </div>

          {/* "Srivastava" — teal → purple gradient */}
          <div style={{
            fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            background: 'linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            whiteSpace: 'nowrap',
          }}>
            Srivastava
          </div>

          {/* "Software Engineer" — teal, left, tight below Srivastava */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
            style={{
              marginTop: '0.5rem',
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              fontWeight: 700,
              color: '#26d0ce',
              letterSpacing: '0.01em',
            }}
          >
            Software Engineer
          </motion.div>

          {/* Tagline — left, tight below Software Engineer */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
            style={{
              marginTop: '0.5rem',
              fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
              color: '#a8a8a8',
              lineHeight: 1.7,
              fontWeight: 400,
              textAlign: 'left',
            }}
          >
            Crafting digital experiences with 
        modern technologies and creative solutions
          </motion.p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
          style={{ display: 'flex', gap: '3rem', marginLeft:'5rem', marginTop: '3rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}
        >
          <a href="#projects">
            <motion.button
              className="hero-cta-enhanced"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.35)',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 15px 40px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                Explore My Work →
              </motion.span>
            </motion.button>
          </a>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent',
              color: '#e0e0e0',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '50px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            whileHover={{ scale: 1.05, y: -2, borderColor: 'rgba(255,255,255,0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            Resume ↓
          </motion.a>
        </motion.div>
      </div>

      {/* RIGHT — DSA Visualizer panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        className="hero-dsa-panel"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '60%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 clamp(1rem, 3vw, 3rem)',
        }}
      >
        <DSAVisualizer />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          color: '#a8a8a8',
          fontSize: '1.5rem'
        }}
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        ↓
      </motion.div>
    </div>
  );
}


