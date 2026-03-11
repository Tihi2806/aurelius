"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    num: "01",
    title: "Brand Strategy & Identity",
    description:
      "Foundational positioning and visual systems that scale.",
  },
  {
    num: "02",
    title: "Digital Product Design",
    description: "Interfaces and experiences that users love.",
  },
  {
    num: "03",
    title: "Content & Storytelling",
    description: "Narrative and copy that connects with audiences.",
  },
  {
    num: "04",
    title: "Motion & Film",
    description: "Storytelling through animation and moving image.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {},
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-100px", once: true });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="services-section flex min-h-screen w-full flex-col justify-center bg-[#0c0c0c] py-32 px-6 md:px-12 lg:px-24"
      data-animated="false"
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <motion.header
          className="text-left"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
            style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          >
            SERVICES
          </p>
          <h2
            className="mt-3 text-[36px] font-normal leading-tight text-white md:text-[52px]"
            style={{
              fontFamily:
                "var(--font-cormorant), Cormorant Garamond, serif",
              fontWeight: 400,
            }}
          >
            What we do.
          </h2>
        </motion.header>

        {/* 2x2 Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-px bg-[#262626] md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1, delayChildren: 0 }}
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.num}
              className="relative bg-[#0c0c0c] p-6 transition-colors duration-300 md:p-10"
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              animate={{
                backgroundColor: hoveredCard === i ? "#111111" : "#0c0c0c",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Top line on hover */}
              <motion.div
                className="absolute left-0 right-0 top-0 h-px origin-left bg-white/20"
                initial={false}
                animate={{ scaleX: hoveredCard === i ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                aria-hidden
              />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                style={{
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                }}
              >
                {service.num}
              </span>
              <h3
                className="mt-6 text-[24px] font-normal text-white md:text-[32px]"
                style={{
                  fontFamily:
                    "var(--font-cormorant), Cormorant Garamond, serif",
                  fontWeight: 400,
                }}
              >
                {service.title}
              </h3>
              <p
                className="mt-3 max-w-xs text-sm leading-relaxed text-[#737373]"
                style={{
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  fontSize: "14px",
                }}
              >
                {service.description}
              </p>
              <motion.span
                className="mt-8 inline-block text-[13px] text-white"
                style={{
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                }}
                animate={{
                  opacity: hoveredCard === i ? 1 : 0,
                  x: hoveredCard === i ? 0 : -8,
                }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-[#262626] pt-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
              style={{
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              }}
            >
              Selected clients available on request.
            </p>
            <a
              href="#work"
              className="text-[13px] text-white no-underline hover:underline"
              style={{
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              }}
            >
              → See our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
