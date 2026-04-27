"use client";

import { useState } from "react";
import "@/components/browser-mockup.css";

type WorkStatus = "LAUNCHED" | "CONCEPT";

interface WorkTab {
  name: string;
  category: string;
  status: WorkStatus;
  tint: string;
  previewUrl?: string;
  video?: string;
  image?: string;
  description?: string;
}

const PROJECTS: WorkTab[] = [
  {
    name: "Rinel — Elektro Services",
    category: "Brand & Web",
    status: "LAUNCHED",
    tint: "#0a0e14",
    previewUrl: "https://rinel-testspot.lovable.app/",
    video: "/previews/work/rinel_video.mp4",
  },
  {
    name: "Untitled — UK Dental",
    category: "Healthcare",
    status: "CONCEPT",
    tint: "#0d0a0a",
    description: "Identity and site for a UK dental practice. In development.",
  },
  {
    name: "Untitled — Studio",
    category: "Brand & Web",
    status: "CONCEPT",
    tint: "#0a0d12",
    description: "Brand identity and site. In development.",
  },
];

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
        <p className="work-eyebrow">OUR WORK</p>

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
                <span className="browser-mockup-url">
                  {activeProject.previewUrl ?? "—"}
                </span>
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
                  key={activeProject.video}
                  src={activeProject.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : activeProject.image ? (
                <img
                  src={activeProject.image}
                  alt={activeProject.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    padding: "0 32px",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <span
                      className="font-mono"
                      style={{
                        display: "block",
                        fontSize: "11px",
                        letterSpacing: "0.25em",
                        color: "#B8935A",
                        marginBottom: "16px",
                      }}
                    >
                      {activeProject.status}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-cormorant), Cormorant Garamond, serif",
                        fontSize: "clamp(20px, 2.4vw, 28px)",
                        lineHeight: 1.3,
                        color: "rgba(255,255,255,0.78)",
                        maxWidth: "420px",
                      }}
                    >
                      {activeProject.description}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

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
              <span className="work-tab-cat">
                {project.category} · {project.status}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
