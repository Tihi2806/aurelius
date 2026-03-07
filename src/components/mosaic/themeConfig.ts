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
    id: "classy",
    label: "Classy",
    tagline: "Luxury & craft",
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
    id: "flashy",
    label: "Flashy",
    tagline: "Neon & bold",
    href: "/flashy",
    parallax: 0.1,
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
    id: "brutalist",
    label: "Brutalist",
    tagline: "Raw & direct",
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
    id: "organic",
    label: "Organic",
    tagline: "Natural & calm",
    href: "/organic",
    parallax: 0.03,
    vars: {
      bg: "#f5e8c7",
      fg: "#556b2f",
      muted: "#8a9a5b",
      accent: "#556b2f",
    },
    fontFamily: "'DM Serif Display', serif",
    gridArea: "organic",
  },
  {
    id: "scandi",
    label: "Scandi Shop",
    tagline: "Nordic & minimal",
    href: "/scandi",
    parallax: 0.03,
    vars: {
      bg: "#f2ede6",
      fg: "#2a2520",
      muted: "rgba(160,152,136,0.8)",
      accent: "#2a2520",
    },
    fontFamily: "'Jost', sans-serif",
    gridArea: "scandi",
  },
  {
    id: "elegant",
    label: "Elegant",
    tagline: "Refined & timeless",
    href: "/elegant",
    parallax: 0.04,
    vars: {
      bg: "#fdfaf5",
      fg: "#333",
      muted: "#e0d9d1",
      accent: "#333",
    },
    fontFamily: "'Playfair Display', serif",
    gridArea: "elegant",
  },
];
