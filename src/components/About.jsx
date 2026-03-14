import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GridBackground from './backgrounds/GridBackground';
import styles from './About.module.css';

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'We optimize every millisecond. Our solutions are built for speed and performance from the ground up.',
  },
  {
    icon: '🛡️',
    title: 'Secure by Design',
    desc: 'Security is not an afterthought. We architect systems with enterprise-grade protection built in.',
  },
  {
    icon: '🔮',
    title: 'Future-Proof',
    desc: 'Built on cutting-edge technology stacks designed to scale with your business for years to come.',
  },
  {
    icon: '🎯',
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
