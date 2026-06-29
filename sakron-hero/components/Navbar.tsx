"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = ["Home", "About", "Services", "Projects", "Blog", "Contact"];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-30 transition-all duration-500 ease-out " +
        (scrolled
          ? "border-b border-acid/20 bg-ink/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "border-b border-transparent bg-transparent backdrop-blur-0")
      }
    >
      <nav className="mx-auto flex max-w-[1536px] items-center justify-between px-6 py-5 md:px-10 md:py-7">
        <a href="#home" className="flex items-center gap-3">
          <Logo />
          <span className="font-body text-lg font-semibold tracking-[0.3em] text-white">
            SAKRON
          </span>
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {LINKS.map((link) => (
            <li key={link} className="relative">
              <button
                onClick={() => setActive(link)}
                className={`group relative font-body text-sm tracking-wide transition-colors duration-200 ${
                  active === link
                    ? "text-acid"
                    : "text-white/85 hover:text-acid"
                }`}
              >
                {link}
                <span
                  className={`pointer-events-none absolute -bottom-1.5 left-0 h-[2px] w-full origin-left bg-acid transition-transform duration-300 ease-out ${
                    active === link
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
              {active === link && (
                <span className="absolute left-1/2 top-[26px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-acid shadow-[0_0_10px_#d7ff1e]" />
              )}
            </li>
          ))}
        </ul>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`group relative flex h-10 items-center justify-center overflow-hidden rounded-full border border-acid/70 text-acid transition-all duration-300 lg:w-10 ${
            open
              ? "w-10 bg-acid text-ink"
              : "w-10 lg:hover:w-28 lg:hover:bg-acid lg:hover:text-ink"
          }`}
        >
          {open ? (
            <span className="relative block h-3.5 w-3.5">
              <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 bg-ink" />
              <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 -rotate-45 bg-ink" />
            </span>
          ) : (
            <>
              <span className="flex h-1.5 w-1.5 rounded-full bg-acid transition-all duration-300 lg:group-hover:hidden" />
              <span className="hidden text-[10px] font-semibold tracking-[0.25em] transition-all duration-300 lg:group-hover:block">
                MENU
              </span>
            </>
          )}
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        className={`overflow-hidden border-b border-acid/15 bg-ink/95 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-out lg:hidden ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-6">
          {LINKS.map((link, idx) => (
            <li
              key={link}
              className={`border-b border-white/5 transition-all duration-500 last:border-b-0 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${idx * 60}ms` : "0ms" }}
            >
              <button
                onClick={() => {
                  setActive(link);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between py-5 font-body text-2xl tracking-wide transition-colors duration-200 ${
                  active === link ? "text-acid" : "text-white/85 hover:text-acid"
                }`}
              >
                <span>{link}</span>
                <span className="font-body text-xs text-white/30">
                  0{idx + 1}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
