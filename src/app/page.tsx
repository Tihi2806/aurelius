"use client";

import { useEffect } from "react";
import { MosaicGrid } from "@/components/mosaic/MosaicGrid";
import "./hero.css";

export default function GatewayPage() {
  useEffect(() => {
    const hero = document.getElementById('hero');
    const cards = document.querySelector('.cards-section') as HTMLElement | null;
    if (!hero || !cards) return;

    // Lock document scroll only on landing (so it doesn't persist when navigating away)
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlHeight = html.style.height;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyHeight = body.style.height;
    html.style.overflow = "hidden";
    html.style.height = "100vh";
    body.style.overflow = "hidden";
    body.style.height = "100vh";

    const heroBg = hero.querySelector('.hero-bg') as HTMLElement | null;
    const marqueeWrap = hero.querySelector('.hero-marquee-wrap') as HTMLElement | null;

    let view: 'hero' | 'cards' = 'hero';
    let animating = false;
    const DURATION = 750;

    function ease(p: number) {
      return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    }

    // --- Scroll DOWN: hero fades out, cards slides up ---
    function showCards() {
      if (animating || view === 'cards') return;
      animating = true;
      view = 'cards';
      const start = performance.now();

      function tick(now: number) {
        const p = ease(Math.min((now - start) / DURATION, 1));

        hero!.style.opacity = String(1 - p);
        if (heroBg) heroBg.style.transform = `translateY(${-p * 50}px)`;
        if (marqueeWrap) marqueeWrap.style.transform = `translateY(calc(-50% + ${-p * 25}px))`;

        cards!.style.transform = `translateY(${(1 - p) * 100}%)`;

        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          hero!.style.opacity = '0';
          if (heroBg) heroBg.style.transform = 'translateY(-50px)';
          cards!.style.transform = 'translateY(0%)';
          animating = false;
        }
      }
      requestAnimationFrame(tick);
    }

    // --- Scroll UP: cards slides down, hero fades back in ---
    function showHero() {
      if (animating || view === 'hero') return;
      animating = true;
      view = 'hero';
      const start = performance.now();

      hero!.style.opacity = '0';
      if (heroBg) heroBg.style.transform = 'translateY(-50px)';
      if (marqueeWrap) marqueeWrap.style.transform = 'translateY(calc(-50% + -25px))';

      function tick(now: number) {
        const p = ease(Math.min((now - start) / DURATION, 1));

        hero!.style.opacity = String(p);
        if (heroBg) heroBg.style.transform = `translateY(${-50 * (1 - p)}px)`;
        if (marqueeWrap) marqueeWrap.style.transform = `translateY(calc(-50% + ${-25 * (1 - p)}px))`;

        cards!.style.transform = `translateY(${p * 100}%)`;

        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          hero!.style.opacity = '1';
          if (heroBg) heroBg.style.transform = 'translateY(0px)';
          if (marqueeWrap) marqueeWrap.style.transform = 'translateY(-50%)';
          cards!.style.transform = 'translateY(100%)';
          animating = false;
        }
      }
      requestAnimationFrame(tick);
    }

    function onHeroWheel(e: WheelEvent) {
      if (animating) { e.preventDefault(); return; }
      if (view === 'hero' && e.deltaY > 0) {
        e.preventDefault();
        showCards();
      }
    }

    function onCardsWheel(e: WheelEvent) {
      if (animating) { e.preventDefault(); return; }
      if (view === 'cards' && e.deltaY < 0 && cards!.scrollTop <= 0) {
        e.preventDefault();
        showHero();
      }
    }

    window.addEventListener('wheel', onHeroWheel, { passive: false });
    cards.addEventListener('wheel', onCardsWheel, { passive: false });

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (animating) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (view === 'hero' && delta > 40) showCards();
      else if (view === 'cards' && delta < -40 && cards!.scrollTop <= 0) showHero();
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    // Init
    hero.style.opacity = '1';
    cards.style.transform = 'translateY(100%)';
    if (heroBg) heroBg.style.transform = 'translateY(0px)';
    if (marqueeWrap) marqueeWrap.style.transform = 'translateY(-50%)';

    return () => {
      window.removeEventListener('wheel', onHeroWheel);
      cards!.removeEventListener('wheel', onCardsWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      // Restore document scroll so subpages are scrollable after navigation
      html.style.overflow = prevHtmlOverflow;
      html.style.height = prevHtmlHeight;
      body.style.overflow = prevBodyOverflow;
      body.style.height = prevBodyHeight;
    };
  }, []);

  return (
    <div className="w-full bg-[#0a0a0a]">

      {/* ── Hero ── */}
      <section id="hero">
        <div className="hero-bg">
          <img src="/aurelius%20center%20look.png" alt="Aurelius" />
        </div>

        <div className="hero-fade" />

        {/* Layer 1: full opacity outside the head zone */}
        <div className="hero-marquee-wrap hero-marquee-outer">
          <div className="hero-marquee-track">
            <span>Aurelius · We Craft Brands That Endure · Strategic Brand &amp; Digital ·</span>
            <span>Aurelius · We Craft Brands That Endure · Strategic Brand &amp; Digital ·</span>
            <span>Aurelius · We Craft Brands That Endure · Strategic Brand &amp; Digital ·</span>
          </div>
        </div>

        {/* Layer 2: semi-transparent inside the head zone */}
        <div className="hero-marquee-wrap hero-marquee-inner">
          <div className="hero-marquee-track">
            <span>Aurelius · We Craft Brands That Endure · Strategic Brand &amp; Digital ·</span>
            <span>Aurelius · We Craft Brands That Endure · Strategic Brand &amp; Digital ·</span>
            <span>Aurelius · We Craft Brands That Endure · Strategic Brand &amp; Digital ·</span>
          </div>
        </div>

        <div className="hero-bottom-left">Est. 2024 · Global</div>

        <div className="hero-bottom-right">
          <p>Strategic Brand Agency</p>
          <p>Identity &amp; Digital</p>
        </div>

        <div className="hero-scroll-hint">
          <p>Scroll</p>
        </div>
      </section>

      {/* ── Cards selector ── */}
      <div className="cards-section">
        <header className="mosaic-header">
          <h1>Choose your experience</h1>
        </header>
        <MosaicGrid />
      </div>

    </div>
  );
}
