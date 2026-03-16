"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  heroBrutalist as hero,
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

const WORK_GRADIENTS = ["w1", "w2", "w3", "w4", "w1"] as const;

export default function BrutalistPage() {
  return (
    <main>
      {/* HERO */}
      <section className="brutalist-hero">
        <div className="brutalist-hero-left">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="brutalist-hero-eyebrow"
          >
            Vol. 03 / Issue 12 — {hero.eyebrow}
          </motion.p>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="brutalist-hero-headline"
            >
              RAW.
              <br />
              <span className="brutalist-accent">HONEST.</span>
              <br />
              RADICAL.
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
          </div>
          <span className="brutalist-hero-deco" aria-hidden>
            AU
          </span>
        </div>
        <div className="brutalist-hero-right">
          {[
            { label: "Projects Delivered", value: "248", tag: "↑ Since 2012" },
            { label: "Years Active", value: "12", tag: "Est. 2012" },
            { label: "Awards Won", value: "47×", tag: "↑ Industry Recognition" },
            { label: "Client Reach", value: "Global", tag: "23 Countries" },
          ].map((stat) => (
            <div key={stat.label} className="brutalist-hero-stat">
              <span className="brutalist-hero-stat-label">{stat.label}</span>
              <span className="brutalist-hero-stat-value">{stat.value}</span>
              <span className="brutalist-hero-stat-tag">{stat.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TICKER — duplicate content for seamless loop */}
      <div className="brutalist-ticker-wrap">
        <div className="brutalist-ticker-inner">
          {[1, 2].map((copy) =>
            services.flatMap((s, i) => [
              <span
                key={`${copy}-${i}-t`}
                className="brutalist-ticker-item"
              >
                {s.title}
              </span>,
              <span
                key={`${copy}-${i}-s`}
                className="brutalist-ticker-item accent"
              >
                ★
              </span>,
            ])
          )}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="brutalist-services-wrap">
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

      {/* STRIP */}
      <div className="brutalist-diagonal">
        <span className="brutalist-diagonal-text">
          — Selected Work 2024 —
        </span>
      </div>

      {/* WORK */}
      <section id="work" className="brutalist-work-wrap">
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
            >
              <Link href={`/work/${item.slug}`} className="brutalist-work-link">
                <div className="brutalist-work-img">
                  <div
                    className={`brutalist-work-img-bg ${WORK_GRADIENTS[i % WORK_GRADIENTS.length]}`}
                  />
                  <span className="brutalist-work-img-label">
                    {item.name.toUpperCase()}
                  </span>
                  <div className="brutalist-work-overlay">
                    <span className="brutalist-work-overlay-text">
                      VIEW CASE →
                    </span>
                  </div>
                </div>
                <div className="brutalist-work-meta">
                  <div>
                    <h3 className="brutalist-work-title">{item.name}</h3>
                    <p className="brutalist-work-cat">{item.category}</p>
                  </div>
                  <span className="brutalist-work-year">{item.year}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="brutalist-process">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          className="brutalist-section-header"
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
            >
              <span className="brutalist-process-num">{step.step}</span>
              <span className="brutalist-process-connector" />
              <h3 className="brutalist-process-title">{step.title}</h3>
              <p className="brutalist-process-desc">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="brutalist-why">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          className="brutalist-why-left"
        >
          <div>
            <p className="brutalist-section-label">Our Difference</p>
            <h2 className="brutalist-why-headline">
              WHY
              <br />
              CHOOSE
              <br />
              <span className="brutalist-accent">US.</span>
            </h2>
          </div>
          <div className="brutalist-why-cta-row">
            <Link href="/brutalist#contact" className="brutalist-btn-primary">
              Work With Us →
            </Link>
          </div>
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
            >
              <span className="brutalist-why-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="brutalist-why-point-title">{point.title}</h3>
                <p className="brutalist-why-point-desc">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="brutalist-contact">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          className="brutalist-contact-left"
        >
          <div>
            <p className="brutalist-contact-label">Get In Touch</p>
            <h2 className="brutalist-contact-headline">
              LET&apos;S BUILD
              <br />
              SOMETHING
              <br />
              <span className="brutalist-accent">LASTING.</span>
            </h2>
            <p className="brutalist-contact-note">
              Response within 24 hours
            </p>
          </div>
          <div className="brutalist-contact-email-wrap">
            <div className="brutalist-contact-email-label">EMAIL</div>
            <a
              href="mailto:aureliusweb.contact@gmail.com"
              className="brutalist-contact-email-value"
            >
              aureliusweb.contact@gmail.com
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
            <div className="brutalist-form-row">
              <label htmlFor="brutalist-name" className="brutalist-form-label">
                Name
              </label>
              <input
                id="brutalist-name"
                type="text"
                placeholder="Your full name"
                className="brutalist-form-input"
              />
            </div>
            <div className="brutalist-form-row">
              <label
                htmlFor="brutalist-email"
                className="brutalist-form-label"
              >
                Email
              </label>
              <input
                id="brutalist-email"
                type="email"
                placeholder="aureliusweb.contact@gmail.com"
                className="brutalist-form-input"
              />
            </div>
            <div
              className="brutalist-form-row"
              style={{ borderBottom: "none" }}
            >
              <label
                htmlFor="brutalist-message"
                className="brutalist-form-label"
              >
                Message
              </label>
              <textarea
                id="brutalist-message"
                placeholder="Tell us about your project..."
                className="brutalist-form-textarea"
              />
            </div>
            <div className="brutalist-form-submit">
              <span className="brutalist-form-note">No spam. Ever.</span>
              <button type="submit" className="brutalist-btn-submit">
                {contactCta.submitLabel} →
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
