import { useEffect, useRef } from 'react';
import styles from './Background.module.css';

// Floating wireframe geometric shapes — for Portfolio section
export default function FloatingShapes() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mouse = { x: -1000, y: -1000 };
    let shapes = [];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      createShapes();
    };

    const createShapes = () => {
      shapes = [];
      const count = Math.min(15, Math.floor((canvas.width * canvas.height) / 60000));

      for (let i = 0; i < count; i++) {
        const type = ['triangle', 'square', 'hexagon', 'circle'][Math.floor(Math.random() * 4)];
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 30 + 15,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.01,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          type,
          color: ['#00f0ff', '#8b5cf6', '#f472b6', '#3b82f6'][Math.floor(Math.random() * 4)],
          alpha: Math.random() * 0.15 + 0.05,
        });
      }
    };

    const drawShape = (shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 0.8;

      const dx = mouse.x - shape.x;
      const dy = mouse.y - shape.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const nearMouse = dist < 200;
      ctx.globalAlpha = nearMouse ? shape.alpha * 3 : shape.alpha;

      const s = shape.size * (nearMouse ? 1.2 : 1);

      ctx.beginPath();
      switch (shape.type) {
        case 'triangle':
          for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * s;
            const y = Math.sin(angle) * s;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.closePath();
          break;
        case 'square':
          ctx.rect(-s / 2, -s / 2, s, s);
          break;
        case 'hexagon':
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * s;
            const y = Math.sin(angle) * s;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.closePath();
          break;
        case 'circle':
          ctx.arc(0, 0, s, 0, Math.PI * 2);
          break;
      }
      ctx.stroke();

      // Inner glow when near mouse
      if (nearMouse) {
        const intensity = (1 - dist / 200) * 0.08;
        ctx.fillStyle = shape.color;
        ctx.globalAlpha = intensity;
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        // Mouse repulsion
        const dx = shape.x - mouse.x;
        const dy = shape.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.5;
          shape.vx += (dx / dist) * force;
          shape.vy += (dy / dist) * force;
        }

        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotSpeed;
        shape.vx *= 0.99;
        shape.vy *= 0.99;

        // Wrap around
        if (shape.x < -50) shape.x = canvas.width + 50;
        if (shape.x > canvas.width + 50) shape.x = -50;
        if (shape.y < -50) shape.y = canvas.height + 50;
        if (shape.y > canvas.height + 50) shape.y = -50;

        drawShape(shape);
      });

      // Draw connecting lines between nearby shapes
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.strokeStyle = shapes[i].color;
            ctx.globalAlpha = (1 - dist / 250) * 0.06;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
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
