import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GridBackground from './backgrounds/GridBackground';
import styles from './About.module.css';

const icons = {
  bolt: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gc)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs><linearGradient id="gc" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00f0ff"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient></defs>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  shield: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gp)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs><linearGradient id="gp" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#f472b6"/></linearGradient></defs>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  cpu: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gb)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs><linearGradient id="gb" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#00f0ff"/></linearGradient></defs>
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
    </svg>
  ),
  crosshair: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gpk)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <defs><linearGradient id="gpk" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient></defs>
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
    </svg>
  ),
};

const features = [
  {
    icon: icons.bolt,
    title: 'Lightning Fast',
    desc: 'We optimize every millisecond. Our solutions are built for speed and performance from the ground up.',
  },
  {
    icon: icons.shield,
    title: 'Secure by Design',
    desc: 'Security is not an afterthought. We architect systems with enterprise-grade protection built in.',
  },
  {
    icon: icons.cpu,
    title: 'Future-Proof',
    desc: 'Built on cutting-edge technology stacks designed to scale with your business for years to come.',
  },
  {
    icon: icons.crosshair,
    title: 'Pixel Perfect',
    desc: 'Every interface we craft is meticulously designed with attention to detail that users can feel.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.about} id="about" ref={ref}>
      <GridBackground />
      <div className={styles.bgLine} />
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.label}>Who We Are</span>
            <h2 className="section-title">Building Tomorrow's Digital Landscape</h2>
            <p className="section-subtitle">
              Kenan & Kel is a forward-thinking development studio that transforms
              ambitious ideas into powerful digital products. We combine technical excellence
              with creative innovation to deliver solutions that matter.
            </p>
            <div className={styles.separator}>
              <div className={styles.separatorLine} />
              <div className={styles.separatorDot} />
              <div className={styles.separatorLine} />
            </div>
            <p className={styles.quote}>
              "We don't just write code — we engineer experiences that
              redefine what's possible in the digital realm."
            </p>
          </motion.div>

          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <span className={styles.cardIcon}>{f.icon}</span>
                <div>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <p className={styles.cardDesc}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
