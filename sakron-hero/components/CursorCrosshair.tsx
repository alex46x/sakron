"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative targeting reticle, anchored near the bottom-right by default,
 * that drifts toward the cursor with a soft lag — an interactive "scope"
 * accent matching the reference composition.
 */
export default function CursorCrosshair() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const home = () => ({
      x: window.innerWidth - 160,
      y: window.innerHeight - 220,
    });
    const h = home();
    pos.current.x = h.x;
    pos.current.y = h.y;
    pos.current.tx = h.x;
    pos.current.ty = h.y;

    let raf = 0;
    const animate = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.06;
      pos.current.y += (pos.current.ty - pos.current.y) * 0.06;
      wrap.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onMove = (e: PointerEvent) => {
      pos.current.active = true;
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };
    const onLeave = () => {
      pos.current.active = false;
      const h2 = home();
      pos.current.tx = h2.x;
      pos.current.ty = h2.y;
    };
    const onResize = () => {
      if (!pos.current.active) {
        const h3 = home();
        pos.current.tx = h3.x;
        pos.current.ty = h3.y;
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed left-0 top-0 z-10 hidden md:block"
      aria-hidden="true"
    >
      <div className="relative h-16 w-16 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-1/2 top-0 h-7 w-px -translate-x-1/2 bg-acid/60" />
        <div className="absolute left-1/2 bottom-0 h-7 w-px -translate-x-1/2 bg-acid/60" />
        <div className="absolute top-1/2 left-0 h-px w-7 -translate-y-1/2 bg-acid/60" />
        <div className="absolute top-1/2 right-0 h-px w-7 -translate-y-1/2 bg-acid/60" />
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-acid" />
      </div>
    </div>
  );
}
