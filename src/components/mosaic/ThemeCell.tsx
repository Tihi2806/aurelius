"use client";

import { motion } from "framer-motion";
import type { ThemeConfig } from "./themeConfig";

interface ThemeCellProps {
  theme: ThemeConfig;
  parallaxX: number;
  parallaxY: number;
  isHovered: boolean;
  isSiblingHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  index: number;
}

export function ThemeCell({
  theme,
  parallaxX,
  parallaxY,
  isHovered,
  isSiblingHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
  index,
}: ThemeCellProps) {
  const factor = 24;
  const tx = parallaxX * theme.parallax * factor;
  const ty = parallaxY * theme.parallax * factor;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mosaic-cell"
      data-theme={theme.id}
      style={{
        gridArea: theme.gridArea,
        transform: `translate(${tx}px, ${ty}px)`,
        opacity: isSiblingHovered ? 0.85 : 1,
        filter: isSiblingHovered ? "blur(2px)" : "none",
        transition: "opacity 0.25s ease, filter 0.25s ease",
        // Theme vars applied per cell
        ["--cell-bg" as string]: theme.vars.bg,
        ["--cell-fg" as string]: theme.vars.fg,
        ["--cell-muted" as string]: theme.vars.muted,
        ["--cell-accent" as string]: theme.vars.accent,
        ["--cell-font" as string]: theme.fontFamily,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="mosaic-cell-inner"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "tween", duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="mosaic-cell-label">{theme.label}</span>
        <p className="mosaic-cell-tagline">{theme.tagline}</p>
        {/* Theme-specific decoration */}
        {theme.id === "elegant" && <div className="mosaic-deco elegant-breathe" />}
        {theme.id === "flashy" && <div className="mosaic-deco flashy-pulse" />}
        {theme.id === "brutalist" && <div className="mosaic-deco brutalist-glitch" />}
        {theme.id === "organic" && <div className="mosaic-deco organic-sway" />}
        {theme.id === "classy" && <div className="mosaic-deco classy-shimmer" />}
      </motion.div>
    </motion.div>
  );
}
