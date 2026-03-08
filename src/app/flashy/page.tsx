"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  heroFlashy as hero,
  services,
  work,
  processSteps,
  whyUs,
  contactCta,
} from "@/lib/content";

// Words in the headline that get accent color
// "immersive" and "motion" (punctuation stripped + lowercased) match the new headline
const PURPLE_WORDS = new Set(["immersive", "motion"]);

// Colored overlays per work item
const WORK_OVERLAYS = [
  "rgba(139,92,246,0.75)",
  "rgba(6,182,212,0.75)",
  "rgba(139,92,246,0.65)",
  "rgba(6,182,212,0.65)",
  "rgba(167,139,250,0.75)",
];

// ─── Service Card (flip reveal) ───────────────────────────────────────────────

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const rm = useReducedMotion();

  return (
    <div
      className="relative cursor-default overflow-hidden"
      style={{
        height: "210px",
        border: "1px solid rgba(139,92,246,0.2)",
        background: "rgba(139,92,246,0.03)",
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        setFlipped(true);
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(139,92,246,0.55)";
      }}
      onMouseLeave={(e) => {
        setFlipped(false);
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(139,92,246,0.2)";
      }}
    >
      {/* Large faded number behind card */}
      <span
        className="pointer-events-none absolute right-3 top-0 select-none font-bold leading-none text-white/[0.04]"
        style={{
          fontSize: "90px",
          fontFamily: "var(--font-space-grotesk), sans-serif",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <AnimatePresence mode="wait">
        {!flipped ? (
          <motion.div
            key="front"
            className="absolute inset-0 flex flex-col justify-end p-6"
            initial={rm ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={rm ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <h3
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {service.title}
            </h3>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="absolute inset-0 flex flex-col justify-center p-6"
            style={{ background: "rgba(139,92,246,0.1)" }}
            initial={rm ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={rm ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <h3
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#8B5CF6]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {service.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              {service.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Work Card ────────────────────────────────────────────────────────────────

function WorkCard({
  project,
  index,
}: {
  project: (typeof work)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`work-item-${index} relative min-h-48 overflow-hidden`}
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Default label */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <p className="text-xs text-white/25">
          {project.category} · {project.year}
        </p>
        <h3
          className="mt-1 text-xl font-semibold text-white/70"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {project.name}
        </h3>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6"
        style={{ background: WORK_OVERLAYS[index] }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
      >
        <p className="text-[11px] font-medium uppercase tracking-widest text-white/70">
          {project.category} · {project.year}
        </p>
        <h3
          className="mt-1 text-xl font-bold text-white"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/75">
          {project.overview}
        </p>
        <Link
          href={`/elegant/work/${project.slug}`}
          className="mt-4 inline-flex w-fit items-center gap-1 text-xs font-semibold text-white underline-offset-2 hover:underline"
        >
          View case study →
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  const rm = useReducedMotion();
  const words = hero.headline.split(" ");

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 lg:px-10">
      {/* Gradient orbs */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(6,182,212,0.08) 55%, transparent 70%)",
          borderRadius: "50%",
          top: "-10%",
          right: "-15%",
          filter: "blur(60px)",
          animation: "orbDrift 14s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "8%",
          left: "-5%",
          filter: "blur(50px)",
          animation: "orbDrift 10s ease-in-out infinite reverse",
          animationDelay: "-4s",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.p
          className="mb-6 text-[11px] font-medium uppercase tracking-[0.38em] text-white/30"
          initial={rm ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {hero.eyebrow}
        </motion.p>

        <h1
          className="max-w-4xl text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl xl:text-[88px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {words.map((word, i) => {
            const clean = word.replace(/[^a-z]/gi, "").toLowerCase();
            const isPurple = PURPLE_WORDS.has(clean);
            return (
              <motion.span
                key={i}
                className={`mr-[0.22em] inline-block ${isPurple ? "text-[#8B5CF6]" : "text-white"}`}
                initial={rm ? undefined : { opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-white/40 sm:text-lg"
          initial={rm ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.68 }}
        >
          {hero.subtext}
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-4"
          initial={rm ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.78 }}
        >
          {/* Pulsing primary CTA */}
          <div className="relative">
            <span
              className="absolute inset-0"
              style={{
                background: "#8B5CF6",
                animation: "pulseRing 2s ease-out infinite",
              }}
            />
            <Link
              href="#contact"
              className="relative inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#8B5CF6" }}
            >
              {hero.ctaPrimary}
            </Link>
          </div>
          <Link
            href="#work"
            className="inline-flex items-center gap-2 px-4 py-4 text-sm font-medium text-white/40 transition-colors hover:text-white"
          >
            {hero.ctaSecondary} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="services"
      className="px-6 py-28 lg:px-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#8B5CF6]">
            What we do
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Services
          </h2>
        </motion.div>

        {/* Horizontal scroll on mobile → 3-col grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="min-w-[270px] flex-shrink-0 md:min-w-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <ServiceCard service={service} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section
      id="work"
      className="px-6 py-28 lg:px-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#06B6D4]">
            Portfolio
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Selected Work
          </h2>
        </motion.div>

        <div className="work-grid grid grid-cols-1 gap-3">
          {work.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      id="process"
      className="px-6 py-28 lg:px-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#8B5CF6]">
            How we work
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Process
          </h2>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative flex flex-col gap-12 md:flex-row md:gap-0">
          {/* Connecting line — desktop only */}
          <div
            className="absolute top-5 hidden h-px w-full md:block"
            style={{
              background:
                "linear-gradient(to right, rgba(139,92,246,0.5), rgba(6,182,212,0.25))",
            }}
          />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              className="relative flex flex-1 flex-row items-start gap-4 md:flex-col md:items-start md:pr-10"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.13 }}
            >
              {/* Step indicator */}
              <div
                className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center text-xs font-semibold text-white"
                style={{
                  background: "#050505",
                  border: "1px solid rgba(139,92,246,0.6)",
                  boxShadow: "0 0 14px rgba(139,92,246,0.3)",
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  borderRadius: "2px",
                }}
              >
                {step.step}
              </div>

              <div className="md:mt-8">
                <h3
                  className="mb-2 text-base font-semibold text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="max-w-[220px] text-sm leading-relaxed text-white/40">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="px-6 py-28 lg:px-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#06B6D4]">
            Why Aurelius
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            What sets us apart
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              className="p-8"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ borderColor: "rgba(139,92,246,0.3)" }}
            >
              <h3
                className="mb-4 text-xl font-semibold text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/40">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="px-6 py-28 lg:px-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="mb-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {contactCta.headline}
          </h2>
          <p className="mb-12 max-w-lg text-lg text-white/40">
            {contactCta.subtext}
          </p>

          <div className="relative inline-block">
            <span
              className="absolute inset-0"
              style={{
                background: "#8B5CF6",
                animation: "pulseRing 2s ease-out infinite",
              }}
            />
            <Link
              href="#"
              className="relative inline-flex items-center gap-3 px-10 py-5 text-base font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#8B5CF6" }}
            >
              Start a project →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FlashyPage() {
  return (
    <>
      <style>{`
        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30%       { transform: translate(4%, -6%) scale(1.08); }
          65%       { transform: translate(-3%, 5%) scale(0.93); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.65; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        /* Masonry-style work grid — desktop only */
        @media (min-width: 768px) {
          .work-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 220px 220px 220px;
          }
          .work-item-0 { grid-column: 1 / 3; grid-row: 1 / 3; }
          .work-item-1 { grid-column: 3 / 4; grid-row: 1 / 2; }
          .work-item-2 { grid-column: 3 / 4; grid-row: 2 / 3; }
          .work-item-3 { grid-column: 1 / 2; grid-row: 3 / 4; }
          .work-item-4 { grid-column: 2 / 4; grid-row: 3 / 4; }
        }
      `}</style>
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <WhyUsSection />
      <ContactSection />
    </>
  );
}
