"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import { hero } from "@/lib/content";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: (d: number) => ({ duration: 0.35, ease: "easeOut" as const, delay: d }),
};

const reduced = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: () => ({ duration: 0 }),
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const v = reduceMotion ? reduced : fadeInUp;

  return (
    <section className="relative flex min-h-screen flex-col justify-end scroll-mt-24 pb-32 pt-32">
      <Container className="w-full">
        <motion.p
          initial={v.initial}
          animate={v.animate}
          transition={v.transition(0)}
          className="mb-6 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]"
        >
          {hero.eyebrow}
        </motion.p>
        <motion.h1
          initial={v.initial}
          animate={v.animate}
          transition={v.transition(0.06)}
          className="max-w-4xl font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          initial={v.initial}
          animate={v.animate}
          transition={v.transition(0.12)}
          className="mt-10 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
        >
          {hero.subtext}
        </motion.p>
        <motion.div
          initial={v.initial}
          animate={v.animate}
          transition={v.transition(0.18)}
          className="mt-14 flex flex-wrap gap-4"
        >
          <Link
            href="#contact"
            className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-[var(--border)] bg-transparent px-8 py-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/5"
          >
            {hero.ctaPrimary}
          </Link>
          <Link
            href="#work"
            className="inline-flex cursor-pointer items-center gap-2 px-8 py-4 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            {hero.ctaSecondary} →
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
