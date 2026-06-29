import InteractiveBackground from "@/components/InteractiveBackground";
import CursorCrosshair from "@/components/CursorCrosshair";
import Navbar from "@/components/Navbar";
import SideNavDots from "@/components/SideNavDots";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main
      id="home"
      className="relative min-h-screen overflow-hidden bg-ink"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 8% 95%, rgba(180,255,40,0.22), transparent 60%), radial-gradient(ellipse 600px 600px at 100% 60%, rgba(120,200,40,0.10), transparent 60%)",
        }}
      />
      <InteractiveBackground />
      <CursorCrosshair />
      <Navbar />
      <SideNavDots />

      <section className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center">
        <h1 className="hero-title select-none text-acid">
          SAKRON
        </h1>

        <p className="mt-20 font-body text-base tracking-wide-2 text-white/90 sm:text-lg">
          BUILDING DIGITAL EXPERIENCES
        </p>

        <p className="mt-5 font-body text-xl text-white/75 sm:text-2xl">
          Design. Develop. <span className="text-acid">Elevate.</span>
        </p>

        <a
          href="#about"
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-acid/70 px-8 py-4 font-body text-sm tracking-wide text-acid transition-colors duration-200 hover:bg-acid hover:text-ink"
        >
          EXPLORE MORE
          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </section>
    </main>
  );
}
