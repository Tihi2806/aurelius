export const hero = {
  eyebrow: "Built with intent.",
  headline: "Built with intent.",
  subtext:
    "Websites that rank, convert, and bring you clients — engineered with the craft your brand deserves.",
  ctaPrimary: "Start a project",
  ctaSecondary: "See the work",
} as const;

export const heroClassy = {
  eyebrow: "The Gold Standard",
  headline: "Elegance that speaks in a whisper.",
  subtext:
    "For brands that don't need to shout. We craft high-fashion identities rooted in restraint, prestige, and the details that only the discerning will notice.",
  ctaPrimary: "Start a project",
  ctaSecondary: "View our work",
} as const;

export const heroBrutalist = {
  eyebrow: "The Rule Breaker",
  subtext:
    "Design that refuses to follow the rules. High-contrast, oversized type, and layouts that demand attention — for brands that mean business and aren't afraid to show it.",
  ctaPrimary: "Start a project",
  ctaSecondary: "View our work",
} as const;

export interface Service {
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    title: "Brand Strategy & Identity",
    description:
      "Positioning, naming, visual identity, and brand systems that differentiate and resonate.",
  },
  {
    title: "Digital Product Design",
    description:
      "Web and app experiences built on clarity, usability, and lasting aesthetic quality.",
  },
  {
    title: "Content & Storytelling",
    description:
      "Narratives and content strategies that connect your brand to the right audiences.",
  },
  {
    title: "Experience Design",
    description:
      "End-to-end journey design from first touch to long-term engagement.",
  },
  {
    title: "Motion & Film",
    description:
      "Motion design and film that bring your brand to life with intention.",
  },
  {
    title: "Guidance & Workshops",
    description:
      "Workshops and ongoing guidance to align teams and elevate brand execution.",
  },
];

export interface WorkProject {
  name: string;
  slug: string;
  category: string;
  year: string;
  overview: string;
  goals: string[];
  approach: string;
  results: string[];
  stack: string[];
}

export const work: WorkProject[] = [
  {
    name: "Rinel — Elektro Services",
    slug: "rinel",
    category: "Brand & Web",
    year: "2025",
    overview:
      "A single-page concept build for Rinel, a Serbian electrician — designed to establish a credible online presence and a clear path from search to first contact, ready for launch when greenlit.",
    goals: [
      "Make local services easy to scan and understand",
      "Establish a credible, professional online presence",
      "Provide a direct path from visitor to enquiry",
    ],
    approach:
      "Single-page architecture grouping services by category, paired with a concise contact path and content tuned for the local search context.",
    results: [
      "Concept build complete — ready for client launch",
      "Clear service categorisation and contact flow",
    ],
    stack: ["Lovable", "Brand"],
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    text: "We learn your context, ambitions, and constraints through focused dialogue.",
  },
  {
    step: "02",
    title: "Define",
    text: "Strategy and creative direction are aligned with your vision and market.",
  },
  {
    step: "03",
    title: "Design",
    text: "We design and iterate in close collaboration until the work meets the bar.",
  },
  {
    step: "04",
    title: "Deliver",
    text: "Handover, documentation, and support so you can own what we build.",
  },
];

export interface WhyUsItem {
  title: string;
  description: string;
}

export const whyUs: WhyUsItem[] = [
  {
    title: "Rigour over trends",
    description:
      "We favour timeless craft and strategic clarity over short-lived aesthetics.",
  },
  {
    title: "Partnership, not vendors",
    description:
      "We work as an extension of your team, invested in your long-term success.",
  },
  {
    title: "Outcomes that last",
    description:
      "Every deliverable is built to scale, evolve, and remain relevant for years.",
  },
];

export const contactCta = {
  headline: "Let's build something lasting.",
  subtext: "Tell us about your project. We respond within 24 hours.",
  formTitle: "Get in touch",
  formSubtext: "Share your project and we’ll get back within 24 hours.",
  successMessage: "Thank you. We’ll be in touch soon.",
  submitLabel: "Send message",
  footerLine: "Aurelius — Strategic Brand & Digital Agency",
} as const;
