"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { work } from "@/lib/content";

const container = {
  hidden: { opacity: 0 },
  visible: (reduce: boolean) => ({
    opacity: 1,
    transition: reduce ? { duration: 0 } : { staggerChildren: 0.06, delayChildren: 0.05 },
  }),
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: (reduce: boolean) => ({
    opacity: 1,
    y: 0,
    transition: reduce ? { duration: 0 } : { duration: 0.3, ease: "easeOut" },
  }),
};

export default function Work() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="scroll-mt-24 border-t border-[var(--border)] py-28">
      <Container>
        <FadeInUp useViewport className="mb-20">
          <p className="mb-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            Portfolio
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl">
            Selected Work
          </h2>
        </FadeInUp>
        <motion.div
          className="space-y-1"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          custom={!!reduceMotion}
        >
          {work.map((project) => (
            <motion.div key={project.slug} variants={item} custom={!!reduceMotion}>
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] py-8 transition-colors hover:border-[var(--accent)]/30"
              >
                <span className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] sm:text-3xl lg:text-4xl">
                  {project.name}
                </span>
                <div className="flex items-center gap-8 text-sm text-[var(--muted)]">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
