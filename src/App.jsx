import './App.css';
import Hero3D from './Hero3D';
import { useState, useEffect } from 'react';
import Loader from './components/Loader.jsx';
import Snapshot from './sections/Snapshot.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';
import ProblemSolving from './sections/ProblemSolving.jsx';
import SystemsThinking from './sections/SystemsThinking.jsx';
import Certifications from './sections/Certifications.jsx';
import Navbar from './components/Navbar.jsx';

export default function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('loaded'));

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('loaded', '1');
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div className="portfolio-root">
      <Loader show={loading} />
      {!loading && (
        <div className="main-content">
          <Navbar />
          <Hero3D />
          <Snapshot />
          <div id="about"><About /></div>
          <div id="skills"><Skills /></div>
          <div id="projects"><Projects /></div>
          <div id="problem-solving"><ProblemSolving /></div>
          <div id="systems"><SystemsThinking /></div>
          <div id="certifications"><Certifications /></div>
          <div id="contact"><Contact /></div>
        </div>
      )}
    </div>
  );
}
