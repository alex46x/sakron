import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { getMember, TEAM, type Member } from "@/lib/team";
import DecryptedText from "./DecryptedText";

/**
 * Per-member portfolio page.
 * - Static generation for every TEAM slug via generateStaticParams.
 * - notFound() for unknown slugs.
 * - Reuses the in-page site language: dark ink, Anton display, Inter body, acid accents.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return TEAM.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const member = getMember(params.slug);
  if (!member) return { title: "Not found — SAKRON" };
  return {
    title: `${member.name} — ${member.role} · SAKRON`,
    description: member.tagline,
  };
}

export default function MemberPage({ params }: { params: Params }) {
  const member = getMember(params.slug);
  if (!member) notFound();

  return (
    <main
      id={`team-${member.slug}`}
      className="relative w-full bg-ink text-white"
    >
      <MemberHero member={member} />
      <MemberBody member={member} />
    </main>
  );
}

function MemberHero({ member }: { member: Member }) {
  // Founder-style hero: portrait with role-letter backdrop, name overlay.
  if (member.portrait) return <FounderHero member={member} />;

  const accentBar = ACCENT_BAR[member.accent];
  return (
    <header className="relative w-full border-b border-white/10 px-6 pt-12 pb-16 md:px-12 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          href="/#team"
          aria-label="Back to team"
          className="group mb-12 inline-flex cursor-pointer items-center gap-2 font-body text-xs uppercase tracking-[0.3em] text-white/60 outline-none transition-colors duration-200 hover:text-white focus-visible:text-acid"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
          Back to Team
        </Link>

        <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          {member.shortRole}
        </p>
        <h1 className="font-heading text-5xl uppercase leading-[0.92] tracking-tight md:text-8xl">
          {member.name}
        </h1>
        <p className="mt-4 font-body text-base text-white/70 md:text-xl">
          {member.role}
        </p>

        {/* Accent hairline */}
        <div
          aria-hidden="true"
          className={`mt-10 h-px w-24 bg-gradient-to-r ${accentBar}`}
        />
      </div>
    </header>
  );
}

function FounderHero({ member }: { member: Member }) {
  // Reference: black canvas, giant centered name behind a centered portrait;
  // intro line + thin rule sit beneath the photo.
  return (
    <header className="relative w-full overflow-hidden bg-ink">
      {/* Top bar — back link sits above the hero stack */}
      <div className="relative z-30 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-10">
        <Link
          href="/#team"
          aria-label="Back to team"
          className="group inline-flex cursor-pointer items-center gap-2 font-body text-xs uppercase tracking-[0.3em] text-white/60 outline-none transition-colors duration-200 hover:text-white focus-visible:text-acid"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
          Back to Team
        </Link>
      </div>

      {/* Giant name + portrait stack — single centered column */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-14 pt-4 md:pb-20">
        {/* FOUNDER backdrop band — sits behind the portrait, behind the hairline below */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[29%] z-0 -translate-x-1/2 select-none whitespace-nowrap text-center font-heading uppercase leading-[1] tracking-tight text-white text-[clamp(5rem,14vw,12rem)] font-bold"
        >
          FOUNDER
        </p>

        {/* Portrait — centered */}
        <div className="relative z-10 aspect-[3/4] w-[min(70vw,22rem)] overflow-hidden md:w-[min(36vw,26rem)]">
          <PortraitImage member={member} />
        </div>

        {/* Intro paragraph — DecryptedText reveal on scroll into view */}
        <p className="relative z-20 mt-12 max-w-2xl text-center font-body text-lg leading-relaxed text-white/85 md:mt-16 md:text-2xl">
          <span className="block">
            <DecryptedText
              text="Hi, I am Shimul! A serial entrepreneur and angel investor."
              animateOn="view"
              sequential
              revealDirection="center"
              speed={45}
              maxIterations={14}
              useOriginalCharsOnly
              className="text-white"
              encryptedClassName="text-white/60"
            />
          </span>
          <span className="block">
            <DecryptedText
              text="I seek new and innovative ideas."
              animateOn="view"
              sequential
              revealDirection="center"
              speed={45}
              maxIterations={14}
              useOriginalCharsOnly
              className="text-white"
              encryptedClassName="text-white/60"
            />
          </span>
        </p>

        {/* Testimonials link — accent sentence (no italic) */}
        <p className="relative z-20 mt-6 text-center font-body text-base text-white/70 md:text-lg">
          See few testimonials from our{" "}
          <span className="font-semibold text-acid underline-offset-4 hover:underline">
            Happy Startups
          </span>
        </p>

        {/* Hairline rule + scroll pill */}
        <div className="relative z-20 mt-10 flex w-full max-w-3xl flex-col items-center md:mt-12">
          <div
            aria-hidden="true"
            className={`h-px w-full bg-gradient-to-r ${ACCENT_BAR[member.accent]} opacity-60`}
          />
          <span
            aria-hidden="true"
            className="mt-8 inline-block h-10 w-6 rounded-full border border-white/30"
          />
        </div>
      </div>
    </header>
  );
}

function PortraitImage({ member }: { member: Member }) {
  if (!member.portrait) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={member.portrait}
      alt=""
      className="h-full w-full object-cover"
      loading="eager"
    />
  );
}

function MemberBody({ member }: { member: Member }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 md:px-12 md:py-24">
      {/* Bio */}
      <section aria-labelledby="bio-heading" className="mb-20">
        <h2
          id="bio-heading"
          className="mb-6 font-heading text-2xl uppercase tracking-tight text-white md:text-3xl"
        >
          About
        </h2>
        <div className="space-y-5 font-body text-base leading-relaxed text-white/75 md:text-lg">
          {member.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Selected Work */}
      <section aria-labelledby="work-heading" className="mb-20">
        <h2
          id="work-heading"
          className="mb-6 font-heading text-2xl uppercase tracking-tight text-white md:text-3xl"
        >
          Selected Work
        </h2>
        <ul role="list" className="divide-y divide-white/10 border-y border-white/10">
          {member.projects.map((p) => (
            <li
              key={p.title}
              className="grid grid-cols-1 gap-1 py-6 md:grid-cols-[120px_1fr] md:gap-8 md:py-8"
            >
              <span className="font-body text-xs uppercase tracking-[0.3em] text-white/50">
                {p.year}
              </span>
              <div>
                <h3 className="mb-1 font-heading text-xl uppercase tracking-tight text-white md:text-2xl">
                  {p.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-white/65 md:text-base">
                  {p.blurb}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-heading" className="mb-20">
        <h2
          id="skills-heading"
          className="mb-6 font-heading text-2xl uppercase tracking-tight text-white md:text-3xl"
        >
          Skills
        </h2>
        <ul role="list" className="flex flex-wrap gap-2 md:gap-3">
          {member.skills.map((s) => (
            <li
              key={s}
              className="border border-white/15 bg-white/[0.025] px-3 py-1.5 font-body text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition-colors duration-200 hover:border-white/30 hover:text-white md:px-4 md:py-2 md:text-sm"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Socials */}
      <section aria-labelledby="contact-heading" className="mb-8">
        <h2
          id="contact-heading"
          className="mb-6 font-heading text-2xl uppercase tracking-tight text-white md:text-3xl"
        >
          Get in touch
        </h2>
        <ul role="list" className="flex flex-col gap-3 md:flex-row md:flex-wrap">
          {member.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="group inline-flex cursor-pointer items-center gap-2 border border-white/15 bg-white/[0.025] px-4 py-3 font-body text-xs uppercase tracking-[0.25em] text-white/80 outline-none backdrop-blur-md transition-colors duration-200 hover:border-acid hover:text-acid focus-visible:border-acid focus-visible:text-acid md:text-sm"
              >
                {s.label}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-45"
                  strokeWidth={1.5}
                />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const ACCENT_BAR: Record<Member["accent"], string> = {
  acid: "from-[#d7ff1e] to-transparent",
  ember: "from-[#ff7a45] to-transparent",
  ice: "from-[#7ad7ff] to-transparent",
  rose: "from-[#ff7ad7] to-transparent",
};