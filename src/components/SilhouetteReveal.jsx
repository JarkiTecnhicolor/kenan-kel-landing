import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './SilhouetteReveal.module.css';

export default function SilhouetteReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // clip-path reveal: cyberpunk image revealed from top to bottom
  const clipY = useTransform(scrollYProgress, [0.1, 0.6], [0, 100]);

  return (
    <div className={styles.wrap} ref={ref}>
      {/* Base layer: normal silhouette */}
      <img
        src="/images/jaros0.png"
        alt=""
        className={styles.image}
      />
      {/* Top layer: cyberpunk version, revealed by clip-path */}
      <motion.div
        className={styles.reveal}
        style={{
          clipPath: useTransform(clipY, (v) => `inset(0 0 ${100 - v}% 0)`),
        }}
      >
        <img
          src="/images/jaros1.png"
          alt=""
          className={styles.image}
        />
        {/* Scanline at the reveal edge */}
        <motion.div
          className={styles.scanline}
          style={{
            top: useTransform(clipY, (v) => `${v}%`),
          }}
        />
      </motion.div>
    </div>
  );
}
