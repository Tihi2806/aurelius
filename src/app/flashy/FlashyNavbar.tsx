"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="relative py-1 text-sm font-medium text-white/50 transition-colors duration-200 hover:text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-px w-full bg-[#8B5CF6]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </Link>
  );
}

export function FlashyNavbar() {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06]"
      style={{ background: "rgba(5,5,5,0.88)", backdropFilter: "blur(16px)" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/25 transition-colors hover:text-white/50"
          >
            ← Switch Experience
          </Link>
          <span className="text-white/10">|</span>
          <Link
            href="/flashy"
            className="text-lg font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Aurelius
          </Link>
        </div>
        <div className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>
      </nav>
    </header>
  );
}
