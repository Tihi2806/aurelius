"use client";

import { useRef } from "react";
import "./browser-mockup.css";

export interface BrowserMockupProps {
  url: string;
  label: string;
  tag: string;
  description: string;
  mediaType: "image" | "video";
  mediaSrc: string;
}

export function BrowserMockup({
  url,
  label,
  tag,
  description,
  mediaType,
  mediaSrc,
}: BrowserMockupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (url && url !== "#") window.open(url, "_self");
  };

  const handleMouseEnter = () => {
    if (mediaType === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (mediaType === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const displayUrl =
    url && url !== "#"
      ? url.startsWith("http")
        ? url
        : `${typeof window !== "undefined" ? window.location.origin : ""}${url.startsWith("/") ? url : `/${url}`}`
      : "https://example.com";

  return (
    <div
      className="browser-mockup"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`View ${label} project`}
    >
      <div className="browser-mockup-glow" aria-hidden />
      <div className="browser-mockup-window">
        {/* Chrome bar #1c1c1c, height 38px */}
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
            <span className="browser-mockup-url">{displayUrl}</span>
          </div>
          <div className="browser-mockup-open-icon" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </div>
        </div>
        {/* 16:9 media area */}
        <div className="browser-mockup-media-wrap">
          <div className="browser-mockup-media-inner">
            {mediaType === "video" && mediaSrc ? (
              <video
                ref={videoRef}
                src={mediaSrc}
                className="browser-mockup-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : mediaType === "image" && mediaSrc ? (
              <img src={mediaSrc} alt="" className="browser-mockup-img" />
            ) : (
              <div className="browser-mockup-placeholder" />
            )}
          </div>
          <div className="browser-mockup-overlay" aria-hidden>
            <span className="browser-mockup-cta">View Project ↗</span>
          </div>
        </div>
      </div>
      <div className="browser-mockup-meta">
        <div className="browser-mockup-meta-left">
          <h3 className="browser-mockup-label">{label}</h3>
          <span className="browser-mockup-tag">{tag}</span>
        </div>
        <div className="browser-mockup-meta-divider" aria-hidden />
        <p className="browser-mockup-description">{description}</p>
      </div>
    </div>
  );
}
