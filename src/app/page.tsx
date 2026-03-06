"use client";

import Link from "next/link";

// ─── Shared card wrapper ──────────────────────────────────────────────────────

function CardWrapper({
  href,
  label,
  extraClass,
  children,
}: {
  href: string;
  label: string;
  extraClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Link
        href={href}
        className={`theme-card${extraClass ? ` ${extraClass}` : ""}`}
      >
        {children}
      </Link>
      <span
        style={{
          fontSize: "9px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "#444",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Elegant Card ─────────────────────────────────────────────────────────────

function ElegantCard() {
  return (
    <div
      style={{
        background: "#0d0d0d",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {/* Simulated navbar */}
      <div
        style={{
          padding: "13px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            color: "rgba(255,255,255,0.7)",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          Aurelius
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Work", "Studio", "Contact"].map((l) => (
            <span
              key={l}
              style={{
                color: "rgba(255,255,255,0.22)",
                fontSize: "7px",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "28px 16px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              color: "rgba(255,255,255,0.22)",
              fontSize: "8px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Strategic Brand &amp; Digital
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              color: "rgba(255,255,255,0.85)",
              fontSize: "36px",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            We craft brands that endure.
          </h2>
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.07)",
              margin: "20px 0",
            }}
          />
          <p
            style={{
              color: "rgba(255,255,255,0.28)",
              fontSize: "10px",
              lineHeight: 1.75,
            }}
          >
            Aurelius partners with ambitious companies to build distinctive
            identities and digital experiences.
          </p>
        </div>

        {/* Work list */}
        <div style={{ margin: "20px 0" }}>
          {[
            "Meridian — Brand & Digital",
            "Atlas Ventures — Identity",
            "Lumina — Product & Motion",
          ].map((item) => (
            <div
              key={item}
              style={{
                padding: "9px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "12px",
                }}
              >
                {item}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.15)",
                  fontSize: "8px",
                  letterSpacing: "1px",
                }}
              >
                →
              </span>
            </div>
          ))}
        </div>

        {/* Enter CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              color: "rgba(255,255,255,0.3)",
              fontSize: "10px",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Enter
          </span>
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              color: "rgba(255,255,255,0.2)",
              fontSize: "16px",
            }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Flashy Card ──────────────────────────────────────────────────────────────

function FlashyCard() {
  return (
    <div
      style={{
        background: "#050505",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(139,92,246,0.35)",
        boxShadow: "inset 0 0 80px rgba(139,92,246,0.07)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Simulated navbar */}
      <div
        style={{
          padding: "13px 16px",
          borderBottom: "1px solid rgba(139,92,246,0.12)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Aurelius
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Work", "Studio", "Contact"].map((l) => (
            <span
              key={l}
              style={{
                color: "rgba(255,255,255,0.22)",
                fontSize: "7px",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Orbs */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-40px",
          width: "220px",
          height: "220px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "-30px",
          width: "160px",
          height: "160px",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <p
            style={{
              color: "rgba(255,255,255,0.22)",
              fontSize: "8px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Strategic Brand &amp; Digital
          </p>
          <h2
            style={{
              color: "white",
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            We craft{" "}
            <span style={{ color: "#8B5CF6" }}>brands</span> and{" "}
            <span style={{ color: "#8B5CF6" }}>experiences</span> that endure.
          </h2>
        </div>

        {/* Work items with colored blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {[
            { name: "Meridian", color: "rgba(139,92,246,0.7)" },
            { name: "Atlas Ventures", color: "rgba(6,182,212,0.65)" },
            { name: "Lumina", color: "rgba(167,139,250,0.65)" },
          ].map((item) => (
            <div
              key={item.name}
              style={{
                padding: "8px 10px",
                background: item.color,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "7px",
                  letterSpacing: "2px",
                }}
              >
                2024
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              background: "#8B5CF6",
              padding: "9px 18px",
              fontSize: "10px",
              fontWeight: 600,
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Start a project
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "10px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            View work →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Brutalist Card ───────────────────────────────────────────────────────────

function BrutalistCard() {
  return (
    <div
      style={{
        background: "#f0ece4",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "3px solid #111",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: "#111",
          padding: "10px 14px",
          display: "flex",
          gap: "14px",
          alignItems: "center",
        }}
      >
        {["Work", "Studio", "Contact"].map((l) => (
          <span
            key={l}
            style={{
              color: "#f0ece4",
              fontFamily: "'Courier Prime', monospace",
              fontSize: "9px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {l}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Big display text */}
        <div style={{ padding: "24px 14px 0" }}>
          <div
            className="brutalist-headline"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "72px",
              lineHeight: 0.88,
              color: "#111",
              transition: "color 0.15s ease",
            }}
          >
            BOLD WORK.
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "3px", background: "#111", margin: "16px 0 0" }} />

        {/* 2×2 stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {[
            { label: "Projects", value: "248" },
            { label: "Years Active", value: "12" },
            { label: "Awards", value: "47×" },
            { label: "Clients", value: "Global" },
          ].map((cell) => (
            <div
              key={cell.label}
              style={{
                border: "3px solid #111",
                borderTop: "none",
                padding: "8px 10px",
              }}
            >
              <div
                style={{
                  fontSize: "7px",
                  textTransform: "uppercase",
                  color: "#888",
                  fontFamily: "'Courier Prime', monospace",
                  letterSpacing: "1px",
                  marginBottom: "2px",
                }}
              >
                {cell.label}
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "22px",
                  color: "#111",
                  lineHeight: 1,
                }}
              >
                {cell.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Black strip with diagonal overlay */}
      <div
        style={{
          height: "70px",
          background: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255,255,255,0.06) 4px, rgba(255,255,255,0.06) 8px)",
          }}
        />
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "11px",
            letterSpacing: "8px",
            color: "#f0ece4",
            position: "relative",
            zIndex: 1,
          }}
        >
          — Featured Work 2024 —
        </span>
      </div>

      {/* Footer bar */}
      <div
        style={{
          background: "#ff3300",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            color: "#f0ece4",
            fontFamily: "'Courier Prime', monospace",
            fontSize: "10px",
          }}
        >
          Start a project →
        </span>
        <span
          style={{
            color: "#f0ece4",
            border: "1px solid #f0ece4",
            padding: "3px 8px",
            fontSize: "9px",
            fontFamily: "'Courier Prime', monospace",
          }}
        >
          Brief Us
        </span>
      </div>
    </div>
  );
}

// ─── Organic Card ─────────────────────────────────────────────────────────────

function OrganicCard() {
  return (
    <div
      style={{
        background: "#f7f0e8",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating image block */}
      <div
        style={{
          position: "absolute",
          top: "44px",
          right: "14px",
          width: "100px",
          height: "130px",
          background: "#d4c4b0",
          borderRadius: "60px 60px 0 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          zIndex: 0,
        }}
      >
        🌿
      </div>

      {/* Nav */}
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
            fontSize: "15px",
            color: "#5c4a35",
          }}
        >
          Maison &amp; Co.
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Work", "Studio", "Contact"].map((l) => (
            <span
              key={l}
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "11px",
                color: "#9c8570",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div
        style={{ padding: "16px 16px 0", position: "relative", zIndex: 1 }}
      >
        {/* Pill tag */}
        <div
          style={{
            display: "inline-block",
            border: "1px solid #d4b896",
            color: "#b8956a",
            fontSize: "10px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            borderRadius: "20px",
            padding: "4px 12px",
            marginBottom: "14px",
            fontFamily: "'Crimson Pro', serif",
          }}
        >
          Creative Studio
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "34px",
            color: "#3d2e1e",
            lineHeight: 1.15,
            marginBottom: "12px",
            maxWidth: "160px",
          }}
        >
          Crafted with <em style={{ color: "#b8956a" }}>intention</em>
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "13px",
            color: "#8a7060",
            lineHeight: 1.7,
            maxWidth: "155px",
          }}
        >
          We build brands that breathe — rooted in story, shaped by hand.
        </p>
      </div>

      {/* Gradient divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, #d4b896, transparent)",
          margin: "18px 22px",
        }}
      />

      {/* Services list */}
      <div style={{ padding: "0 16px", flex: 1 }}>
        {[
          ["Brand Identity", "From scratch"],
          ["Web Design", "Handcrafted"],
          ["Art Direction", "Editorial"],
          ["Packaging", "Tactile & print"],
        ].map(([name, sub]) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "#b8956a",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "13px",
                color: "#5c4a35",
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "11px",
                color: "#9c8570",
              }}
            >
              / {sub}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            border: "1px solid #c4a882",
            color: "#5c4a35",
            fontFamily: "'Crimson Pro', serif",
            fontSize: "13px",
            borderRadius: "24px",
            padding: "7px 18px",
          }}
        >
          Start a Project
        </div>
        <span
          style={{
            color: "#b8956a",
            fontFamily: "'Crimson Pro', serif",
            fontSize: "13px",
          }}
        >
          See our work →
        </span>
      </div>
    </div>
  );
}

// ─── Scandi Card ──────────────────────────────────────────────────────────────

function ScandiCard() {
  return (
    <div
      style={{
        background: "#f4f1ec",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Jost', sans-serif",
      }}
    >
      {/* Nav */}
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0dbd3",
        }}
      >
        {/* Hamburger */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <div style={{ width: "18px", height: "1px", background: "#3a3530" }} />
          <div style={{ width: "18px", height: "1px", background: "#3a3530" }} />
        </div>
        {/* Logo */}
        <span
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: "15px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#2a2520",
          }}
        >
          Forma
        </span>
        {/* Links */}
        <div style={{ display: "flex", gap: "10px" }}>
          {["Search", "Cart"].map((l) => (
            <span
              key={l}
              style={{
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#8a8078",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Hero: split */}
      <div
        style={{
          display: "flex",
          height: "130px",
          borderBottom: "1px solid #e0dbd3",
        }}
      >
        {/* Left: text */}
        <div
          style={{
            flex: 1,
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "3px",
              color: "#8a8078",
              textTransform: "uppercase",
            }}
          >
            ↓ New Collection
          </span>
          <h2
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: "36px",
              textTransform: "uppercase",
              letterSpacing: "-0.5px",
              color: "#2a2520",
              lineHeight: 1,
            }}
          >
            New Arrival
          </h2>
        </div>
        {/* Right: image placeholder with decorative circles */}
        <div
          style={{
            width: "110px",
            background: "#ddd8d0",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "1px solid rgba(58,53,48,0.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "10px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "rgba(58,53,48,0.08)",
            }}
          />
        </div>
      </div>

      {/* Collection bar */}
      <div
        style={{
          padding: "8px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0dbd3",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#3a3530",
            fontWeight: 300,
          }}
        >
          New Collection
        </span>
        <span
          style={{
            fontSize: "8px",
            color: "#a09890",
            textDecoration: "underline",
          }}
        >
          shop now
        </span>
      </div>

      {/* Product grid: 3 cols, 1px gap (bg color shows as grid line) */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1px",
          background: "#e0dbd3",
          overflow: "hidden",
        }}
      >
        {[
          { name: "Object 01", price: "€120", bg: "#d4cec6" },
          { name: "Form 02", price: "€85", bg: "#c8d4cc" },
          { name: "Study 03", price: "€210", bg: "#d4c8c0" },
        ].map((product) => (
          <div
            key={product.name}
            style={{
              background: "#f4f1ec",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div style={{ height: "72px", background: product.bg }} />
            <div style={{ padding: "6px 8px" }}>
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#3a3530",
                  fontWeight: 300,
                  marginBottom: "2px",
                }}
              >
                {product.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "14px",
                  color: "#6a6058",
                }}
              >
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #e0dbd3",
        }}
      >
        <span style={{ fontSize: "8px", color: "#a09890" }}>3 / 12</span>
        <span
          style={{ fontSize: "12px", color: "#3a3530", letterSpacing: "4px" }}
        >
          ← →
        </span>
        <div
          style={{
            background: "#2a2520",
            color: "#f4f1ec",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: "8px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            padding: "8px 16px",
          }}
        >
          Add to Cart
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GatewayPage() {
  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:wght@400;700&family=Crimson+Pro:ital,wght@0,300;0,400;1,400&family=DM+Serif+Display:ital@0;1&family=Jost:wght@200;300;400&family=Space+Grotesk:wght@600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .theme-card {
          display: block;
          width: 300px;
          height: 480px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .theme-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
        }
        /* Brutalist-specific headline hover */
        .brutalist-card:hover .brutalist-headline {
          color: #ff3300;
        }
        /* Layout rows */
        .gateway-row {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (max-width: 680px) {
          .theme-card {
            width: 100%;
            max-width: 340px;
            height: auto;
            min-height: 480px;
          }
          .gateway-row {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div
        style={{ background: "#0a0a0a" }}
        className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/30">
          Choose your experience
        </p>
        <p className="mb-12 text-[10px] text-white/15">
          5 themes · select one to enter
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {/* Row 1: Elegant + Flashy */}
          <div className="gateway-row">
            <CardWrapper href="/elegant" label="Elegant">
              <ElegantCard />
            </CardWrapper>
            <CardWrapper href="/flashy" label="Flashy">
              <FlashyCard />
            </CardWrapper>
          </div>

          {/* Row 2: Brutalist + Organic + Scandi */}
          <div className="gateway-row">
            <CardWrapper
              href="/brutalist"
              label="Brutalist"
              extraClass="brutalist-card"
            >
              <BrutalistCard />
            </CardWrapper>
            <CardWrapper href="/organic" label="Organic">
              <OrganicCard />
            </CardWrapper>
            <CardWrapper href="/scandi" label="Scandi">
              <ScandiCard />
            </CardWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
