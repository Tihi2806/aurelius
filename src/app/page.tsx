"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LayoutShowcase, type LayoutShowcaseHandle } from "@/components/mosaic/LayoutShowcase";
import { SelectedWorkSection } from "@/components/SelectedWorkSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ValueCalculator } from "@/components/ValueCalculator";
import { RevenueLeak } from "@/components/RevenueLeak";
import SpeedTimeline from "@/components/SpeedTimeline";
import { PerformanceGrid } from "@/components/PerformanceGrid";
import "./hero.css";
import "./sections.css";

const HEADLINE_WORDS = ["Let's", "build", "something", "that", "lasts."];

const HERO_BOTTOM_LINE1 = ["Strategic", "Brand", "Agency"];
const HERO_BOTTOM_LINE2 = ["Identity", "&", "Digital"];

const HERO_PARALLAX_LERP = 0.08;
const HERO_PARALLAX_CAP_X = 20;
const HERO_PARALLAX_CAP_Y = 12;

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
  const cardsScrollRef = useRef<LayoutShowcaseHandle>(null);

  /* ── Hero statue parallax (desktop, fine pointer, no reduced motion) ── */
  useEffect(() => {
    const img = heroBgImgRef.current;
    if (!img) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReducedMotion || !isFinePointer) return;

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

  /* ── Marquee init (unchanged from original) ── */
  useEffect(() => {
    const initMarquee = () => {
      document.querySelectorAll<HTMLElement>('.hero-marquee-track').forEach(track => {
        const span = track.querySelector('span');
        if (!span) return;
        // Clone until track content fills 3× viewport so the loop never shows a gap
        while (track.scrollWidth < window.innerWidth * 3) {
          track.appendChild(span.cloneNode(true));
        }
        const spanW = span.getBoundingClientRect().width;
        if (spanW <= 0) return;
        // Pixel-accurate offset: animate exactly one span width, then loop invisibly
        track.style.setProperty('--marquee-offset', `-${spanW}px`);
        // 100px/s → slow, readable luxury pace
        track.style.animationDuration = `${spanW / 100}s`;
      });
    };
    document.fonts.ready.then(initMarquee);
  }, []);

  /* ── Full-page scroll system — 7 sections (desktop + mobile, touch + wheel) ── */
  useEffect(() => {
    const hero      = document.getElementById('hero')                    as HTMLElement | null;
    const cards     = document.querySelector('.cards-section')            as HTMLElement | null;
    const work      = document.querySelector('.work-section')            as HTMLElement | null;
    const manifesto = document.querySelector('.manifesto-section')      as HTMLElement | null;
    const services  = document.querySelector('.services-section')        as HTMLElement | null;
    const calculator = document.querySelector('.value-calculator-section') as HTMLElement | null;
    const revenueLeak = document.querySelector('.revenue-leak-section') as HTMLElement | null;
    const speedTimeline = document.querySelector('.speed-timeline-section') as HTMLElement | null;
    const performanceGrid = document.querySelector('.performance-grid-section') as HTMLElement | null;
    const contact   = document.querySelector('.contact-section')         as HTMLElement | null;

    if (!hero || !cards || !work || !manifesto || !services || !calculator || !revenueLeak || !speedTimeline || !performanceGrid || !contact) return;

    const allSections = [hero, cards, work, manifesto, services, calculator, revenueLeak, speedTimeline, performanceGrid, contact];

    // Lock document scroll (same pattern as original)
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlHeight   = html.style.height;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyHeight   = body.style.height;
    html.style.overflow = "hidden";
    html.style.height   = "100vh";
    body.style.overflow = "hidden";
    body.style.height   = "100vh";

    const heroBg      = hero.querySelector('.hero-bg')           as HTMLElement | null;
    const marqueeWrap = hero.querySelector('.hero-marquee-wrap') as HTMLElement | null;

    let current   = 0;          // 0=hero ... 6=revenueLeak 7=speedTimeline 8=performanceGrid 9=contact
    let animating = false;
    const DURATION = 750;

    // Same cubic in-out ease as the original
    function ease(p: number): number {
      return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    }

    /* ── Section nav dots ── */
    const dots = document.querySelectorAll<HTMLElement>('.section-dot');
    function updateDots(index: number) {
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    /* ── Section enter animations (fire once per visit) ── */
    function triggerEnterAnimation(index: number) {
      if (index === 2) animateWork();
      if (index === 3) animateManifesto();
      if (index === 4) animateServices();
      if (index === 9) animateContact();
    }

    function animateWork() {
      if (work!.dataset.animated === 'true') return;
      work!.dataset.animated = 'true';
      work!.querySelectorAll<HTMLElement>('.work-row').forEach((row, i) => {
        setTimeout(() => row.classList.add('visible'), i * 100);
      });
      const previewWrap = work!.querySelector<HTMLElement>('.work-preview-wrap');
      if (previewWrap) setTimeout(() => previewWrap.classList.add('visible'), 100);
    }

    function animateManifesto() {
      if (manifesto!.dataset.animated === 'true') return;
      manifesto!.dataset.animated = 'true';
      manifesto!.querySelectorAll<HTMLElement>('.manifesto-word').forEach((word, i) => {
        setTimeout(() => word.classList.add('visible'), i * 60);
      });
      const wordCount = manifesto!.querySelectorAll('.manifesto-word').length;
      const link = manifesto!.querySelector<HTMLElement>('.manifesto-link');
      if (link) setTimeout(() => link.classList.add('visible'), wordCount * 60 + 200);
    }

    function animateServices() {
      if (services!.dataset.animated === 'true') return;
      services!.dataset.animated = 'true';
      const circle = services!.querySelector<HTMLElement>('.services-circle');
      const connectors = services!.querySelectorAll<HTMLElement>('.services-connector');
      const blocks = services!.querySelectorAll<HTMLElement>('.services-block');
      if (circle) circle.classList.add('visible');
      connectors.forEach((line, i) => {
        setTimeout(() => line.classList.add('visible'), 600 + i * 150);
      });
      blocks.forEach((block, i) => {
        setTimeout(() => block.classList.add('visible'), 600 + i * 150);
      });
    }

    function animateContact() {
      if (contact!.dataset.animated === 'true') return;
      contact!.dataset.animated = 'true';

      const words = contact!.querySelectorAll<HTMLElement>('.headline-word');
      words.forEach((word, i) => {
        setTimeout(() => word.classList.add('visible'), i * 80);
      });

      setTimeout(() => {
        const cb = contact!.querySelector<HTMLElement>('.contact-body');
        if (cb) cb.classList.add('visible');
      }, words.length * 80 + 150);
    }

    /* ════════════════════════════════════════════
       Navigation functions
       ════════════════════════════════════════════ */

    // Hero → Cards: original opacity + parallax animation (preserved exactly)
    function showCards() {
      if (animating || current !== 0) return;
      animating = true;
      current   = 1;
      const start = performance.now();

      function tick(now: number) {
        const p = ease(Math.min((now - start) / DURATION, 1));

        hero!.style.opacity = String(1 - p);
        if (heroBg)      heroBg.style.transform      = `translateY(${-p * 50}px)`;
        if (marqueeWrap) marqueeWrap.style.transform  = `translateY(calc(-50% + ${-p * 25}px))`;
        cards!.style.transform = `translateY(${(1 - p) * 100}%)`;

        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          hero!.style.opacity    = '0';
          if (heroBg) heroBg.style.transform = 'translateY(-50px)';
          cards!.style.transform = 'translateY(0%)';
          animating = false;
          updateDots(1);
          cardsScrollRef.current?.startArrivalCooldown?.();
        }
      }
      requestAnimationFrame(tick);
    }

    // Cards → Hero: original fade-back animation (preserved exactly)
    function showHero() {
      if (animating || current !== 1) return;
      animating = true;
      current   = 0;
      const start = performance.now();

      hero!.style.opacity = '0';
      if (heroBg)      heroBg.style.transform      = 'translateY(-50px)';
      if (marqueeWrap) marqueeWrap.style.transform  = 'translateY(calc(-50% + -25px))';

      function tick(now: number) {
        const p = ease(Math.min((now - start) / DURATION, 1));

        hero!.style.opacity = String(p);
        if (heroBg)      heroBg.style.transform     = `translateY(${-50 * (1 - p)}px)`;
        if (marqueeWrap) marqueeWrap.style.transform = `translateY(calc(-50% + ${-25 * (1 - p)}px))`;
        cards!.style.transform = `translateY(${p * 100}%)`;

        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          hero!.style.opacity    = '1';
          if (heroBg)      heroBg.style.transform     = 'translateY(0px)';
          if (marqueeWrap) marqueeWrap.style.transform = 'translateY(-50%)';
          cards!.style.transform = 'translateY(100%)';
          animating = false;
          updateDots(0);
        }
      }
      requestAnimationFrame(tick);
    }

    /*
     * slideTo(from, to)
     * Generic bilateral translateY transition for sections 1–4.
     * Forward  (to > from): exiting goes to -100%, entering comes from +100%.
     * Backward (to < from): exiting goes to +100%, entering comes from -100%.
     * Hero ↔ Cards cases delegate to showCards / showHero to preserve their
     * original opacity + parallax behaviour.
     */
    function slideTo(from: number, to: number) {
      if (animating || from === to) return;
      if (from === 0) { showCards(); return; }
      if (to   === 0) { showHero();  return; }

      animating = true;
      current   = to;

      const dir    = to > from ? 1 : -1;  // +1=forward(up), -1=backward(down)
      const fromEl = allSections[from];
      const toEl   = allSections[to];

      // Guarantee the entering section starts at the correct off-screen position
      toEl.style.transform = `translateY(${dir * 100}%)`;

      const start = performance.now();

      function tick(now: number) {
        const p = ease(Math.min((now - start) / DURATION, 1));
        fromEl.style.transform = `translateY(${dir * -p * 100}%)`;
        toEl.style.transform   = `translateY(${dir * (1 - p) * 100}%)`;

        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          fromEl.style.transform = `translateY(${dir * -100}%)`;
          toEl.style.transform   = 'translateY(0%)';
          animating = false;
          updateDots(to);
          triggerEnterAnimation(to);
          if (to === 1) cardsScrollRef.current?.startArrivalCooldown?.();
        }
      }
      requestAnimationFrame(tick);
    }

    /*
     * jumpTo(target) — instant teleport used by section dot clicks.
     * Sets every section to its correct resting position in a single frame.
     */
    function jumpTo(target: number) {
      if (animating || target === current) return;

      // Hero opacity + parallax
      hero!.style.opacity = target === 0 ? '1' : '0';
      if (heroBg)
        heroBg.style.transform = target === 0 ? 'translateY(0px)' : 'translateY(-50px)';
      if (marqueeWrap)
        marqueeWrap.style.transform = target === 0
          ? 'translateY(-50%)'
          : 'translateY(calc(-50% + -25px))';

      // Sections 1–9: above target = -100%, at target = 0%, below = +100%
      [cards, work, manifesto, services, calculator, revenueLeak, speedTimeline, performanceGrid, contact].forEach((el, i) => {
        const idx = i + 1;
        el!.style.transform =
          idx < target  ? 'translateY(-100%)' :
          idx === target ? 'translateY(0%)'   :
          'translateY(100%)';
      });

      current = target;
      updateDots(target);
      triggerEnterAnimation(target);
      if (target === 1) cardsScrollRef.current?.startArrivalCooldown?.();
    }

    /* ════════════════════════════════════════════
       Event handlers
       ════════════════════════════════════════════ */

    function isAtBottom(el: HTMLElement): boolean {
      return el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
    }

    function onWheel(e: WheelEvent) {
      if (animating) { e.preventDefault(); return; }
      const dy = e.deltaY;

      if (current === 0) {
        // Hero: scroll down → cards
        if (dy > 0) { e.preventDefault(); slideTo(0, 1); }

      } else if (current === 1) {
        // Cards (styles section): scroll advances style or hands off to prev/next section
        e.preventDefault();
        const handled = cardsScrollRef.current?.onScrollDelta(dy);
        if (!handled) {
          if (dy < 0) slideTo(1, 0);
          else slideTo(1, 2);
        }

      } else if (current === 2) {
        e.preventDefault();
        if      (dy > 0) slideTo(2, 3);
        else if (dy < 0) slideTo(2, 1);

      } else if (current === 3) {
        e.preventDefault();
        if      (dy > 0) slideTo(3, 4);
        else if (dy < 0) slideTo(3, 2);

      } else if (current === 4) {
        e.preventDefault();
        if (dy > 0) slideTo(4, 5);
        else if (dy < 0) slideTo(4, 3);
      } else if (current === 5) {
        e.preventDefault();
        if (dy > 0) slideTo(5, 6);
        else if (dy < 0) slideTo(5, 4);
      } else if (current === 6) {
        e.preventDefault();
        if (dy > 0) slideTo(6, 7);
        else if (dy < 0) slideTo(6, 5);
      } else if (current === 7) {
        e.preventDefault();
        if (dy > 0) slideTo(7, 8);
        else if (dy < 0) slideTo(7, 6);
      } else if (current === 8) {
        e.preventDefault();
        if (dy > 0) slideTo(8, 9);
        else if (dy < 0) slideTo(8, 7);
      } else if (current === 9) {
        e.preventDefault();
        if (dy < 0) slideTo(9, 8);
      }
    }

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      if (animating) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;

      if      (current === 0 && dy > 0)                          slideTo(0, 1);
      else if (current === 1) {
        const handled = cardsScrollRef.current?.onScrollDelta(dy);
        if (!handled) {
          if (dy < 0) slideTo(1, 0);
          else slideTo(1, 2);
        }
      }
      else if (current === 2 && dy > 0)                          slideTo(2, 3);
      else if (current === 2 && dy < 0)                          slideTo(2, 1);
      else if (current === 3 && dy > 0)                          slideTo(3, 4);
      else if (current === 3 && dy < 0)                          slideTo(3, 2);
      else if (current === 4 && dy > 0)                          slideTo(4, 5);
      else if (current === 4 && dy < 0)                          slideTo(4, 3);
      else if (current === 5 && dy > 0)                         slideTo(5, 6);
      else if (current === 5 && dy < 0)                         slideTo(5, 4);
      else if (current === 6 && dy > 0)                         slideTo(6, 7);
      else if (current === 6 && dy < 0)                         slideTo(6, 5);
      else if (current === 7 && dy > 0)                         slideTo(7, 8);
      else if (current === 7 && dy < 0)                         slideTo(7, 6);
      else if (current === 8 && dy > 0)                         slideTo(8, 9);
      else if (current === 8 && dy < 0)                         slideTo(8, 7);
      else if (current === 9 && dy < 0)                         slideTo(9, 8);
    };

    /* ── Init ── */
    hero!.style.opacity       = '1';
    cards!.style.transform    = 'translateY(100%)';
    work!.style.transform     = 'translateY(100%)';
    manifesto!.style.transform = 'translateY(100%)';
    services!.style.transform = 'translateY(100%)';
    calculator!.style.transform = 'translateY(100%)';
    revenueLeak!.style.transform = 'translateY(100%)';
    speedTimeline!.style.transform = 'translateY(100%)';
    performanceGrid!.style.transform = 'translateY(100%)';
    contact!.style.transform  = 'translateY(100%)';
    if (heroBg)      heroBg.style.transform     = 'translateY(0px)';
    if (marqueeWrap) marqueeWrap.style.transform = 'translateY(-50%)';
    updateDots(0);

    // Scroll hint click triggers hero → cards (preserves original UX)
    const scrollHint = hero.querySelector<HTMLElement>('[data-scroll-hint]');
    const onScrollHintClick = () => { if (!animating && current === 0) slideTo(0, 1); };
    if (scrollHint) scrollHint.addEventListener('click', onScrollHintClick);

    // Dot click handlers
    const dotHandlers: (() => void)[] = [];
    dots.forEach((dot, i) => {
      const fn = () => jumpTo(i);
      dotHandlers.push(fn);
      dot.addEventListener('click', fn);
    });

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });

    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
      if (scrollHint) scrollHint.removeEventListener('click', onScrollHintClick);
      dots.forEach((dot, i) => dot.removeEventListener('click', dotHandlers[i]));
      // Restore document scroll so subpages work after navigation
      html.style.overflow = prevHtmlOverflow;
      html.style.height   = prevHtmlHeight;
      body.style.overflow = prevBodyOverflow;
      body.style.height   = prevBodyHeight;
    };
  }, []);

  /* ════════════════════════════════════════════
     JSX
     ════════════════════════════════════════════ */
  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-[#0a0a0a]">

      {/* ── Section navigation dots (fixed, right edge) ── */}
      <nav className="section-dots" aria-label="Section navigation">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <button
            key={i}
            className="section-dot"
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </nav>

      {/* ══════════════════════════════════════
          Hero  (section 0 — unchanged on desktop)
          ══════════════════════════════════════ */}
      <section id="hero" className="pb-24 md:pb-0">
        <nav className="hero-nav">
          <a href="#" className="hero-nav-wordmark">Aurelius</a>
          <div className="hero-nav-links">
            <a href="#">Work</a>
            <a href="#">Studio</a>
            <a href="#">Contact</a>
          </div>
        </nav>

        <div className="hero-bg">
          <div className="hero-glow" />
          <img ref={heroBgImgRef} src="/aurelius%20center%20look.png" alt="Aurelius" />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'black',
            opacity: 0.25,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

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

        {/* Bottom content: stacked on mobile (flex-col gap-4), absolute on desktop */}
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
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              color: 'white',
              cursor: 'default',
              userSelect: 'none',
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
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
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

      {/* ══════════════════════════════════════
          Cards selector  (section 1 — unchanged)
          ══════════════════════════════════════ */}
      <LayoutShowcase ref={cardsScrollRef} />

      {/* ══════════════════════════════════════
          Section 2 — Selected Work
          ══════════════════════════════════════ */}
      <SelectedWorkSection />

      {/* ══════════════════════════════════════
          Section 3 — Manifesto
          ══════════════════════════════════════ */}
      <ManifestoSection />

      {/* ══════════════════════════════════════
          Section 4 — Services
          ══════════════════════════════════════ */}
      <ServicesSection />

      {/* ══════════════════════════════════════
          Section 5 — Value Calculator
          ══════════════════════════════════════ */}
      <ValueCalculator />

      {/* ══════════════════════════════════════
          Section 6 — Revenue Leak
          ══════════════════════════════════════ */}
      <RevenueLeak />

      {/* ══════════════════════════════════════
          Section 7 — Speed Timeline
          ══════════════════════════════════════ */}
      <SpeedTimeline />

      {/* ══════════════════════════════════════
          Section 8 — Performance Grid
          ══════════════════════════════════════ */}
      <PerformanceGrid />

      {/* ══════════════════════════════════════
          Section 9 — Contact / CTA
          ══════════════════════════════════════ */}
      <section className="contact-section">
        <div className="contact-inner">

          {/* Clip-path word-reveal headline */}
          <h2
            className="contact-headline"
            aria-label="Let's build something that lasts."
          >
            {HEADLINE_WORDS.map((word) => (
              <span key={word} className="headline-word">
                <span className="headline-word-inner">{word}</span>
              </span>
            ))}
          </h2>

          {/* Two-column: left copy · right CTA */}
          <div className="contact-body">
            <p className="contact-text">
              We take on a limited number of projects each year. If you&apos;re
              building something worth making, we&apos;d like to hear from you.
            </p>
            <div className="contact-action">
              <a href="mailto:hello@aurelius.co" className="contact-btn contact-btn-outline">
                → Start a Project
              </a>
            </div>
          </div>

        </div>

        {/* Muted bottom bar */}
        <div className="contact-footer-bar">
          <span className="contact-footer-left">Aurelius © 2024</span>
          <div className="contact-footer-right">
            <a href="#">Instagram</a>
            {' · '}
            <a href="#">LinkedIn</a>
            {' · '}
            <a href="#">Dribbble</a>
          </div>
        </div>
      </section>

    </div>
  );
}
