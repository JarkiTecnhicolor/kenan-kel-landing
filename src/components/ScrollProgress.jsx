import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, #ff2d7b, #bf00ff, #00f0ff, #39ff14)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 10000,
        boxShadow: '0 0 10px rgba(255, 45, 123, 0.5), 0 0 20px rgba(0, 240, 255, 0.3)',
      }}
    />
  );
}
