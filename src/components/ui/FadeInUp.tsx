"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

const reduced = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0 },
};

interface FadeInUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  useViewport?: boolean;
}

export function FadeInUp({
  children,
  className = "",
  delay = 0,
  useViewport = false,
}: FadeInUpProps) {
  const reduceMotion = useReducedMotion();
  const variant = reduceMotion ? reduced : fadeInUp;

  const common = {
    initial: variant.initial,
    transition: { ...variant.transition, delay },
    className,
  };

  if (useViewport) {
    return (
      <motion.div
        {...common}
        whileInView={variant.animate}
        viewport={{ once: true, margin: "-40px" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div animate={variant.animate} {...common}>
      {children}
    </motion.div>
  );
}
