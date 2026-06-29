"use client";

import { useState } from "react";
import Logo from "./Logo";

const LINKS = ["Home", "About", "Services", "Projects", "Blog", "Contact"];

export default function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-[1536px] items-center justify-between px-8 py-7 md:px-10">
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
                className={`font-body text-sm tracking-wide transition-colors duration-200 ${
                  active === link
                    ? "text-acid"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link}
              </button>
              {active === link && (
                <span className="absolute left-1/2 top-[26px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-acid" />
              )}
            </li>
          ))}
        </ul>

        <button
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-acid/70 text-acid transition-colors hover:bg-acid/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-acid" />
        </button>
      </nav>
    </header>
  );
}
