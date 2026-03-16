"use client";

import { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { BrowserMockup } from "@/components/BrowserMockup";
import "./mosaic.css";

const layouts = [
  { id: 0, name: "Flashy", bg: "#0a0005", textColor: "#00f0ff" },
  { id: 1, name: "Classy", bg: "#0f0d0a", textColor: "#f8f1e9" },
  { id: 2, name: "Brutalist", bg: "#f0ede8", textColor: "#111" },
  { id: 3, name: "Scandi Shop", bg: "#f0ede8", textColor: "#1e2c3a" },
  { id: 4, name: "Silicon Valley", bg: "#f5f5f7", textColor: "#1a1f36" },
  { id: 5, name: "Editorial", bg: "#0a0a0a", textColor: "#e6e6e6" },
  { id: 6, name: "Midnight Dark", bg: "#070714", textColor: "#e6e6e6" },
];

// index 0–6: label, theme, mediaSrc, url, bgImage must match tab order (Flashy → Midnight Dark)
const STYLES = [
  { label: "Flashy", theme: "dark" as const, tag: "Immersive & Bold", description: "High-energy layouts built for brands that want to captivate and convert.", url: "https://aurelius-sigma.vercel.app/flashy", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/flashy.png", bgImage: "/previews/cards_bg/flashy_bg.jpg" as string | null },
  { label: "Classy", theme: "dark" as const, tag: "Luxury & Refined", description: "Understated elegance for premium brands.", url: "https://aurelius-sigma.vercel.app/classy", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/classy.png", bgImage: "/previews/cards_bg/classy_bg.jpg" as string | null },
  { label: "Brutalist", theme: "light" as const, tag: "Raw & Radical", description: "Grids broken, rules ignored.", url: "https://aurelius-sigma.vercel.app/brutalist", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/brutalist.png", bgImage: "/previews/cards_background/brutalist_background.png" as string | null },
  { label: "Scandi Shop", theme: "light" as const, tag: "Clean & Minimal", description: "Warm minimalism meets mindful commerce.", url: "https://aurelius-sigma.vercel.app/scandi", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/scandi.png", bgImage: "/previews/cards_bg/scandi_bg.jpg" as string | null },
  { label: "Silicon Valley", theme: "light" as const, tag: "SaaS & Product", description: "Conversion-focused, trust-building.", url: "https://aurelius-sigma.vercel.app/saas", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/saas.png", bgImage: "/previews/cards_bg/saas_bg.jpg" as string | null },
  { label: "Editorial", theme: "dark" as const, tag: "Culture & Design", description: "Type-forward, image-led.", url: "https://aurelius-sigma.vercel.app/editorial", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/editorial.png", bgImage: null },
  { label: "Midnight Dark", theme: "dark" as const, tag: "Moody & Electric", description: "Deep blacks, electric accents.", url: "https://aurelius-sigma.vercel.app/midnight", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/midnight.png", bgImage: "/previews/cards_bg/midnight_bg.jpg" as string | null },
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);
  const lastScrollTime = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const transitionEndHandled = useRef(false);
  const arrivalCooldownUntilRef = useRef(0);
  const prevBgActiveIndexRef = useRef<number | null>(null);

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

  // Background image: fade out, update src, fade in when activeIndex changes (never set src to '' or null)
  useEffect(() => {
    if (!bgImgRef.current) return;
    const newLayout = STYLES[activeIndex];
    const newSrc = newLayout.bgImage ?? "";

    if (prevBgActiveIndexRef.current === null) {
      if (newSrc) {
        bgImgRef.current.src = newSrc;
        bgImgRef.current.style.opacity = "1";
      } else {
        bgImgRef.current.style.opacity = "0";
      }
      prevBgActiveIndexRef.current = activeIndex;
      return;
    }
    if (prevBgActiveIndexRef.current === activeIndex) return;

    prevBgActiveIndexRef.current = activeIndex;
    bgImgRef.current.style.opacity = "0";
    const t = setTimeout(() => {
      if (bgImgRef.current) {
        if (newSrc) {
          bgImgRef.current.src = newSrc;
          bgImgRef.current.style.opacity = "1";
        } else {
          bgImgRef.current.style.opacity = "0";
        }
      }
    }, 300);
    return () => clearTimeout(t);
  }, [activeIndex]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // 3D tilt: attach/detach via callback ref so we always listen on the currently mounted tilt container (fixes tilt stopping after tab switch)
  const tiltListenersRef = useRef<{
    el: HTMLDivElement;
    move: (e: MouseEvent) => void;
    leave: () => void;
    rafId: number;
  } | null>(null);

  const setTiltRef = useCallback((el: HTMLDivElement | null) => {
    if (tiltListenersRef.current) {
      const { el: prevEl, move, leave, rafId } = tiltListenersRef.current;
      cancelAnimationFrame(rafId);
      prevEl.removeEventListener("mousemove", move);
      prevEl.removeEventListener("mouseleave", leave);
      tiltListenersRef.current = null;
    }
    tiltRef.current = el;
    if (!el) return;
    let rafId: number = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = (-y * 10).toFixed(2);
        const rotateY = (x * 10).toFixed(2);
        el.style.transition = "none";
        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      if (tiltListenersRef.current) tiltListenersRef.current.rafId = rafId;
    };
    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      el.style.transition = "transform 0.6s ease";
      el.style.transform = "rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    tiltListenersRef.current = { el, move: handleMouseMove, leave: handleMouseLeave, rafId };
  }, []);

  // No-op effect so cleanup runs on unmount (removes listeners from current tilt element)
  useEffect(() => {
    return () => {
      if (tiltListenersRef.current) {
        const { el, move, leave, rafId } = tiltListenersRef.current;
        cancelAnimationFrame(rafId);
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
        tiltListenersRef.current = null;
      }
    };
  }, []);

  // Pill, theme and bg all follow activeIndex (updated immediately on pill click at t=0)
  const displayIndex = activeIndex;

  // Sliding pill indicator: match active pill's exact position and size (left, top, width, height) for multi-row wrap
  useEffect(() => {
    const activePill = pillRefs.current[displayIndex];
    const slider = sliderRef.current;
    const container = pillsContainerRef.current;
    if (!activePill || !slider || !container) return;
    const theme = STYLES[displayIndex].theme;
    const fillColor = theme === "dark" ? "#fff" : "#111";
    const update = () => {
      if (!activePill || !sliderRef.current || !pillsContainerRef.current) return;
      const containerRect = pillsContainerRef.current.getBoundingClientRect();
      const pillRect = activePill.getBoundingClientRect();
      sliderRef.current.style.left = `${pillRect.left - containerRect.left}px`;
      sliderRef.current.style.top = `${pillRect.top - containerRect.top}px`;
      sliderRef.current.style.width = `${pillRect.width}px`;
      sliderRef.current.style.height = `${pillRect.height}px`;
      sliderRef.current.style.backgroundColor = fillColor;
    };
    requestAnimationFrame(() => {
      update();
    });
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(update);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [displayIndex]);

  function goToIndex(index: number) {
    if (index < 0 || index >= STYLES.length || index === activeIndex) return;
    if (transitionState) return;
    const direction = index > activeIndex ? "left" : "right";
    setActiveIndex(index);
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

  // On transitionend only clear transitionState (activeIndex was already set on pill click at t=0)
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
      setTransitionState(null);
    };

    viewport.addEventListener("transitionend", onTransitionEnd);
    return () => viewport.removeEventListener("transitionend", onTransitionEnd);
  }, [transitionState]);

  const handlePillClick = (index: number) => {
    if (index === activeIndex || transitionState) return;
    goToIndex(index);
  };

  // Applied at t=0 on pill click (activeIndex updates immediately); inner wrapper gets this backgroundColor
  const bgColor = layouts[activeIndex].bg;
  const currentTheme = STYLES[activeIndex].theme;
  const themeForActivePill = STYLES[activeIndex].theme;

  const wrapMockup = (content: ReactNode) => (
    <div style={{ perspective: "1200px" }}>
      <div ref={setTiltRef} style={{ transformStyle: "preserve-3d" }}>
        {content}
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className="cards-section" data-theme={currentTheme}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          height: "100%",
          position: "relative",
          overflow: "hidden",
          backgroundColor: bgColor,
          transition: `background-color ${SLIDE_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      >
        {/* Background image — behind content, fades when layout changes; only render when bgImage is set */}
        {STYLES[activeIndex].bgImage && (
          <img
            ref={bgImgRef}
            src={STYLES[activeIndex].bgImage!}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              opacity: 1,
              transition: "opacity 0.6s ease",
            }}
          />
        )}
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
            {/* Heading block */}
            <div className="layout-showcase-heading-block">
              <p className="layout-showcase-eyebrow">OUR APPROACH</p>
              <h2 className="layout-showcase-heading">Your brand has a voice. Here&apos;s what it could look like.</h2>
            </div>

            {/* Pill nav */}
            <div
              ref={pillsContainerRef}
              className="layout-showcase-pills flex flex-row flex-wrap gap-2 px-4 md:gap-3 justify-center"
              style={{
                position: "relative",
                width: "100%",
                alignSelf: "center",
              }}
            >
              {/* Sliding background indicator */}
              <div
                ref={sliderRef}
                aria-hidden
                style={{
                  position: "absolute",
                  borderRadius: 9999,
                  transition:
                    "left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1), top 0.35s cubic-bezier(0.4, 0, 0.2, 1), height 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease",
                  pointerEvents: "none",
                  zIndex: 0,
                  backgroundColor: STYLES[displayIndex].theme === "dark" ? "#fff" : "#111",
                }}
              />
              {layouts.map((layout, index) => {
                const isActive = index === displayIndex;
                const activeBg = themeForActivePill === "dark" ? "#fff" : "#111";
                const activeColor = themeForActivePill === "dark" ? "#111" : "#fff";
                const inactiveBorder =
                  themeForActivePill === "dark"
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(0,0,0,0.12)";
                const inactiveColor = themeForActivePill === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)";
                return (
                  <button
                    key={layout.id}
                    ref={(el) => {
                      pillRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => handlePillClick(index)}
                    className="layout-showcase-pill rounded-full font-sans px-4 py-1.5 text-[11px] md:px-7 md:py-2.5 md:text-sm"
                    style={{
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                      ...(isActive
                        ? { backgroundColor: activeBg, color: activeColor, border: "none" }
                        : { backgroundColor: "transparent", border: inactiveBorder, color: inactiveColor }),
                    }}
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
                  overflow: transitionState ? "hidden" : "visible",
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
                        description={STYLES[transitionState.fromIndex].description}
                        mediaType={STYLES[transitionState.fromIndex].mediaType}
                        mediaSrc={STYLES[transitionState.fromIndex].mediaSrc}
                        wrapMockup={wrapMockup}
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
                        description={STYLES[transitionState.toIndex].description}
                        mediaType={STYLES[transitionState.toIndex].mediaType}
                        mediaSrc={STYLES[transitionState.toIndex].mediaSrc}
                        wrapMockup={wrapMockup}
                      />
                    </div>
                  </>
                ) : (
                  <div className="styles-slide-pane single">
                    <BrowserMockup
                      url={STYLES[activeIndex].url}
                      label={STYLES[activeIndex].label}
                      tag={STYLES[activeIndex].tag}
                      description={STYLES[activeIndex].description}
                      mediaType={STYLES[activeIndex].mediaType}
                      mediaSrc={STYLES[activeIndex].mediaSrc}
                      wrapMockup={wrapMockup}
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
