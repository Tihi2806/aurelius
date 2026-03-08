export interface ThemeConfig {
  id: string;
  label: string;
  tagline: string;
  href: string;
  /** Parallax multiplier (0.02–0.12) */
  parallax: number;
  /** CSS custom property prefix for this theme */
  vars: {
    bg: string;
    fg: string;
    muted: string;
    accent: string;
    accent2?: string;
  };
  fontFamily: string;
  /** For grid placement */
  gridArea: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: "flashy",
    label: "Flashy",
    tagline: "Immersive & bold",
    href: "/flashy",
    parallax: 0.10,
    vars: {
      bg: "#0a001f",
      fg: "#00f0ff",
      muted: "rgba(195,0,255,0.6)",
      accent: "#c300ff",
      accent2: "#00f0ff",
    },
    fontFamily: "'Orbitron', sans-serif",
    gridArea: "flashy",
  },
  {
    id: "classy",
    label: "Classy",
    tagline: "Luxury & whisper",
    href: "/classy",
    parallax: 0.04,
    vars: {
      bg: "#1a1a1a",
      fg: "#f8f1e9",
      muted: "rgba(212,175,55,0.8)",
      accent: "#d4af37",
    },
    fontFamily: "'Cinzel', serif",
    gridArea: "classy",
  },
  {
    id: "brutalist",
    label: "Brutalist",
    tagline: "Raw. Honest. Radical.",
    href: "/brutalist",
    parallax: 0.08,
    vars: {
      bg: "#000",
      fg: "#fff",
      muted: "#888",
      accent: "#fff",
    },
    fontFamily: "'Space Mono', monospace",
    gridArea: "brutalist",
  },
  {
    id: "scandi",
    label: "Scandi Shop",
    tagline: "Minimal. Considered.",
    href: "/scandi",
    parallax: 0.06,
    vars: {
      bg: "#eef1f5",
      fg: "#1e2c3a",
      muted: "rgba(94,121,148,0.65)",
      accent: "#5e7994",
    },
    fontFamily: "'Jost', sans-serif",
    gridArea: "scandi",
  },
  {
    id: "saas",
    label: "Silicon Valley",
    tagline: "High-tech, clean, professional.",
    href: "/saas",
    parallax: 0.05,
    vars: {
      bg: "#F6F9FC",
      fg: "#1A1F36",
      muted: "rgba(26,31,54,0.6)",
      accent: "#635BFF",
    },
    fontFamily: "'Inter', sans-serif",
    gridArea: "saas",
  },
  {
    id: "editorial",
    label: "Editorial",
    tagline: "Sophisticated, typography-heavy, magazine-style.",
    href: "/editorial",
    parallax: 0.04,
    vars: {
      bg: "#FBFBFB",
      fg: "#1A1A1A",
      muted: "rgba(26,26,26,0.6)",
      accent: "#1A1A1A",
    },
    fontFamily: "'Playfair Display', serif",
    gridArea: "editorial",
  },
  {
    id: "midnight",
    label: "Midnight Dark",
    tagline: "Immersive, neon-accented, creative studio.",
    href: "/midnight",
    parallax: 0.08,
    vars: {
      bg: "#08090A",
      fg: "#E6E6E6",
      muted: "rgba(0,255,65,0.8)",
      accent: "#00FF41",
      accent2: "#BC13FE",
    },
    fontFamily: "'Inter Tight', sans-serif",
    gridArea: "midnight",
  },
];
