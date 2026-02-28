"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { services } from "@/lib/content";

const container = {
  hidden: { opacity: 0 },
  visible: (reduce: boolean) => ({
    opacity: 1,
    transition: reduce ? { duration: 0 } : { staggerChildren: 0.05, delayChildren: 0.1 },
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

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-24 border-t border-[var(--border)] py-28">
      <Container>
        <FadeInUp useViewport className="mb-20">
          <p className="mb-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            What we do
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl">
            Services
          </h2>
        </FadeInUp>
        <motion.div
          className="grid gap-px border border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          custom={!!reduceMotion}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={item}
              custom={!!reduceMotion}
              className="group bg-[var(--background)] p-10 transition-colors hover:bg-[#141414]"
            >
              <span className="text-xs font-medium text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[var(--foreground)]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
