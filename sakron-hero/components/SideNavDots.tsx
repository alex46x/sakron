"use client";

import { useState } from "react";

const COUNT = 4;

export default function SideNavDots() {
  const [active, setActive] = useState(0);

  return (
    <div className="fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex">
      {Array.from({ length: COUNT }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to section ${i + 1}`}
          onClick={() => setActive(i)}
          className="group relative flex h-4 w-4 items-center justify-center"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === i
                ? "h-2.5 w-2.5 bg-acid shadow-[0_0_12px_rgba(215,255,30,0.8)]"
                : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/60"
            }`}
          />
          {i < COUNT - 1 && (
            <span className="absolute top-4 h-5 w-px bg-white/15" />
          )}
        </button>
      ))}
    </div>
  );
}
