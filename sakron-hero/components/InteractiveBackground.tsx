"use client";

import { useEffect, useRef } from "react";

/**
 * Full-viewport interactive background:
 * 1. A particle network in the upper field that reacts to the cursor
 *    (nodes drift, lines brighten and nodes nudge away near the pointer).
 * 2. A perspective wireframe terrain in the bottom-left that tilts/ripples
 *    toward the cursor position, lit in acid green like the reference.
 * Both layers live on one canvas for performance.
 */
export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, targetX: -9999, targetY: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ---------- Particle network ----------
    // Jittered-grid placement instead of pure random scatter, so nodes
    // spread evenly across the *entire* width (left, center, and right)
    // instead of clumping toward one side.
    type Node = { x: number; y: number; vx: number; vy: number; baseX: number; baseY: number };
    const cellSize = 130;
    const cols = Math.max(1, Math.ceil(width / cellSize));
    const rows = Math.max(1, Math.ceil((height * 0.82) / cellSize));
    const nodes: Node[] = [];
    for (let cy = 0; cy < rows; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        const jx = (Math.random() - 0.5) * cellSize * 0.9;
        const jy = (Math.random() - 0.5) * cellSize * 0.9;
        const x = cx * cellSize + cellSize / 2 + jx;
        const y = cy * cellSize + cellSize / 2 + jy;
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
        });
      }
    }
    const LINK_DIST = 150;
    const MOUSE_RADIUS = 260;

    // ---------- Bottom wireframe terrain (full-width flowing net) ----------
    const GRID_COLS = 40;
    const GRID_ROWS = 18;
    const gridOrigin = { x: -80, y: height + 60 };
    const gridSpan = { w: width * 1.35, h: 560 };

    function terrainHeight(
      gx: number,
      gy: number,
      t: number,
      mx: number,
      my: number
    ) {
      // Layered, slow-rolling waves for an organic flowing-net feel.
      const wave =
        Math.sin(gx * 0.35 + t * 0.9) * 22 +
        Math.cos(gy * 0.5 - t * 0.7) * 14 +
        Math.sin((gx + gy) * 0.22 + t * 0.6) * 10 +
        Math.sin(gx * 0.9 - gy * 0.4 + t * 1.2) * 6;

      // Cursor pulls a wide soft dip toward the pointer — like fabric
      // gathering where you press.
      const px = gx * (gridSpan.w / GRID_COLS) + gridOrigin.x;
      const py = gridOrigin.y - gy * (gridSpan.h / GRID_ROWS) * 0.55;
      const dx = px - mx;
      const dy = py - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const lift = Math.max(0, 240 - dist) * 0.9;

      // Gentle horizontal sway so the net breathes even without cursor input.
      const sway = Math.sin(gx * 0.18 + t * 0.5) * 4;

      return wave - lift + sway;
    }

    let raf = 0;
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // smooth mouse follow
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // ---- particle network ----
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // gentle pull back toward home cell so the even spread never collapses
        n.vx += (n.baseX - n.x) * 0.0009;
        n.vy += (n.baseY - n.y) * 0.0009;
        n.vx *= 0.98;
        n.vy *= 0.98;

        const dx = n.x - mx;
        const dy = n.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_RADIUS) {
          const force = (1 - d / MOUSE_RADIUS) ** 2 * 2.4;
          n.x += (dx / (d || 1)) * force;
          n.y += (dy / (d || 1)) * force;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const dMouse = Math.hypot(midX - mx, midY - my);
            const proximity = Math.max(0, 1 - dMouse / 320);
            const alpha = (1 - dist / LINK_DIST) * (0.05 + proximity * 0.85);
            ctx.strokeStyle = `rgba(215, 255, 30, ${Math.min(alpha, 0.95)})`;
            ctx.lineWidth = 1 + proximity * 1.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const d = Math.hypot(n.x - mx, n.y - my);
        const glow = Math.max(0, 1 - d / MOUSE_RADIUS);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.3 + glow * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 255, 30, ${0.22 + glow * 0.78})`;
        ctx.fill();
        if (glow > 0.05) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 6 + glow * 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(215, 255, 30, ${glow * 0.12})`;
          ctx.fill();
        }
      }

      // ---- bottom wireframe terrain (full-width flowing net) ----
      ctx.save();
      const colW = gridSpan.w / GRID_COLS;
      const rowH = gridSpan.h / GRID_ROWS;

      // Soft bottom glow gradient that tracks the cursor, like the reference.
      const glowR = 520;
      const glow = ctx.createRadialGradient(
        Math.max(0, Math.min(width, mx)),
        Math.max(0, Math.min(height, my + 60)),
        40,
        Math.max(0, Math.min(width, mx)),
        Math.max(0, Math.min(height, my + 60)),
        glowR
      );
      glow.addColorStop(0, "rgba(190, 255, 40, 0.22)");
      glow.addColorStop(0.45, "rgba(170, 255, 60, 0.10)");
      glow.addColorStop(1, "rgba(170, 255, 60, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // ---- horizontal rows ----
      for (let r = 0; r <= GRID_ROWS; r++) {
        ctx.beginPath();
        for (let c = 0; c <= GRID_COLS; c++) {
          const h = terrainHeight(c, r, t, mx, my);
          const px = gridOrigin.x + c * colW;
          const py = gridOrigin.y - r * rowH * 0.55 + h;
          const fold = 1 - r / GRID_ROWS;
          // Brighten lines near the cursor.
          const midX = px;
          const midY = py;
          const dMouse = Math.hypot(midX - mx, midY - my);
          const proximity = Math.max(0, 1 - dMouse / 360);
          if (c === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
          ctx.globalAlpha = 0.18 + fold * 0.32 + proximity * 0.35;
        }
        ctx.strokeStyle = "rgba(180, 255, 60, 1)";
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // ---- vertical columns ----
      for (let c = 0; c <= GRID_COLS; c++) {
        ctx.beginPath();
        for (let r = 0; r <= GRID_ROWS; r++) {
          const h = terrainHeight(c, r, t, mx, my);
          const px = gridOrigin.x + c * colW;
          const py = gridOrigin.y - r * rowH * 0.55 + h;
          const fold = 1 - r / GRID_ROWS;
          const dMouse = Math.hypot(px - mx, py - my);
          const proximity = Math.max(0, 1 - dMouse / 360);
          if (r === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
          ctx.globalAlpha = 0.16 + fold * 0.28 + proximity * 0.32;
        }
        ctx.strokeStyle = "rgba(180, 255, 60, 1)";
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }
      ctx.restore();

      if (!prefersReducedMotion) {
        t += 0.012;
      }
      raf = requestAnimationFrame(draw);
    }

    const handlePointerMove = (e: PointerEvent) => {
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
    };
    const handlePointerLeave = () => {
      mouse.current.targetX = -9999;
      mouse.current.targetY = -9999;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
