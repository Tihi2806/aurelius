"use client";

import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type SectionType =
  | "hero"
  | "about"
  | "services"
  | "portfolio"
  | "testimonials"
  | "contact"
  | "pricing"
  | "faq"
  | "footer";

type HeroContent = "text" | "image" | "video" | "split";
type HeroLayout = "center" | "left" | "minimal";
type FontKey = "modern" | "serif" | "mono" | "script";
type SideTab = "sections" | "style" | "hero";

interface BuilderState {
  sections: SectionType[];
  accent: string;
  font: FontKey;
  bg: string;
  cardRadius: number;
  heroContent: HeroContent;
  heroLayout: HeroLayout;
  heroTitle: string;
  heroSub: string;
  heroCta: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_STATE: BuilderState = {
  sections: [],
  accent: "#c8a96e",
  font: "modern",
  bg: "#0a0a0a",
  cardRadius: 4,
  heroContent: "text",
  heroLayout: "center",
  heroTitle: "We craft digital experiences",
  heroSub: "Aurelius builds premium websites for ambitious brands.",
  heroCta: "Start a project",
};

const ALL_SECTIONS: SectionType[] = [
  "hero",
  "about",
  "services",
  "portfolio",
  "testimonials",
  "contact",
  "pricing",
  "faq",
  "footer",
];

const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Hero",
  about: "About",
  services: "Services",
  portfolio: "Portfolio",
  testimonials: "Testimonials",
  contact: "Contact",
  pricing: "Pricing",
  faq: "FAQ",
  footer: "Footer",
};

const FONT_FAMILY: Record<FontKey, string> = {
  modern: "var(--font-dm-sans), system-ui, sans-serif",
  serif: "var(--font-cormorant), Georgia, serif",
  mono: "var(--font-inter), 'Courier New', monospace",
  script: "Georgia, 'Times New Roman', serif",
};

const ACCENT_SWATCHES = [
  "#c8a96e",
  "#7c6fcd",
  "#2bb5a0",
  "#e05a5a",
  "#5aa8e0",
  "#e8e8e8",
];

const BG_SWATCHES = ["#0a0a0a", "#0d1117", "#0f0e17", "#0d1410", "#120e0e"];

const CARD_RADIUS_OPTIONS: { label: string; value: number }[] = [
  { label: "Sharp", value: 4 },
  { label: "Rounded", value: 12 },
  { label: "Pill", value: 24 },
  { label: "Flat", value: 0 },
];

// ── Section Previews ─────────────────────────────────────────────────────────

function HeroPreview({ state }: { state: BuilderState }) {
  const ff = FONT_FAMILY[state.font];
  const r = state.cardRadius;
  const isSplit = state.heroContent === "split";
  const isVideo = state.heroContent === "video";
  const textAlign: "center" | "left" =
    state.heroLayout === "center" ? "center" : "left";
  const alignItems: "center" | "flex-start" =
    state.heroLayout === "center" ? "center" : "flex-start";

  return (
    <div
      style={{
        background: state.bg,
        position: "relative",
        overflow: "hidden",
        minHeight: 220,
        display: "flex",
        alignItems: "center",
        padding: isSplit ? "32px" : "40px 32px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${state.bg} 0%, ${state.accent}18 100%)`,
        }}
      />
      {isSplit ? (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            width: "100%",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: state.accent,
                border: `1px solid ${state.accent}40`,
                padding: "4px 10px",
                borderRadius: r,
                marginBottom: 12,
                fontFamily: ff,
              }}
            >
              Premium Agency
            </div>
            <h2
              style={{
                fontFamily: ff,
                fontSize: 26,
                fontWeight: 600,
                color: "#f5f5f0",
                margin: "0 0 10px",
                lineHeight: 1.2,
              }}
            >
              {state.heroTitle}
            </h2>
            <p
              style={{
                color: "#888",
                fontSize: 13,
                margin: "0 0 16px",
                fontFamily: ff,
              }}
            >
              {state.heroSub}
            </p>
            <button
              style={{
                background: state.accent,
                color: "#000",
                padding: "8px 18px",
                borderRadius: r,
                border: "none",
                fontFamily: ff,
                fontWeight: 600,
                fontSize: 12,
                cursor: "default",
              }}
            >
              {state.heroCta}
            </button>
          </div>
          <div
            style={{
              height: 140,
              background: `${state.accent}15`,
              borderRadius: r,
              border: `1px solid ${state.accent}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#555", fontSize: 11, fontFamily: ff }}>
              Image
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems,
            textAlign,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: state.accent,
              border: `1px solid ${state.accent}40`,
              padding: "4px 10px",
              borderRadius: r,
              marginBottom: 12,
              fontFamily: ff,
            }}
          >
            Premium Agency
          </div>
          <h2
            style={{
              fontFamily: ff,
              fontSize: state.heroLayout === "minimal" ? 22 : 28,
              fontWeight: 600,
              color: "#f5f5f0",
              margin: "0 0 10px",
              lineHeight: 1.2,
              maxWidth: 440,
              textAlign,
            }}
          >
            {state.heroTitle}
          </h2>
          {state.heroLayout !== "minimal" && (
            <p
              style={{
                color: "#888",
                fontSize: 13,
                margin: "0 0 16px",
                fontFamily: ff,
                maxWidth: 360,
                textAlign,
              }}
            >
              {state.heroSub}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              style={{
                background: state.accent,
                color: "#000",
                padding: "8px 18px",
                borderRadius: r,
                border: "none",
                fontFamily: ff,
                fontWeight: 600,
                fontSize: 12,
                cursor: "default",
              }}
            >
              {state.heroCta}
            </button>
            {isVideo && (
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: `1px solid ${state.accent}60`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill={state.accent}
                >
                  <polygon points="2,1 11,6 2,11" />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AboutPreview({ state }: { state: BuilderState }) {
  const ff = FONT_FAMILY[state.font];
  const r = state.cardRadius;
  return (
    <div
      style={{
        background: state.bg,
        padding: "32px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: state.accent,
            marginBottom: 12,
            fontFamily: ff,
          }}
        >
          About
        </div>
        <h3
          style={{
            fontFamily: ff,
            fontSize: 22,
            fontWeight: 600,
            color: "#f5f5f0",
            margin: "0 0 12px",
          }}
        >
          We build brands that endure
        </h3>
        <p
          style={{
            color: "#888",
            fontSize: 12,
            lineHeight: 1.6,
            margin: "0 0 20px",
            fontFamily: ff,
          }}
        >
          Aurelius is a strategic agency for ambitious founders. We combine
          strategy, design, and technology to create digital products that stand
          apart.
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {(
            [
              ["50+", "Clients"],
              ["12", "Years"],
              ["5★", "Rating"],
            ] as const
          ).map(([n, l]) => (
            <div key={l}>
              <div
                style={{
                  fontFamily: ff,
                  fontSize: 20,
                  fontWeight: 700,
                  color: state.accent,
                }}
              >
                {n}
              </div>
              <div style={{ fontFamily: ff, fontSize: 10, color: "#666" }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          height: 140,
          background: `${state.accent}10`,
          borderRadius: r,
          border: "1px solid #2a2a2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#444", fontSize: 11, fontFamily: ff }}>
          Image
        </span>
      </div>
    </div>
  );
}

function ServicesPreview({ state }: { state: BuilderState }) {
  const ff = FONT_FAMILY[state.font];
  const r = state.cardRadius;
  const services = [
    "Web Design",
    "Development",
    "Branding",
    "SEO",
    "Maintenance",
    "Consulting",
  ];
  return (
    <div style={{ background: state.bg, padding: "32px" }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: state.accent,
          marginBottom: 8,
          fontFamily: ff,
        }}
      >
        Services
      </div>
      <h3
        style={{
          fontFamily: ff,
          fontSize: 20,
          fontWeight: 600,
          color: "#f5f5f0",
          margin: "0 0 20px",
        }}
      >
        What we do
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {services.map((s) => (
          <div
            key={s}
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: r,
              padding: "14px",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: r,
                background: `${state.accent}20`,
                marginBottom: 8,
              }}
            />
            <div
              style={{
                fontFamily: ff,
                fontSize: 12,
                fontWeight: 600,
                color: "#e5e5e5",
              }}
            >
              {s}
            </div>
            <div
              style={{ fontFamily: ff, fontSize: 10, color: "#555", marginTop: 4 }}
            >
              Premium service
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioPreview({ state }: { state: BuilderState }) {
  const ff = FONT_FAMILY[state.font];
  const r = state.cardRadius;
  const projects = [
    "Luminary",
    "Vault",
    "Nocturne",
    "Meridian",
    "Solstice",
    "Echo",
  ];
  return (
    <div style={{ background: state.bg, padding: "32px" }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: state.accent,
          marginBottom: 8,
          fontFamily: ff,
        }}
      >
        Portfolio
      </div>
      <h3
        style={{
          fontFamily: ff,
          fontSize: 20,
          fontWeight: 600,
          color: "#f5f5f0",
          margin: "0 0 20px",
        }}
      >
        Selected work
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {projects.map((p) => (
          <div
            key={p}
            style={{
              height: 80,
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: r,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              padding: "10px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to top, ${state.bg}cc, transparent)`,
              }}
            />
            <span
              style={{
                position: "relative",
                fontFamily: ff,
                fontSize: 11,
                fontWeight: 600,
                color: "#e5e5e5",
              }}
            >
              {p}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsPreview({ state }: { state: BuilderState }) {
  const ff = FONT_FAMILY[state.font];
  const r = state.cardRadius;
  const testimonials = [
    {
      name: "Sarah K.",
      init: "SK",
      text: "Exceptional work, transformed our brand completely.",
    },
    {
      name: "James L.",
      init: "JL",
      text: "The best agency we've worked with. Highly recommend.",
    },
    {
      name: "Maria R.",
      init: "MR",
      text: "Delivered ahead of schedule with stunning results.",
    },
    {
      name: "Tom B.",
      init: "TB",
      text: "Our revenue increased 40% after the redesign.",
    },
  ];
  return (
    <div style={{ background: state.bg, padding: "32px" }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: state.accent,
          marginBottom: 8,
          fontFamily: ff,
        }}
      >
        Testimonials
      </div>
      <h3
        style={{
          fontFamily: ff,
          fontSize: 20,
          fontWeight: 600,
          color: "#f5f5f0",
          margin: "0 0 20px",
        }}
      >
        What clients say
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: r,
              padding: "14px",
            }}
          >
            <p
              style={{
                fontFamily: ff,
                fontSize: 11,
                color: "#aaa",
                margin: "0 0 12px",
                lineHeight: 1.5,
              }}
            >
              &ldquo;{t.text}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: `${state.accent}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: ff,
                    fontSize: 9,
                    color: state.accent,
                    fontWeight: 600,
                  }}
                >
                  {t.init}
                </span>
              </div>
              <span style={{ fontFamily: ff, fontSize: 11, color: "#ccc" }}>
                {t.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPreview({ state }: { state: BuilderState }) {
  const ff = FONT_FAMILY[state.font];
  const r = state.cardRadius;
  return (
    <div
      style={{ background: state.bg, padding: "32px", textAlign: "center" }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: state.accent,
          marginBottom: 8,
          fontFamily: ff,
        }}
      >
        Contact
      </div>
      <h3
        style={{
          fontFamily: ff,
          fontSize: 20,
          fontWeight: 600,
          color: "#f5f5f0",
          margin: "0 0 20px",
        }}
      >
        Start a conversation
      </h3>
      <div
        style={{
          maxWidth: 360,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {["Name", "Email", "Subject"].map((f) => (
          <input
            key={f}
            readOnly
            placeholder={f}
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: r,
              padding: "8px 12px",
              color: "#555",
              fontFamily: ff,
              fontSize: 12,
              width: "100%",
              outline: "none",
            }}
          />
        ))}
        <textarea
          readOnly
          placeholder="Message"
          rows={3}
          style={{
            background: "#141414",
            border: "1px solid #2a2a2a",
            borderRadius: r,
            padding: "8px 12px",
            color: "#555",
            fontFamily: ff,
            fontSize: 12,
            width: "100%",
            outline: "none",
            resize: "none",
          }}
        />
        <button
          style={{
            background: state.accent,
            color: "#000",
            padding: "9px 0",
            borderRadius: r,
            border: "none",
            fontFamily: ff,
            fontWeight: 600,
            fontSize: 12,
            cursor: "default",
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

function PricingPreview({ state }: { state: BuilderState }) {
  const ff = FONT_FAMILY[state.font];
  const r = state.cardRadius;
  const plans = [
    { name: "Starter", price: "€990", desc: "For small businesses", featured: false },
    { name: "Professional", price: "€2,490", desc: "Most popular", featured: true },
    { name: "Enterprise", price: "€4,990", desc: "Full-service solution", featured: false },
  ];
  return (
    <div style={{ background: state.bg, padding: "32px" }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: state.accent,
          marginBottom: 8,
          fontFamily: ff,
        }}
      >
        Pricing
      </div>
      <h3
        style={{
          fontFamily: ff,
          fontSize: 20,
          fontWeight: 600,
          color: "#f5f5f0",
          margin: "0 0 20px",
        }}
      >
        Simple pricing
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {plans.map((p) => (
          <div
            key={p.name}
            style={{
              background: p.featured ? `${state.accent}18` : "#141414",
              border: `1px solid ${p.featured ? state.accent + "60" : "#2a2a2a"}`,
              borderRadius: r,
              padding: "18px 14px",
            }}
          >
            <div
              style={{ fontFamily: ff, fontSize: 10, color: "#888", marginBottom: 4 }}
            >
              {p.desc}
            </div>
            <div
              style={{
                fontFamily: ff,
                fontSize: 11,
                fontWeight: 600,
                color: "#ccc",
                marginBottom: 6,
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                fontFamily: ff,
                fontSize: 22,
                fontWeight: 700,
                color: p.featured ? state.accent : "#f5f5f0",
                marginBottom: 12,
              }}
            >
              {p.price}
            </div>
            <button
              style={{
                background: p.featured ? state.accent : "transparent",
                border: `1px solid ${p.featured ? "transparent" : "#3a3a3a"}`,
                borderRadius: r,
                padding: "6px 0",
                width: "100%",
                fontFamily: ff,
                fontSize: 11,
                color: p.featured ? "#000" : "#888",
                cursor: "default",
              }}
            >
              Get started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQPreview({ state }: { state: BuilderState }) {
  const ff = FONT_FAMILY[state.font];
  const r = state.cardRadius;
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    "How long does a project take?",
    "What is your design process?",
    "Do you offer ongoing support?",
    "Can you work with existing brands?",
  ];
  return (
    <div style={{ background: state.bg, padding: "32px" }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: state.accent,
          marginBottom: 8,
          fontFamily: ff,
        }}
      >
        FAQ
      </div>
      <h3
        style={{
          fontFamily: ff,
          fontSize: 20,
          fontWeight: 600,
          color: "#f5f5f0",
          margin: "0 0 20px",
        }}
      >
        Common questions
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {faqs.map((q, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #2a2a2a",
              borderRadius: r,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%",
                background: "#141414",
                border: "none",
                padding: "12px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                color: "#e5e5e5",
                fontFamily: ff,
                fontSize: 12,
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              {q}
              <span
                style={{ color: state.accent, fontSize: 18, lineHeight: 1, flexShrink: 0 }}
              >
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div
                style={{
                  background: "#0e0e0e",
                  padding: "10px 14px",
                  fontFamily: ff,
                  fontSize: 11,
                  color: "#777",
                  lineHeight: 1.6,
                }}
              >
                We tailor each engagement to your specific needs and goals.
                Contact us to learn more about our process and timelines.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterPreview({ state }: { state: BuilderState }) {
  const ff = FONT_FAMILY[state.font];
  return (
    <div
      style={{
        background: state.bg,
        padding: "24px 32px",
        borderTop: "1px solid #2a2a2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: ff,
          fontSize: 14,
          fontWeight: 700,
          color: state.accent,
          letterSpacing: "0.08em",
        }}
      >
        AURELIUS
      </span>
      <div style={{ display: "flex", gap: 20 }}>
        {["Work", "Services", "About", "Contact"].map((l) => (
          <span key={l} style={{ fontFamily: ff, fontSize: 11, color: "#666" }}>
            {l}
          </span>
        ))}
      </div>
      <span style={{ fontFamily: ff, fontSize: 10, color: "#444" }}>
        © 2025 Aurelius. All rights reserved.
      </span>
    </div>
  );
}

function SectionPreview({
  type,
  state,
}: {
  type: SectionType;
  state: BuilderState;
}) {
  switch (type) {
    case "hero":
      return <HeroPreview state={state} />;
    case "about":
      return <AboutPreview state={state} />;
    case "services":
      return <ServicesPreview state={state} />;
    case "portfolio":
      return <PortfolioPreview state={state} />;
    case "testimonials":
      return <TestimonialsPreview state={state} />;
    case "contact":
      return <ContactPreview state={state} />;
    case "pricing":
      return <PricingPreview state={state} />;
    case "faq":
      return <FAQPreview state={state} />;
    case "footer":
      return <FooterPreview state={state} />;
  }
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function BuilderPage() {
  const [state, setState] = useState<BuilderState>(DEFAULT_STATE);
  const [tab, setTab] = useState<SideTab>("sections");
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientEmail, setClientEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof BuilderState>(
    key: K,
    value: BuilderState[K]
  ) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function addSection(type: SectionType) {
    if (!state.sections.includes(type)) {
      update("sections", [...state.sections, type]);
    }
  }

  function removeSection(index: number) {
    const s = [...state.sections];
    s.splice(index, 1);
    update("sections", s);
  }

  function moveSection(index: number, dir: -1 | 1) {
    const s = [...state.sections];
    const target = index + dir;
    if (target < 0 || target >= s.length) return;
    [s[index], s[target]] = [s[target], s[index]];
    update("sections", s);
  }

  async function handleSend() {
    setError("");
    if (!clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (state.sections.length === 0) {
      setError("Please add at least one section to your design.");
      return;
    }
    setSending(true);
    try {
      const sectionsList = state.sections
        .map((s, i) => `${i + 1}. ${SECTION_LABELS[s]}`)
        .join("\n");
      const fontLabel: Record<FontKey, string> = {
        modern: "Modern",
        serif: "Serif",
        mono: "Mono",
        script: "Script",
      };
      const timestamp = new Date().toLocaleString("en-GB", {
        dateStyle: "long",
        timeStyle: "short",
      });

      const message = `AURELIUS WEBSITE BUILDER — NEW DESIGN REQUEST
=============================================
Client: ${clientName || "Not provided"}
Email: ${clientEmail}
Time: ${timestamp}

SELECTED SECTIONS (in order):
${sectionsList}

STYLE:
Accent color: ${state.accent}
Heading font: ${fontLabel[state.font]}
Background: ${state.bg}
Card style: border-radius ${state.cardRadius}px

HERO:
Heading: "${state.heroTitle}"
Subheading: "${state.heroSub}"
CTA: "${state.heroCta}"
Content type: ${state.heroContent}
Alignment: ${state.heroLayout}

=============================================
Sent via Aurelius Website Builder`;

      const res = await fetch("https://formspree.io/f/xbdpdjoz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: clientEmail,
          name: clientName || "Not provided",
          _replyto: clientEmail,
          _subject: `New design request — ${clientName || clientEmail} (${state.sections.map((s) => SECTION_LABELS[s]).join(", ")})`,
          message,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: 4,
    color: "#e5e5e5",
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
    fontSize: 12,
    padding: "7px 10px",
    outline: "none",
    width: "100%",
  };

  const sidebarLabelStyle: React.CSSProperties = {
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#555",
    display: "block",
    marginBottom: 6,
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#0a0a0a",
        color: "#f5f5f0",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: 280,
          minWidth: 280,
          height: "100vh",
          background: "#0d0d0d",
          borderRight: "1px solid #2a2a2a",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo strip */}
        <div
          style={{
            padding: "18px 20px 16px",
            borderBottom: "1px solid #1e1e1e",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#c8a96e",
            }}
          >
            AURELIUS
          </span>
          <span
            style={{
              fontSize: 10,
              color: "#444",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Builder
          </span>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #1e1e1e",
            flexShrink: 0,
          }}
        >
          {(["sections", "style", "hero"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                borderBottom: `2px solid ${tab === t ? "#c8a96e" : "transparent"}`,
                padding: "11px 4px",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: tab === t ? "#c8a96e" : "#555",
                cursor: "pointer",
                transition: "color 0.15s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {/* SECTIONS TAB */}
          {tab === "sections" && (
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: "#444",
                  marginBottom: 14,
                  lineHeight: 1.5,
                }}
              >
                Click a block to add it to your canvas.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {ALL_SECTIONS.map((s) => {
                  const added = state.sections.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => addSection(s)}
                      disabled={added}
                      style={{
                        background: added ? "#141414" : "#111",
                        border: `1px solid ${added ? "#222" : "#2a2a2a"}`,
                        borderRadius: 6,
                        padding: "11px 8px",
                        fontSize: 11,
                        color: added ? "#3a3a3a" : "#bbb",
                        cursor: added ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                        transition: "all 0.15s",
                      }}
                    >
                      {added && (
                        <span
                          style={{ color: state.accent, fontSize: 10 }}
                        >
                          ✓
                        </span>
                      )}
                      {SECTION_LABELS[s]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STYLE TAB */}
          {tab === "style" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {/* Accent color */}
              <div>
                <label style={sidebarLabelStyle}>Accent Color</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {ACCENT_SWATCHES.map((c) => (
                    <button
                      key={c}
                      onClick={() => update("accent", c)}
                      title={c}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: c,
                        border: `2px solid ${state.accent === c ? "#fff" : "transparent"}`,
                        cursor: "pointer",
                        outline: "none",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Heading font */}
              <div>
                <label style={sidebarLabelStyle}>Heading Font</label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {(
                    [
                      ["modern", "Modern"],
                      ["serif", "Serif"],
                      ["mono", "Mono"],
                      ["script", "Script"],
                    ] as const
                  ).map(([k, l]) => (
                    <button
                      key={k}
                      onClick={() => update("font", k)}
                      style={{
                        background: state.font === k ? "#1a1a1a" : "#111",
                        border: `1px solid ${state.font === k ? state.accent + "50" : "#2a2a2a"}`,
                        borderRadius: 6,
                        padding: "8px 12px",
                        fontSize: 11,
                        color: state.font === k ? state.accent : "#777",
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: FONT_FAMILY[k],
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background */}
              <div>
                <label style={sidebarLabelStyle}>Background</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {BG_SWATCHES.map((c) => (
                    <button
                      key={c}
                      onClick={() => update("bg", c)}
                      title={c}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 5,
                        background: c,
                        border: `2px solid ${state.bg === c ? "#fff" : "#3a3a3a"}`,
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Card radius */}
              <div>
                <label style={sidebarLabelStyle}>Card Style</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 6,
                  }}
                >
                  {CARD_RADIUS_OPTIONS.map((o) => (
                    <button
                      key={o.label}
                      onClick={() => update("cardRadius", o.value)}
                      style={{
                        background:
                          state.cardRadius === o.value ? "#1a1a1a" : "#111",
                        border: `1px solid ${state.cardRadius === o.value ? state.accent + "50" : "#2a2a2a"}`,
                        borderRadius: 6,
                        padding: "8px",
                        fontSize: 11,
                        color:
                          state.cardRadius === o.value ? state.accent : "#777",
                        cursor: "pointer",
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* HERO TAB */}
          {tab === "hero" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Content type */}
              <div>
                <label style={sidebarLabelStyle}>Content Type</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 6,
                  }}
                >
                  {(
                    [
                      ["text", "Text only"],
                      ["image", "With image"],
                      ["video", "With video"],
                      ["split", "Split"],
                    ] as const
                  ).map(([k, l]) => (
                    <button
                      key={k}
                      onClick={() => update("heroContent", k)}
                      style={{
                        background:
                          state.heroContent === k ? "#1a1a1a" : "#111",
                        border: `1px solid ${state.heroContent === k ? state.accent + "50" : "#2a2a2a"}`,
                        borderRadius: 6,
                        padding: "7px 6px",
                        fontSize: 10,
                        color:
                          state.heroContent === k ? state.accent : "#777",
                        cursor: "pointer",
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Heading */}
              <div>
                <label style={sidebarLabelStyle}>Heading</label>
                <input
                  value={state.heroTitle}
                  onChange={(e) => update("heroTitle", e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Subheading */}
              <div>
                <label style={sidebarLabelStyle}>Subheading</label>
                <textarea
                  value={state.heroSub}
                  onChange={(e) => update("heroSub", e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {/* CTA */}
              <div>
                <label style={sidebarLabelStyle}>CTA Text</label>
                <input
                  value={state.heroCta}
                  onChange={(e) => update("heroCta", e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Alignment */}
              <div>
                <label style={sidebarLabelStyle}>Alignment</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {(
                    [
                      ["center", "Center"],
                      ["left", "Left"],
                      ["minimal", "Minimal"],
                    ] as const
                  ).map(([k, l]) => (
                    <button
                      key={k}
                      onClick={() => update("heroLayout", k)}
                      style={{
                        flex: 1,
                        background:
                          state.heroLayout === k ? "#1a1a1a" : "#111",
                        border: `1px solid ${state.heroLayout === k ? state.accent + "50" : "#2a2a2a"}`,
                        borderRadius: 6,
                        padding: "7px 4px",
                        fontSize: 10,
                        color: state.heroLayout === k ? state.accent : "#777",
                        cursor: "pointer",
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        {/* Toolbar */}
        <div
          style={{
            height: 52,
            borderBottom: "1px solid #1e1e1e",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            flexShrink: 0,
            background: "#0a0a0a",
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#444",
            }}
          >
            Preview
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Desktop / Mobile toggle */}
            <div
              style={{
                display: "flex",
                background: "#111",
                border: "1px solid #2a2a2a",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setIsMobile(false)}
                title="Desktop"
                style={{
                  background: !isMobile ? "#1e1e1e" : "transparent",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                  color: !isMobile ? "#e5e5e5" : "#555",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="4" width="20" height="14" rx="2" />
                  <line x1="8" y1="20" x2="16" y2="20" />
                  <line x1="12" y1="18" x2="12" y2="20" />
                </svg>
              </button>
              <button
                onClick={() => setIsMobile(true)}
                title="Mobile"
                style={{
                  background: isMobile ? "#1e1e1e" : "transparent",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                  color: isMobile ? "#e5e5e5" : "#555",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="6" y="2" width="12" height="20" rx="2" />
                  <circle cx="12" cy="18" r="1" fill="currentColor" />
                </svg>
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={() => setState(DEFAULT_STATE)}
              style={{
                background: "transparent",
                border: "1px solid #2a2a2a",
                borderRadius: 6,
                padding: "6px 12px",
                fontSize: 11,
                color: "#555",
                cursor: "pointer",
              }}
            >
              Reset
            </button>

            {/* Finish & Send */}
            <button
              onClick={() => {
                setModalOpen(true);
                setSent(false);
                setError("");
              }}
              style={{
                background: state.accent,
                border: "none",
                borderRadius: 6,
                padding: "7px 16px",
                fontSize: 11,
                fontWeight: 600,
                color: "#000",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Finish &amp; Send →
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
            display: "flex",
            justifyContent: "center",
            background: "#060606",
          }}
        >
          <div
            style={{
              width: isMobile ? 375 : "100%",
              maxWidth: isMobile ? 375 : 960,
              boxShadow: isMobile
                ? "0 0 0 1px #2a2a2a, 0 20px 60px rgba(0,0,0,0.7)"
                : "none",
              borderRadius: isMobile ? 16 : 0,
              overflow: "hidden",
              transition: "width 0.3s ease, max-width 0.3s ease",
            }}
          >
            {state.sections.length === 0 ? (
              <div
                style={{
                  height: 320,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px dashed #222",
                  borderRadius: 8,
                  color: "#333",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "1px dashed #2a2a2a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 14,
                    color: "#3a3a3a",
                  }}
                >
                  +
                </div>
                <p style={{ fontSize: 12, color: "#3a3a3a", margin: 0 }}>
                  Add sections from the sidebar to begin
                </p>
              </div>
            ) : (
              <div>
                {state.sections.map((type, i) => (
                  <div
                    key={`${type}-${i}`}
                    style={{ position: "relative" }}
                    className="builder-section"
                  >
                    {/* Section controls (shown on hover via CSS) */}
                    <div
                      className="section-controls"
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 10,
                        display: "flex",
                        gap: 4,
                        opacity: 0,
                        transition: "opacity 0.15s",
                      }}
                    >
                      <button
                        onClick={() => moveSection(i, -1)}
                        disabled={i === 0}
                        style={{
                          width: 26,
                          height: 26,
                          background: "#0d0d0d",
                          border: "1px solid #333",
                          borderRadius: 4,
                          color: i === 0 ? "#333" : "#aaa",
                          fontSize: 12,
                          cursor: i === 0 ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveSection(i, 1)}
                        disabled={i === state.sections.length - 1}
                        style={{
                          width: 26,
                          height: 26,
                          background: "#0d0d0d",
                          border: "1px solid #333",
                          borderRadius: 4,
                          color:
                            i === state.sections.length - 1 ? "#333" : "#aaa",
                          fontSize: 12,
                          cursor:
                            i === state.sections.length - 1
                              ? "not-allowed"
                              : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeSection(i)}
                        style={{
                          width: 26,
                          height: 26,
                          background: "#1a0909",
                          border: "1px solid #4a1a1a",
                          borderRadius: 4,
                          color: "#e05a5a",
                          fontSize: 15,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ×
                      </button>
                    </div>
                    <SectionPreview type={type} state={state} />
                  </div>
                ))}

                {/* Add another */}
                <button
                  onClick={() => setTab("sections")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    padding: "14px",
                    border: "1px dashed #222",
                    borderTop: "none",
                    background: "transparent",
                    color: "#3a3a3a",
                    fontSize: 11,
                    cursor: "pointer",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ fontSize: 16 }}>+</span> Add another section
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Modal ───────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div
            style={{
              background: "#0d0d0d",
              border: "1px solid #2a2a2a",
              borderRadius: 10,
              padding: 32,
              width: "100%",
              maxWidth: 420,
              position: "relative",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                background: "none",
                border: "none",
                color: "#555",
                fontSize: 20,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>

            {sent ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `${state.accent}18`,
                    border: `1px solid ${state.accent}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 18px",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={state.accent}
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#f5f5f0",
                    margin: "0 0 8px",
                  }}
                >
                  Design sent!
                </h3>
                <p style={{ fontSize: 13, color: "#555", margin: 0 }}>
                  The Aurelius team will be in touch shortly.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    marginTop: 22,
                    background: state.accent,
                    border: "none",
                    borderRadius: 6,
                    padding: "9px 28px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#000",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#f5f5f0",
                    margin: "0 0 6px",
                  }}
                >
                  Send your design
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: "#555",
                    margin: "0 0 24px",
                    lineHeight: 1.5,
                  }}
                >
                  Enter your email — you&apos;ll receive a summary and the
                  Aurelius team will be in touch.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div>
                    <label
                      style={{
                        ...sidebarLabelStyle,
                        fontFamily:
                          "var(--font-dm-sans), system-ui, sans-serif",
                      }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="you@example.com"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        ...sidebarLabelStyle,
                        fontFamily:
                          "var(--font-dm-sans), system-ui, sans-serif",
                      }}
                    >
                      Name (optional)
                    </label>
                    <input
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Your name"
                      style={inputStyle}
                    />
                  </div>
                  {error && (
                    <p
                      style={{
                        fontSize: 11,
                        color: "#e05a5a",
                        margin: 0,
                      }}
                    >
                      {error}
                    </p>
                  )}
                  <button
                    onClick={handleSend}
                    disabled={sending}
                    style={{
                      background: state.accent,
                      border: "none",
                      borderRadius: 6,
                      padding: "10px 0",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#000",
                      cursor: sending ? "wait" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      opacity: sending ? 0.75 : 1,
                    }}
                  >
                    {sending ? (
                      <>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#000"
                          strokeWidth="2"
                          style={{ animation: "builder-spin 0.8s linear infinite" }}
                        >
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      "Send design →"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Scoped styles ────────────────────────────────────────────────────── */}
      <style>{`
        .builder-section:hover .section-controls {
          opacity: 1 !important;
        }
        @keyframes builder-spin {
          to { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
      `}</style>
    </div>
  );
}
