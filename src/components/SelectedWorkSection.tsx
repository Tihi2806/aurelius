"use client";

import { useState } from "react";

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

  return (
    <section
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
        <div className="work-list">
          {PROJECTS.map((project, i) => (
            <div
              key={project.name}
              className="work-row"
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
              <span className="work-row-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="work-row-name">{project.name}</h2>
              <span className="work-row-cat">{project.category}</span>
            </div>
          ))}
        </div>

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
