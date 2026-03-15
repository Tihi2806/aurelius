"use client";

import React, { createContext, useMemo, useRef, useContext } from "react";
import { useFullPageScroll, type SectionRef } from "@/hooks/useFullPageScroll";

const SectionRefsContext = createContext<SectionRef[] | null>(null);

export function useSectionRef(index: number): React.RefObject<HTMLElement | null> {
  const refs = useContext(SectionRefsContext);
  if (!refs || index < 0 || index >= refs.length) return { current: null };
  return refs[index];
}

type FullPageScrollWrapperProps = {
  sectionCount: number;
  children: React.ReactNode;
  /** Active dot color for website layouts (default #7c3aed) */
  dotActiveColor?: string;
};

export function FullPageScrollWrapper({
  sectionCount,
  children,
  dotActiveColor = "#7c3aed",
}: FullPageScrollWrapperProps) {
  const refs = useMemo(
    () => Array.from({ length: sectionCount }, () => React.createRef<HTMLElement | null>()),
    [sectionCount]
  );
  const { activeIndex, scrollToSection, wrapperRef } = useFullPageScroll(refs);

  return (
    <SectionRefsContext.Provider value={refs}>
      <div
        ref={wrapperRef}
        className="full-page-scroll-wrapper"
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <nav
          className="section-dots section-dots-website"
          aria-label="Section navigation"
          style={{ zIndex: 300 }}
        >
          {Array.from({ length: sectionCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to section ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
              onClick={() => scrollToSection(i)}
              className="section-dot"
              style={{
                ...(i === activeIndex
                  ? { background: dotActiveColor, opacity: 1 }
                  : undefined),
              }}
            />
          ))}
        </nav>
        {children}
      </div>
    </SectionRefsContext.Provider>
  );
}
