import CursorCrosshair from "@/components/CursorCrosshair";
import Navbar from "@/components/Navbar";
import SideNavDots from "@/components/SideNavDots";
import SectionShell from "@/components/SectionShell";
import LightPillar from "@/components/LightPillar";
import ScrambledText from "@/components/ScrambledText";
import HeroScrollEffect from "@/components/HeroScrollEffect";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <main
        id="home"
        className="relative min-h-screen overflow-hidden bg-ink"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <LightPillar
            topColor="#84CC16"
            bottomColor="#EAB308"
            intensity={1.1}
            rotationSpeed={1.6}
            glowAmount={0.002}
            pillarWidth={2}
            pillarHeight={0.4}
            noiseIntensity={0}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="medium"
          />
        </div>
        {/* Bottom fade to dissolve the pillar glow into pure ink */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[55vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.35) 30%, rgba(10,10,10,0.75) 60%, #0a0a0a 100%)",
          }}
        />
        <CursorCrosshair />
        <Navbar />

        <HeroScrollEffect>
          <h1 className="hero-title select-none text-acid">
            SAKRON
          </h1>

          <p className="mt-20 font-body text-base tracking-wide-2 text-white/90 sm:text-lg">
            <ScrambledText
              radius={80}
              duration={1.0}
              speed={0.6}
              scrambleChars=".:"
              className="inline-block font-body text-base tracking-wide-2 text-white/90 sm:text-lg"
            >
              BUILDING DIGITAL EXPERIENCES
            </ScrambledText>
          </p>

          <p className="mt-5 font-body text-xl text-white/75 sm:text-2xl">
            <ScrambledText
              radius={80}
              duration={1.0}
              speed={0.6}
              scrambleChars=".:"
              className="inline-block font-body text-xl text-white/75 sm:text-2xl"
            >
              Design. Develop. <span className="text-acid">Elevate.</span>
            </ScrambledText>
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
        </HeroScrollEffect>
      </main>

      <section
        id="about"
        className="relative z-10 -mt-px min-h-screen pt-24"
      >
        <div className="relative flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6 text-center">
          <span className="font-body text-xs tracking-wide-2 text-acid/80">
            01 — About
          </span>
          <h2 className="mt-6 font-heading text-5xl text-white sm:text-7xl md:text-8xl">
            WHO WE ARE
          </h2>
          <span className="mt-6 h-px w-16 bg-acid/60" />
          <p className="mt-4 max-w-xl font-body text-sm tracking-wide text-white/50">
            Content coming soon.
          </p>
        </div>
      </section>
      <SectionShell id="services" eyebrow="02 — Services" title="WHAT WE DO" />
      <SectionShell id="projects" eyebrow="03 — Projects" title="SELECTED WORK" />
      <SectionShell id="contact" eyebrow="04 — Contact" title="GET IN TOUCH" />

      <SideNavDots
        sections={["home", "about", "services", "projects", "contact"]}
      />
    </>
  );
}
