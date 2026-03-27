"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const fontInter = "var(--font-inter), sans-serif";

const PRELOADER_DONE_KEY = "aurelius-preloader-done";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = sessionStorage.getItem(PRELOADER_DONE_KEY);
    if (done) setVisible(false);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible || !mounted) return;
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, [visible, mounted]);

  const handleExitComplete = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(PRELOADER_DONE_KEY, "1");
    }
  };

  if (!mounted) {
    return <div className="fixed inset-0 z-[9999] bg-[#000000]" aria-hidden />;
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.span
            className="font-bold text-white whitespace-nowrap text-[clamp(48px,14vw,180px)] md:text-[clamp(60px,10vw,180px)] lg:text-[clamp(80px,12vw,180px)] w-full text-center"
            style={{ fontFamily: fontInter }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            AURELIUS
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
