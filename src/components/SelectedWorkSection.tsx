"use client";

import { useState } from "react";
import "@/components/browser-mockup.css";

const PROJECTS = [
  {
    name: "Meridian",
    category: "Brand & Digital",
    tint: "#0a0e14",
    previewUrl: "https://rinel-testspot.lovable.app/",
    image: "/previews/work/meridian.jpg",
    video: undefined as string | undefined,
  },
  {
    name: "Atlas Ventures",
    category: "Identity & Web",
    tint: "#0a120f",
    previewUrl: "https://pikamont.vercel.app/",
    image: "/previews/work/atlas.jpg",
    video: undefined as string | undefined,
  },
  {
    name: "Lumina",
    category: "Product & Motion",
    tint: "#120a14",
    previewUrl: "https://rinel-testspot.lovable.app/",
    image: "/previews/work/lumina.jpg",
    video: undefined as string | undefined,
  },
  {
    name: "Northgate",
    category: "Brand Strategy",
    tint: "#0f0a0a",
    previewUrl: "https://pikamont.vercel.app/",
    image: "/previews/work/northgate.jpg",
    video: undefined as string | undefined,
  },
  {
    name: "Echo Studio",
    category: "Identity & Film",
    tint: "#0a0a12",
    previewUrl: "https://rinel-testspot.lovable.app/",
    image: "/previews/work/echo-studio.jpg",
    video: undefined as string | undefined,
  },
] as const;

export function SelectedWorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      id="work"
      className="work-section"
      data-animated="false"
      style={{
        backgroundColor: activeProject.tint,
        transition: "background-color 0.5s ease",
      }}
    >
      <span className="work-section-number" aria-hidden="true">
        002
      </span>

      <div className="work-section-inner">
        {/* Eyebrow */}
        <p className="work-eyebrow">OUR WORK</p>

        {/* Browser preview — single window, URL bar updates immediately; iframe cross-fades */}
        <div className="work-preview-container">
          <div className="work-preview-window">
            <div className="browser-mockup-chrome">
              <div className="browser-mockup-dots">
                <span className="browser-mockup-dot browser-mockup-dot-red" />
                <span className="browser-mockup-dot browser-mockup-dot-yellow" />
                <span className="browser-mockup-dot browser-mockup-dot-green" />
              </div>
              <div className="browser-mockup-url-bar">
                <svg className="browser-mockup-lock" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M3 5V4a3 3 0 016 0v1M2 5h8a1 1 0 011 1v4a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="browser-mockup-url">{activeProject.previewUrl}</span>
              </div>
            </div>
            <div
              className="work-preview-iframe-wrap"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: "linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)",
              }}
            >
              {activeProject.video ? (
                <video
                  src={activeProject.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <img
                  src={activeProject.image}
                  alt={activeProject.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Project list — horizontal tabs */}
        <div className="work-tabs">
          {PROJECTS.map((project, i) => (
            <button
              key={project.name}
              type="button"
              className={`work-tab ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View ${project.name} preview`}
              aria-current={i === activeIndex ? "true" : undefined}
            >
              <span className="work-tab-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="work-tab-name">{project.name}</span>
              <span className="work-tab-cat">{project.category}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
