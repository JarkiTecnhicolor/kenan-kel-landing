import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import NeuralBackground from './backgrounds/NeuralBackground';
import TiltCard from './TiltCard';
import styles from './Services.module.css';

const services = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'Full-stack web applications built with React, Next.js, and Node.js. From landing pages to complex SaaS platforms.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    gradient: 'linear-gradient(135deg, #00f0ff, #3b82f6)',
  },
  {
    num: '02',
    title: 'Mobile Apps',
    desc: 'Cross-platform mobile applications with native performance. iOS and Android from a single codebase.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    gradient: 'linear-gradient(135deg, #8b5cf6, #f472b6)',
  },
  {
    num: '03',
    title: 'UI/UX Design',
    desc: 'User-centered design that converts. Wireframes, prototypes, and polished interfaces that users love.',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'Motion'],
    gradient: 'linear-gradient(135deg, #f472b6, #f59e0b)',
  },
  {
    num: '04',
    title: 'Cloud & DevOps',
    desc: 'Scalable cloud infrastructure and CI/CD pipelines. We deploy, monitor, and optimize for reliability.',
    tags: ['AWS', 'GCP', 'Docker', 'Kubernetes'],
    gradient: 'linear-gradient(135deg, #10b981, #00f0ff)',
  },
  {
    num: '05',
    title: 'AI Integration',
    desc: 'Intelligent features powered by machine learning. Chatbots, recommendations, and predictive analytics.',
    tags: ['OpenAI', 'LangChain', 'Python', 'ML'],
    gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  },
  {
    num: '06',
    title: 'Consulting',
    desc: 'Technical strategy and architecture consulting. We help you make the right technology decisions.',
    tags: ['Architecture', 'Strategy', 'Audit', 'Mentoring'],
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.services} id="services" ref={ref}>
      <NeuralBackground />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.label}>What We Do</span>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            End-to-end digital solutions tailored to your needs.
            From concept to deployment and beyond.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <TiltCard key={s.num} className={styles.card}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.num} style={{ background: s.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {s.num}
                  </span>
                  <div className={styles.cardLine} style={{ background: s.gradient }} />
                </div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <div className={styles.tags}>
                  {s.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.cardGlow} style={{ background: s.gradient }} />
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
