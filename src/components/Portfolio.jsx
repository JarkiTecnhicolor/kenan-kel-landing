import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingShapes from './backgrounds/FloatingShapes';
import styles from './Portfolio.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Nova Finance',
    category: 'FinTech Platform',
    desc: 'Next-generation banking dashboard with real-time analytics, AI-powered insights, and seamless transaction management.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AI'],
    color: '#00f0ff',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'Pulse Health',
    category: 'Health & Wellness',
    desc: 'Comprehensive health tracking app with wearable integration, personalized workout plans, and nutrition analytics.',
    tags: ['React Native', 'Firebase', 'ML', 'Wearables'],
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    title: 'Verdant Eco',
    category: 'Sustainability',
    desc: 'Carbon footprint tracking platform for enterprises with automated reporting and actionable reduction strategies.',
    tags: ['Next.js', 'Python', 'AWS', 'Data Viz'],
    color: '#10b981',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=500&fit=crop',
  },
  {
    id: 4,
    title: 'Stellar Commerce',
    category: 'E-Commerce',
    desc: 'Headless e-commerce platform with AR product previews, AI recommendations, and global payment processing.',
    tags: ['Next.js', 'Stripe', 'AR', 'Microservices'],
    color: '#f472b6',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  },
];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeProject, setActiveProject] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${projects.length * 100}%`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const idx = Math.min(
          Math.floor(self.progress * projects.length),
          projects.length - 1
        );
        setActiveProject(idx);
        if (progressRef.current) {
          progressRef.current.style.height = `${self.progress * 100}%`;
        }
      },
    });

    return () => trigger.kill();
  }, []);

  const project = projects[activeProject];

  return (
    <section className={styles.portfolio} id="portfolio" ref={sectionRef}>
      <FloatingShapes />
      <div className={styles.bgGlow} style={{ background: project.color }} />

      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.label}>Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
        </motion.div>

        <div className={styles.showcase}>
          {/* Progress bar */}
          <div className={styles.progress}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} ref={progressRef} />
            </div>
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`${styles.progressDot} ${i <= activeProject ? styles.progressDotActive : ''}`}
                style={{ top: `${(i / (projects.length - 1)) * 100}%` }}
              />
            ))}
          </div>

          {/* Image */}
          <div className={styles.imageWrap}>
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`${styles.image} ${i === activeProject ? styles.imageActive : ''}`}
              >
                <img src={p.image} alt={p.title} />
                <div className={styles.imageOverlay} style={{ background: `linear-gradient(135deg, ${p.color}22, transparent)` }} />
              </div>
            ))}
            <div className={styles.imageBorder} style={{ borderColor: `${project.color}40` }} />
          </div>

          {/* Info */}
          <div className={styles.info}>
            <div className={styles.counter}>
              <span className={styles.counterCurrent} style={{ color: project.color }}>
                {String(activeProject + 1).padStart(2, '0')}
              </span>
              <span className={styles.counterSep}>/</span>
              <span className={styles.counterTotal}>
                {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            <div className={styles.category} style={{ color: project.color }}>
              {project.category}
            </div>

            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDesc}>{project.desc}</p>

            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={styles.tag}
                  style={{ borderColor: `${project.color}30`, color: project.color }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <button className={styles.viewBtn} style={{ borderColor: `${project.color}50`, color: project.color }}>
              View Case Study
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
