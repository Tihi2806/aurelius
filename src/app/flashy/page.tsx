"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import { useSectionRef } from "@/components/FullPageScrollWrapper";

const MotionLink = motion(Link);

const RING_DEFAULT = {
  size: 40,
  border: "rgba(255,255,255,0.4)",
  background: "transparent",
};
const DOT_DEFAULT = "rgb(255, 255, 255)";
const PURPLE = "#7c3aed";
const PURPLE_FILL = "rgba(124, 58, 237, 0.2)";

const VIEWPORT = { once: true, margin: "-60px" };

const LOGO_ITEMS = ["Company One", "Company Two", "Company Three", "Company Four", "Company Five"];

const PROCESS_STEPS = [
  { num: "001", title: "Discover & Define", desc: "We learn your goals, audience, and constraints to shape a clear direction." },
  { num: "002", title: "Design & Build", desc: "We craft every pixel and interaction with precision and care." },
  { num: "003", title: "Launch & Scale", desc: "We ship, measure, and grow with you." },
];

const TESTIMONIALS = [
  { quote: "Aurelius transformed our digital presence. The team understood our vision from day one.", name: "Sarah Chen", role: "CEO, Lumina" },
  { quote: "Exceptional craft and strategic thinking. They delivered beyond our expectations.", name: "James Holt", role: "Founder, Northgate" },
  { quote: "Working with Aurelius felt like having an extension of our team. Highly recommend.", name: "Elena Rossi", role: "Marketing Director, Atlas" },
];

// Fixed grid lines (7 lines, ~200px apart)
function GridLines() {
  return (
    <div className="flashy-grid-lines" aria-hidden>
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="flashy-grid-line"
          style={{ left: `${12 + i * 14.28}%` }}
        />
      ))}
    </div>
  );
}

// Particle dots for Process section (CSS-only)
function ParticleField() {
  const dots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 7) % 100}%`,
    top: `${(i * 23 + 11) % 100}%`,
    delay: `${(i % 5) * 2}s`,
    duration: `${8 + (i % 4)}s`,
  }));
  return (
    <div className="flashy-particles" aria-hidden>
      {dots.map((d) => (
        <div
          key={d.id}
          className="flashy-particle-dot"
          style={{
            left: d.left,
            top: d.top,
            animationDelay: d.delay,
            animationDuration: d.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function FlashyPage() {
  const section0Ref = useSectionRef(0);
  const section1Ref = useSectionRef(1);
  const section2Ref = useSectionRef(2);
  const section3Ref = useSectionRef(3);
  const section4Ref = useSectionRef(4);
  const section5Ref = useSectionRef(5);
  const section6Ref = useSectionRef(6);
  const section7Ref = useSectionRef(7);

  const integrationsRef = useRef<HTMLDivElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const { scrollYProgress: intScroll } = useScroll({ target: integrationsRef, offset: ["start end", "end start"] });
  const intY = useTransform(intScroll, [0, 0.5], [0, -40]);

  const { scrollYProgress: ctaScroll } = useScroll({ target: ctaBgRef, offset: ["start end", "end start"] });
  const ctaBgY = useTransform(ctaScroll, [0, 0.3], [0, -80]);

  useEffect(() => {
    const ring = document.querySelector<HTMLElement>(".custom-cursor-ring");
    const dot = document.querySelector<HTMLElement>(".custom-cursor-dot");
    if (!ring || !dot) return;

    const restore = () => {
      ring.style.width = "";
      ring.style.height = "";
      ring.style.borderColor = "";
      ring.style.background = "";
      dot.style.background = "";
    };

    const bind = (el: Element) => {
      const variant = el.getAttribute("data-cursor");
      if (!variant) return;
      const onEnter = () => {
        if (variant === "card") {
          ring.style.width = "80px";
          ring.style.height = "80px";
          ring.style.borderColor = PURPLE;
          ring.style.background = RING_DEFAULT.background;
          dot.style.background = DOT_DEFAULT;
        } else if (variant === "cta") {
          ring.style.width = `${RING_DEFAULT.size}px`;
          ring.style.height = `${RING_DEFAULT.size}px`;
          ring.style.borderColor = PURPLE;
          ring.style.background = PURPLE_FILL;
          dot.style.background = PURPLE;
        }
      };
      const onLeave = () => {
        ring.style.width = `${RING_DEFAULT.size}px`;
        ring.style.height = `${RING_DEFAULT.size}px`;
        ring.style.borderColor = RING_DEFAULT.border;
        ring.style.background = RING_DEFAULT.background;
        dot.style.background = DOT_DEFAULT;
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    };

    const elements = document.querySelectorAll("[data-cursor]");
    const unsubs = Array.from(elements).map(bind).filter(Boolean) as (() => void)[];
    return () => {
      unsubs.forEach((fn) => fn && fn());
      restore();
    };
  }, []);

  const heroWords1 = ["Immersive", "storytelling"];
  const heroWords2 = ["through", "motion."];

  return (
    <>
      <style>{`
        .flashy-grid-lines {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .flashy-grid-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(255,255,255,0.04);
        }
        .flashy-scroll-section {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          z-index: 1;
        }
        .flashy-scroll-section.scrollable {
          overflow-y: auto;
        }
        @keyframes flashy-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .flashy-marquee-track {
          display: flex;
          width: max-content;
          animation: flashy-marquee 25s linear infinite;
        }
        @keyframes flashy-particle {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.4; }
          50% { transform: translate(10px,-15px) scale(1.2); opacity: 0.8; }
        }
        .flashy-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .flashy-particle-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          animation: flashy-particle ease-in-out infinite;
        }
      `}</style>

      {/* Section 1: Hero */}
      <div ref={section0Ref as React.RefObject<HTMLDivElement>} className="flashy-scroll-section">
        <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16" style={{ background: "#0a0a0f" }}>
          <GridLines />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,58,237,0.25), transparent 70%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 30%)" }} />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.span
              className="inline-block rounded-full border px-4 py-1.5 text-sm"
              style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Immersive Digital Experiences
            </motion.span>

            <div className="mt-8 overflow-hidden text-6xl font-bold leading-tight tracking-tight lg:text-7xl">
              {heroWords1.map((word, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.08 }}
                >
                  {word}{" "}
                </motion.span>
              ))}
              {heroWords2.map((word, i) => (
                <motion.span
                  key={`b-${i}`}
                  className="block"
                  style={i === 1 ? { color: "#7c3aed" } : undefined}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.36 + i * 0.08 }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="mx-auto mt-6 max-w-xl text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              We craft digital worlds that move. Kinetic interfaces and fluid transitions that pull your audience in.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <MotionLink
                href="#contact"
                data-cursor="cta"
                className="rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
                whileTap={{ scale: 1 }}
              >
                Start a project
              </MotionLink>
              <MotionLink
                href="#work"
                data-cursor="cta"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white"
                whileHover={{ borderColor: "rgba(124,58,237,0.6)" }}
              >
                View our work
              </MotionLink>
            </motion.div>

            <motion.div
              className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 overflow-hidden"
              style={{ boxShadow: "0 0 80px rgba(124,58,237,0.2)", background: "rgba(0,0,0,0.3)" }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-4 flex-1 rounded bg-white/5 py-1.5 text-center text-xs text-white/40">aurelius-sigma.vercel.app</span>
              </div>
              <div className="relative aspect-video w-full">
                <Image src="/images/hero_background.png" alt="" fill className="object-cover object-center" sizes="(max-width: 896px) 100vw, 896px" priority />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Logos / Clients */}
      <div ref={section1Ref as React.RefObject<HTMLDivElement>} className="flashy-scroll-section">
        <div className="flex min-h-screen flex-col justify-center py-16" style={{ background: "#0a0a0f" }}>
          <GridLines />
          <p className="text-center text-sm text-white/40">Trusted by innovative teams</p>
          <div className="relative mt-8 w-full overflow-hidden">
            <div className="flashy-marquee-track gap-12 whitespace-nowrap py-4">
              {[...LOGO_ITEMS, ...LOGO_ITEMS].map((name, i) => (
                <span key={i} className="text-lg text-white/20" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>{name}</span>
              ))}
            </div>
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24" style={{ background: "linear-gradient(to right, #0a0a0f, transparent)" }} />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24" style={{ background: "linear-gradient(to left, #0a0a0f, transparent)" }} />
          </div>
        </div>
      </div>

      {/* Section 3: Feature Split */}
      <div ref={section2Ref as React.RefObject<HTMLDivElement>} className="flashy-scroll-section scrollable">
        <div className="min-h-screen py-24 px-6" style={{ background: "#0a0a0f" }}>
          <GridLines />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 mb-16">
              <motion.h2
                className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6 }}
              >
                We craft experiences that convert.
              </motion.h2>
              <div className="flex flex-col justify-center gap-4">
                <MotionLink href="#work" data-cursor="cta" className="inline-flex w-fit text-sm font-medium text-white/70 hover:text-white" whileHover={{ x: 4 }}>LEARN MORE →</MotionLink>
                <p className="max-w-md text-white/50">Strategy, design, and development aligned to your goals. We deliver brands and digital products that perform.</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div
                data-cursor="card"
                className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 p-6"
                style={{ background: "rgba(255,255,255,0.03)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-white/30" style={{ left: "20%" }} />
                  <div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-white/20" style={{ left: "40%", top: "60%" }} />
                  <div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-white/25" style={{ left: "70%", top: "30%" }} />
                </div>
                <div className="relative h-32 w-32 overflow-hidden rounded-lg" style={{ objectPosition: "15% center" }}>
                  <Image src="/images/3d_elements.png" alt="" width={320} height={320} className="object-cover" style={{ objectPosition: "15% center" }} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">Motion & Animation</h3>
              </motion.div>
              <motion.div
                data-cursor="card"
                className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 p-6"
                style={{ background: "rgba(255,255,255,0.03)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="grid grid-cols-6 grid-rows-2 gap-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="rounded-full border border-white/30 bg-white/5 h-10 w-10 flex items-center justify-center hover:border-white/50 transition-colors" />
                  ))}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">Brand & Digital Strategy</h3>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Features Bento */}
      <div ref={section3Ref as React.RefObject<HTMLDivElement>} className="flashy-scroll-section scrollable">
        <div className="min-h-screen py-24 px-6" style={{ background: "#0a0a0f" }}>
          <GridLines />
          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.h2
              className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
            >
              Services built to perform.
            </motion.h2>
            <motion.p className="mx-auto mt-4 max-w-xl text-center text-white/50" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEWPORT}>
              From strategy to launch, we deliver with precision.
            </motion.p>

            <div
              className="mt-16 grid gap-4"
              style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
            >
              <motion.div
                data-cursor="card"
                className="relative overflow-hidden rounded-2xl border border-white/10 p-8"
                style={{ gridColumn: "span 5", background: "linear-gradient(135deg, #7c3aed, #4c1d95)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute right-4 top-4 h-24 w-24 overflow-hidden opacity-80">
                  <Image src="/images/3d_elements.png" alt="" width={96} height={96} className="object-cover" style={{ objectPosition: "50% center" }} />
                </div>
                <h3 className="text-2xl font-bold text-white">Get started with Aurelius</h3>
                <MotionLink
                  href="#contact"
                  data-cursor="cta"
                  className="mt-6 inline-flex rounded-full border-2 border-white px-6 py-2.5 text-sm font-medium text-white"
                  whileHover={{ background: "rgba(255,255,255,0.15)" }}
                >
                  Start a project →
                </MotionLink>
              </motion.div>
              <div className="grid grid-cols-2 gap-4" style={{ gridColumn: "span 7" }}>
                {["Motion & Film", "Performance Builds", "Brand Identity", "Design Systems"].map((title, i) => (
                  <motion.div
                    key={title}
                    data-cursor="card"
                    className="overflow-hidden rounded-2xl border border-white/10 p-6"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                    whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <div className="mb-3 h-10 w-10 rounded-lg bg-white/10" />
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Process */}
      <div ref={section4Ref as React.RefObject<HTMLDivElement>} className="flashy-scroll-section scrollable">
        <div className="relative min-h-screen py-24 px-6" style={{ background: "#0a0a0f" }}>
          <GridLines />
          <ParticleField />
          <div className="relative z-10 mx-auto max-w-2xl">
            <motion.h2
              className="text-center text-4xl font-bold tracking-tight sm:text-5xl"
              initial={{ color: "rgba(255,255,255,0.3)" }}
              whileInView={{ color: "rgba(255,255,255,1)" }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8 }}
            >
              How We Make It Happen
            </motion.h2>
            <div className="mt-16 space-y-4">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-10 w-10 rounded-full" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }} />
                    <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">Step {step.num}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/50">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 6: Integrations */}
      <div id="work" ref={section5Ref as React.RefObject<HTMLDivElement>} className="flashy-scroll-section">
        <div ref={integrationsRef} className="flex min-h-screen flex-col items-center justify-center py-24 px-6" style={{ background: "#0a0a0f" }}>
          <GridLines />
          <p className="text-center text-3xl font-bold tracking-tight text-white lg:text-4xl">One showcase, endless possibilities.</p>
          <MotionLink
            href="#work"
            data-cursor="cta"
            className="mt-8 rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white"
            whileHover={{ borderColor: "rgba(124,58,237,0.6)" }}
          >
            View our work →
          </MotionLink>
          <motion.div className="relative mt-16 w-[80%] max-w-5xl overflow-hidden rounded-2xl" style={{ y: intY }}>
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0f, transparent 20%)" }} />
            <div className="relative aspect-[21/9] w-full">
              <Image src="/images/bottom_visual.png" alt="" fill className="object-cover object-center" sizes="80vw" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 7: Testimonials */}
      <div ref={section6Ref as React.RefObject<HTMLDivElement>} className="flashy-scroll-section">
        <div className="flex min-h-screen flex-col items-center justify-center py-24 px-6" style={{ background: "#0a0a0f" }}>
          <GridLines />
          <p className="text-sm text-white/40">What clients say</p>
          <div className="relative mt-8 flex w-full max-w-2xl items-center justify-center">
            <button
              type="button"
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-white/20 p-2 text-white/60 hover:bg-white/10 hover:text-white"
              onClick={() => setTestimonialIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <blockquote className="text-2xl italic text-white/70">&ldquo;{TESTIMONIALS[testimonialIndex].quote}&rdquo;</blockquote>
                <div className="mt-6 flex flex-col items-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-white/20" />
                  <p className="font-medium text-white">{TESTIMONIALS[testimonialIndex].name}</p>
                  <p className="text-sm text-white/50">{TESTIMONIALS[testimonialIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-white/20 p-2 text-white/60 hover:bg-white/10 hover:text-white"
              onClick={() => setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length)}
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Section 8: CTA Final */}
      <div id="contact" ref={section7Ref as React.RefObject<HTMLDivElement>} className="flashy-scroll-section">
        <div ref={ctaBgRef} className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24" style={{ background: "#0a0a0f" }}>
          <GridLines />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.35), transparent 60%)" }} />
          <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ y: ctaBgY }}>
            <div className="absolute inset-0 opacity-[0.15]">
              <Image src="/images/bottom_visual.png" alt="" fill className="object-cover object-center" sizes="100vw" />
            </div>
          </motion.div>
          <div className="relative z-10 text-center">
            <motion.span
              className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
            >
              Let&apos;s build
            </motion.span>
            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ready to build something extraordinary?
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MotionLink
                href="#contact"
                data-cursor="cta"
                className="rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
                whileTap={{ scale: 1 }}
              >
                Start a project
              </MotionLink>
              <MotionLink
                href="#work"
                data-cursor="cta"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white"
                whileHover={{ borderColor: "rgba(124,58,237,0.6)" }}
              >
                View our work →
              </MotionLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
