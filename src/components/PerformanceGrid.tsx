"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Zap, Search } from "lucide-react";

const CARDS = [
  {
    icon: TrendingUp,
    title: "Smart Conversion Tracking",
    body: "Every interaction mapped. Drop-off points eliminated before they cost you leads. Your funnel, optimized continuously.",
  },
  {
    icon: Zap,
    title: "Dynamic Asset Optimization",
    body: "Sub-second load times across all devices and markets. Assets served at the right size, right format, right moment.",
  },
  {
    icon: Search,
    title: "Precision SEO",
    body: "Structured for discovery from day one. Technical signals, semantic architecture, and content hierarchy working as one system.",
  },
] as const;

const STATS = [
  { value: "94", label: "avg. Lighthouse score" },
  { value: "< 1.2s", label: "load time" },
] as const;

export function PerformanceGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p
            className="font-sans text-[11px] font-medium uppercase tracking-[5px] text-[#737373]"
            style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          >
            INFRASTRUCTURE
          </p>
          <h2
            id="performance-grid-heading"
            className="mt-3 max-w-lg font-serif text-[36px] font-normal leading-tight text-white lg:text-[52px]"
            style={{
              fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
            }}
          >
            Built different. By design.
          </h2>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 gap-px bg-[#262626] md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={item}
                className="group relative bg-[#0c0c0c] p-6 transition-colors duration-300 ease-out hover:bg-[#111111] md:p-6 lg:p-10"
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px origin-left bg-white"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <Icon
                  className="h-5 w-5 text-white"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3
                  className="mt-8 font-sans text-[15px] font-medium text-white"
                  style={{
                    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-3 font-sans text-[13px] leading-relaxed text-[#737373]"
                  style={{
                    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  }}
                >
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-0 border-t border-[#262626] pt-10 md:grid-cols-2"
          variants={item}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-1 py-6 ${
                i === 0 ? "" : "border-t border-[#262626] md:border-t-0 md:border-l md:border-[#262626] md:pl-12"
              }`}
            >
              <span
                className="font-serif text-[48px] font-normal text-white"
                style={{
                  fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
                }}
              >
                {stat.value}
              </span>
              <span
                className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                style={{
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
