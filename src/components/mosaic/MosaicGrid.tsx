"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeCell } from "./ThemeCell";
import { FullscreenPreview } from "./FullscreenPreview";
import { THEMES } from "./themeConfig";
import "./mosaic.css";

export function MosaicGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMouseNorm({ x, y });
        rafRef.current = 0;
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setMouseNorm({ x: 0, y: 0 });
  }, []);

  const expandedTheme = expandedId ? THEMES.find((t) => t.id === expandedId) ?? null : null;

  return (
    <>
      <div
        ref={containerRef}
        className="mosaic-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mosaic-noise" aria-hidden />
        <div className="mosaic-grid">
          {THEMES.map((theme, index) => (
            <ThemeCell
              key={theme.id}
              theme={theme}
              index={index}
              parallaxX={mouseNorm.x}
              parallaxY={mouseNorm.y}
              isHovered={hoveredId === theme.id}
              isSiblingHovered={hoveredId !== null && hoveredId !== theme.id}
              onClick={() => setExpandedId(theme.id)}
              onMouseEnter={() => setHoveredId(theme.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {expandedTheme && (
          <motion.div
            key={expandedTheme.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mosaic-fullscreen-wrapper"
          >
            <FullscreenPreview theme={expandedTheme} onClose={() => setExpandedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
