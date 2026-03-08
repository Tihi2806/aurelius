"use client";

const MANIFESTO_TEXT =
  "We don't take briefs. We interrogate them. Every brand we touch is built to endure — not just to impress. We work with the few who understand that design is not decoration. It is strategy made visible.";

const WORDS = MANIFESTO_TEXT.split(/\s+/);

export function ManifestoSection() {
  return (
    <section className="manifesto-section" data-animated="false">
      <span className="manifesto-watermark" aria-hidden="true">
        004
      </span>
      <div className="manifesto-inner">
        <p className="manifesto-paragraph">
          {WORDS.map((word, i) => (
            <span key={`${word}-${i}`} className="manifesto-word">
              {word}{" "}
            </span>
          ))}
        </p>
        <a href="/#work" className="manifesto-link">
          → See our work
        </a>
      </div>
    </section>
  );
}
