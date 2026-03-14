import { useEffect, useRef, useState } from 'react';

export default function CursorFollower() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      const el = e.target.closest('a, button, [role="button"], input, textarea, select');
      setHovering(!!el);
    };

    const onLeave = () => {
      target.current = { x: -100, y: -100 };
    };

    let raf;
    const size = () => (hovering ? 20 : 10);
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      const s = size();
      dot.style.transform = `translate(${pos.current.x - s / 2}px, ${pos.current.y - s / 2}px)`;
      glow.style.transform = `translate(${pos.current.x - 150}px, ${pos.current.y - 150}px)`;
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
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? 20 : 10,
          height: hovering ? 20 : 10,
          borderRadius: '50%',
          background: hovering ? 'transparent' : '#00f0ff',
          border: hovering ? '2px solid #00f0ff' : 'none',
          boxShadow: '0 0 10px #00f0ff, 0 0 30px rgba(0,240,255,0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.25s, height 0.25s, background 0.25s, border 0.25s',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  );
}
