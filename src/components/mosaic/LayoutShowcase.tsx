"use client";

import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";
import { BrowserMockup } from "@/components/BrowserMockup";
import "./mosaic.css";

const layouts = [
  { id: 0, name: "Flashy", bg: "rgb(10, 0, 31)", textColor: "#00f0ff" },
  { id: 1, name: "Classy", bg: "#1a1208", textColor: "#f8f1e9" },
  { id: 2, name: "Brutalist", bg: "#000000", textColor: "#ffffff" },
  { id: 3, name: "Scandi Shop", bg: "#e8ecef", textColor: "#1e2c3a" },
  { id: 4, name: "Silicon Valley", bg: "#f6f9fc", textColor: "#1a1f36" },
  { id: 5, name: "Editorial", bg: "#fbfbfb", textColor: "#1a1a1a" },
  { id: 6, name: "Midnight Dark", bg: "#08090a", textColor: "#e6e6e6" },
];

// index 0–6: label, theme, mediaSrc and url must match tab order (Flashy → Midnight Dark)
const STYLES = [
  { label: "Flashy", theme: "dark" as const, tag: "Immersive & Bold", url: "https://aurelius-sigma.vercel.app/flashy", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/flashy.png" },
  { label: "Classy", theme: "dark" as const, tag: "Luxury & Refined", url: "https://aurelius-sigma.vercel.app/classy", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/classy.png" },
  { label: "Brutalist", theme: "light" as const, tag: "Raw & Radical", url: "https://aurelius-sigma.vercel.app/brutalist", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/brutalist.png" },
  { label: "Scandi Shop", theme: "light" as const, tag: "Clean & Minimal", url: "https://aurelius-sigma.vercel.app/scandi", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/scandi.png" },
  { label: "Silicon Valley", theme: "light" as const, tag: "SaaS & Product", url: "https://aurelius-sigma.vercel.app/saas", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/saas.png" },
  { label: "Editorial", theme: "dark" as const, tag: "Culture & Design", url: "https://aurelius-sigma.vercel.app/editorial", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/editorial.png" },
  { label: "Midnight Dark", theme: "dark" as const, tag: "Moody & Electric", url: "https://aurelius-sigma.vercel.app/midnight", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/midnight.png" },
];

const COOLDOWN_MS = 700;
const SLIDE_DURATION_MS = 600;
const ARRIVAL_COOLDOWN_MS = 800;

export interface LayoutShowcaseHandle {
  onScrollDelta: (dy: number) => boolean;
  startArrivalCooldown: () => void;
}

export const LayoutShowcase = forwardRef<LayoutShowcaseHandle>(function LayoutShowcase(_, ref) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [transitionState, setTransitionState] = useState<{
    fromIndex: number;
    toIndex: number;
    direction: "left" | "right";
  } | null>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastScrollTime = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const transitionEndHandled = useRef(false);
  const arrivalCooldownUntilRef = useRef(0);

  useImperativeHandle(ref, () => ({
    onScrollDelta(dy: number): boolean {
      const now = Date.now();
      if (now < arrivalCooldownUntilRef.current) return true;
      if (now - lastScrollTime.current < COOLDOWN_MS) return true;
      if (transitionState) return true;

      if (activeIndex === 0 && dy < 0) return false;
      if (activeIndex === STYLES.length - 1 && dy > 0) return false;

      lastScrollTime.current = now;
      if (dy > 0) {
        goToIndex(activeIndex + 1);
      } else {
        goToIndex(activeIndex - 1);
      }
      return true;
    },
    startArrivalCooldown() {
      arrivalCooldownUntilRef.current = Date.now() + ARRIVAL_COOLDOWN_MS;
    },
  }), [activeIndex, transitionState]);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    pillRefs.current[activeIndex]?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [activeIndex]);

  function goToIndex(index: number) {
    if (index < 0 || index >= STYLES.length || index === activeIndex) return;
    if (transitionState) return;
    const direction = index > activeIndex ? "left" : "right";
    setTransitionState({ fromIndex: activeIndex, toIndex: index, direction });
  }

  // Force reflow then set end positions so transition runs from correct start (BUG 1 fix)
  useEffect(() => {
    if (!transitionState) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const panes = viewport.querySelectorAll<HTMLElement>(".styles-slide-pane");
    if (panes.length !== 2) return;

    const [outgoingPane, incomingPane] = panes;
    const { direction } = transitionState;

    // Start positions are already set in JSX (outgoing 0, incoming 100%/-100%). Force reflow so the browser has applied them.
    void viewport.offsetHeight;

    // Now set end positions so the CSS transition runs
    outgoingPane.style.transform =
      direction === "left" ? "translateX(-100%)" : "translateX(100%)";
    incomingPane.style.transform = "translateX(0)";
  }, [transitionState]);

  // Clean up only after transitionend; update activeIndex only then (BUG 2: pill and content in sync)
  useEffect(() => {
    if (!transitionState) return;
    transitionEndHandled.current = false;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      if (!(e.target as HTMLElement).classList.contains("styles-slide-pane")) return;
      if (transitionEndHandled.current) return;
      transitionEndHandled.current = true;
      setActiveIndex(transitionState.toIndex);
      setTransitionState(null);
    };

    viewport.addEventListener("transitionend", onTransitionEnd);
    return () => viewport.removeEventListener("transitionend", onTransitionEnd);
  }, [transitionState]);

  const handlePillClick = (index: number) => {
    if (index === activeIndex || transitionState) return;
    goToIndex(index);
  };

  // Pill shows outgoing index during transition so it matches visible content; only after transitionend we show activeIndex (BUG 2)
  const displayIndex = transitionState ? transitionState.fromIndex : activeIndex;
  const bgColor = transitionState ? layouts[transitionState.toIndex].bg : layouts[activeIndex].bg;
  const currentTheme = STYLES[displayIndex].theme;

  return (
    <div className="cards-section" data-theme={currentTheme}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          height: "100%",
          position: "relative",
          backgroundColor: bgColor,
          transition: `background-color ${SLIDE_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      >
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
                const isActive = index === displayIndex;
                return (
                  <button
                    key={layout.id}
                    ref={(el) => {
                      pillRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => handlePillClick(index)}
                    className={`layout-showcase-pill rounded-full font-sans transition-all duration-[250ms] ease-out px-5 py-2 text-[11px] md:px-7 md:py-2.5 md:text-sm ${
                      isActive
                        ? "layout-showcase-pill-active bg-white font-medium text-black"
                        : "layout-showcase-pill-inactive border border-white/15 bg-transparent text-gray-500"
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
              {/* Preview window — slide container */}
              <div
                ref={viewportRef}
                className="layout-showcase-preview styles-slide-viewport"
                style={{
                  width: "min(92%, 1300px)",
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {transitionState ? (
                  <>
                    {/* Outgoing: frozen snapshot of current slide (first in DOM = position:relative via CSS) */}
                    <div
                      key={`outgoing-${transitionState.fromIndex}`}
                      className="styles-slide-pane"
                      style={{ transform: "translateX(0)" }}
                    >
                      <BrowserMockup
                        url={STYLES[transitionState.fromIndex].url}
                        label={STYLES[transitionState.fromIndex].label}
                        tag={STYLES[transitionState.fromIndex].tag}
                        mediaType={STYLES[transitionState.fromIndex].mediaType}
                        mediaSrc={STYLES[transitionState.fromIndex].mediaSrc}
                      />
                    </div>
                    {/* Incoming: fixed next slide data; start off-screen, end position set in useEffect after forced reflow */}
                    <div
                      key={`incoming-${transitionState.toIndex}`}
                      className="styles-slide-pane"
                      style={{
                        transform:
                          transitionState.direction === "left"
                            ? "translateX(100%)"
                            : "translateX(-100%)",
                      }}
                    >
                      <BrowserMockup
                        url={STYLES[transitionState.toIndex].url}
                        label={STYLES[transitionState.toIndex].label}
                        tag={STYLES[transitionState.toIndex].tag}
                        mediaType={STYLES[transitionState.toIndex].mediaType}
                        mediaSrc={STYLES[transitionState.toIndex].mediaSrc}
                      />
                    </div>
                  </>
                ) : (
                  <div className="styles-slide-pane single">
                    <BrowserMockup
                      url={STYLES[activeIndex].url}
                      label={STYLES[activeIndex].label}
                      tag={STYLES[activeIndex].tag}
                      mediaType={STYLES[activeIndex].mediaType}
                      mediaSrc={STYLES[activeIndex].mediaSrc}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
