"use client";

import { useEffect } from "react";
import { MosaicGrid } from "@/components/mosaic/MosaicGrid";
import "./hero.css";
import "./sections.css";

const PROJECTS = [
  { name: "Meridian",       category: "Brand & Digital",  year: "2024" },
  { name: "Atlas Ventures", category: "Identity & Web",   year: "2024" },
  { name: "Lumina",         category: "Product & Motion", year: "2023" },
  { name: "Northgate",      category: "Brand Strategy",   year: "2023" },
  { name: "Echo Studio",    category: "Identity & Film",  year: "2023" },
] as const;

const HEADLINE_WORDS = ["Let's", "build", "something", "that", "lasts."];

export default function GatewayPage() {

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

  /* ── Full-page scroll system — extended to 5 sections ── */
  useEffect(() => {
    // Mobile: skip JS scroll lock — new sections revert to normal flow via CSS
    if (window.innerWidth < 768) return;

    const hero    = document.getElementById('hero')              as HTMLElement | null;
    const cards   = document.querySelector('.cards-section')     as HTMLElement | null;
    const work    = document.querySelector('.work-section')      as HTMLElement | null;
    const stats   = document.querySelector('.stats-section')     as HTMLElement | null;
    const contact = document.querySelector('.contact-section')   as HTMLElement | null;

    if (!hero || !cards || !work || !stats || !contact) return;

    const allSections = [hero, cards, work, stats, contact];

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

    let current   = 0;          // 0=hero 1=cards 2=work 3=stats 4=contact
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
      if (index === 3) animateStats();
      if (index === 4) animateContact();
    }

    function animateWork() {
      if (work!.dataset.animated === 'true') return;
      work!.dataset.animated = 'true';
      work!.querySelectorAll<HTMLElement>('.work-row').forEach((row, i) => {
        setTimeout(() => row.classList.add('visible'), i * 110);
      });
    }

    function animateStats() {
      if (stats!.dataset.animated === 'true') return;
      stats!.dataset.animated = 'true';

      // Count up numeric stats with easeOutCubic over 1.5 s
      stats!.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count!, 10);
        const dur    = 1500;
        const t0     = performance.now();
        function tick(now: number) {
          const p     = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });

      // "Global" fades in
      const globalEl = stats!.querySelector<HTMLElement>('.stat-global');
      if (globalEl) globalEl.classList.add('visible');

      // Manifesto fades in last
      setTimeout(() => {
        const manifesto = stats!.querySelector<HTMLElement>('.stats-manifesto');
        if (manifesto) manifesto.classList.add('visible');
      }, 1700);
    }

    function animateContact() {
      if (contact!.dataset.animated === 'true') return;
      contact!.dataset.animated = 'true';

      const words = contact!.querySelectorAll<HTMLElement>('.headline-word');
      words.forEach((word, i) => {
        setTimeout(() => word.classList.add('visible'), i * 110);
      });

      // Contact body fades up after headline finishes
      setTimeout(() => {
        const cb = contact!.querySelector<HTMLElement>('.contact-body');
        if (cb) cb.classList.add('visible');
      }, words.length * 110 + 150);
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

      // Sections 1–4: above target = -100%, at target = 0%, below = +100%
      [cards, work, stats, contact].forEach((el, i) => {
        const idx = i + 1;
        el!.style.transform =
          idx < target  ? 'translateY(-100%)' :
          idx === target ? 'translateY(0%)'   :
          'translateY(100%)';
      });

      current = target;
      updateDots(target);
      triggerEnterAnimation(target);
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
        // Cards: only intercept at scroll boundaries;
        // the cards div scrolls freely inside when not at an edge.
        if (dy < 0 && cards!.scrollTop <= 0)   { e.preventDefault(); slideTo(1, 0); }
        else if (dy > 0 && isAtBottom(cards!)) { e.preventDefault(); slideTo(1, 2); }

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
        if (dy < 0) slideTo(4, 3);
      }
    }

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      if (animating) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;

      if      (current === 0 && dy > 0)                          slideTo(0, 1);
      else if (current === 1 && dy < 0 && cards!.scrollTop <= 0) slideTo(1, 0);
      else if (current === 1 && dy > 0 && isAtBottom(cards!))    slideTo(1, 2);
      else if (current === 2 && dy > 0)                          slideTo(2, 3);
      else if (current === 2 && dy < 0)                          slideTo(2, 1);
      else if (current === 3 && dy > 0)                          slideTo(3, 4);
      else if (current === 3 && dy < 0)                          slideTo(3, 2);
      else if (current === 4 && dy < 0)                          slideTo(4, 3);
    };

    /* ── Init ── */
    hero!.style.opacity     = '1';
    cards!.style.transform  = 'translateY(100%)';
    work!.style.transform   = 'translateY(100%)';
    stats!.style.transform  = 'translateY(100%)';
    contact!.style.transform = 'translateY(100%)';
    if (heroBg)      heroBg.style.transform     = 'translateY(0px)';
    if (marqueeWrap) marqueeWrap.style.transform = 'translateY(-50%)';
    updateDots(0);

    // Scroll hint click triggers hero → cards (preserves original UX)
    const scrollHint = hero.querySelector<HTMLElement>('.hero-scroll-hint');
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
    <div className="w-full bg-[#0a0a0a]">

      {/* ── Section navigation dots (fixed, right edge) ── */}
      <nav className="section-dots" aria-label="Section navigation">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            className="section-dot"
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </nav>

      {/* ══════════════════════════════════════
          Hero  (section 0 — unchanged)
          ══════════════════════════════════════ */}
      <section id="hero">
        <div className="hero-bg">
          <img src="/aurelius%20center%20look.png" alt="Aurelius" />
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

        <div className="hero-bottom-left">Est. 2024 · Global</div>

        <div className="hero-bottom-right">
          <p>Strategic Brand Agency</p>
          <p>Identity &amp; Digital</p>
        </div>

        <div className="hero-scroll-hint">
          <p>Scroll</p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Cards selector  (section 1 — unchanged)
          ══════════════════════════════════════ */}
      <div className="cards-section">
        <header className="mosaic-header">
          <h1>Choose your experience</h1>
        </header>
        <MosaicGrid />
      </div>

      {/* ══════════════════════════════════════
          Section 2 — Selected Work
          ══════════════════════════════════════ */}
      <section className="work-section">
        {/* Decorative vertical "002" label */}
        <span className="work-section-number" aria-hidden="true">002</span>

        <div className="work-inner">
          <div className="work-list">
            {PROJECTS.map((project, i) => (
              <div key={project.name} className="work-row">
                <span className="work-row-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="work-row-name">{project.name}</h2>
                <span className="work-row-cat">{project.category}</span>
                <span className="work-row-year">{project.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Section 3 — The Numbers
          ══════════════════════════════════════ */}
      <section className="stats-section">
        <div className="stats-inner">
          <div className="stats-grid">

            <div className="stat-item">
              {/* Numeric counter + static "+" suffix */}
              <div className="stat-number">
                <span data-count="47">0</span>+
              </div>
              <div className="stat-label">Awards</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">
                <span data-count="12">0</span>
              </div>
              <div className="stat-label">Years Active</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">
                <span data-count="248">0</span>
              </div>
              <div className="stat-label">Projects</div>
            </div>

            <div className="stat-item">
              {/* "Global" fades in — no numeric counter */}
              <div className="stat-number stat-global">Global</div>
              <div className="stat-label">Clients</div>
            </div>

          </div>

          <p className="stats-manifesto">
            We don&apos;t follow briefs. We interrogate them.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Section 4 — Start a Project
          ══════════════════════════════════════ */}
      <section className="contact-section">
        <div className="contact-inner">

          {/* Staggered word-reveal headline */}
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
              We take on a small number of projects each year. If you&apos;re
              building something worth making, we&apos;d like to hear from you.
            </p>
            <div className="contact-action">
              <a href="mailto:hello@aurelius.co" className="contact-btn">
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
