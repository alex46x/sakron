import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

/**
 * Premium Contact section.
 * - Liquid Glass surface with hairline border, no shadows.
 * - 2-col on md+ (info + CTA), stacked on mobile.
 * - All tap targets >=44pt; hover/focus transitions 200ms ease-out.
 * - Honors ::selection via globals.css.
 */

const CHANNELS = [
  {
    icon: Mail,
    label: "EMAIL",
    value: "hello@sakron.studio",
    href: "mailto:hello@sakron.studio",
  },
  {
    icon: Phone,
    label: "PHONE",
    value: "+1 (555) 014-2010",
    href: "tel:+15550142010",
  },
  {
    icon: MapPin,
    label: "STUDIO",
    value: "Dhaka · Berlin · Remote",
    href: "https://maps.google.com/?q=SAKRON+Studio",
  },
] as const;

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full bg-ink px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-12 flex flex-col gap-3 md:mb-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-acid/80">
            05 — Contact
          </p>
          <h2
            id="contact-heading"
            className="font-heading text-5xl uppercase leading-[0.95] tracking-tight text-white md:text-7xl"
          >
            Get in <span className="text-acid">touch</span>
          </h2>
          <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-white/60 md:text-base">
            New projects, collaborations, or just a curious hello — pick a
            channel and we'll get back within a working day.
          </p>
        </header>

        {/* Card */}
        <div className="grid grid-cols-1 gap-6 border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md md:grid-cols-[1.1fr_1fr] md:gap-10 md:p-10">
          {/* Left — channels */}
          <div className="flex flex-col gap-2 divide-y divide-white/10">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  aria-label={`${c.label}: ${c.value}`}
                  className="group flex cursor-pointer items-center justify-between gap-4 py-5 outline-none transition-colors duration-200 hover:bg-white/[0.02] focus-visible:bg-white/[0.04] md:py-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white/75 transition-colors duration-200 group-hover:border-acid group-hover:text-acid group-focus-visible:border-acid group-focus-visible:text-acid">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
                        {c.label}
                      </span>
                      <span className="mt-1 font-body text-base text-white transition-colors group-hover:text-acid group-focus-visible:text-acid md:text-lg">
                        {c.value}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-white/50 transition-all duration-200 group-hover:-rotate-12 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-acid md:h-5 md:w-5"
                    strokeWidth={1.5}
                  />
                </a>
              );
            })}
          </div>

          {/* Right — primary CTA panel */}
          <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <div>
              <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
                Project brief
              </p>
              <p className="font-heading text-3xl uppercase leading-[0.95] tracking-tight text-white md:text-4xl">
                Tell us the
                <br />
                shape of the
                <br />
                <span className="text-acid">problem.</span>
              </p>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-white/65">
                A paragraph is plenty. We reply with three questions and a
                calendar link within 24 hours.
              </p>
            </div>

            <a
              href="mailto:hello@sakron.studio?subject=Project%20brief"
              className="group inline-flex cursor-pointer items-center justify-between gap-3 border border-acid/70 bg-acid px-5 py-4 font-body text-sm uppercase tracking-[0.2em] text-ink transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-acid/90 hover:shadow-[0_18px_60px_-25px_rgba(215,255,30,0.6)] focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:px-6 md:py-5 md:text-base"
            >
              <span>Send a brief</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:rotate-45 md:h-5 md:w-5"
                strokeWidth={1.75}
              />
            </a>

            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40">
              Available Mon — Fri · UTC+0 → UTC+6
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}