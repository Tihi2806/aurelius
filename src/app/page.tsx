"use client";

import { MosaicGrid } from "@/components/mosaic/MosaicGrid";
import "./hero.css";

export default function GatewayPage() {
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
      <div className="min-h-screen overflow-hidden relative">
        <header className="mosaic-header">
          <h1>Choose your experience</h1>
        </header>
        <MosaicGrid />
      </div>

    </div>
  );
}
