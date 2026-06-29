import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";

/**
 * Site Footer.
 * - Liquid Glass surface, hairline border, no shadows.
 * - Mobile-first 1-col -> md 2-col -> lg 4-col.
 * - 44pt+ tap targets, focus rings, accessible labels, reduced-motion safe.
 * - Honors ::selection via globals.css (acid highlight on any text selected).
 */

const SITEMAP: { label: string; href: string }[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Team", href: "/#team" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

const TEAM_PAGES: { label: string; href: string }[] = [
  { label: "Sakif Ahmed", href: "/team/sakif-ahmed" },
  { label: "Maria Okonkwo", href: "/team/maria-okonkwo" },
  { label: "Tomás Vela", href: "/team/tomas-vela" },
  { label: "Noor Hassan", href: "/team/noor-hassan" },
];

const SOCIALS: { label: string; href: string; external?: boolean }[] = [
  { label: "Twitter / X", href: "https://twitter.com/", external: true },
  { label: "GitHub", href: "https://github.com/", external: true },
  { label: "Dribbble", href: "https://dribbble.com/", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/", external: true },
  { label: "Are.na", href: "https://are.na/", external: true },
];

const STUDIO = [
  { label: "Twitter / X", handle: "@sakronstudio", href: "https://twitter.com/" },
  { label: "Email", handle: "hello@sakron.studio", href: "mailto:hello@sakron.studio" },
  { label: "Phone", handle: "+1 (555) 014-2010", href: "tel:+15550142010" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative w-full overflow-hidden border-t border-white/10 bg-ink"
    >
      {/* Subtle acid gradient rail along the top edge — premium cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/40 to-transparent"
      />

      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-16 md:px-12 md:pb-12 md:pt-24">
        {/* Top row: brand + CTA */}
        <div className="mb-14 grid grid-cols-1 gap-10 md:mb-20 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12">
          <div>
            <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-acid/80">
              06 — Studio
            </p>
            <p className="font-heading text-4xl uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
              Let's make
              <br />
              something <span className="text-acid">quietly loud</span>.
            </p>
          </div>

          <a
            href="mailto:hello@sakron.studio"
            className="group inline-flex cursor-pointer items-center justify-between gap-4 self-start border border-white/15 bg-white/[0.025] px-5 py-4 font-body text-sm uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-200 ease-out hover:border-acid hover:bg-white/[0.05] hover:text-acid focus-visible:border-acid focus-visible:text-acid focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:self-end md:px-6 md:py-5 md:text-base"
          >
            <span>Start a project</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 ease-out group-hover:rotate-45 md:h-5 md:w-5"
              strokeWidth={1.5}
            />
          </a>
        </div>

        {/* Sitemap + Team + Studio + Connect — 4-col grid on lg */}
        <div className="grid grid-cols-1 gap-10 border-t border-white/10 pt-12 md:grid-cols-2 md:gap-12 md:pt-16 lg:grid-cols-4">
          {/* Brand block */}
          <div className="lg:col-span-1">
            <Link
              href="/#home"
              aria-label="SAKRON — back to top"
              className="group inline-flex cursor-pointer items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Logo />
              <span className="font-heading text-xl uppercase tracking-tight text-white">
                SAKRON
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-white/60">
              A four-person studio designing and engineering
              quietly-loud digital products from dusk to dawn.
            </p>
          </div>

          {/* Sitemap */}
          <FooterColumn title="Sitemap">
            <ul role="list" className="space-y-3">
              {SITEMAP.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Team profiles */}
          <FooterColumn title="Team">
            <ul role="list" className="space-y-3">
              {TEAM_PAGES.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Connect */}
          <FooterColumn title="Connect">
            <ul role="list" className="space-y-3">
              {STUDIO.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group flex cursor-pointer items-baseline justify-between gap-3 border-b border-transparent py-1 outline-none transition-colors duration-200 hover:border-acid focus-visible:border-acid"
                  >
                    <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45 transition-colors group-hover:text-acid/80 group-focus-visible:text-acid/80">
                      {s.label}
                    </span>
                    <span className="truncate text-right font-body text-sm text-white/80 transition-colors group-hover:text-acid group-focus-visible:text-acid">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        {/* Social row */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-white/10 pt-8 md:mt-16 md:pt-10">
          <span className="mr-2 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
            Elsewhere
          </span>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noreferrer noopener" : undefined}
              aria-label={`${s.label} — opens in a new tab`}
              className="group inline-flex cursor-pointer items-center gap-1.5 border border-white/15 bg-white/[0.02] px-3 py-2 font-body text-[11px] uppercase tracking-[0.25em] text-white/70 backdrop-blur-md transition-colors duration-200 hover:border-acid hover:text-acid focus-visible:border-acid focus-visible:text-acid focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:px-4 md:py-2 md:text-xs"
            >
              {s.label}
              <ArrowUpRight
                className="h-3 w-3 opacity-60 transition-all duration-200 group-hover:rotate-45 group-hover:opacity-100"
                strokeWidth={1.5}
              />
            </a>
          ))}
        </div>

        {/* Bottom legal bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-white/50 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-[11px] uppercase tracking-[0.25em]">
            © {year} SAKRON Studio. All rights reserved.
          </p>
          <p className="font-body text-[11px] uppercase tracking-[0.25em]">
            Crafted in dark mode · v2.0
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-5 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
        {title}
      </p>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex cursor-pointer items-center gap-2 outline-none transition-colors duration-200 hover:text-acid focus-visible:text-acid"
    >
      <span
        aria-hidden="true"
        className="inline-block h-px w-0 bg-acid transition-all duration-200 group-hover:w-4 group-focus-visible:w-4"
      />
      <span className="font-body text-sm text-white/80 transition-colors group-hover:text-acid group-focus-visible:text-acid">
        {children}
      </span>
    </Link>
  );
}