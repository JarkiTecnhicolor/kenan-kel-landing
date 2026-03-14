import { motion } from 'framer-motion';
import ParticleField from './ParticleField';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <ParticleField />

      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />
      <div className={styles.glowOrb3} />

      <div className={styles.content}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className={styles.badgeDot} />
          Development Studio
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          We Build
          <br />
          <span className={styles.gradient}>Digital Future</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Crafting next-generation web experiences, mobile applications,
          and intelligent software solutions that push boundaries.
        </motion.p>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <a href="#portfolio" className={styles.btnPrimary}>
            View Our Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className={styles.btnSecondary}>
            Start a Project
          </a>
        </motion.div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '30+', label: 'Happy Clients' },
            { value: '5+', label: 'Years Experience' },
            { value: '99%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className={styles.scrollMouse}>
          <div className={styles.scrollDot} />
        </div>
      </motion.div>
    </section>
  );
}
