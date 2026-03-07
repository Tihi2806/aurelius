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
    tagline: "Neon & bold",
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
    id: "scandi",
    label: "Scandi Shop",
    tagline: "Minimal. Considered. Timeless.",
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
];
