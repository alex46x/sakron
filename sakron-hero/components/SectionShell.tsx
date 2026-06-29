"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
};

export default function SectionShell({ id, eyebrow, title }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div
        className={
          "flex flex-col items-center gap-6 transition-all duration-700 ease-out " +
          (visible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0")
        }
      >
        <span className="font-body text-xs tracking-wide-2 text-acid/80">
          {eyebrow}
        </span>
        <h2 className="font-heading text-5xl text-white sm:text-7xl md:text-8xl">
          {title}
        </h2>
        <span className="h-px w-16 bg-acid/60" />
        <p className="max-w-xl font-body text-sm tracking-wide text-white/50">
          Content coming soon.
        </p>
      </div>
    </section>
  );
}