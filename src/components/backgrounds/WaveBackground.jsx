import { useEffect, useRef } from 'react';
import styles from './Background.module.css';

// Aurora / wave animation — for Contact section
export default function WaveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const waves = [
      { color: [0, 240, 255], amplitude: 50, frequency: 0.008, speed: 0.6, yOffset: 0.3 },
      { color: [139, 92, 246], amplitude: 40, frequency: 0.01, speed: 0.8, yOffset: 0.5 },
      { color: [244, 114, 182], amplitude: 35, frequency: 0.012, speed: 1.0, yOffset: 0.7 },
      { color: [59, 130, 246], amplitude: 45, frequency: 0.007, speed: 0.5, yOffset: 0.4 },
      { color: [16, 185, 129], amplitude: 30, frequency: 0.015, speed: 0.9, yOffset: 0.6 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = performance.now() * 0.001;

      waves.forEach((wave) => {
        const baseY = canvas.height * wave.yOffset;

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 3) {
          // Mouse ripple
          const dx = x - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseEffect = dist < 200 ? Math.sin(dist * 0.05 - t * 5) * (200 - dist) / 200 * 30 : 0;

          const y = baseY +
            Math.sin(x * wave.frequency + t * wave.speed) * wave.amplitude +
            Math.sin(x * wave.frequency * 2.5 + t * wave.speed * 1.3) * wave.amplitude * 0.3 +
            mouseEffect;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, canvas.height);
        const [r, g, b] = wave.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.06)`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.02)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Wave line on top
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 3) {
          const dx = x - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseEffect = dist < 200 ? Math.sin(dist * 0.05 - t * 5) * (200 - dist) / 200 * 30 : 0;

          const y = baseY +
            Math.sin(x * wave.frequency + t * wave.speed) * wave.amplitude +
            Math.sin(x * wave.frequency * 2.5 + t * wave.speed * 1.3) * wave.amplitude * 0.3 +
            mouseEffect;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${wave.color.join(',')}, 0.15)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('mousemove', onMouseMove);
    canvas.parentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
