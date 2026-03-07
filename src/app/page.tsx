"use client";

import { useEffect } from "react";
import { MosaicGrid } from "@/components/mosaic/MosaicGrid";
import "./hero.css";

export default function GatewayPage() {
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (hero) {
      const heroBg = hero.querySelector('.hero-bg') as HTMLElement | null;
      const marqueeWrap = hero.querySelector('.hero-marquee-wrap') as HTMLElement | null;

      const handleScroll = () => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        // Use 2x heroHeight as the full scroll distance (matches the 200vh spacer)
        const progress = Math.min(scrollY / (heroHeight * 2), 1);

        // Fade out hero gradually over the full scroll distance
        hero.style.opacity = String(Math.max(0, 1 - progress * 1.8));

        // Parallax on bust image — drifts upward as you scroll
        if (heroBg) {
          heroBg.style.transform = `translateY(${scrollY * 0.2}px)`;
        }

        // Slightly slower parallax on text
        if (marqueeWrap) {
          marqueeWrap.style.transform = `translateY(calc(-50% + ${scrollY * 0.08}px))`;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
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
