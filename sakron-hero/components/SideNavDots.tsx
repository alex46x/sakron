"use client";

import { useEffect, useState } from "react";

type Props = {
  sections: string[];
};

export default function SideNavDots({ sections }: Props) {
  const [active, setActive] = useState(sections[0] ?? "home");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let topId = sections[0];
        let topRatio = -1;
        visibility.forEach((ratio, id) => {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        });
        if (topId && topRatio > 0) {
          setActive(topId);
        } else {
          const nearest = pickNearest(elements);
          if (nearest) setActive(nearest.id);
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-30% 0px -30% 0px",
      }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
      {sections.map((id, i) => {
        const isActive = id === active;
        return (
          <div key={id} className="flex flex-col items-center">
            <button
              type="button"
              aria-label={`Scroll to ${id}`}
              onClick={() => scrollTo(id)}
              className="group relative flex h-6 w-6 items-center justify-center"
            >
              <span
                className={
                  "block rounded-full transition-all duration-300 " +
                  (isActive
                    ? "h-3 w-3 bg-acid shadow-[0_0_10px_var(--acid)]"
                    : "h-2 w-2 bg-white/40 group-hover:bg-white")
                }
              />
            </button>
            {i < sections.length - 1 && (
              <span className="my-1 h-6 w-px bg-white/15" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function pickNearest(elements: HTMLElement[]): HTMLElement | null {
  const viewportCenter = window.innerHeight / 2;
  let nearest: HTMLElement | null = null;
  let nearestDist = Infinity;
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const dist = Math.abs(center - viewportCenter);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = el;
    }
  }
  return nearest;
}
