"use client";

import { useState, useRef, useEffect } from "react";
import { motion, animate, useInView } from "framer-motion";

const VISITORS_MIN = 1000;
const VISITORS_MAX = 500000;
const VISITORS_STEP = 1000;
const VISITORS_DEFAULT = 20000;

const SALE_MIN = 50;
const SALE_MAX = 5000;
const SALE_STEP = 50;
const SALE_DEFAULT = 300;

const BASELINE_CR = 0.018;
const LEAK_PCT = 0.2;

function formatVisitors(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(0)}k visitors/mo`;
  return `${v} visitors/mo`;
}

function formatSale(v: number): string {
  return `€${v} per sale`;
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1000) return `€${(value / 1000).toFixed(0)}k`;
  return `€${Math.round(value)}`;
}

export function RevenueLeak() {
  const [visitors, setVisitors] = useState(VISITORS_DEFAULT);
  const [saleValue, setSaleValue] = useState(SALE_DEFAULT);

  const currentRevenue = visitors * BASELINE_CR * saleValue;
  const revenueLeak = visitors * LEAK_PCT * BASELINE_CR * saleValue;

  const revenueRef = useRef<HTMLSpanElement>(null);
  const leakRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2, once: true });

  useEffect(() => {
    if (!inView || !revenueRef.current) return;
    const el = revenueRef.current;
    const from = Number(el.getAttribute("data-value")) ?? 0;
    const to = currentRevenue;
    el.setAttribute("data-value", String(to));
    el.textContent = formatCurrency(from);
    const controls = animate(from, to, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = formatCurrency(v);
      },
    });
    return () => controls.stop();
  }, [inView, currentRevenue]);

  useEffect(() => {
    if (!inView || !leakRef.current) return;
    const el = leakRef.current;
    const from = Number(el.getAttribute("data-value")) ?? 0;
    const to = revenueLeak;
    el.setAttribute("data-value", String(to));
    el.textContent = formatCurrency(from);
    const controls = animate(from, to, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = formatCurrency(v);
      },
    });
    return () => controls.stop();
  }, [inView, revenueLeak]);

  useEffect(() => {
    if (!inView) {
      if (revenueRef.current) revenueRef.current.textContent = "€0";
      if (leakRef.current) leakRef.current.textContent = "€0";
    }
  }, [inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      className="revenue-leak-section flex min-h-screen w-full flex-col justify-center bg-[#0c0c0c] py-32 px-6 md:px-12 lg:px-24"
      aria-labelledby="revenue-leak-heading"
    >
      <svg
        className="calculator-grid-bg"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern-revenue"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern-revenue)" />
      </svg>
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <header className="mb-16">
          <motion.p
            variants={item}
            className="font-sans text-[11px] font-medium uppercase tracking-[5px] text-[#737373]"
            style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          >
            REVENUE AUDIT
          </motion.p>
          <motion.h2
            id="revenue-leak-heading"
            variants={item}
            className="mt-3 max-w-xl font-serif text-4xl font-normal leading-tight text-white lg:text-[52px]"
            style={{
              fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
              letterSpacing: "-0.02em",
            }}
          >
            You&apos;re losing money every day.
          </motion.h2>
        </header>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column — sliders */}
          <motion.div variants={item} className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <label
                className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
              >
                Monthly Visitors
              </label>
              <span
                className="font-serif text-[32px] font-normal text-white"
                style={{
                  fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
                }}
              >
                {formatVisitors(visitors)}
              </span>
              <div className="relative mt-2 w-full">
                <div
                  key={visitors}
                  className="slider-shimmer range-thin pointer-events-none absolute inset-0 h-px w-full"
                  aria-hidden
                />
                <input
                  type="range"
                  min={VISITORS_MIN}
                  max={VISITORS_MAX}
                  step={VISITORS_STEP}
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="range-thin relative z-10 h-px w-full appearance-none bg-white/10 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                  aria-valuemin={VISITORS_MIN}
                  aria-valuemax={VISITORS_MAX}
                  aria-valuenow={visitors}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
              >
                Average Sale Value
              </label>
              <span
                className="font-serif text-[32px] font-normal text-white"
                style={{
                  fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
                }}
              >
                {formatSale(saleValue)}
              </span>
              <div className="relative mt-2 w-full">
                <div
                  key={saleValue}
                  className="slider-shimmer range-thin pointer-events-none absolute inset-0 h-px w-full"
                  aria-hidden
                />
                <input
                  type="range"
                  min={SALE_MIN}
                  max={SALE_MAX}
                  step={SALE_STEP}
                  value={saleValue}
                  onChange={(e) => setSaleValue(Number(e.target.value))}
                  className="range-thin relative z-10 h-px w-full appearance-none bg-white/10 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                  aria-valuemin={SALE_MIN}
                  aria-valuemax={SALE_MAX}
                  aria-valuenow={saleValue}
                />
              </div>
            </div>
          </motion.div>

          {/* Right column — output */}
          <motion.div variants={item} className="flex flex-col justify-center gap-8">
            <div className="flex flex-col gap-2">
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
              >
                Current estimated revenue
              </p>
              <p
                className="font-serif text-[40px] font-normal text-white lg:text-[56px]"
                style={{
                  fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
                }}
              >
                <span ref={revenueRef} data-value={0} suppressHydrationWarning />
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
              >
                Lost to poor UX
              </p>
              <div className="relative inline-block w-fit">
                <p
                  className="font-serif text-[40px] font-normal text-[#737373] lg:text-[56px]"
                  style={{
                    fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
                  }}
                >
                  <span ref={leakRef} data-value={0} suppressHydrationWarning />
                </p>
                <div
                  className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/80"
                  aria-hidden
                />
              </div>
            </div>
            <p
              className="font-sans text-[13px] italic text-[#737373]"
              style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
            >
              This is revenue your competitors are capturing.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={item}
          className="mt-16 flex justify-center border-none"
        >
          <a
            href="#contact"
            className="font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-white no-underline hover:underline"
            style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          >
            See what an optimized site would recover →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
