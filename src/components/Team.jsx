import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import DNABackground from './backgrounds/DNABackground';
import TiltCard from './TiltCard';
import styles from './Team.module.css';

const team = [
  {
    name: 'Andriy Maksymchuk',
    role: 'Founding Partner & CEO',
    desc: 'Strategic visionary driving business growth and partnerships. Turning bold ideas into thriving digital ventures.',
    avatar: '/images/andriy.jpg',
    socials: { github: '#', linkedin: '#' },
  },
  {
    name: 'Yaroslav Zubko',
    role: 'Founding Partner & COO',
    desc: 'Operations mastermind ensuring flawless execution. Bridging strategy and delivery at every stage.',
    avatar: '/images/yaroslav.jpg',
    socials: { github: '#', linkedin: '#' },
  },
  {
    name: 'Lidia Kozina',
    role: 'Founding Partner & CTO',
    desc: 'Technical architect behind every solution. Engineering robust systems that power the future.',
    avatar: '/images/lidia.jpg',
    socials: { github: '#', linkedin: '#' },
  },
];

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.team} id="team" ref={ref}>
      <DNABackground />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.label}>Our Team</span>
          <h2 className="section-title">Meet the Minds</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A team of passionate innovators dedicated to pushing the boundaries of technology.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {team.map((member, i) => (
            <TiltCard key={member.name} className={styles.card}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
              >
                <div className={styles.avatarWrap}>
                  <img src={member.avatar} alt={member.name} className={styles.avatar} />
                  <div className={styles.avatarRing} />
                </div>
                <h3 className={styles.name}>{member.name}</h3>
                <span className={styles.role}>{member.role}</span>
                <p className={styles.desc}>{member.desc}</p>
                <div className={styles.socials}>
                  <a href={member.socials.github} className={styles.social} aria-label="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={member.socials.linkedin} className={styles.social} aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
