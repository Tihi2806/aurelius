"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const MANIFESTO_TEXT =
  "We don't take briefs. We interrogate them. Every brand we touch is built to endure — not just to impress. We work with the few who understand that design is not decoration. It is strategy made visible.";

const WORDS = MANIFESTO_TEXT.split(/\s+/);

const STAGGER_DELAY = 0.04;
const WORD_DURATION = 0.5;

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
}

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollProgress = useMotionValue(0);
  const watermarkY = useTransform(
    scrollProgress,
    [0, 1],
    ["30vh", "0px"]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = 1 - Math.min(1, Math.max(0, rect.top / vh));
      scrollProgress.set(progress);
      rafId = requestAnimationFrame(updateProgress);
    };
    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, [scrollProgress]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: STAGGER_DELAY,
        delayChildren: 0,
      },
    },
  };

  const wordVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0.1, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const linkVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: WORDS.length * STAGGER_DELAY + WORD_DURATION * 0.5,
        duration: 0.4,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="manifesto-section"
      data-animated="false"
    >
      {/* Breathing background light */}
      <div
        className="manifesto-bg-breath"
        aria-hidden
      />

      <motion.span
        className="manifesto-watermark"
        aria-hidden="true"
        style={{ y: watermarkY }}
      >
        004
      </motion.span>

      <div className="manifesto-inner">
        <motion.p
          className="manifesto-paragraph"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {WORDS.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="manifesto-word"
              variants={wordVariants}
              transition={{ duration: WORD_DURATION, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.p>
        <motion.a
          href="/#work"
          className="manifesto-link"
          variants={linkVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          → See our work
        </motion.a>
      </div>
    </section>
  );
}
