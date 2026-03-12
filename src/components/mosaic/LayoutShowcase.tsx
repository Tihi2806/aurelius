"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CARD_PREVIEWS } from "./ThemeCell";
import "./mosaic.css";

const THEME_IDS = ["flashy", "classy", "brutalist", "scandi", "saas", "editorial", "midnight"] as const;

const layouts = [
  { id: 0, name: "Flashy", bg: "rgb(10, 0, 31)", textColor: "#00f0ff" },
  { id: 1, name: "Classy", bg: "#1a1208", textColor: "#f8f1e9" },
  { id: 2, name: "Brutalist", bg: "#000000", textColor: "#ffffff" },
  { id: 3, name: "Scandi Shop", bg: "#e8ecef", textColor: "#1e2c3a" },
  { id: 4, name: "Silicon Valley", bg: "#f6f9fc", textColor: "#1a1f36" },
  { id: 5, name: "Editorial", bg: "#fbfbfb", textColor: "#1a1a1a" },
  { id: 6, name: "Midnight Dark", bg: "#08090a", textColor: "#e6e6e6" },
];

const tags = [
  "Immersive & bold",
  "Luxury & whisper",
  "Raw. Honest. Radical.",
  "Minimal. Considered.",
  "High-tech, clean, professional.",
  "Sophisticated, typography-heavy.",
  "Immersive, neon-accented.",
];

export function LayoutShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoScrollY, setAutoScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    pillRefs.current[activeIndex]?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [activeIndex]);

  useEffect(() => {
    setAutoScrollY(0); // reset on layout change
    const preview = previewRef.current?.querySelector(".card-preview");
    if (!preview || !(preview instanceof HTMLElement)) return;

    preview.style.transform = "";

    const maxScroll = preview.scrollHeight - preview.clientHeight;
    const scrollableHeight = maxScroll > 0 ? maxScroll : preview.scrollHeight * 0.3;
    const useTranslate = maxScroll <= 0;

    let start: number | null = null;
    const duration = 6000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased =
        progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      if (useTranslate) {
        preview.style.transform = `translateY(-${eased * scrollableHeight}px)`;
      } else {
        preview.scrollTop = eased * maxScroll;
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      preview.style.transform = "";
    };
  }, [activeIndex]);

  const handlePillClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const activeThemeId = THEME_IDS[activeIndex];
  const activePreview = CARD_PREVIEWS[activeThemeId];

  return (
    <div className="cards-section">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ height: "100%", position: "relative" }}
      >
        {/* Background color layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeIndex}-bg`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: layouts[activeIndex].bg,
              zIndex: 0,
            }}
          />
        </AnimatePresence>

        {/* Content wrapper */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            padding: 0,
            paddingTop: "40px",
            paddingBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: "20px",
            }}
          >
            {/* pills–preview gap 20px; preview–label gap 16px via inner wrapper */}
            {/* Pill nav */}
            <div
              className="layout-showcase-pills flex flex-row gap-2 overflow-x-auto px-4 md:gap-3"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                width: "100%",
                justifyContent: "center",
                flexShrink: 0,
                alignSelf: "center",
              }}
            >
            {layouts.map((layout, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={layout.id}
                  ref={(el) => {
                    pillRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => handlePillClick(index)}
                  className={`rounded-full font-sans transition-all duration-[250ms] ease-out px-5 py-2 text-[11px] md:px-7 md:py-2.5 md:text-sm ${
                    isActive
                      ? "bg-white font-medium text-black"
                      : "border border-white/15 bg-transparent text-gray-500"
                  }`}
                  style={{ flexShrink: 0 }}
                >
                  {layout.name}
                </button>
              );
            })}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
            {/* Preview window */}
            <div
              className="layout-showcase-preview"
              style={{
                width: "min(92%, 1300px)",
                position: "relative",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
            <div
              className="md:rounded-xl rounded-lg"
              style={{
                width: "100%",
                paddingBottom: "56.25%",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
              }}
            >
              <div style={{ position: "absolute", inset: 0 }} ref={previewRef}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <div
                      className="card-preview-wrap"
                      style={{ pointerEvents: "none" }}
                    >
                      {activePreview}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            </div>

            {/* Name + tag */}
            <div className="flex flex-col items-center text-center" style={{ alignSelf: "center" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-label`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center"
              >
                <p
                  className="font-normal"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2rem, 3.5vw, 3em)",
                    color: layouts[activeIndex].textColor,
                  }}
                >
                  {layouts[activeIndex].name}
                </p>
                <p
                  className="mt-2 uppercase tracking-widest text-[#737373]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(0.75rem, 1.2vw, 1.2em)",
                  }}
                >
                  {tags[activeIndex]}
                </p>
              </motion.div>
            </AnimatePresence>
            </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
