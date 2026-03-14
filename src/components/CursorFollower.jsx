import { useEffect, useRef, useState } from 'react';

export default function CursorFollower() {
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      const el = e.target.closest('a, button, [role="button"], input, textarea, select');
      setHovering(!!el);
    };

    const onLeave = () => {
      target.current = { x: -100, y: -100 };
    };

    let raf;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      const s = hovering ? 28 : 10;
      dot.style.transform = `translate(${pos.current.x - s / 2}px, ${pos.current.y - s / 2}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [hovering]);

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: hovering ? 28 : 10,
        height: hovering ? 28 : 10,
        background: hovering ? 'transparent' : '#ff2d7b',
        border: hovering ? '1px solid #00f0ff' : 'none',
        boxShadow: hovering
          ? '0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.2)'
          : '0 0 10px rgba(255, 45, 123, 0.6), 0 0 20px rgba(255, 45, 123, 0.3)',
        borderRadius: hovering ? '0' : '50%',
        clipPath: hovering
          ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          : 'none',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.2s, height 0.2s, background 0.2s, border-radius 0.2s, clip-path 0.3s',
      }}
    />
  );
}
