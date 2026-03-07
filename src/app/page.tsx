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

    // --- Parallax + fade (runs during programmatic scroll) ---
    const handleScroll = () => {
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

    // --- Snap function ---
    function snapTo(target: Element) {
      if (isSnapping) return;
      isSnapping = true;
      target.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { isSnapping = false; }, 1200);
    }

    // --- Wheel handler ---
    const handleWheel = (e: WheelEvent) => {
      if (isSnapping) {
        e.preventDefault();
        return;
      }

      const scrollY = window.scrollY;
      const cardsSectionTop = cardsSection.offsetTop;
      const threshold = 80; // px tolerance

      const onHero = scrollY < cardsSectionTop - threshold;
      const onCards = scrollY >= cardsSectionTop - threshold;

      if (onHero && e.deltaY > 0) {
        // On hero, scrolling down → snap to cards
        e.preventDefault();
        snapTo(cardsSection);
      } else if (onCards && e.deltaY < 0) {
        // On cards, scrolling up → snap to hero
        e.preventDefault();
        snapTo(hero);
      }
      // On cards scrolling down = free scroll, no preventDefault
    };

    // --- Touch swipe ---
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isSnapping) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      const scrollY = window.scrollY;
      const cardsSectionTop = cardsSection.offsetTop;
      const onHero = scrollY < cardsSectionTop - 80;
      const onCards = scrollY >= cardsSectionTop - 80;

      if (onHero && delta > 30) {
        snapTo(cardsSection);
      } else if (onCards && delta < -30) {
        snapTo(hero);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
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
