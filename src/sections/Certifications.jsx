import { motion } from 'framer-motion';
import Reveal from '../Reveal.jsx';

const certs = [
  {
    icon: '☁️',
    name: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    takeaway: 'Foundational cloud computing certification covering AWS core services, security, and architecture principles.',
    date: '2024',
    color: '#FF9900',
    links: [
      { label: 'View Certificate →', url: 'https://drive.google.com/file/d/19RAmjACfSns0RtInqWJ0LD6EYQ7zLED_/view?usp=sharing' }
    ],
  },
  {
    icon: '⭐',
    name: 'HackerRank Problem Solving',
    issuer: 'HackerRank',
    takeaway: '5★ Badge (Basic & Intermediate Certified) — demonstrating strong algorithmic thinking and coding proficiency.',
    date: '2024',
    color: '#00EA64',
    links: [
      { label: 'View Certificate →', url: 'https://www.hackerrank.com/certificates/e24fcd8cf49c' }
    ],
  },
  {
    icon: '🗄️',
    name: 'Infosys DBMS Certification',
    issuer: 'Infosys Springboard',
    takeaway: 'Relational databases, SQL, normalization, indexing, and transaction management — Level 1 & Level 2.',
    date: '2024',
    color: '#007CC3',
    links: [
      { label: 'DBMS L1 →', url: 'https://drive.google.com/file/d/1mZhtP3MFHFMzUa6RgnWQ5cuVzykKVBUY/view?usp=sharing' },
      { label: 'DBMS L2 →', url: 'https://drive.google.com/file/d/1sDMX27mzkBpdlpRNdEdmSPAJ2uWK3Is1/view?usp=sharing' },
    ],
  },
  {
    icon: '🌐',
    name: 'Web Development Certifications',
    issuer: 'Infosys Springboard',
    takeaway: 'Completed certifications in HTML5, CSS3, JavaScript, and Bootstrap — covering modern frontend fundamentals.',
    date: '2024',
    color: '#E34F26',
    links: [
      { label: 'HTML →', url: 'https://drive.google.com/file/d/1IPaBEQ14iphc15tQlvLO_lITVk73TPX6/view?usp=sharing' },
      { label: 'CSS →', url: 'https://drive.google.com/file/d/1q5z5iI3r0GqVqBC_5HYp7V2epNO2dMqg/view?usp=sharing' },
      { label: 'JavaScript →', url: 'https://drive.google.com/file/d/1qEDHRe4onPz1nht482KY8dPa5MDCB68X/view?usp=sharing' },
      { label: 'Bootstrap →', url: 'https://drive.google.com/file/d/16qwTq7veR8A373skjK8boYs7sJItNjNB/view?usp=sharing' },
    ],
  },  {
    icon: '☁️',
    name: 'Salesforce AI with Agentforce Champion',
    issuer: 'Salesforce Trailhead',
    takeaway: 'Cloud CRM fundamentals, business process automation, and AI with Agentforce platform basics.',
    date: '2024',
    color: '#00A1E0',
    links: [
      { label: 'View Certificate →', url: 'https://drive.google.com/file/d/1TaIjYX2Lc_299DK_kqL-dfhxcnGeyKsh/view?usp=sharing' }
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
  })
};

export default function Certifications() {
  return (
    <section className="cert-section">
      <div className="cert-bg" />
      <div className="cert-container">
        <Reveal>
          <h2 className="cert-title">Certifications</h2>
        </Reveal>
        <p className="cert-subtitle">Verified credentials and courses that shaped my thinking</p>

        <div className="cert-grid">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="cert-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              whileHover={{ y: -6, boxShadow: `0 16px 40px ${cert.color}33` }}
              style={{ borderColor: `${cert.color}33` }}
            >
              <div className="cert-card-top">
                <div className="cert-icon" style={{ background: `${cert.color}18`, color: cert.color }}>
                  {cert.icon}
                </div>
                <div className="cert-date">{cert.date}</div>
              </div>

              <h3 className="cert-name">{cert.name}</h3>
              <p className="cert-issuer" style={{ color: cert.color }}>{cert.issuer}</p>
              <p className="cert-takeaway">"{cert.takeaway}"</p>

              <div className="cert-links">
                {cert.links.map(l => (
                  <a
                    key={l.label}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                    style={{ color: cert.color, borderColor: `${cert.color}44` }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
