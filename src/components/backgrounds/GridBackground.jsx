import { useEffect, useRef } from 'react';
import styles from './Background.module.css';

// Interactive grid with glowing intersections — for About section
export default function GridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mouse = { x: -1000, y: -1000 };
    let time = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spacing = 60;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < cols; i++) {
        const x = i * spacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < rows; j++) {
        const y = j * spacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Glowing intersections near mouse
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const intensity = (1 - dist / 200);
            const pulse = Math.sin(time * 3 + i * 0.5 + j * 0.5) * 0.3 + 0.7;
            const size = 2 + intensity * 4;
            const alpha = intensity * pulse * 0.8;

            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.fill();

            // Glow
            ctx.beginPath();
            ctx.arc(x, y, size + 6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 0.15})`;
            ctx.fill();
          } else {
            // Subtle ambient pulse
            const pulse = Math.sin(time * 2 + i * 0.3 + j * 0.3) * 0.5 + 0.5;
            if (pulse > 0.8) {
              ctx.beginPath();
              ctx.arc(x, y, 1, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(0, 240, 255, ${(pulse - 0.8) * 0.3})`;
              ctx.fill();
            }
          }
        }
      }

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
