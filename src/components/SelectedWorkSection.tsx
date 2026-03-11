"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    name: "Meridian",
    category: "Brand & Digital",
    tint: "#0a0e14",
    gradient: "linear-gradient(135deg, #0d1520 0%, #1a2744 100%)",
  },
  {
    name: "Atlas Ventures",
    category: "Identity & Web",
    tint: "#0a120f",
    gradient: "linear-gradient(135deg, #0d1812 0%, #1a2e1f 100%)",
  },
  {
    name: "Lumina",
    category: "Product & Motion",
    tint: "#120a14",
    gradient: "linear-gradient(135deg, #1a0d20 0%, #2e1a35 100%)",
  },
  {
    name: "Northgate",
    category: "Brand Strategy",
    tint: "#0f0a0a",
    gradient: "linear-gradient(135deg, #1a1414 0%, #2a2222 100%)",
  },
  {
    name: "Echo Studio",
    category: "Identity & Film",
    tint: "#0a0a12",
    gradient: "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 100%)",
  },
] as const;

export function SelectedWorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2, once: true });

  const listVariants = {
    hidden: {},
    visible: {},
  };

  const numberVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  };

  const rowVariants = {
    hidden: {},
    visible: {},
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-section"
      data-animated="false"
      style={{
        backgroundColor: PROJECTS[activeIndex].tint,
        transition: "background-color 0.5s ease",
      }}
    >
      <span className="work-section-number" aria-hidden="true">
        002
      </span>

      <div className="work-inner work-inner-two-col">
        <motion.div
          className="work-list"
          variants={listVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1, delayChildren: 0 }}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              className="work-row"
              variants={rowVariants}
              transition={{ staggerChildren: 0, delayChildren: 0 }}
              onMouseEnter={() => setActiveIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(i);
                }
              }}
              aria-label={`View ${project.name} preview`}
            >
              <motion.div
                className="work-row-line"
                variants={lineVariants}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: i * 0.15,
                }}
                aria-hidden
              />
              <div className="work-row-overlay" aria-hidden />
              <motion.span
                className="work-row-num"
                variants={numberVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
              <h2 className="work-row-name">{project.name}</h2>
              <span className="work-row-cat">{project.category}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="work-preview-wrap">
          {PROJECTS.map((project, i) => (
            <div
              key={project.name}
              className={`work-preview-frame ${i === activeIndex ? "active" : ""}`}
              aria-hidden={i !== activeIndex}
            >
              <div className="work-preview-chrome" />
              <div
                className="work-preview-content"
                style={{ background: project.gradient }}
              >
                <span className="work-preview-name">{project.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
