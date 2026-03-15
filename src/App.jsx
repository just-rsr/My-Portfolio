import './App.css';
import Hero3D from './Hero3D';
import { useState, useEffect } from 'react';
import Loader from './components/Loader.jsx';
import { motion } from 'framer-motion';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';
import cruxlangImg from './assets/Cruxlang img.png'
import FintrekImg from './assets/Fintrek.png'
import RecipieReccom from './assets/Recipie recommendation.png'
import CEP from './assets/CEP.png'
import SNA from './assets/SNA.png'
const projects = [
  {
    title: 'Cruxlang',
    description: 'A Rust Based Compiler ',
      image: cruxlangImg,
    live: 'https://your-moonshot-app.com',
    github: 'https://github.com/just-rsr/CruxLang',
  },
  {
    title: 'Recipie Recommendation System',
    description: 'A Recipie Recommendation platform.',
    image: RecipieReccom,
    live: 'https://your-stellar-blog.com',
    github: 'https://github.com/just-rsr/Recipie-Recommendation-System',
  },
  {
    title: 'Fintrek - Personal Finance Tracker',
    description: 'A portfolio template that stands out.',
    image: FintrekImg,
    live: 'https://your-nebula-portfolio.com',
    github: 'https://github.com/just-rsr/Fintrek',
  },
   {
    title: 'Carbon Emission Predictor ',
    description: 'A Machine Learning Based Carbon Emission Predicter ',
    image: CEP,
    live: 'https://your-moonshot-app.com',
    github: 'https://github.com/just-rsr/Carbon-Emission-Predictor',
  },
  {
    title: 'Secure Notes Application  ',
    description: 'A Java Based Secure Notes Application',
    image: SNA,
    live: 'https://your-moonshot-app.com',
    github: 'https://github.com/just-rsr/Secure-Notes-Application',
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
