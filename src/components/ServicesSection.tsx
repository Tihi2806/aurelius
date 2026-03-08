"use client";

import { useState } from "react";

const SERVICES = [
  {
    id: "top",
    title: "Brand Strategy & Identity",
    description: "Foundational positioning and visual systems that scale.",
    direction: "top",
  },
  {
    id: "right",
    title: "Digital Product Design",
    description: "Interfaces and experiences that users love.",
    direction: "right",
  },
  {
    id: "bottom",
    title: "Motion & Film",
    description: "Storytelling through animation and moving image.",
    direction: "bottom",
  },
  {
    id: "left",
    title: "Content & Storytelling",
    description: "Narrative and copy that connects with audiences.",
    direction: "left",
  },
] as const;

const RADIUS = 250;
const CENTER = 270;
const VIEW_SIZE = 580;
const LINE_END_OFFSET = 35;

const CONNECTOR_POINTS = [
  { x1: CENTER, y1: CENTER - RADIUS, x2: CENTER, y2: CENTER - RADIUS - LINE_END_OFFSET },
  { x1: CENTER + RADIUS, y1: CENTER, x2: CENTER + RADIUS + LINE_END_OFFSET, y2: CENTER },
  { x1: CENTER, y1: CENTER + RADIUS, x2: CENTER, y2: CENTER + RADIUS + LINE_END_OFFSET },
  { x1: CENTER - RADIUS, y1: CENTER, x2: CENTER - RADIUS - LINE_END_OFFSET, y2: CENTER },
];

export function ServicesSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section
      className="services-section"
      data-animated="false"
      data-hover={hovered ?? ""}
    >
      <div className="services-orbit">
        <svg
          className="services-svg"
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            className="services-circle"
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="8 4"
          />
          {CONNECTOR_POINTS.map((pts, i) => (
            <line
              key={SERVICES[i].id}
              className="services-connector"
              data-direction={SERVICES[i].direction}
              x1={pts.x1}
              y1={pts.y1}
              x2={pts.x2}
              y2={pts.y2}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}
        </svg>
        <span className="services-center-label">AURELIUS</span>
        {SERVICES.map((service, i) => (
          <div
            key={service.id}
            className={`services-block services-block-${service.direction}`}
            data-direction={service.direction}
            onMouseEnter={() => setHovered(service.direction)}
            onMouseLeave={() => setHovered(null)}
          >
            <h3 className="services-block-title">{service.title}</h3>
            <p className="services-block-desc">{service.description}</p>
            <span className="services-block-arrow">→</span>
          </div>
        ))}
      </div>
    </section>
  );
}
