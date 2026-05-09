"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const PILLARS = [
  {
    num: "01",
    title: "Core Web Vitals at launch",
    body: "Every page passes Google's performance thresholds before it goes live. Lighthouse 94+, sub-1.2s load times, mobile-first build.",
  },
  {
    num: "02",
    title: "SEO from line one",
    body: "Schema markup, semantic HTML, sitemap generation, content hierarchy — built into the architecture, not added later.",
  },
  {
    num: "03",
    title: "Conversion paths designed",
    body: "Every CTA placed by intent. Form abandonment tracked. Drop-off points eliminated before they cost you leads.",
  },
  {
    num: "04",
    title: "Speed as strategy",
    body: "Sub-second load times across all devices and markets. Assets served at the right size, right format, right moment.",
  },
] as const;

export function PerformanceGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="performance-grid-section flex min-h-screen w-full flex-col justify-center bg-[#0c0c0c] py-32 px-6 md:px-12 lg:px-24"
      aria-labelledby="performance-grid-heading"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.header
          className="mb-16"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : (shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 })}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
        >
          <p
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
            style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          >
            INFRASTRUCTURE
          </p>
          <h2
            id="performance-grid-heading"
            className="mt-3 max-w-2xl text-[36px] font-normal leading-tight text-white lg:text-[52px]"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            }}
          >
            The technical foundation most agencies skip.
          </h2>
        </motion.header>

        <motion.div
          className="border-t border-[#262626]"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PILLARS.map((pillar) => (
            <motion.article
              key={pillar.num}
              variants={item}
              className="grid grid-cols-1 gap-y-3 border-b border-[#262626] py-10 md:grid-cols-12 md:gap-x-8 md:gap-y-0 md:py-14"
            >
              <span
                className="font-mono text-[12px] tracking-[0.18em] text-[#B8935A] md:col-span-2 md:pt-3"
              >
                {pillar.num}
              </span>
              <h3
                className="text-[28px] font-normal leading-[1.1] text-white md:col-span-5 md:text-[36px] lg:text-[40px]"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontWeight: 400,
                }}
              >
                {pillar.title}
              </h3>
              <p
                className="max-w-md text-[15px] leading-relaxed text-[#a3a3a3] md:col-span-5 md:pt-3"
                style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
              >
                {pillar.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
