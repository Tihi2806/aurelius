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
    <span style={{ fontFamily: fontInter, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
      Based in Toronto (CA) {time}
    </span>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="contact-section"
      style={{
        backgroundColor: "#000",
        padding: "48px 60px 0",
        fontFamily: fontInter,
        overflow: "hidden",
      }}
    >
      {/* ── TOP ROW ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 40,
          marginBottom: 64,
        }}
      >
        {/* Left — logo + clock */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            style={{
              fontFamily: fontInter,
              fontWeight: 700,
              fontSize: 14,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            AURELIUS
          </span>
          <LiveClock />
        </div>

        {/* Center — newsletter */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Our Work [12]
          </span>
          <span style={{ fontSize: 13, color: "#fff" }}>
            Subscribe to our newsletter.
          </span>
          <div style={{ display: "flex", gap: 0, marginTop: 4 }}>
            <input
              type="email"
              placeholder="Email"
              style={{
                flex: 1,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRight: "none",
                color: "#fff",
                padding: "10px 14px",
                fontSize: 13,
                fontFamily: fontInter,
                borderRadius: "6px 0 0 6px",
                outline: "none",
              }}
            />
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 42,
                background: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                fontSize: 18,
                fontWeight: 300,
                borderRadius: "0 6px 6px 0",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              +
            </a>
          </div>
        </div>

        {/* Right — empty */}
        <div />
      </div>

      {/* ── MIDDLE SECTION ──────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "55% 45%",
          gap: 40,
          marginBottom: 64,
          alignItems: "start",
        }}
      >
        {/* Left — email + quote */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <a
            href="mailto:contact@aurelius.design"
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#fff",
              textDecoration: "none",
              fontFamily: fontInter,
              lineHeight: 1.2,
            }}
          >
            contact@aurelius.design{" "}
            <sup style={{ fontSize: 18, fontWeight: 300 }}>+</sup>
          </a>

          {/* Quote block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontSize: 32,
                color: "#fff",
                lineHeight: 1,
                fontFamily: fontInter,
              }}
            >
              ❝
            </span>
            <p
              style={{
                fontSize: 16,
                color: "#fff",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 480,
              }}
            >
              Your next project deserves world-class design. Stop settling for
              mediocre and start working with designers who care as much as you
              do.
            </p>
            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  flexShrink: 0,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontSize: 13,
                    color: "#fff",
                    fontWeight: 600,
                    fontFamily: fontInter,
                  }}
                >
                  Alex West
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: fontInter,
                  }}
                >
                  Creative Director
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — nav links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {NAV_LINKS.map(({ label, count, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: "#fff",
                textDecoration: "none",
                fontFamily: fontInter,
                lineHeight: 1.15,
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.6")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
            >
              {label}
              {count !== undefined && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 600,
                    marginLeft: 6,
                  }}
                >
                  [{count}]
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* ── BOTTOM BAR ──────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Legal links */}
        <div style={{ display: "flex", gap: 24 }}>
          {["Terms of Service", "Privacy Policy"].map((label) => (
            <a
              key={label}
              href="#"
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                fontFamily: fontInter,
                transition: "color 0.2s",
              }}
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
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
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
              style={{
                color: "rgba(255,255,255,0.4)",
                transition: "color 0.2s",
                display: "flex",
              }}
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
      <div
        style={{
          marginTop: 8,
          overflow: "hidden",
          lineHeight: 0.85,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: fontInter,
            fontWeight: 700,
            fontSize: "clamp(80px, 12vw, 180px)",
            color: "#fff",
            whiteSpace: "nowrap",
          }}
        >
          AURELIUS
        </div>
        <div
          style={{
            fontFamily: fontInter,
            fontWeight: 700,
            fontSize: "clamp(80px, 12vw, 180px)",
            color: "rgba(255,255,255,0.15)",
            whiteSpace: "nowrap",
          }}
        >
          WEB
        </div>
      </div>
    </footer>
  );
}
