"use client";

import { useEffect, useState } from "react";
import { Twitter, Instagram, Globe, Linkedin } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Studio", href: "#" },
  { label: "Work", count: 12, href: "#" },
  { label: "Articles", count: 10, href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Contact", href: "#" },
];

const fontInter = "var(--font-inter), sans-serif";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      const formatted = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="text-xs text-white/50"
      style={{ fontFamily: fontInter }}
    >
      Based in Toronto (CA) {time}
    </span>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="contact-section min-h-screen bg-black overflow-hidden flex flex-col px-6 md:px-10 lg:px-16"
      style={{ fontFamily: fontInter }}
    >
      <div className="w-full flex flex-col flex-1">
      <div className="max-w-screen-2xl mx-auto w-full flex flex-col flex-1">
      {/* ── TOP ROW ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-8 mt-[100px] mb-[80px] md:mt-[120px] md:mb-[100px] md:grid-cols-2 md:gap-6">
        {/* Left — logo + clock */}
        <div className="flex flex-col gap-2">
          <span
            className="text-sm font-bold text-white uppercase tracking-[0.1em]"
            style={{ fontFamily: fontInter }}
          >
            AURELIUS
          </span>
          <LiveClock />
        </div>

        {/* Right — empty */}
        <div />
      </div>

      {/* ── MIDDLE SECTION ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-10 items-start mb-[60px] md:mb-[80px] md:grid-cols-2 lg:grid-cols-[55%_45%] lg:gap-10">
        {/* Left — email + quote */}
        <div className="flex flex-col gap-10 pr-16 lg:pr-24">
          <a
            href="mailto:aureliusweb.contact@gmail.com"
            className="text-[clamp(18px,5vw,28px)] font-medium text-white no-underline leading-tight lg:text-[28px]"
            style={{ fontFamily: fontInter }}
          >
            aureliusweb.contact@gmail.com{" "}
            <sup className="text-[18px] font-light">+</sup>
          </a>

          {/* Quote block */}
          <div className="flex flex-col gap-4">
            <span
              className="text-[32px] text-white leading-none"
              style={{ fontFamily: fontInter }}
            >
              ❝
            </span>
            <p
              className="text-base text-white leading-relaxed m-0 max-w-[480px]"
              style={{ fontFamily: fontInter }}
            >
              Your next project deserves world-class design. Stop settling for
              mediocre and start working with designers who care as much as you
              do.
            </p>
            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full bg-white/10 shrink-0"
              />
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-[13px] text-white font-semibold"
                  style={{ fontFamily: fontInter }}
                >
                  Alex West
                </span>
                <span
                  className="text-[13px] text-white/50"
                  style={{ fontFamily: fontInter }}
                >
                  Creative Director
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — nav links */}
        <nav className="flex flex-col gap-2 lg:text-right lg:items-end">
          {NAV_LINKS.map(({ label, count, href }) => (
            <a
              key={label}
              href={href}
              className="text-[clamp(24px,6vw,32px)] font-semibold text-white no-underline inline-block leading-tight transition-opacity duration-200 hover:opacity-60 lg:text-[32px]"
              style={{ fontFamily: fontInter }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.6")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
            >
              {label}
              {count !== undefined && (
                <span className="text-white/40 font-semibold ml-1.5">
                  [{count}]
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* ── BOTTOM BAR + GIANT TEXT (grouped at bottom) ──────────── */}
      <div className="mt-auto mb-4">
      <div className="border-t border-white/[0.08] py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Legal links */}
        <div className="flex gap-6">
          {["Terms of Service", "Privacy Policy"].map((label) => (
            <a
              key={label}
              href="#"
              className="text-xs text-white/40 no-underline transition-colors duration-200 hover:text-white/80"
              style={{ fontFamily: fontInter }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)")
              }
            >
              {label} ↗
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex gap-4 items-center">
          {[
            { Icon: Twitter, label: "Twitter" },
            { Icon: Instagram, label: "Instagram" },
            { Icon: Globe, label: "Dribbble" },
            { Icon: Linkedin, label: "LinkedIn" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-white/40 transition-colors duration-200 flex hover:text-white"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)")
              }
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* ── GIANT TEXT ──────────────────────────────────────────── */}
      <div className="mb-[3%] overflow-hidden leading-[0.85] select-none pointer-events-none">
        <div
          className="font-bold text-white whitespace-nowrap text-[clamp(48px,14vw,180px)] md:text-[clamp(60px,10vw,180px)] lg:text-[clamp(80px,12vw,180px)]"
          style={{ fontFamily: fontInter }}
        >
          AURELIUS
        </div>
        <div
          className="font-bold whitespace-nowrap text-[clamp(48px,14vw,180px)] md:text-[clamp(60px,10vw,180px)] lg:text-[clamp(80px,12vw,180px)]"
          style={{ fontFamily: fontInter, color: "rgba(255,255,255,0.15)" }}
        >
          WEB
        </div>
      </div>
      </div>
      </div>
      </div>
    </footer>
  );
}
