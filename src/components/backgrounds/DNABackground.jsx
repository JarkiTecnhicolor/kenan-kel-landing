import { useEffect, useRef } from 'react';
import styles from './Background.module.css';

// Flowing DNA helix strands — for Team section
export default function DNABackground() {
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = performance.now() * 0.001;

      const helixCount = 3;
      const baseSpacing = canvas.width / (helixCount + 1);

      for (let h = 0; h < helixCount; h++) {
        const centerX = baseSpacing * (h + 1);
        const amplitude = 40 + h * 10;
        const speed = 0.8 + h * 0.15;
        const points = 50;

        const strand1 = [];
        const strand2 = [];

        for (let i = 0; i < points; i++) {
          const y = (canvas.height / (points - 1)) * i;
          const phase = (i / points) * Math.PI * 4 + t * speed;

          const x1 = centerX + Math.sin(phase) * amplitude;
          const x2 = centerX + Math.sin(phase + Math.PI) * amplitude;

          // Mouse distortion
          const dx1 = mouse.x - x1;
          const dy1 = mouse.y - y;
          const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
          const dx2 = mouse.x - x2;
          const dy2 = mouse.y - y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          const push1 = dist1 < 150 ? (150 - dist1) / 150 * 30 : 0;
          const push2 = dist2 < 150 ? (150 - dist2) / 150 * 30 : 0;

          strand1.push({
            x: x1 + (dist1 < 150 ? (-dx1 / dist1) * push1 : 0),
            y,
          });
          strand2.push({
            x: x2 + (dist2 < 150 ? (-dx2 / dist2) * push2 : 0),
            y,
          });
        }

        // Draw strands
        const colors = [
          ['rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0.05)'],
          ['rgba(0, 240, 255, 0.3)', 'rgba(0, 240, 255, 0.05)'],
          ['rgba(244, 114, 182, 0.3)', 'rgba(244, 114, 182, 0.05)'],
        ];

        [strand1, strand2].forEach((strand, si) => {
          ctx.beginPath();
          ctx.moveTo(strand[0].x, strand[0].y);
          for (let i = 1; i < strand.length - 1; i++) {
            const cx = (strand[i].x + strand[i + 1].x) / 2;
            const cy = (strand[i].y + strand[i + 1].y) / 2;
            ctx.quadraticCurveTo(strand[i].x, strand[i].y, cx, cy);
          }
          ctx.strokeStyle = colors[h][0];
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // Draw cross-links (rungs)
        for (let i = 0; i < points; i += 3) {
          const depth = Math.sin((i / points) * Math.PI * 4 + t * speed);
          const alpha = Math.abs(depth) * 0.25;

          ctx.beginPath();
          ctx.moveTo(strand1[i].x, strand1[i].y);
          ctx.lineTo(strand2[i].x, strand2[i].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Rung nodes
          const midX = (strand1[i].x + strand2[i].x) / 2;
          const midY = (strand1[i].y + strand2[i].y) / 2;

          if (depth > 0.3) {
            ctx.beginPath();
            ctx.arc(strand1[i].x, strand1[i].y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 2})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(strand2[i].x, strand2[i].y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(244, 114, 182, ${alpha * 2})`;
            ctx.fill();
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
