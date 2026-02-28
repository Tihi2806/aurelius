export const hero = {
  eyebrow: "Strategic Brand & Digital",
  headline: "We craft brands and experiences that endure.",
  subtext:
    "Aurelius partners with ambitious companies to build distinctive identities, digital products, and narratives that stand the test of time.",
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
    name: "Meridian",
    slug: "meridian",
    category: "Brand & Digital",
    year: "2024",
    overview:
      "A full brand and digital transformation for Meridian, establishing a distinctive market position and a cohesive digital experience.",
    goals: [
      "Define a clear brand strategy and visual identity",
      "Design and deliver a scalable digital product",
      "Align internal teams around the new brand narrative",
    ],
    approach:
      "We led discovery workshops, defined positioning and messaging, then designed the identity system and digital experience in close collaboration with the Meridian team.",
    results: [
      "Unified brand identity across all touchpoints",
      "40% increase in engagement on the new digital platform",
      "Clear brand guidelines adopted across the organisation",
    ],
    stack: ["Strategy", "Identity", "Next.js", "Tailwind", "CMS"],
  },
  {
    name: "Atlas Ventures",
    slug: "atlas-ventures",
    category: "Identity & Web",
    year: "2024",
    overview:
      "Identity refresh and website redesign for Atlas Ventures, reflecting their ambition and investment philosophy.",
    goals: [
      "Refresh the brand to attract top-tier founders",
      "Create a fast, credible, and memorable web presence",
      "Ensure the site works across devices and contexts",
    ],
    approach:
      "We audited the existing brand and site, proposed a refined identity and information architecture, then designed and built the new site with a focus on clarity and performance.",
    results: [
      "Stronger first impression and credibility",
      "Faster load times and improved accessibility",
      "Easier for the team to update content",
    ],
    stack: ["Identity", "Web Design", "Next.js", "Vercel"],
  },
  {
    name: "Lumina",
    slug: "lumina",
    category: "Product & Motion",
    year: "2023",
    overview:
      "Product design and motion system for Lumina’s flagship app, creating a cohesive and delightful user experience.",
    goals: [
      "Establish a consistent design and motion language",
      "Improve key flows and reduce friction",
      "Build a component library for future development",
    ],
    approach:
      "We mapped core journeys, defined the design system and motion principles, then designed and documented components and key screens with the engineering team.",
    results: [
      "Unified product experience with clear motion guidelines",
      "Faster design and development cycles",
      "Higher user satisfaction scores on core flows",
    ],
    stack: ["Figma", "React", "Framer Motion", "Design Systems"],
  },
  {
    name: "Northgate",
    slug: "northgate",
    category: "Brand Strategy",
    year: "2023",
    overview:
      "Brand strategy and positioning for Northgate, clarifying their offer and narrative in a crowded market.",
    goals: [
      "Articulate a differentiated positioning",
      "Align leadership and teams on the brand story",
      "Create a foundation for future identity and marketing",
    ],
    approach:
      "We ran stakeholder interviews and market analysis, then developed positioning, messaging architecture, and brand narrative in workshops with the leadership team.",
    results: [
      "Clear, agreed positioning and messaging framework",
      "Internal alignment on brand story and tone",
      "Strategy document used for subsequent identity work",
    ],
    stack: ["Strategy", "Messaging", "Workshops"],
  },
  {
    name: "Echo Studio",
    slug: "echo-studio",
    category: "Identity & Film",
    year: "2023",
    overview:
      "Visual identity and brand film for Echo Studio, capturing their creative ethos and attracting the right clients.",
    goals: [
      "Create an identity that reflects their craft and ambition",
      "Produce a short film that communicates the studio’s spirit",
      "Ensure consistency across print and digital",
    ],
    approach:
      "We developed the identity from concept through to final assets, then scripted and produced the brand film with the Echo team, ensuring the film and identity worked together.",
    results: [
      "Distinctive identity that stands out in the industry",
      "Brand film used on site and in pitches",
      "Consistent application across all touchpoints",
    ],
    stack: ["Identity", "Film", "Art Direction", "Motion"],
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
