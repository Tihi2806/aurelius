"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  hero,
  services,
  work,
  processSteps,
  whyUs,
  contactCta,
} from "@/lib/content";

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const WORK_GRADIENT_CLASSES = [
  "brutalist-work-img w1",
  "brutalist-work-img w2",
  "brutalist-work-img w3",
  "brutalist-work-img w4",
  "brutalist-work-img w1",
];

export default function BrutalistPage() {
  return (
    <main className="brutalist-page">
      {/* SECTION 1: HERO */}
      <section
        className="brutalist-hero"
        style={{
          height: "calc(100vh - 52px)",
          borderBottom: "3px solid #111",
        }}
      >
        <div className="brutalist-hero-grid">
          <div className="brutalist-hero-left">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="brutalist-hero-eyebrow"
            >
              Vol. 03 / Issue 12 — {hero.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="brutalist-hero-headline"
            >
              {hero.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.4 }}
              className="brutalist-hero-subtext"
            >
              {hero.subtext}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.55 }}
              className="brutalist-hero-ctas"
            >
              <Link href="/brutalist#contact" className="brutalist-btn-primary">
                {hero.ctaPrimary} →
              </Link>
              <Link href="/brutalist#work" className="brutalist-btn-ghost">
                {hero.ctaSecondary}
              </Link>
            </motion.div>
            <span className="brutalist-hero-deco" aria-hidden>
              AU
            </span>
          </div>
          <div className="brutalist-hero-right">
            {[
              {
                label: "Projects Delivered",
                value: "248",
                tag: "↑ Since 2012",
              },
              {
                label: "Years Active",
                value: "12",
                tag: "Est. 2012",
              },
              {
                label: "Awards Won",
                value: "47×",
                tag: "↑ Industry Recognition",
              },
              {
                label: "Client Reach",
                value: "Global",
                tag: "23 Countries",
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="brutalist-hero-stat"
                style={{
                  borderBottom: i < 3 ? "3px solid #111" : "none",
                }}
              >
                <span className="brutalist-hero-stat-label">{stat.label}</span>
                <span className="brutalist-hero-stat-value">{stat.value}</span>
                <span className="brutalist-hero-stat-tag">{stat.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: TICKER */}
      <section className="brutalist-ticker-wrap">
        <div className="brutalist-ticker">
          <span className="brutalist-ticker-content">
            {services.flatMap((s, i) =>
              i === 0 ? [s.title] : [" ★ ", s.title]
            ).map((part, i) =>
              part === " ★ " ? (
                <span key={i} className="brutalist-ticker-star"> ★ </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}{" "}
            <span className="brutalist-ticker-star"> ★ </span>{" "}
          </span>
          <span className="brutalist-ticker-content">
            {services.flatMap((s, i) =>
              i === 0 ? [s.title] : [" ★ ", s.title]
            ).map((part, i) =>
              part === " ★ " ? (
                <span key={`dup-${i}`} className="brutalist-ticker-star"> ★ </span>
              ) : (
                <span key={`dup-${i}`}>{part}</span>
              )
            )}{" "}
            <span className="brutalist-ticker-star"> ★ </span>{" "}
          </span>
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section id="services" className="brutalist-section">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          className="brutalist-section-header"
        >
          <div>
            <p className="brutalist-section-label">What We Do</p>
            <h2 className="brutalist-section-title">SERVICES</h2>
          </div>
          <span className="brutalist-section-count">06</span>
        </motion.div>
        <div className="brutalist-services-grid">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInUp}
              className="brutalist-service-card"
              style={{
                borderRight: (i + 1) % 3 !== 0 ? "3px solid #111" : "none",
                borderBottom: i < services.length - 3 ? "3px solid #111" : "none",
              }}
            >
              <span className="brutalist-service-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="brutalist-service-title">{service.title}</h3>
              <p className="brutalist-service-desc">{service.description}</p>
              <span className="brutalist-service-arrow">→</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: DIAGONAL STRIP */}
      <section className="brutalist-diagonal">
        <span className="brutalist-diagonal-text">
          — Selected Work 2024 —
        </span>
      </section>

      {/* SECTION 5: WORK */}
      <section id="work" className="brutalist-section">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          className="brutalist-section-header"
        >
          <div>
            <p className="brutalist-section-label">Portfolio</p>
            <h2 className="brutalist-section-title">SELECTED WORK</h2>
          </div>
          <span className="brutalist-section-count">05</span>
        </motion.div>
        <div className="brutalist-work-grid">
          {work.map((item, i) => (
            <motion.div
              key={item.slug}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInUp}
              className="brutalist-work-item"
              style={{
                borderRight: (i + 1) % 2 !== 0 ? "3px solid #111" : "none",
                borderBottom:
                  i < work.length - 2 ? "3px solid #111" : "none",
              }}
            >
              <Link href={`/work/${item.slug}`} className="brutalist-work-link">
                <div
                  className={WORK_GRADIENT_CLASSES[i % WORK_GRADIENT_CLASSES.length]}
                >
                  <span className="brutalist-work-img-name">{item.name}</span>
                  <div className="brutalist-work-overlay">
                    <span>VIEW CASE →</span>
                  </div>
                </div>
                <div className="brutalist-work-meta">
                  <div>
                    <h3 className="brutalist-work-title">{item.name}</h3>
                    <p className="brutalist-work-category">{item.category}</p>
                  </div>
                  <span className="brutalist-work-year">{item.year}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6: PROCESS */}
      <section id="process" className="brutalist-process">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          className="brutalist-section-header brutalist-process-header"
        >
          <div>
            <p className="brutalist-section-label">How We Work</p>
            <h2 className="brutalist-section-title">PROCESS</h2>
          </div>
          <span className="brutalist-section-count">04</span>
        </motion.div>
        <div className="brutalist-process-grid">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="brutalist-process-step"
              style={{
                borderRight:
                  i < processSteps.length - 1
                    ? "3px solid rgba(240,236,228,0.12)"
                    : "none",
              }}
            >
              <span className="brutalist-process-num">{step.step}</span>
              {i < processSteps.length - 1 && (
                <span className="brutalist-process-connector" />
              )}
              <h3 className="brutalist-process-title">{step.title}</h3>
              <p className="brutalist-process-text">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7: WHY US */}
      <section className="brutalist-why">
        <div className="brutalist-why-grid" style={{ borderBottom: "3px solid #111" }}>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            className="brutalist-why-left"
          >
            <p className="brutalist-section-label">Our Difference</p>
            <h2 className="brutalist-why-headline">
              WHY CHOOSE <span className="brutalist-accent">US.</span>
            </h2>
            <Link href="/brutalist#contact" className="brutalist-btn-primary">
              Work With Us →
            </Link>
          </motion.div>
          <div className="brutalist-why-right">
            {whyUs.map((point, i) => (
              <motion.div
                key={point.title}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeInUp}
                className="brutalist-why-point"
                style={{
                  borderBottom:
                    i < whyUs.length - 1 ? "3px solid #111" : "none",
                }}
              >
                <span className="brutalist-why-num">{String(i + 1)}</span>
                <div>
                  <h3 className="brutalist-why-point-title">{point.title}</h3>
                  <p className="brutalist-why-point-desc">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CONTACT */}
      <section id="contact" className="brutalist-contact">
        <div className="brutalist-contact-grid">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            className="brutalist-contact-left"
          >
            <p className="brutalist-contact-label">Get In Touch</p>
            <h2 className="brutalist-contact-headline">
              LET&apos;S BUILD SOMETHING{" "}
              <span className="brutalist-accent">LASTING.</span>
            </h2>
            <p className="brutalist-contact-note">
              Response within 24 hours
            </p>
            <div className="brutalist-contact-email">
              <span className="brutalist-contact-email-label">EMAIL</span>
              <a href="mailto:hello@aurelius.com" className="brutalist-contact-email-value">
                hello@aurelius.com
              </a>
            </div>
          </motion.div>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            className="brutalist-contact-right"
          >
            <form className="brutalist-form">
              <div className="brutalist-form-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="brutalist-form-input"
                />
              </div>
              <div className="brutalist-form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="brutalist-form-input"
                />
              </div>
              <div className="brutalist-form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Tell us about your project"
                  rows={4}
                  className="brutalist-form-input brutalist-form-textarea"
                />
              </div>
              <div className="brutalist-form-submit">
                <span className="brutalist-form-note">No spam. Ever.</span>
                <button type="submit" className="brutalist-form-btn">
                  {contactCta.submitLabel} →
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .brutalist-page {
          background: #f0ece4;
        }

        /* Hero */
        .brutalist-hero-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          height: 100%;
        }
        .brutalist-hero-left {
          border-right: 3px solid #111;
          padding: 48px 40px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .brutalist-hero-eyebrow {
          font-family: var(--font-courier), monospace;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 24px;
        }
        .brutalist-hero-headline {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(100px, 14vw, 180px);
          line-height: 0.85;
          color: #111;
          margin-bottom: 24px;
          transition: color 0.2s;
        }
        .brutalist-hero-headline:hover {
          color: #ff3300;
        }
        .brutalist-hero-subtext {
          font-family: var(--font-courier), monospace;
          font-size: 11px;
          line-height: 1.8;
          color: #444;
          max-width: 480px;
          letter-spacing: 1px;
          margin-bottom: 32px;
        }
        .brutalist-hero-ctas {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .brutalist-btn-primary {
          display: inline-block;
          padding: 14px 28px;
          background: #111;
          color: #f0ece4;
          border: 3px solid #111;
          font-family: var(--font-courier), monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .brutalist-btn-primary:hover {
          background: #ff3300;
          border-color: #ff3300;
        }
        .brutalist-btn-ghost {
          font-family: var(--font-courier), monospace;
          font-size: 11px;
          color: #111;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .brutalist-btn-ghost:hover {
          color: #ff3300;
        }
        .brutalist-hero-deco {
          position: absolute;
          bottom: 48px;
          right: 40px;
          font-family: var(--font-bebas), sans-serif;
          font-size: 220px;
          color: rgba(17, 17, 17, 0.04);
          pointer-events: none;
          line-height: 1;
        }
        .brutalist-hero-right {
          display: flex;
          flex-direction: column;
        }
        .brutalist-hero-stat {
          padding: 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: background 0.2s, color 0.2s;
        }
        .brutalist-hero-stat:hover {
          background: #111;
        }
        .brutalist-hero-stat:hover .brutalist-hero-stat-label,
        .brutalist-hero-stat:hover .brutalist-hero-stat-value,
        .brutalist-hero-stat:hover .brutalist-hero-stat-tag {
          color: #f0ece4;
        }
        .brutalist-hero-stat-label {
          font-family: var(--font-courier), monospace;
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888;
        }
        .brutalist-hero-stat-value {
          font-family: var(--font-bebas), sans-serif;
          font-size: 64px;
          line-height: 1;
          color: #111;
        }
        .brutalist-hero-stat-tag {
          font-family: var(--font-courier), monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: #888;
        }

        /* Ticker */
        .brutalist-ticker-wrap {
          height: 44px;
          background: #111;
          overflow: hidden;
          border-bottom: 3px solid #111;
        }
        .brutalist-ticker {
          display: flex;
          width: max-content;
          height: 100%;
          align-items: center;
          animation: brutalist-ticker 18s linear infinite;
        }
        .brutalist-ticker-content {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          font-family: var(--font-bebas), sans-serif;
          font-size: 14px;
          letter-spacing: 6px;
          color: #f0ece4;
          opacity: 0.6;
          padding-right: 48px;
        }
        .brutalist-ticker-star {
          color: #ff3300;
          opacity: 1;
        }
        @keyframes brutalist-ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Section header */
        .brutalist-section-header {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          padding: 32px 40px 24px;
          border-bottom: 3px solid #111;
        }
        .brutalist-section-label {
          font-family: var(--font-courier), monospace;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 6px;
        }
        .brutalist-section-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: 52px;
          color: #111;
        }
        .brutalist-section-count {
          font-family: var(--font-bebas), sans-serif;
          font-size: 80px;
          color: rgba(17, 17, 17, 0.08);
        }

        /* Services */
        .brutalist-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .brutalist-service-card {
          padding: 32px;
          position: relative;
          transition: background 0.2s;
        }
        .brutalist-service-card:hover {
          background: #111;
        }
        .brutalist-service-card:hover .brutalist-service-num {
          color: #ff3300;
        }
        .brutalist-service-card:hover .brutalist-service-title {
          color: #f0ece4;
        }
        .brutalist-service-card:hover .brutalist-service-desc {
          color: rgba(240, 236, 228, 0.5);
        }
        .brutalist-service-card:hover .brutalist-service-arrow {
          color: #ff3300;
          opacity: 1;
        }
        .brutalist-service-num {
          font-family: var(--font-courier), monospace;
          font-size: 11px;
          letter-spacing: 3px;
          color: #888;
          margin-bottom: 20px;
          display: block;
        }
        .brutalist-service-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: 28px;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
          color: #111;
        }
        .brutalist-service-desc {
          font-family: var(--font-courier), monospace;
          font-size: 10px;
          line-height: 1.8;
          color: #444;
        }
        .brutalist-service-arrow {
          position: absolute;
          bottom: 24px;
          right: 24px;
          font-size: 18px;
          opacity: 0.2;
          color: #111;
        }

        /* Diagonal */
        .brutalist-diagonal {
          height: 48px;
          background: #111;
          border-top: 3px solid #111;
          border-bottom: 3px solid #111;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brutalist-diagonal::before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent 0,
            transparent 6px,
            rgba(240, 236, 228, 0.04) 6px,
            rgba(240, 236, 228, 0.04) 12px
          );
          pointer-events: none;
        }
        .brutalist-diagonal-text {
          font-family: var(--font-bebas), sans-serif;
          font-size: 11px;
          letter-spacing: 10px;
          color: #f0ece4;
          opacity: 0.6;
          position: relative;
          z-index: 1;
        }

        /* Work */
        .brutalist-work-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        .brutalist-work-item {
          overflow: hidden;
        }
        .brutalist-work-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .brutalist-work-img {
          height: 320px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brutalist-work-img.w1 {
          background: #1a1a1a;
          background-image: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              rgba(255, 255, 255, 0.02) 20px,
              rgba(255, 255, 255, 0.02) 21px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              rgba(255, 255, 255, 0.02) 20px,
              rgba(255, 255, 255, 0.02) 21px
            );
        }
        .brutalist-work-img.w2 {
          background: #f0ece4;
          background-image: repeating-linear-gradient(
            45deg,
            transparent 0,
            transparent 8px,
            rgba(17, 17, 17, 0.06) 8px,
            rgba(17, 17, 17, 0.06) 16px
          );
        }
        .brutalist-work-img.w3 {
          background: #1a0a00;
          background-image: radial-gradient(
            ellipse 80% 80% at 50% 50%,
            rgba(255, 51, 0, 0.15),
            transparent
          );
        }
        .brutalist-work-img.w4 {
          background: #0a0a0a;
          background-image: repeating-linear-gradient(
            45deg,
            transparent 0,
            transparent 12px,
            rgba(255, 255, 255, 0.03) 12px,
            rgba(255, 255, 255, 0.03) 24px
          );
        }
        .brutalist-work-img-name {
          font-family: var(--font-bebas), sans-serif;
          font-size: 48px;
          color: rgba(240, 236, 228, 0.1);
          pointer-events: none;
        }
        .brutalist-work-overlay {
          position: absolute;
          inset: 0;
          background: #ff3300;
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.25s;
        }
        .brutalist-work-item:hover .brutalist-work-overlay {
          opacity: 0.9;
        }
        .brutalist-work-overlay span {
          font-family: var(--font-bebas), sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          color: #f0ece4;
        }
        .brutalist-work-meta {
          padding: 20px 28px;
          border-top: 3px solid #111;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .brutalist-work-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: 22px;
          color: #111;
          margin-bottom: 4px;
        }
        .brutalist-work-category {
          font-family: var(--font-courier), monospace;
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888;
        }
        .brutalist-work-year {
          font-family: var(--font-courier), monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: #888;
        }

        /* Process */
        .brutalist-process {
          background: #111;
          border-bottom: 3px solid #111;
        }
        .brutalist-process-header .brutalist-section-label {
          color: rgba(240, 236, 228, 0.4);
        }
        .brutalist-process-header .brutalist-section-title {
          color: #f0ece4;
        }
        .brutalist-process-header .brutalist-section-count {
          color: rgba(240, 236, 228, 0.06);
        }
        .brutalist-process-header {
          border-bottom-color: rgba(240, 236, 228, 0.12);
        }
        .brutalist-process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .brutalist-process-step {
          padding: 40px 32px;
          position: relative;
          transition: background 0.2s;
        }
        .brutalist-process-step:hover {
          background: rgba(255, 51, 0, 0.08);
        }
        .brutalist-process-step:hover .brutalist-process-num {
          color: rgba(255, 51, 0, 0.3);
        }
        .brutalist-process-num {
          font-family: var(--font-bebas), sans-serif;
          font-size: 80px;
          line-height: 0.9;
          color: rgba(240, 236, 228, 0.08);
          margin-bottom: 20px;
          display: block;
        }
        .brutalist-process-connector {
          position: absolute;
          top: 52px;
          right: -2px;
          width: 20px;
          height: 3px;
          background: #ff3300;
        }
        .brutalist-process-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #f0ece4;
          margin-bottom: 12px;
        }
        .brutalist-process-text {
          font-family: var(--font-courier), monospace;
          font-size: 10px;
          line-height: 1.9;
          color: rgba(240, 236, 228, 0.45);
        }

        /* Why Us */
        .brutalist-why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .brutalist-why-left {
          padding: 56px 40px;
          border-right: 3px solid #111;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .brutalist-why-headline {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(56px, 7vw, 96px);
          line-height: 0.88;
          letter-spacing: -2px;
          color: #111;
          margin: 24px 0 32px;
        }
        .brutalist-accent {
          color: #ff3300;
        }
        .brutalist-why-right {
          display: flex;
          flex-direction: column;
        }
        .brutalist-why-point {
          padding: 28px 32px;
          display: flex;
          flex-direction: row;
          gap: 20px;
          transition: background 0.2s;
        }
        .brutalist-why-point:hover {
          background: rgba(17, 17, 17, 0.04);
        }
        .brutalist-why-num {
          font-family: var(--font-bebas), sans-serif;
          font-size: 32px;
          color: rgba(17, 17, 17, 0.15);
          flex-shrink: 0;
        }
        .brutalist-why-point-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: 22px;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          color: #111;
        }
        .brutalist-why-point-desc {
          font-family: var(--font-courier), monospace;
          font-size: 10px;
          line-height: 1.9;
          color: #444;
        }

        /* Contact */
        .brutalist-contact {
          background: #111;
          min-height: 480px;
        }
        .brutalist-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .brutalist-contact-left {
          padding: 56px 40px;
          border-right: 3px solid rgba(240, 236, 228, 0.12);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .brutalist-contact-label {
          font-family: var(--font-courier), monospace;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #f0ece4;
          opacity: 0.4;
        }
        .brutalist-contact-headline {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(52px, 6vw, 80px);
          line-height: 0.88;
          color: #f0ece4;
          margin: 16px 0 24px;
        }
        .brutalist-contact-note {
          font-family: var(--font-courier), monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #f0ece4;
          opacity: 0.4;
          margin-bottom: 24px;
        }
        .brutalist-contact-email {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .brutalist-contact-email-label {
          font-family: var(--font-courier), monospace;
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #f0ece4;
          opacity: 0.5;
        }
        .brutalist-contact-email-value {
          font-family: var(--font-courier), monospace;
          font-size: 14px;
          color: #f0ece4;
          text-decoration: none;
        }
        .brutalist-contact-email-value:hover {
          text-decoration: underline;
        }
        .brutalist-contact-right {
          padding: 56px 40px;
        }
        .brutalist-form .brutalist-form-field {
          border-bottom: 1px solid rgba(240, 236, 228, 0.12);
          padding: 16px 0;
        }
        .brutalist-form label {
          display: block;
          font-family: var(--font-courier), monospace;
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #f0ece4;
          opacity: 0.35;
          margin-bottom: 8px;
        }
        .brutalist-form-input {
          width: 100%;
          background: transparent;
          border: none;
          font-family: var(--font-courier), monospace;
          font-size: 13px;
          color: #f0ece4;
          outline: none;
        }
        .brutalist-form-input::placeholder {
          color: #f0ece4;
          opacity: 0.2;
        }
        .brutalist-form-textarea {
          resize: none;
          min-height: 90px;
        }
        .brutalist-form-submit {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 24px;
        }
        .brutalist-form-note {
          font-family: var(--font-courier), monospace;
          font-size: 8px;
          color: #f0ece4;
          opacity: 0.3;
        }
        .brutalist-form-btn {
          padding: 12px 24px;
          background: #ff3300;
          color: #f0ece4;
          border: none;
          font-family: var(--font-courier), monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
        }
        .brutalist-form-btn:hover {
          background: #cc2900;
        }
      `}</style>
    </main>
  );
}
