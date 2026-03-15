import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

function TorusKnot() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.9, 0.35, 128, 32]} />
        <meshStandardMaterial
          color="#26d0ce"
          metalness={0.7}
          roughness={0.25}
          emissive="#1a2980"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="hero-enhanced" style={{ 
      width: '100%', 
      height: '100vh', 
      background: 'radial-gradient(circle at 60% 40%, #232946 0%, #16161a 100%)', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 3D Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <TorusKnot />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Enhanced Text Overlay */}
      <div className="hero-content-enhanced" style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 2rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="hero-title-enhanced"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 900,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #ffd700 0%, #ff6a00 50%, #ff003c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-shift 3s ease-in-out infinite'
            }}
            animate={{ 
              scale: [1, 1.02, 1],
              filter: ['drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))', 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))', 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))']
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            RANIT SRIVASTAVA
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.h2 
            className="hero-subtitle-enhanced"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#26d0ce',
              marginBottom: '0.5rem',
              fontWeight: 600
            }}
            animate={{ 
              x: [0, 5, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Software Engineer
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.p 
            className="hero-tagline-enhanced"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#a8a8a8',
              marginBottom: '2rem',
              fontWeight: 400,
              maxWidth: '600px'
            }}
            animate={{ 
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Crafting digital experiences with modern technologies and creative solutions
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <a href="#projects">
          <motion.button
            className="hero-cta-enhanced"
            style={{
              background: 'linear-gradient(135deg, #ff6a00, #ff003c)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(255, 106, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: '0 15px 40px rgba(255, 106, 0, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
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
              Explore My Work →
            </motion.span>
          </motion.button></a>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="floating-elements"
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            fontSize: '2rem',
            opacity: 0.3
          }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ⚛️
        </motion.div>

        <motion.div
          className="floating-elements"
          style={{
            position: 'absolute',
            bottom: '30%',
            left: '10%',
            fontSize: '2rem',
            opacity: 0.3
          }}
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🚀
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          color: '#a8a8a8',
          fontSize: '1.5rem'
        }}
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ↓
      </motion.div>
    </div>
  );
} 