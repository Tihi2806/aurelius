"use client";

import Link from "next/link";
import { useState } from "react";

export function FlashyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06]" style={{ background: "rgba(5,5,5,0.95)", backdropFilter: "blur(16px)" }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/flashy" className="text-lg font-semibold text-white">
          Gilberto.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#home" className="text-sm text-white/60 hover:text-white transition">
            Home
          </Link>
          <Link href="#about" className="text-sm text-white/60 hover:text-white transition">
            About
          </Link>
          <Link href="#features" className="text-sm text-white/60 hover:text-white transition">
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-white/60 hover:text-white transition">
            Pricing
          </Link>
          <div className="relative group">
            <button className="text-sm text-white/60 hover:text-white transition">
              Resources
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition">
          <span>✨</span>
          TRY NOW
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-black/50">
          <div className="flex flex-col gap-4 px-6 py-4">
            <Link href="#home" className="text-sm text-white/60 hover:text-white">
              Home
            </Link>
            <Link href="#about" className="text-sm text-white/60 hover:text-white">
              About
            </Link>
            <Link href="#features" className="text-sm text-white/60 hover:text-white">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-white/60 hover:text-white">
              Pricing
            </Link>
            <Link href="#resources" className="text-sm text-white/60 hover:text-white">
              Resources
            </Link>
            <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium">
              <span>✨</span>
              TRY NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
