"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Cell = { value: string; unit: string | null; isProse: boolean };

type Row = {
  label: string;
  agency: Cell;
  aurelius: Cell;
};

const ROWS: Row[] = [
  {
    label: "TIME TO LAUNCH",
    agency: { value: "8–12", unit: "weeks", isProse: false },
    aurelius: { value: "3–4", unit: "weeks", isProse: false },
  },
  {
    label: "LIGHTHOUSE SCORE",
    agency: { value: "65–80", unit: "score", isProse: false },
    aurelius: { value: "94+", unit: "score", isProse: false },
  },
  {
    label: "SEO FOUNDATION",
    agency: { value: "“We can add it”", unit: null, isProse: true },
    aurelius: { value: "Built in from day one", unit: null, isProse: true },
  },
];

const NUMBER_SIZE = "text-[40px] md:text-[44px] lg:text-[48px] leading-none";
const PROSE_SIZE = "text-[32px] md:text-[36px] lg:text-[38px] leading-tight";

export default function SpeedTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };
  const animate = isInView ? { opacity: 1, y: 0 } : initial;
  const transition = { duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" } as const;

  return (
    <section
      ref={sectionRef}
      className="speed-timeline-section flex min-h-screen w-full flex-col justify-center bg-[#0c0c0c] py-32 px-6 md:px-12 lg:px-24"
      aria-labelledby="comparison-heading"
    >
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-16">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
            style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          >
            COMPARISON
          </p>
          <h2
            id="comparison-heading"
            className="mt-3 text-[36px] font-normal leading-tight text-white lg:text-[52px]"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            }}
          >
            Where the difference shows.
          </h2>
        </header>

        <motion.div
          className="border-t border-[#262626]"
          initial={initial}
          animate={animate}
          transition={transition}
        >
          {ROWS.map((row) => {
            const sizeAgency = row.agency.isProse ? PROSE_SIZE : NUMBER_SIZE;
            const sizeAurelius = row.aurelius.isProse ? PROSE_SIZE : NUMBER_SIZE;
            return (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-6 border-b border-[#262626] py-10 lg:grid-cols-[200px_1fr_1fr] lg:items-end lg:gap-12 lg:py-14"
              >
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                  style={{
                    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  }}
                >
                  {row.label}
                </p>

                <div>
                  <p
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                    style={{
                      fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                    }}
                  >
                    Most agencies
                  </p>
                  <p
                    className={`mt-3 ${sizeAgency} text-[#737373]`}
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      fontWeight: 300,
                    }}
                  >
                    {row.agency.value}
                  </p>
                  {row.agency.unit && (
                    <p
                      className="mt-1 text-[13px] text-[#737373]"
                      style={{
                        fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                      }}
                    >
                      {row.agency.unit}
                    </p>
                  )}
                </div>

                <div>
                  <p
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B8935A]"
                    style={{
                      fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                    }}
                  >
                    Aurelius
                  </p>
                  <p
                    className={`mt-3 ${sizeAurelius} text-white`}
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      fontWeight: 400,
                    }}
                  >
                    {row.aurelius.value}
                  </p>
                  {row.aurelius.unit && (
                    <p
                      className="mt-1 text-[13px] text-[#f5f5f0]"
                      style={{
                        fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                      }}
                    >
                      {row.aurelius.unit}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
