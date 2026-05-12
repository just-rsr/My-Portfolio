import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Problem Solving', href: '#problem-solving' },
  { label: 'Systems', href: '#systems' },
  { label: 'Certificates', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // highlight active section
      const offsets = navLinks.map(l => {
        const el = document.querySelector(l.href);
        return el ? { href: l.href, top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean);
      const current = offsets.filter(o => o.top <= 100).pop();
      if (current) setActive(current.href);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 2.4 }}
    >
      <div className="navbar-inner">
        {/* Logo */}
        <motion.a
          href="/"
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="navbar-logo-bracket">&lt;</span>
          RS
          <span className="navbar-logo-bracket">/&gt;</span>
        </motion.a>

        {/* Desktop links */}
        <div className="navbar-links">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`navbar-link ${active === link.href ? 'navbar-link-active' : ''}`}
              onClick={e => handleClick(e, link.href)}
            >
              {link.label}
              {active === link.href && (
                <motion.div className="navbar-link-dot" layoutId="navdot" />
              )}
            </a>
          ))}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-resume"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume ↓
          </motion.a>
        </div>

        {/* Hamburger */}
        <button className="navbar-hamburger" onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu">
          <motion.span className="bar" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} />
          <motion.span className="bar" animate={{ opacity: menuOpen ? 0 : 1 }} />
          <motion.span className="bar" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="navbar-mobile-link"
                onClick={e => handleClick(e, link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="navbar-mobile-resume">
              Download Resume ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
