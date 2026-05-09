"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const STYLES = [
  { label: "Flashy", theme: "dark" as const, tag: "Immersive & Bold", description: "High-energy layouts built for brands that want to captivate and convert.", url: "https://aurelius-sigma.vercel.app/flashy", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/flashy.png", bgImage: "/previews/cards_background/flashy_background.png" as string | null, bgOverlay: "rgba(0,0,0,0.50)" as string | null },
  { label: "Classy", theme: "dark" as const, tag: "Luxury & Refined", description: "Understated elegance for premium brands.", url: "https://aurelius-sigma.vercel.app/classy", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/classy.png", bgImage: "/previews/cards_background/classy_background.png" as string | null, bgOverlay: "rgba(0,0,0,0.45)" as string | null },
  { label: "Brutalist", theme: "dark" as const, tag: "Raw & Radical", description: "Grids broken, rules ignored.", url: "https://aurelius-sigma.vercel.app/brutalist", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/brutalist.png", bgImage: "/previews/cards_background/brutalist_background.png" as string | null, bgOverlay: "rgba(0,0,0,0.45)" as string | null },
  { label: "Scandi Shop", theme: "dark" as const, tag: "Clean & Minimal", description: "Warm minimalism meets mindful commerce.", url: "https://aurelius-sigma.vercel.app/scandi", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/scandi.png", bgImage: "/previews/cards_background/scandi_background.png" as string | null, bgOverlay: "rgba(0,0,0,0.45)" as string | null },
  { label: "Silicon Valley", theme: "dark" as const, tag: "SaaS & Product", description: "Conversion-focused, trust-building.", url: "https://aurelius-sigma.vercel.app/saas", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/saas.png", bgImage: "/previews/cards_background/saas_background.png" as string | null, bgOverlay: "rgba(0,0,0,0.45)" as string | null },
  { label: "Editorial", theme: "dark" as const, tag: "Culture & Design", description: "Type-forward, image-led.", url: "https://aurelius-sigma.vercel.app/editorial", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/editorial.png", bgImage: null, bgOverlay: null },
  { label: "Midnight Dark", theme: "dark" as const, tag: "Moody & Electric", description: "Deep blacks, electric accents.", url: "https://aurelius-sigma.vercel.app/midnight", mediaType: "image" as const, mediaSrc: "/previews/cards_preview/midnight.png", bgImage: "/previews/cards_background/midnight_background.png" as string | null, bgOverlay: "rgba(0,0,0,0.45)" as string | null },
];

export function LayoutShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const prevBgActiveIndexRef = useRef<number | null>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // ── ScrollTrigger pin: vertical scroll → horizontal translate, with active-card snap ──
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const N = STYLES.length;
    const computeOffsets = () => {
      const vw = window.innerWidth / 100;
      const cardWidth = Math.min(78 * vw, 1100);
      const gap = 24;
      const initialX = 11 * vw;
      const finalX = initialX - (N - 1) * (cardWidth + gap);
      return { initialX, finalX };
    };

    const { initialX } = computeOffsets();
    gsap.set(track, { x: initialX });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${(N - 1) * window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
      onRefresh: () => {
        const { initialX: ix } = computeOffsets();
        gsap.set(track, { x: ix });
      },
      onUpdate: (self) => {
        const { initialX: ix, finalX: fx } = computeOffsets();
        const x = ix + (fx - ix) * self.progress;
        gsap.set(track, { x });
        const idx = Math.round(self.progress * (N - 1));
        setActiveIndex((prev) => (prev === idx ? prev : idx));
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // ── Background image cross-fade per active card ──
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

  // ── 3D tilt on active card hover ──
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
    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transition = "none";
        el.style.transform = `rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
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

  const bgColor = layouts[activeIndex].bg;
  const currentTheme = STYLES[activeIndex].theme;

  const wrapMockup = (content: ReactNode) => (
    <div style={{ perspective: "1200px" }}>
      <div ref={setTiltRef} style={{ transformStyle: "preserve-3d" }}>
        {content}
      </div>
    </div>
  );

  const totalCards = STYLES.length;

  return (
    <div ref={sectionRef} id="layouts" className="cards-section layout-showcase-cinematic" data-theme={currentTheme}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          height: "100%",
          position: "relative",
          overflow: "hidden",
          backgroundColor: bgColor,
          transition: "background-color 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          {STYLES[activeIndex].bgImage != null && STYLES[activeIndex].bgImage !== "" && (
            <img
              key={activeIndex}
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
          {STYLES[activeIndex].bgOverlay && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: STYLES[activeIndex].bgOverlay!,
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="layout-showcase-cinematic-viewport">
            <div ref={trackRef} className="layout-showcase-cinematic-track">
              {STYLES.map((style, index) => (
                <div key={index} className="layout-showcase-cinematic-card">
                  <div style={{ position: "relative" }}>
                    <BrowserMockup
                      url={style.url}
                      label={style.label}
                      tag={style.tag}
                      description={style.description}
                      mediaType={style.mediaType}
                      mediaSrc={style.mediaSrc}
                      wrapMockup={index === activeIndex ? wrapMockup : undefined}
                    />
                    <div className="layout-showcase-cinematic-overlay">
                      <div className="layout-showcase-cinematic-overlay-left">
                        <h3 className="layout-showcase-cinematic-project-name">{style.label}</h3>
                        <a
                          href={style.url}
                          className="layout-showcase-cinematic-explore"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Explore Project
                        </a>
                      </div>
                      <span className="layout-showcase-cinematic-counter">
                        {index + 1} / {totalCards}
                      </span>
                      <span className="layout-showcase-cinematic-scroll">Scroll</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
