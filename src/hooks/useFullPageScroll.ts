"use client";

import { useEffect, useRef, useState } from "react";

const COOLDOWN_MS = 800;
const DURATION = 750;

function ease(p: number): number {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

export type SectionRef = React.RefObject<HTMLElement | null>;

/**
 * Full-page section scroll: wheel/touch hijack, snap between sections.
 * Uses refs to section elements (each should be position: fixed, 100vh).
 * Returns wrapperRef (attach to the fixed viewport wrapper), activeIndex, scrollToSection.
 */
export function useFullPageScroll(sectionRefs: SectionRef[]) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const animatingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const currentIndexRef = useRef(0);

  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        const wrapper = wrapperRef.current;
        const sections = sectionRefs.map((r) => r.current).filter(Boolean) as HTMLElement[];
        if (!wrapper || sections.length !== sectionRefs.length || sections.length === 0) return;

        const n = sections.length;

        function setSectionTransforms(index: number) {
          currentIndexRef.current = index;
          sections.forEach((el, i) => {
            if (i < index) el.style.transform = "translateY(-100%)";
            else if (i === index) el.style.transform = "translateY(0%)";
            else el.style.transform = "translateY(100%)";
          });
        }

        function slideTo(from: number, to: number) {
          if (animatingRef.current || from === to) return;
          animatingRef.current = true;
          const fromEl = sections[from];
          const toEl = sections[to];
          const dir = to > from ? 1 : -1;
          toEl.style.transform = `translateY(${dir * 100}%)`;
          const start = performance.now();

          function tick(now: number) {
            const p = ease(Math.min((now - start) / DURATION, 1));
            fromEl.style.transform = `translateY(${dir * -p * 100}%)`;
            toEl.style.transform = `translateY(${dir * (1 - p) * 100}%)`;
            if (p < 1) requestAnimationFrame(tick);
            else {
              fromEl.style.transform = `translateY(${dir * -100}%)`;
              toEl.style.transform = "translateY(0%)";
              animatingRef.current = false;
              currentIndexRef.current = to;
              setActiveIndex(to);
            }
          }
          requestAnimationFrame(tick);
        }

        function onWheel(e: WheelEvent) {
          const now = Date.now();
          if (now - lastScrollTimeRef.current < COOLDOWN_MS) {
            e.preventDefault();
            return;
          }
          if (animatingRef.current) {
            e.preventDefault();
            return;
          }
          const dy = e.deltaY;
          const current = currentIndexRef.current;
          if (dy > 0 && current < n - 1) {
            e.preventDefault();
            lastScrollTimeRef.current = now;
            slideTo(current, current + 1);
          } else if (dy < 0 && current > 0) {
            e.preventDefault();
            lastScrollTimeRef.current = now;
            slideTo(current, current - 1);
          }
        }

        let touchStartY = 0;
        const onTouchStart = (e: TouchEvent) => {
          touchStartY = e.touches[0].clientY;
        };
        const onTouchMove = (e: TouchEvent) => {
          e.preventDefault();
        };
        const onTouchEnd = (e: TouchEvent) => {
          if (animatingRef.current) return;
          const dy = touchStartY - e.changedTouches[0].clientY;
          if (Math.abs(dy) < 40) return;
          const now = Date.now();
          if (now - lastScrollTimeRef.current < COOLDOWN_MS) return;
          const current = currentIndexRef.current;
          if (dy > 0 && current < n - 1) {
            lastScrollTimeRef.current = now;
            slideTo(current, current + 1);
          } else if (dy < 0 && current > 0) {
            lastScrollTimeRef.current = now;
            slideTo(current, current - 1);
          }
        };

        setSectionTransforms(0);

        wrapper.addEventListener("wheel", onWheel, { passive: false });
        wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
        wrapper.addEventListener("touchmove", onTouchMove, { passive: false });
        wrapper.addEventListener("touchend", onTouchEnd, { passive: true });

        cleanupRef.current = () => {
          wrapper.removeEventListener("wheel", onWheel);
          wrapper.removeEventListener("touchstart", onTouchStart);
          wrapper.removeEventListener("touchmove", onTouchMove);
          wrapper.removeEventListener("touchend", onTouchEnd);
        };
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [sectionRefs]);

  const scrollToSection = (index: number) => {
    const sections = sectionRefs.map((r) => r.current).filter(Boolean) as HTMLElement[];
    if (index < 0 || index >= sections.length || animatingRef.current) return;
    currentIndexRef.current = index;
    sections.forEach((el, i) => {
      if (i < index) el.style.transform = "translateY(-100%)";
      else if (i === index) el.style.transform = "translateY(0%)";
      else el.style.transform = "translateY(100%)";
    });
    setActiveIndex(index);
  };

  return { activeIndex, scrollToSection, wrapperRef };
}
