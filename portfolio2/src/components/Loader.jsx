import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper for ember particles
function EmberCanvas({ show }) {
  const canvasRef = useRef();
  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animation;
    const embers = Array.from({ length: 50 }, () => ({
      x: Math.random() * 320,
      y: 200 + Math.random() * 100,
      r: 3 + Math.random() * 3,
      a: 0.5 + Math.random() * 0.5,
      vy: -0.7 - Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.8,
      life: 0,
      maxLife: 80 + Math.random() * 60,
    }));
    function draw() {
      ctx.clearRect(0, 0, 320, 320);
      for (let ember of embers) {
        ctx.save();
        ctx.globalAlpha = ember.a * (1 - ember.life / ember.maxLife);
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'orange';
        ctx.shadowColor = '#ff6a00';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();
        ember.x += ember.vx;
        ember.y += ember.vy;
        ember.life++;
        if (ember.life > ember.maxLife) {
          ember.x = Math.random() * 320;
          ember.y = 200 + Math.random() * 100;
          ember.r = 3 + Math.random() * 3;
          ember.a = 0.5 + Math.random() * 0.5;
          ember.vy = -0.7 - Math.random() * 1.5;
          ember.vx = (Math.random() - 0.5) * 0.8;
          ember.life = 0;
          ember.maxLife = 80 + Math.random() * 60;
        }
      }
      animation = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animation);
  }, [show]);
  return <canvas ref={canvasRef} width={320} height={320} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }} />;
}

function NoiseOverlay() {
  // Simple animated noise overlay using canvas
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animation;
    function draw() {
      const w = 320, h = 320;
      const imageData = ctx.createImageData(w, h);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const shade = Math.floor(Math.random() * 60);
        imageData.data[i] = shade;
        imageData.data[i + 1] = shade;
        imageData.data[i + 2] = shade;
        imageData.data[i + 3] = 18;
      }
      ctx.putImageData(imageData, 0, 0);
      animation = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animation);
  }, []);
  return <canvas ref={canvasRef} width={320} height={320} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', mixBlendMode: 'soft-light' }} />;
}

function Vortex({ collapse }) {
  // SVG swirling vortex
  return (
    <motion.svg width="320" height="320" style={{ position: 'absolute', left: 0, top: 0 }}>
      <motion.g
        animate={collapse ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        {[...Array(7)].map((_, i) => (
          <motion.ellipse
            key={i}
            cx="160"
            cy="160"
            rx={120 - i * 14}
            ry={60 + i * 10}
            fill="none"
            stroke="#232946"
            strokeWidth={8 - i}
            style={{ filter: 'blur(2px)' }}
            animate={{
              rotate: [0, 360],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
        {/* Center swirl */}
        <motion.ellipse
          cx="160"
          cy="160"
          rx={collapse ? 0 : 38}
          ry={collapse ? 0 : 38}
          fill="#0a0a12"
          animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>
    </motion.svg>
  );
}

function Embers({ collapse }) {
  // Animated embers being sucked into the vortex
  const [embers, setEmbers] = useState(
    Array.from({ length: 18 }, () => ({
      x: Math.random() * 320,
      y: 320 + Math.random() * 40,
      r: 6 + Math.random() * 6,
      delay: Math.random() * 0.7,
    }))
  );
  return embers.map((ember, i) => (
    <motion.div
      key={i}
      style={{
        position: 'absolute',
        left: ember.x,
        top: ember.y,
        width: ember.r * 2,
        height: ember.r * 2,
        pointerEvents: 'none',
      }}
      animate={collapse ? {
        left: 160 - ember.r,
        top: 160 - ember.r,
        opacity: 0,
        scale: 0.2,
      } : {
        left: ember.x,
        top: ember.y,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1.2,
        delay: ember.delay,
        ease: 'easeInOut',
      }}
    >
      <svg width={ember.r * 2} height={ember.r * 2}>
        <circle
          cx={ember.r}
          cy={ember.r}
          r={ember.r}
          fill="url(#emberGradient)"
          opacity="0.8"
        />
        <defs>
          <radialGradient id="emberGradient" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="60%" stopColor="#ff6a00" />
            <stop offset="100%" stopColor="#ff003c" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  ));
}

function Typewriter({ text, delay = 0, speed = 60 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed((d) => text.slice(0, ++i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay, speed]);
  return <span>{displayed}</span>;
}

export default function Loader({ show = true }) {
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    if (!show) return;
    setCollapse(false);
    const timer = setTimeout(() => setCollapse(true), 1600);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'radial-gradient(circle at 60% 40%, #10121a 0%, #0a0a12 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', width: 320, height: 320 }}>
            <NoiseOverlay />
            <Vortex collapse={collapse} />
            <Embers collapse={collapse} />
            {/* Animated Name and Tagline */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                fontFamily: 'UnifrakturCook, Creepster, "Cinzel Decorative", serif',
                fontSize: 44,
                letterSpacing: 2,
                textShadow: '0 0 32px #ff6a00, 0 0 64px #ff003c',
                userSelect: 'none',
                pointerEvents: 'none',
                perspective: 400,
                textAlign: 'center',
              }}
              animate={collapse ? { scale: 0.7, opacity: 0, rotateY: 30 } : { scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <motion.span
                initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                style={{
                  display: 'block',
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #ffd700 0%, #ff6a00 50%, #ff003c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: 48,
                  marginBottom: 8,
                }}
              >
                JESSE ZHOU
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                style={{ fontSize: 20, fontFamily: 'monospace', color: '#fff', textShadow: '0 0 8px #ff6a00' }}
              >
                <Typewriter text={'Building Interactive Experiences'} delay={600} speed={40} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 