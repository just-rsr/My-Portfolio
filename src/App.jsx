import './App.css';
import Hero3D from './Hero3D';
import { useState, useEffect } from 'react';
import Loader from './components/Loader.jsx';
import { motion } from 'framer-motion';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';

const projects = [
  {
    title: 'Moonshot App',
    description: 'A next-gen productivity tool with AI integration.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    live: 'https://your-moonshot-app.com',
    github: 'https://github.com/your/moonshot-app',
  },
  {
    title: 'Stellar Blog',
    description: 'A blazing fast, modern blog platform.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    live: 'https://your-stellar-blog.com',
    github: 'https://github.com/your/stellar-blog',
  },
  {
    title: 'Nebula Portfolio',
    description: 'A portfolio template that stands out.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    live: 'https://your-nebula-portfolio.com',
    github: 'https://github.com/your/nebula-portfolio',
  },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="portfolio-root">
      <Loader show={loading} />
      {!loading && (
        <div className="main-content">
          <Hero3D projects={projects} />
          <About />
          <Skills />
          <Projects projects={projects} />
          <Contact />
        </div>
      )}
    </div>
  );
}
