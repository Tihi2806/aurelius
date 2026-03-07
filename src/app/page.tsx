"use client";

import { useEffect } from "react";
import { MosaicGrid } from "@/components/mosaic/MosaicGrid";
import "./hero.css";

export default function GatewayPage() {
  useEffect(() => {
    const hero = document.getElementById('hero');
    const cardsSection = document.querySelector('.cards-section') as HTMLElement;
    if (!hero || !cardsSection) return;

    const heroBg = hero.querySelector('.hero-bg') as HTMLElement | null;
    const marqueeWrap = hero.querySelector('.hero-marquee-wrap') as HTMLElement | null;

    let isSnapping = false;

    // --- Parallax + fade based on scroll position ---
    const handleScroll = () => {
      if (isSnapping) return; // don't fight the manual animation during snap
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;
      const progress = Math.min(scrollY / (heroHeight * 2), 1);

      hero.style.opacity = String(Math.max(0, 1 - progress * 1.8));

      if (heroBg) {
        heroBg.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      if (marqueeWrap) {
        marqueeWrap.style.transform = `translateY(calc(-50% + ${scrollY * 0.08}px))`;
      }
    };

    // --- Snap to cards (fade OUT hero) ---
    function snapToCards() {
      if (isSnapping) return;
      isSnapping = true;
      cardsSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { isSnapping = false; }, 1200);
    }

    // --- Snap to hero (fade IN hero explicitly) ---
    function snapToHero() {
      if (isSnapping) return;
      isSnapping = true;

      // Step 1: scroll back to top
      hero!.scrollIntoView({ behavior: 'smooth' });

      // Step 2: manually animate hero opacity from 0 → 1 over 800ms
      // This runs in parallel with the smooth scroll
      const duration = 800;
      const start = performance.now();
      const startOpacity = parseFloat(hero!.style.opacity) || 0;

      function animateOpacity(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        hero!.style.opacity = String(startOpacity + (1 - startOpacity) * eased);

        // Also reset parallax transforms
        if (heroBg) {
          const currentY = parseFloat(heroBg.style.transform.replace('translateY(', '')) || 0;
          heroBg.style.transform = `translateY(${currentY * (1 - eased)}px)`;
        }
        if (marqueeWrap) {
          marqueeWrap.style.transform = `translateY(calc(-50% + ${0}px))`;
        }

        if (progress < 1) {
          requestAnimationFrame(animateOpacity);
        } else {
          // Fully reset
          hero!.style.opacity = '1';
          if (heroBg) heroBg.style.transform = 'translateY(0px)';
          if (marqueeWrap) marqueeWrap.style.transform = 'translateY(-50%)';
          isSnapping = false;
        }
      }

      requestAnimationFrame(animateOpacity);
    }

    // --- Section detection ---
    function isOnCards() {
      return cardsSection.getBoundingClientRect().top <= 100;
    }

    // --- Shared wheel handler ---
    const handleWheel = (e: WheelEvent) => {
      if (isSnapping) {
        e.preventDefault();
        return;
      }
      const onCards = isOnCards();
      if (!onCards && e.deltaY > 0) {
        e.preventDefault();
        snapToCards();
      } else if (onCards && e.deltaY < 0) {
        e.preventDefault();
        snapToHero();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    cardsSection.addEventListener('wheel', handleWheel, { passive: false });

    // --- Touch ---
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isSnapping) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      const onCards = isOnCards();
      if (!onCards && delta > 30) snapToCards();
      else if (onCards && delta < -30) snapToHero();
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      cardsSection.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
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

      <div className="hero-scroll-spacer"></div>

      {/* ── Cards selector ── */}
      <div className="cards-section min-h-screen overflow-hidden relative" style={{ zIndex: 1, position: 'relative' }}>
        <header className="mosaic-header">
          <h1>Choose your experience</h1>
        </header>
        <MosaicGrid />
      </div>

    </div>
  );
}
