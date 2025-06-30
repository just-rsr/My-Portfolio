import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function AnimatedLogo() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ffd700 0%, #ff6a00 50%, #ff003c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        color: 'white',
        boxShadow: '0 0 30px rgba(255, 106, 0, 0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        ⚛️
      </motion.div>
    </motion.div>
  );
}

function LoadingDots() {
  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '2rem' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffd700 0%, #ff6a00 50%, #ff003c 100%)',
            boxShadow: '0 0 10px rgba(255, 106, 0, 0.5)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export default function Loader({ show = true }) {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Initializing...",
    "Loading assets...",
    "Preparing experience...",
    "Almost ready..."
  ];

  useEffect(() => {
    if (!show) return;
    
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % texts.length);
    }, 800);

    return () => clearInterval(interval);
  }, [show, texts.length]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'radial-gradient(circle at 60% 40%, #232946 0%, #16161a 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>')`,
              opacity: 0.3,
              animation: 'float 20s ease-in-out infinite'
            }}
          />

          {/* Main Content */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Logo */}
            <AnimatedLogo />

            {/* Name */}
            <motion.h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 900,
                margin: '2rem 0 1rem 0',
                background: 'linear-gradient(135deg, #ffd700 0%, #ff6a00 50%, #ff003c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
                letterSpacing: '2px'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              JESSE
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                color: '#26d0ce',
                marginBottom: '2rem',
                fontWeight: 600,
                textAlign: 'center'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Full Stack Developer
            </motion.p>

            {/* Loading Text */}
            <motion.div
              style={{
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <span
                style={{
                  fontSize: '1.2rem',
                  color: '#a8a8a8',
                  fontFamily: 'monospace',
                  letterSpacing: '1px'
                }}
              >
                {texts[currentText]}
              </span>
            </motion.div>

            {/* Loading Dots */}
            <LoadingDots />
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #ffd700 0%, #ff6a00 50%, #ff003c 100%)',
                borderRadius: '2px'
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 