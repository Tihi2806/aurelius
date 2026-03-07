"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ThemeConfig } from "./themeConfig";

interface FullscreenPreviewProps {
  theme: ThemeConfig | null;
  onClose: () => void;
}

export function FullscreenPreview({ theme, onClose }: FullscreenPreviewProps) {
  if (!theme) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="mosaic-fullscreen"
        style={{
          ["--preview-bg" as string]: theme.vars.bg,
          ["--preview-fg" as string]: theme.vars.fg,
          ["--preview-accent" as string]: theme.vars.accent,
          ["--preview-font" as string]: theme.fontFamily,
        }}
      >
        <div className="mosaic-fullscreen-inner">
          {/* Mock preview — minimal per-theme preview */}
          <div className="mosaic-preview-mock">
            <div className="mosaic-preview-bar">
              <span>{theme.label}</span>
              <span>Work · Studio · Contact</span>
            </div>
            <div className="mosaic-preview-hero">
              <p>Strategic Brand & Digital</p>
              <h2>We craft brands that endure.</h2>
              <p className="mosaic-preview-sub">{theme.tagline}</p>
            </div>
            <div className="mosaic-preview-cta">
              <Link href={theme.href} className="mosaic-preview-enter">
                Enter {theme.label} →
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mosaic-fullscreen-back"
            aria-label="Back to theme selector"
          >
            ← Back
          </button>
        </div>
      </motion.div>
  );
}
