"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Clock,
  FileText,
  Code,
  Send,
  Zap,
  LayoutTemplate,
  CheckCircle,
  Rocket,
} from "lucide-react";

const STANDARD_STEPS = [
  { icon: Clock, text: "Initial briefing & discovery (Week 1–2)" },
  { icon: FileText, text: "Design iterations & revisions (Week 2–5)" },
  { icon: Code, text: "Development & QA (Week 5–8)" },
  { icon: Send, text: "Launch & handoff (Week 8–10)" },
] as const;

const AURELIUS_STEPS = [
  { icon: Zap, text: "Strategy & brief alignment (Day 1)" },
  { icon: LayoutTemplate, text: "Design system & build (Day 2–6)" },
  { icon: CheckCircle, text: "Review & refinements (Day 7–8)" },
  { icon: Rocket, text: "Deployment & launch (Day 9–10)" },
] as const;

export default function SpeedTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="speed-timeline-section flex min-h-screen w-full flex-col justify-center bg-[#0c0c0c] py-32 px-6 md:px-12 lg:px-24"
      aria-labelledby="speed-timeline-heading"
    >
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-16">
          <p
            className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
            style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          >
            DELIVERY
          </p>
          <h2
            id="speed-timeline-heading"
            className="mt-3 font-serif text-[36px] font-normal leading-tight text-white lg:text-[52px]"
            style={{
              fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
            }}
          >
            Speed is a strategic advantage.
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          {/* Left column — Standard Agency */}
          <motion.div
            className="border-b border-[#262626] pb-12 lg:border-b-0 lg:border-r lg:border-[#262626] lg:pr-12 lg:pb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p
              className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
              style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
            >
              STANDARD AGENCY
            </p>
            <p
              className="mt-2 font-serif text-[96px] font-light leading-none text-[#262626]"
              style={{
                fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
              }}
            >
              6–10
            </p>
            <p
              className="mt-1 font-sans text-[13px] text-[#737373]"
              style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
            >
              weeks
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {STANDARD_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.text}
                    className="flex items-start gap-3"
                  >
                    <Icon
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#737373]"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span
                      className="font-sans text-[13px] text-[#737373]"
                      style={{
                        fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                      }}
                    >
                      {step.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right column — Aurelius */}
          <motion.div
            className="pt-12 lg:pl-12 lg:pt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <p
              className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white"
              style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
            >
              AURELIUS
            </p>
            <motion.p
              className="mt-2 font-serif text-[96px] font-light leading-none text-white"
              style={{
                fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
              }}
              initial={{ scale: 0.95 }}
              animate={isInView ? { scale: 1 } : { scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              7–10
            </motion.p>
            <p
              className="mt-1 font-sans text-[13px] text-[#f5f5f0]"
              style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
            >
              days
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {AURELIUS_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.text}
                    className="flex items-start gap-3"
                  >
                    <Icon
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span
                      className="font-sans text-[13px] text-[#f5f5f0]"
                      style={{
                        fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                      }}
                    >
                      {step.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <p
          className="mt-16 border-t border-[#262626] pt-8 text-center font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
          style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
        >
          Timeline begins from signed contract. Includes revisions.
        </p>
      </div>
    </section>
  );
}
