"use client";

import { useEffect, useRef, useState } from "react";

const LERP_FACTOR = 0.15;
const RING_SIZE_DEFAULT = 40;
const RING_SIZE_LINK = 60;
const RING_SIZE_CARD = 80;

type CursorVariant = "default" | "link" | "card";

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
}

function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsFine(mq.matches);
    const handler = () => setIsFine(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isFine;
}

function getVariant(element: Element | null): CursorVariant {
  if (!element) return "default";
  if (element.closest(".work-row")) return "card";
  if (
    element.closest("a, button, [role='button']:not(.work-row)") ||
    element.tagName === "A" ||
    element.tagName === "BUTTON"
  )
    return "link";
  return "default";
}

function getCursorTheme(element: Element | null): "dark" | "light" {
  const section = element?.closest(".cards-section");
  const theme = section?.getAttribute("data-theme");
  return theme === "light" ? "light" : "dark";
}

export function CustomCursor() {
  const isFine = useFinePointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [dot, setDot] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [cursorTheme, setCursorTheme] = useState<"dark" | "light">("dark");
  const ringRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const lerpFactor = prefersReducedMotion ? 1 : LERP_FACTOR;

  useEffect(() => {
    if (!isFine) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setDot({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setVariant(getVariant(el));
      setCursorTheme(getCursorTheme(el));
    };

    const onMouseLeave = () => setVisible(false);

    const animate = () => {
      const { x: mx, y: my } = mouseRef.current;
      const r = ringRef.current;
      const nx = r.x + (mx - r.x) * lerpFactor;
      const ny = r.y + (my - r.y) * lerpFactor;
      ringRef.current = { x: nx, y: ny };
      setRing({ x: nx, y: ny });
      rafRef.current = requestAnimationFrame(animate);
    };

    document.body.classList.add("cursor-none");
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("cursor-none");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isFine, lerpFactor]);

  if (!isFine) return null;

  const ringSize =
    variant === "card"
      ? RING_SIZE_CARD
      : variant === "link"
        ? RING_SIZE_LINK
        : RING_SIZE_DEFAULT;

  return (
    <>
      <div
        className="custom-cursor-dot"
        data-theme={cursorTheme}
        style={{
          transform: `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%)`,
          opacity: visible ? 1 : 0,
        }}
        aria-hidden
      />
      <div
        className="custom-cursor-ring"
        data-variant={variant}
        data-theme={cursorTheme}
        style={{
          width: ringSize,
          height: ringSize,
          transform: `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`,
          opacity: visible ? 1 : 0,
        }}
        aria-hidden
      />
    </>
  );
}
