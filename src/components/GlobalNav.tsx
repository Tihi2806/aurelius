"use client";

function scrollTo(selector: string) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
  const hero = document.querySelector("#hero");
  if (hero) hero.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export function GlobalNav() {
  return (
    <header
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "45%",
        minWidth: 500,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(15, 15, 15, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 50,
        border: "1px solid rgba(255,255,255,0.08)",
        zIndex: 9999,
      }}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="cursor-pointer font-[family-name:var(--font-cormorant)] text-lg font-medium tracking-wide text-white hover:opacity-90"
      >
        AURELIUS
      </button>
      <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        <button
          type="button"
          onClick={() => scrollTo("#layouts")}
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 13,
            letterSpacing: "0.05em",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          className="hover:text-white"
        >
          Layouts
        </button>
        <button
          type="button"
          onClick={() => scrollTo("#work")}
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 13,
            letterSpacing: "0.05em",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          className="hover:text-white"
        >
          Work
        </button>
        <button
          type="button"
          onClick={() => scrollTo("#contact")}
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 13,
            letterSpacing: "0.05em",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          className="hover:text-white"
        >
          Contact
        </button>
      </nav>
    </header>
  );
}
