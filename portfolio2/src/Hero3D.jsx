import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';

// Simple 3D Hero Section
function HeroSection() {
  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          position={[0, 2, 0]}
          fontSize={2}
          color="#ffd700"
          anchorX="center"
          anchorY="middle"
        >
          JESSE ZHOU
        </Text>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text
          position={[0, 0, 0]}
          fontSize={1}
          color="#26d0ce"
          anchorX="center"
          anchorY="middle"
        >
          Full Stack Developer
        </Text>
      </Float>
      
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6}>
        <Text
          position={[0, -2, 0]}
          fontSize={0.6}
          color="#e0e0e0"
          anchorX="center"
          anchorY="middle"
        >
          Building Digital Experiences
        </Text>
      </Float>
    </group>
  );
}

// Simple About Section
function AboutSection() {
  return (
    <group position={[0, -8, 0]}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.5}
          color="#ff6a00"
          anchorX="center"
          anchorY="middle"
        >
          About Me
        </Text>
      </Float>
    </group>
  );
}

// Simple Skills Section
function SkillsSection() {
  const skills = ['React', 'Node.js', 'TypeScript'];
  
  return (
    <group position={[0, -16, 0]}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text
          position={[0, 2, 0]}
          fontSize={1.5}
          color="#ff6a00"
          anchorX="center"
          anchorY="middle"
        >
          Skills
        </Text>
      </Float>
      
      {skills.map((skill, i) => (
        <Float key={skill} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={2}>
          <Text
            position={[
              Math.sin(i * 2) * 3,
              0,
              Math.cos(i * 2) * 2
            ]}
            fontSize={0.6}
            color="#26d0ce"
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        </Float>
      ))}
    </group>
  );
}

// Simple Projects Section
function ProjectsSection({ projects }) {
  return (
    <group position={[0, -24, 0]}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text
          position={[0, 2, 0]}
          fontSize={1.5}
          color="#ff6a00"
          anchorX="center"
          anchorY="middle"
        >
          Projects
        </Text>
      </Float>
      
      {projects.slice(0, 2).map((project, i) => (
        <Float key={project.title} speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <Text
            position={[
              Math.sin(i * 2) * 4,
              0,
              Math.cos(i * 2) * 2
            ]}
            fontSize={0.5}
            color="#fff"
            anchorX="center"
            anchorY="middle"
          >
            {project.title}
          </Text>
        </Float>
      ))}
    </group>
  );
}

// Simple Contact Section
function ContactSection() {
  return (
    <group position={[0, -32, 0]}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.5}
          color="#ff6a00"
          anchorX="center"
          anchorY="middle"
        >
          Contact
        </Text>
      </Float>
    </group>
  );
}

export default function Hero3D({ projects }) {
  return (
    <Canvas 
      camera={{ position: [0, 5, 15], fov: 75 }}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'radial-gradient(circle at 60% 40%, #232946 0%, #16161a 100%)'
      }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* All Sections in 3D Space */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        autoRotate={false}
        maxDistance={50}
        minDistance={5}
      />
    </Canvas>
  );
} 