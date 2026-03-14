import { useEffect, useRef } from 'react';
import styles from './Background.module.css';

// Neural network nodes — for Services section
export default function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mouse = { x: -1000, y: -1000 };
    let nodes = [];

    const colors = ['#8b5cf6', '#f472b6', '#3b82f6', '#00f0ff'];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      createNodes();
    };

    const createNodes = () => {
      nodes = [];
      // Create layered nodes like a neural network
      const layers = 5;
      const nodesPerLayer = Math.floor(canvas.height / 80);

      for (let l = 0; l < layers; l++) {
        const x = (canvas.width / (layers + 1)) * (l + 1);
        for (let n = 0; n < nodesPerLayer; n++) {
          const y = (canvas.height / (nodesPerLayer + 1)) * (n + 1);
          nodes.push({
            x: x + (Math.random() - 0.5) * 40,
            y: y + (Math.random() - 0.5) * 40,
            baseX: x + (Math.random() - 0.5) * 40,
            baseY: y + (Math.random() - 0.5) * 40,
            layer: l,
            size: Math.random() * 2 + 1.5,
            color: colors[l % colors.length],
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = performance.now() * 0.001;

      // Update node positions (float)
      nodes.forEach((node) => {
        node.x = node.baseX + Math.sin(t + node.phase) * 8;
        node.y = node.baseY + Math.cos(t * 0.7 + node.phase) * 8;

        // Mouse attraction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180 * 15;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }
      });

      // Draw connections between adjacent layers
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.abs(nodes[i].layer - nodes[j].layer) !== 1) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.12;

            // Animated pulse along connection
            const pulse = (Math.sin(t * 2 + i * 0.5) + 1) / 2;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `rgba(139, 92, 246, ${alpha * pulse})`);
            gradient.addColorStop(1, `rgba(0, 240, 255, ${alpha * pulse})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nearMouse = dist < 180;

        const size = nearMouse ? node.size * 1.8 : node.size;
        const alpha = nearMouse ? 0.9 : 0.4;

        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = node.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', '');
        // Just use hex with globalAlpha
        ctx.globalAlpha = alpha;
        ctx.fillStyle = node.color;
        ctx.fill();

        if (nearMouse) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, size + 8, 0, Math.PI * 2);
          ctx.globalAlpha = alpha * 0.15;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
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
