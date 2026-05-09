"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutShowcase } from "@/components/mosaic/LayoutShowcase";
import { SelectedWorkSection } from "@/components/SelectedWorkSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ValueCalculator } from "@/components/ValueCalculator";
import SpeedTimeline from "@/components/SpeedTimeline";
import { PerformanceGrid } from "@/components/PerformanceGrid";
import { Footer } from "@/components/Footer";
import { scrollToTarget } from "@/components/LenisProvider";
import "./hero.css";
import "./sections.css";

const HERO_BOTTOM_LINE1 = ["Strategic", "Brand", "Agency"];
const HERO_BOTTOM_LINE2 = ["Identity", "&", "Digital"];

const HERO_PARALLAX_LERP = 0.08;
const HERO_PARALLAX_CAP_X = 20;
const HERO_PARALLAX_CAP_Y = 12;

const SECTION_SELECTORS = [
  "#hero",
  ".cards-section",
  ".work-section",
  ".manifesto-section",
  ".services-section",
  ".value-calculator-section",
  ".speed-timeline-section",
  ".performance-grid-section",
  ".contact-section",
] as const;

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);
    const h = () => setPrefers(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return prefers;
}

export default function GatewayPage() {
  const heroBgImgRef = useRef<HTMLImageElement>(null);
  const parallaxTarget = useRef({ x: 0, y: 0 });
  const parallaxCurrent = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  /* ── Hero statue parallax (desktop, fine pointer, no reduced motion) ── */
  useEffect(() => {
    const img = heroBgImgRef.current;
    if (!img) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !isFinePointer) return;

    const hero = document.getElementById("hero");
    if (!hero) return;

    const onMove = (e: MouseEvent) => {
      const targetX = Math.max(-HERO_PARALLAX_CAP_X, Math.min(HERO_PARALLAX_CAP_X, e.clientX * 0.015));
      const targetY = Math.max(-HERO_PARALLAX_CAP_Y, Math.min(HERO_PARALLAX_CAP_Y, e.clientY * 0.01));
      parallaxTarget.current = { x: targetX, y: targetY };
    };

    let rafId = 0;
    const tick = () => {
      const t = parallaxTarget.current;
      const c = parallaxCurrent.current;
      parallaxCurrent.current = {
        x: c.x + (t.x - c.x) * HERO_PARALLAX_LERP,
        y: c.y + (t.y - c.y) * HERO_PARALLAX_LERP,
      };
      const { x, y } = parallaxCurrent.current;
      img.style.transform = `translate(${x}px, ${y}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    hero.addEventListener("mousemove", onMove);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── Marquee init ── */
  useEffect(() => {
    const initMarquee = () => {
      document.querySelectorAll<HTMLElement>(".hero-marquee-track").forEach((track) => {
        const span = track.querySelector("span");
        if (!span) return;
        while (track.scrollWidth < window.innerWidth * 3) {
          track.appendChild(span.cloneNode(true));
        }
        const spanW = span.getBoundingClientRect().width;
        if (spanW <= 0) return;
        track.style.setProperty("--marquee-offset", `-${spanW}px`);
        track.style.animationDuration = `${spanW / 100}s`;
      });
    };
    document.fonts.ready.then(initMarquee);
  }, []);

  /* ── ScrollTrigger snap + per-section enter animations + dot active state ── */
  useEffect(() => {
    const els = SECTION_SELECTORS.map(
      (s) => document.querySelector(s) as HTMLElement | null
    );
    if (els.some((el) => !el)) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const triggers: ScrollTrigger[] = [];

    /* Per-section enter animations (animate once, then disable) */
    function animateOnce(el: HTMLElement, fn: () => void) {
      if (el.dataset.animated === "true") return;
      el.dataset.animated = "true";
      fn();
    }

    function animateServices(el: HTMLElement) {
      const blocks = el.querySelectorAll<HTMLElement>(".service-block");
      blocks.forEach((block, i) =>
        setTimeout(() => block.classList.add("visible"), i * 100)
      );
    }

    function animateContact(el: HTMLElement) {
      const memento = el.querySelector<HTMLElement>(".footer-memento");
      if (memento) setTimeout(() => memento.classList.add("visible"), 200);
    }

    triggers.push(
      ScrollTrigger.create({
        trigger: els[4]!,
        start: "top 70%",
        onEnter: () => animateOnce(els[4]!, () => animateServices(els[4]!)),
      })
    );
    triggers.push(
      ScrollTrigger.create({
        trigger: els[8]!,
        start: "top 70%",
        onEnter: () => animateOnce(els[8]!, () => animateContact(els[8]!)),
      })
    );

    /* Active dot tracking */
    const dots = document.querySelectorAll<HTMLElement>(".section-dot");
    function setActiveDot(idx: number) {
      dots.forEach((dot, i) => dot.classList.toggle("active", i === idx));
    }
    setActiveDot(0);
    els.forEach((el, i) => {
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) setActiveDot(i);
          },
        })
      );
    });

    /* Dot click handlers */
    const dotHandlers: (() => void)[] = [];
    dots.forEach((dot, i) => {
      const handler = () => {
        const target = els[i];
        if (target) scrollToTarget(target, { duration: 0.7 });
      };
      dotHandlers.push(handler);
      dot.addEventListener("click", handler);
    });

    /* Scroll-hint click → first card section */
    const scrollHint = document.querySelector<HTMLElement>("[data-scroll-hint]");
    const onHintClick = () => {
      if (els[1]) scrollToTarget(els[1], { duration: 0.7 });
    };
    if (scrollHint) scrollHint.addEventListener("click", onHintClick);

    /* Master snap — lets each section + each Range card have its own snap target */
    let snapTrigger: ScrollTrigger | null = null;
    if (!reduceMotion) {
      const buildPoints = (): number[] => {
        const totalScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll <= 0) return [0];
        const cards = document.querySelectorAll(
          ".layout-showcase-cinematic-card"
        ).length || 1;
        const points: number[] = [];
        els.forEach((el, idx) => {
          if (!el) return;
          if (idx === 1) {
            const baseTop = el.getBoundingClientRect().top + window.scrollY;
            for (let c = 0; c < cards; c++) {
              points.push((baseTop + c * window.innerHeight) / totalScroll);
            }
          } else {
            const top = el.getBoundingClientRect().top + window.scrollY;
            points.push(top / totalScroll);
          }
        });
        return points.map((p) => Math.max(0, Math.min(1, p)));
      };

      snapTrigger = ScrollTrigger.create({
        snap: {
          snapTo: (progress) => {
            const points = buildPoints();
            return points.reduce(
              (best, p) =>
                Math.abs(p - progress) < Math.abs(best - progress) ? p : best,
              points[0] ?? 0
            );
          },
          duration: { min: 0.25, max: 0.6 },
          delay: 0.1,
          ease: "power2.out",
        },
      });
      triggers.push(snapTrigger);
    }

    /* Refresh once layouts settle, in case fonts/images shift offsets */
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshTimer);
      triggers.forEach((t) => t.kill());
      dots.forEach((dot, i) => dot.removeEventListener("click", dotHandlers[i]));
      if (scrollHint) scrollHint.removeEventListener("click", onHintClick);
    };
  }, []);

  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-[#0a0a0a]">
      {/* ── Section navigation dots (fixed, right edge) ── */}
      <nav className="section-dots" aria-label="Section navigation">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <button
            key={i}
            className={`section-dot${i === 0 ? " active" : ""}`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </nav>

      {/* ══════════════════════════════════════
          Hero (section 0)
          ══════════════════════════════════════ */}
      <section id="hero" className="pb-24 md:pb-0">
        <nav className="hero-nav">
          <a
            href="#hero"
            className="hero-nav-wordmark"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector("#hero");
              if (target) scrollToTarget(target as HTMLElement, { duration: 0.7 });
            }}
          >
            Aurelius
          </a>
          <div className="hero-nav-links">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#work");
                if (target) scrollToTarget(target as HTMLElement, { duration: 0.7 });
              }}
            >
              Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#contact");
                if (target) scrollToTarget(target as HTMLElement, { duration: 0.7 });
              }}
            >
              Contact
            </a>
          </div>
        </nav>

        <div className="hero-bg">
          <div className="hero-glow" />
          <img ref={heroBgImgRef} src="/aurelius%20center%20look.png" alt="Aurelius" />
        </div>

        <div className="hero-fade" />

        {/* Layer 1: full opacity outside the head zone */}
        <div className="hero-marquee-wrap hero-marquee-outer">
          <div className="hero-marquee-track">
            <span>· Aurelius · Brand &amp; Digital ·</span>
            <span>· Aurelius · Brand &amp; Digital ·</span>
          </div>
        </div>

        {/* Layer 2: semi-transparent inside the head zone */}
        <div className="hero-marquee-wrap hero-marquee-inner">
          <div className="hero-marquee-track">
            <span>· Aurelius · Brand &amp; Digital ·</span>
            <span>· Aurelius · Brand &amp; Digital ·</span>
          </div>
        </div>

        <div className="hero-bottom-content">
          <div className="hero-bottom-rule" aria-hidden />

          <div className="hero-bottom-right">
            <motion.p
              className="hero-bottom-right-line"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: prefersReducedMotion ? 0 : 0.08,
                  },
                },
              }}
            >
              {HERO_BOTTOM_LINE1.map((word, i) => (
                <motion.span
                  key={`l1-${i}`}
                  variants={{
                    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </motion.p>
            <motion.p
              className="hero-bottom-right-line"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: 0.3 + (prefersReducedMotion ? 0 : HERO_BOTTOM_LINE1.length * 0.08),
                    staggerChildren: prefersReducedMotion ? 0 : 0.08,
                  },
                },
              }}
            >
              {HERO_BOTTOM_LINE2.map((word, i) => (
                <motion.span
                  key={`l2-${i}`}
                  variants={{
                    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </motion.p>
          </div>

          <motion.div
            data-scroll-hint
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              color: "white",
              cursor: "pointer",
              userSelect: "none",
            }}
            animate={{ opacity: prefersReducedMotion ? 1 : [0.4, 1] }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 400,
              }}
            >
              Scroll
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      <LayoutShowcase />
      <SelectedWorkSection />
      <ManifestoSection />
      <ServicesSection />
      <ValueCalculator />
      <SpeedTimeline />
      <PerformanceGrid />
      <Footer />
    </div>
  );
}
