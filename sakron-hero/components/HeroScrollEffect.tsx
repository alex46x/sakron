"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function HeroScrollEffect({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const total = rect.height;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;

      // 0 -> 1 as user scrolls past hero
      root.style.setProperty("--hero-progress", progress.toFixed(4));
      root.style.setProperty(
        "--hero-ty",
        `${(-progress * 80).toFixed(2)}px`
      );
      root.style.setProperty(
        "--hero-scale",
        (1 - progress * 0.18).toFixed(4)
      );
      root.style.setProperty(
        "--hero-opacity",
        (1 - progress * 0.85).toFixed(4)
      );
      root.style.setProperty(
        "--hero-blur",
        `${(progress * 6).toFixed(2)}px`
      );
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="hero-parallax-root relative z-20 flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center will-change-transform"
      style={{
        transform:
          "translate3d(0, var(--hero-ty, 0px), 0) scale(var(--hero-scale, 1))",
        opacity: "var(--hero-opacity, 1)",
        filter: "blur(var(--hero-blur, 0px))",
        transition: "transform 120ms linear, opacity 120ms linear, filter 120ms linear",
      }}
    >
      {children}
    </div>
  );
}