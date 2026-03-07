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

const CARD_PREVIEWS: Record<string, React.ReactNode> = {
  classy: (
    <div className="card-preview">
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom,rgba(0,0,0,0.6),transparent)", zIndex: 1 }}>
        <span style={{ fontFamily: "serif", fontSize: 11, letterSpacing: 3, color: "#c9a84c", textTransform: "uppercase" }}>Aurelius</span>
        <div style={{ display: "flex", gap: 14 }}>
          <span style={{ fontFamily: "serif", fontSize: 8, letterSpacing: 2, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Work</span>
          <span style={{ fontFamily: "serif", fontSize: 8, letterSpacing: 2, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Services</span>
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0d0b07 0%,#1e1608 50%,#0d0b07 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, background: "linear-gradient(to top,rgba(0,0,0,0.8),transparent)", zIndex: 1 }}>
        <div style={{ fontFamily: "serif", fontSize: 8, letterSpacing: 3, color: "#c9a84c", textTransform: "uppercase", marginBottom: 6 }}>Strategic Brand &amp; Digital</div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#f0e8d0", lineHeight: 1.15, fontStyle: "italic" }}>We craft brands<br />that endure.</div>
        <div style={{ marginTop: 10, display: "inline-block", border: "1px solid rgba(201,168,76,0.5)", padding: "4px 10px" }}>
          <span style={{ fontFamily: "serif", fontSize: 7, letterSpacing: 2, color: "#c9a84c", textTransform: "uppercase" }}>Start a project</span>
        </div>
      </div>
    </div>
  ),
  flashy: (
    <div className="card-preview">
      <div style={{ position: "absolute", inset: 0, background: "#060010" }} />
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle,rgba(124,58,237,0.4) 0%,transparent 70%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.25) 0%,transparent 70%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1 }}>
        <span style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#fff", textTransform: "uppercase" }}>Aurelius</span>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, zIndex: 1 }}>
        <div style={{ fontFamily: "sans-serif", fontSize: 7, letterSpacing: 3, color: "#7c3aed", textTransform: "uppercase", marginBottom: 8 }}>Strategic Brand &amp; Digital</div>
        <div style={{ fontFamily: "sans-serif", fontSize: 18, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>We craft <span style={{ color: "#7c3aed" }}>brands</span><br />that endure.</div>
        <div style={{ marginTop: 10, display: "inline-block", background: "#7c3aed", padding: "5px 12px", borderRadius: 3 }}>
          <span style={{ fontFamily: "sans-serif", fontSize: 7, fontWeight: 700, letterSpacing: 2, color: "#fff", textTransform: "uppercase" }}>Start a project</span>
        </div>
      </div>
    </div>
  ),
  brutalist: (
    <div className="card-preview">
      <div style={{ position: "absolute", inset: 0, background: "#f0ece4" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "10px 16px", borderBottom: "2px solid #111", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0ece4", zIndex: 1 }}>
        <span style={{ fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 2, color: "#111", textTransform: "uppercase", fontWeight: 700 }}>AURELIUS</span>
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{ fontFamily: "'Courier New',monospace", fontSize: 7, color: "#888", textTransform: "uppercase" }}>Work</span>
          <span style={{ fontFamily: "'Courier New',monospace", fontSize: 7, color: "#888", textTransform: "uppercase" }}>Services</span>
        </div>
        <div style={{ background: "#e63329", padding: "3px 8px" }}>
          <span style={{ fontFamily: "'Courier New',monospace", fontSize: 7, fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>Brief Us</span>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, borderTop: "2px solid #111", zIndex: 1 }}>
        <div style={{ fontFamily: "'Bebas Neue','Arial Black',sans-serif", fontSize: 32, color: "#111", lineHeight: 0.9, letterSpacing: -0.5, textTransform: "uppercase" }}>WE CRAFT<br />BRANDS &amp;<br />ENDURE.</div>
        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ background: "#111", padding: "4px 10px" }}>
            <span style={{ fontFamily: "'Courier New',monospace", fontSize: 7, fontWeight: 700, color: "#f0ece4", textTransform: "uppercase", letterSpacing: 1 }}>Start a project →</span>
          </div>
        </div>
      </div>
    </div>
  ),
  scandi: (
    <div className="card-preview">
      <div style={{ position: "absolute", inset: 0, background: "#eef1f5" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(30,44,58,0.08)", zIndex: 1 }}>
        <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 200, fontSize: 8, letterSpacing: 3, color: "rgba(30,44,58,0.35)", textTransform: "uppercase" }}>☰</span>
        <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: 4, color: "#1e2c3a", textTransform: "uppercase" }}>Forma</span>
        <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 200, fontSize: 8, letterSpacing: 2, color: "rgba(30,44,58,0.35)", textTransform: "uppercase" }}>Cart (0)</span>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, zIndex: 1 }}>
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 200, fontSize: 7, letterSpacing: 4, color: "#5e7994", textTransform: "uppercase", marginBottom: 8 }}>— New Collection</div>
        <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 100, fontSize: 28, color: "#1e2c3a", letterSpacing: -1, textTransform: "uppercase", lineHeight: 1 }}>FORMA<br />STUDIO</div>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 200, fontSize: 7, letterSpacing: 3, color: "#5e7994", textTransform: "uppercase", borderBottom: "1px solid #5e7994", paddingBottom: 2 }}>Shop now →</span>
        </div>
      </div>
    </div>
  ),
};

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
        transform: `translate(${tx}px, ${ty}px)`,
        opacity: isSiblingHovered ? 0.85 : 1,
        filter: isSiblingHovered ? "blur(2px)" : "none",
        transition: "opacity 0.25s ease, filter 0.25s ease",
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
      {/* Card preview — fades in on hover, replaces default content */}
      {CARD_PREVIEWS[theme.id] && (
        <div
          className="card-preview-wrap"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          {CARD_PREVIEWS[theme.id]}
        </div>
      )}

      <motion.div
        className="mosaic-cell-inner"
        style={{ opacity: isHovered ? 0 : 1, transition: "opacity 0.35s ease" }}
        transition={{ type: "tween", duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="mosaic-cell-label">{theme.label}</span>
        <p className="mosaic-cell-tagline">{theme.tagline}</p>
        {/* Theme-specific decoration */}
        {theme.id === "flashy" && <div className="mosaic-deco flashy-pulse" />}
        {theme.id === "brutalist" && <div className="mosaic-deco brutalist-glitch" />}
        {theme.id === "classy" && <div className="mosaic-deco classy-shimmer" />}
      </motion.div>
    </motion.div>
  );
}
