import { useEffect, useRef, useState } from "react";

export default function CyberCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Hide native cursor globally
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let ax = mx, ay = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setHidden(false);
      // Update CSS vars on body for background reaction
      document.body.style.setProperty("--mx", `${(mx / window.innerWidth) * 100}%`);
      document.body.style.setProperty("--my", `${(my / window.innerHeight) * 100}%`);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
    };

    const onLeave = () => setHidden(true);

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ax += (mx - ax) * 0.06;
      ay += (my - ay) * 0.06;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate(${ax}px, ${ay}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.body.style.cursor = prev;
    };
  }, []);

  const baseHide = hidden ? "opacity-0" : "opacity-100";

  return (
    <>
      {/* Reactive background aura that follows the cursor */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), oklch(0.72 0.32 330 / 0.18), transparent 45%), radial-gradient(900px circle at var(--mx,50%) var(--my,50%), oklch(0.91 0.15 195 / 0.10), transparent 60%)",
        }}
      />

      {/* Soft aura blob */}
      <div
        ref={auraRef}
        aria-hidden
        className={`fixed top-0 left-0 pointer-events-none z-[60] w-64 h-64 rounded-full blur-3xl mix-blend-screen transition-opacity duration-300 ${baseHide}`}
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.32 330 / 0.35), transparent 70%)",
        }}
      />

      {/* Outer crosshair ring */}
      <div
        ref={ringRef}
        aria-hidden
        className={`fixed top-0 left-0 pointer-events-none z-[61] w-10 h-10 transition-opacity duration-200 ${baseHide}`}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <circle cx="20" cy="20" r="14" fill="none" stroke="oklch(0.91 0.15 195)" strokeWidth="1" opacity="0.8" />
          <circle cx="20" cy="20" r="18" fill="none" stroke="oklch(0.72 0.32 330)" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="6s" repeatCount="indefinite" />
          </circle>
          <line x1="20" y1="0" x2="20" y2="6" stroke="oklch(0.91 0.15 195)" strokeWidth="1" />
          <line x1="20" y1="34" x2="20" y2="40" stroke="oklch(0.91 0.15 195)" strokeWidth="1" />
          <line x1="0" y1="20" x2="6" y2="20" stroke="oklch(0.91 0.15 195)" strokeWidth="1" />
          <line x1="34" y1="20" x2="40" y2="20" stroke="oklch(0.91 0.15 195)" strokeWidth="1" />
        </svg>
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden
        className={`fixed top-0 left-0 pointer-events-none z-[62] w-2 h-2 rounded-full transition-opacity duration-200 ${baseHide}`}
        style={{
          background: "oklch(0.72 0.32 330)",
          boxShadow: "0 0 12px oklch(0.72 0.32 330), 0 0 24px oklch(0.91 0.15 195 / 0.6)",
        }}
      />
    </>
  );
}
