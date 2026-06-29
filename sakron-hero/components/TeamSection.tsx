import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TEAM, type Member } from "@/lib/team";

/**
 * In-page Team section.
 * - Mobile-first 1-col → md 2-col grid.
 * - Each card is a Next.js Link to /team/[slug].
 * - Cards are brutalist: hairline border, accent-on-hover, no shadows.
 * - 44pt+ tap targets, visible focus rings, keyboard reachable.
 * - Respects prefers-reduced-motion (transitions disabled in globals).
 */

const ACCENT_BG: Record<Member["accent"], string> = {
  acid: "from-[#d7ff1e]/30 via-[#d7ff1e]/10 to-transparent",
  ember: "from-[#ff7a45]/25 via-[#ff7a45]/5 to-transparent",
  ice: "from-[#7ad7ff]/25 via-[#7ad7ff]/5 to-transparent",
  rose: "from-[#ff7ad7]/25 via-[#ff7ad7]/5 to-transparent",
};

const ACCENT_TEXT: Record<Member["accent"], string> = {
  acid: "text-[#d7ff1e]",
  ember: "text-[#ff9a6b]",
  ice: "text-[#9be4ff]",
  rose: "text-[#ffaee5]",
};

export default function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative w-full bg-ink px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header — matches the rhythm of the other sections */}
        <header className="mb-12 flex flex-col gap-3 md:mb-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-acid/80">
            02 — Team
          </p>
          <h2
            id="team-heading"
            className="font-heading text-5xl uppercase leading-[0.95] tracking-tight text-white md:text-7xl"
          >
            The People
          </h2>
          <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-white/60 md:text-base">
            A small studio of four. Tap a card to read each member's portfolio,
            selected work, and how to get in touch.
          </p>
        </header>

        {/* Grid */}
        <ul
          role="list"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        >
          {TEAM.map((m) => (
            <li key={m.slug}>
              <MemberCard member={m} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: Member }) {
  const accentBg = ACCENT_BG[member.accent];
  const accentText = ACCENT_TEXT[member.accent];

  return (
    <Link
      href={`/team/${member.slug}`}
      aria-label={`${member.name}, ${member.role} — view profile`}
      className="group relative block h-full min-h-[280px] cursor-pointer overflow-hidden border border-white/10 bg-white/[0.025] p-6 outline-none transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.04] hover:shadow-[0_18px_60px_-30px_rgba(215,255,30,0.35)] focus-visible:border-acid focus-visible:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:shadow-[0_18px_60px_-30px_rgba(215,255,30,0.55)] backdrop-blur-md md:min-h-[320px] md:p-8"
    >
      {/* Top-right arrow — premium micro-interaction: rotates on hover */}
      <span
        aria-hidden="true"
        className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-all duration-200 ease-out group-hover:rotate-45 group-hover:border-acid group-hover:text-acid"
      >
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </span>

      {/* Avatar block — initials on a tinted gradient, asset-free */}
      <div
        aria-hidden="true"
        className={`mb-6 inline-flex h-14 w-14 items-center justify-center border border-white/15 bg-gradient-to-br ${accentBg} font-heading text-xl uppercase tracking-wide text-white/85`}
      >
        {member.initials}
      </div>

      {/* Role eyebrow */}
      <p
        className={`mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.3em] ${accentText}`}
      >
        {member.shortRole}
      </p>

      {/* Name */}
      <h3 className="mb-3 font-heading text-3xl uppercase leading-tight tracking-tight text-white md:text-4xl">
        {member.name}
      </h3>

      {/* Tagline */}
      <p className="mb-6 max-w-md font-body text-sm leading-relaxed text-white/65 md:text-base">
        {member.tagline}
      </p>

      {/* Footer row — role + CTA hint */}
      <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-body text-xs uppercase tracking-[0.2em] text-white/50">
          {member.role}
        </span>
        <span className="font-body text-[11px] font-medium uppercase tracking-[0.25em] text-white/70 transition-colors duration-200 group-hover:text-acid">
          View Profile
        </span>
      </div>
    </Link>
  );
}