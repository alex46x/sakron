// Single source of truth for team members.
// Adding a member: append to TEAM and ensure the dynamic route renders.

export type Social = {
  label: string;
  href: string;
};

export type Member = {
  slug: string;
  name: string;
  role: string;
  shortRole: string; // uppercase card eyebrow
  initials: string; // avatar placeholder
  tagline: string;
  bio: string[];
  skills: string[];
  projects: {
    title: string;
    year: string;
    blurb: string;
  }[];
  socials: Social[];
  accent: "acid" | "ember" | "ice" | "rose";
};

export const TEAM: Member[] = [
  {
    slug: "sakif-ahmed",
    name: "Sakif Ahmed",
    role: "Founder & Creative Director",
    shortRole: "FOUNDER",
    initials: "SA",
    tagline:
      "Designs interfaces that feel inevitable — equal parts brutalist and quiet.",
    bio: [
      "Sakif started SAKRON to make digital work that respects attention. A decade across product, brand, and motion has led to a studio obsessed with restraint: every line, every glyph, every spacing decision has to earn its place.",
      "Off-screen he writes about visual systems, photographs architecture at night, and keeps a growing collection of risograph prints.",
    ],
    skills: [
      "Art Direction",
      "Brand Systems",
      "Type Design",
      "Motion",
      "Editorial",
    ],
    projects: [
      {
        title: "NORTHWIND — Identity Refresh",
        year: "2024",
        blurb:
          "Rebuilt a heritage publisher's identity around a custom display face and a strict editorial grid.",
      },
      {
        title: "HALO OS — Design Language",
        year: "2023",
        blurb:
          "Authored the visual system for a privacy-first operating system, from token spec to motion principles.",
      },
      {
        title: "ARC — Editorial Site",
        year: "2023",
        blurb:
          "An archive of long-form essays on architecture, built around a typographic narrative spine.",
      },
    ],
    socials: [
      { label: "Twitter / X", href: "https://twitter.com/" },
      { label: "Are.na", href: "https://are.na/" },
      { label: "Email", href: "mailto:sakif@sakron.studio" },
    ],
    accent: "acid",
  },
  {
    slug: "maria-okonkwo",
    name: "Maria Okonkwo",
    role: "Co-Founder & Engineering Lead",
    shortRole: "CO-FOUNDER",
    initials: "MO",
    tagline:
      "Builds the quiet machinery that makes beautiful products actually work.",
    bio: [
      "Maria leads engineering at SAKRON. She cares about the seams — the parts of a product most users never see but always feel. Her background spans distributed systems, real-time graphics, and the kind of frontend craft that ships at scale.",
      "When she's not shipping, she's mentoring, writing about web performance, and producing ambient mixes on Soundcloud.",
    ],
    skills: [
      "TypeScript",
      "WebGL / Three.js",
      "Edge Runtimes",
      "Systems Design",
      "Performance",
    ],
    projects: [
      {
        title: "PRISM — Realtime Visuals Engine",
        year: "2024",
        blurb:
          "A WebGL engine powering generative brand identities for live events, used by 3 touring artists.",
      },
      {
        title: "MUTE — Reader Mode SDK",
        year: "2023",
        blurb:
          "An open-source SDK that strips the noise out of reading-heavy web apps, now used by 12k sites.",
      },
      {
        title: "DRIFT — Internal Telemetry",
        year: "2022",
        blurb:
          "A privacy-respecting telemetry pipeline that replaced the studio's reliance on third-party trackers.",
      },
    ],
    socials: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "Read.cv", href: "https://read.cv/" },
      { label: "Email", href: "mailto:maria@sakron.studio" },
    ],
    accent: "ice",
  },
  {
    slug: "tomas-vela",
    name: "Tomás Vela",
    role: "Design Lead",
    shortRole: "DESIGN LEAD",
    initials: "TV",
    tagline:
      "Turns half-formed ideas into interfaces people immediately understand.",
    bio: [
      "Tomás runs day-to-day design at SAKRON. He's happiest at the intersection of typography and interaction — the place where a button becomes a sentence.",
      "Previously a senior designer at two Berlin studios and a quiet fixture of the European type scene.",
    ],
    skills: [
      "Interaction Design",
      "Prototyping",
      "Design Systems",
      "Accessibility",
      "Type Setting",
    ],
    projects: [
      {
        title: "FIELD — Component Library",
        year: "2024",
        blurb:
          "A 60-component library used across all SAKRON client work, with motion baked in at the token level.",
      },
      {
        title: "OBJEKT — Museum Companion",
        year: "2023",
        blurb:
          "An in-gallery companion app for a contemporary art museum, designed to feel invisible until needed.",
      },
    ],
    socials: [
      { label: "Dribbble", href: "https://dribbble.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" },
    ],
    accent: "ember",
  },
  {
    slug: "noor-hassan",
    name: "Noor Hassan",
    role: "Engineering Lead, Web",
    shortRole: "WEB LEAD",
    initials: "NH",
    tagline:
      "Cares about milliseconds, markup, and making the web feel native.",
    bio: [
      "Noor ships the front-of-house code at SAKRON — the Next.js, the WebGL, the careful CSS. He's the reason the studio's sites feel quiet even when they're doing a lot.",
      "Outside work: a member of a quarterly zine about the open web.",
    ],
    skills: [
      "Next.js",
      "React",
      "CSS Architecture",
      "Animation",
      "Testing",
    ],
    projects: [
      {
        title: "LUME — Portfolio Framework",
        year: "2024",
        blurb:
          "A minimal Next.js starter for studios and individuals, with motion primitives out of the box.",
      },
      {
        title: "TIDE — Marketing System",
        year: "2023",
        blurb:
          "A composable marketing system that cut page build time for SAKRON's clients by 70%.",
      },
    ],
    socials: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "Personal site", href: "https://example.com/" },
    ],
    accent: "rose",
  },
];

export function getMember(slug: string): Member | undefined {
  return TEAM.find((m) => m.slug === slug);
}