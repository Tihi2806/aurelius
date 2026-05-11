"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { scrollToTarget } from "@/components/LenisProvider";

const PROJECT_TIERS = [
  {
    num: "01",
    name: "Starter",
    subtitle: "A focused presence",
    price: "From £1,500",
    duration: "4 weeks",
    included: [
      "Strategic narrative session",
      "Up to 5 pages, custom designed",
      "Responsive across devices",
      "WCAG 2.2 AA accessibility baseline",
      "On-page SEO foundation",
      "Launch + 14 days of support",
    ],
    bestFor:
      "Practitioners and solo operators establishing a credible online presence.",
    highlighted: false,
  },
  {
    num: "02",
    name: "Standard",
    subtitle: "A site that does the work",
    price: "From £2,500",
    duration: "5–6 weeks",
    included: [
      "Discovery + content audit",
      "Up to 10 pages, custom designed",
      "Bespoke component library",
      "Booking or enquiry flows",
      "WCAG 2.2 AA accessibility baseline",
      "Performance budget enforcement",
      "SEO architecture + meta strategy",
      "Launch + 30 days of support",
    ],
    bestFor:
      "Established clinics, firms, and studios ready to convert visitors into instructed clients.",
    highlighted: true,
  },
  {
    num: "03",
    name: "Premium",
    subtitle: "A complete instrument",
    price: "From £4,500",
    duration: "7–8 weeks",
    included: [
      "Full strategy + brand audit",
      "Unlimited pages, custom designed",
      "Bespoke design system",
      "Complex booking, enquiry, or membership flows",
      "Custom integrations (CRM, calendar, payment)",
      "WCAG 2.2 AA accessibility baseline",
      "Performance + Core Web Vitals optimisation",
      "SEO architecture + content framework",
      "Launch + 60 days of support",
    ],
    bestFor:
      "Multi-location practices, member-driven organisations, and firms with a multi-stakeholder digital presence.",
    highlighted: false,
  },
] as const;

const CARE_PLANS = [
  {
    num: "A",
    name: "Watch",
    price: "£150 / month",
    subtitle: "The essentials",
    included: [
      "Hosting management",
      "Daily backups",
      "Security updates",
      "Uptime monitoring",
      "Monthly performance report",
    ],
    bestFor: "Sites that need to stay healthy without active development.",
  },
  {
    num: "B",
    name: "Standard",
    price: "£300 / month",
    subtitle: "Watch + small improvements",
    included: [
      "Everything in Watch",
      "2 hours of content updates per month",
      "Plugin and dependency upkeep",
      "Quarterly analytics review",
      "Email support, 48-hour response",
    ],
    bestFor:
      "Sites that change with the business — content updates, copy refinements, small additions.",
  },
  {
    num: "C",
    name: "Pro",
    price: "£500 / month",
    subtitle: "An ongoing partnership",
    included: [
      "Everything in Standard",
      "4 hours of development per month",
      "Quarterly improvement sprints",
      "Priority SLA — 24h critical, 48h non-critical",
      "Strategic review calls",
    ],
    bestFor:
      "Sites that are central to lead generation and require continuous refinement.",
  },
] as const;

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="pricing-section flex min-h-screen w-full flex-col justify-center bg-[#0c0c0c] py-32 px-6 md:px-12 lg:px-24"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* ─────────── Header ─────────── */}
        <motion.header
          className="mb-16 md:mb-20"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
        >
          <p
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
            style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          >
            PRICING
          </p>
          <h2
            id="pricing-heading"
            className="mt-3 max-w-2xl text-[36px] font-normal leading-tight text-white lg:text-[52px]"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontWeight: 400,
            }}
          >
            Investment in clarity.
          </h2>
          <p
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#a3a3a3]"
            style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          >
            Three project tiers and three care plans. Pricing is in GBP, EU VAT
            reverse-charged where applicable. Engagements begin with a 50%
            deposit; balance on launch. Care plans are continued partnerships —
            separate from project pricing.
          </p>
        </motion.header>

        {/* ─────────── Project tiers ─────────── */}
        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PROJECT_TIERS.map((tier) => (
            <motion.article
              key={tier.num}
              variants={item}
              className={`flex flex-col border ${
                tier.highlighted ? "border-[#B8935A]" : "border-[#262626]"
              } p-8 md:p-10`}
            >
              {tier.highlighted && (
                <p
                  className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#B8935A]"
                  style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
                >
                  Most chosen
                </p>
              )}

              <span className="font-mono text-[12px] tracking-[0.18em] text-[#B8935A]">
                {tier.num}
              </span>

              <h3
                className="mt-3 text-[32px] font-normal leading-[1.05] text-white md:text-[40px]"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontWeight: 400,
                }}
              >
                {tier.name}
              </h3>

              <p
                className="mt-2 text-[14px] italic leading-relaxed text-[#a3a3a3]"
                style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
              >
                {tier.subtitle}
              </p>

              <p
                className="mt-8 text-[28px] font-normal leading-tight text-white md:text-[32px]"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontWeight: 400,
                }}
              >
                {tier.price}
              </p>

              <p
                className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
              >
                {tier.duration}
              </p>

              <div className="mt-8 mb-6 h-px w-full bg-[#262626]" />

              <ul
                className="flex flex-col gap-3 text-[14px] leading-relaxed text-[#d4d4d4]"
                style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
              >
                {tier.included.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-[10px] block h-px w-3 flex-shrink-0 bg-[#B8935A]"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-[#262626] pt-6">
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
                  style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
                >
                  Best for
                </p>
                <p
                  className="mt-2 text-[13px] leading-relaxed text-[#a3a3a3]"
                  style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
                >
                  {tier.bestFor}
                </p>
              </div>

              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-2 self-start text-[13px] tracking-[0.05em] text-white no-underline transition-colors duration-200 hover:text-[#B8935A]"
                style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(".contact-section");
                  if (target) scrollToTarget(target as HTMLElement, { duration: 0.7 });
                }}
              >
                Begin enquiry
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]"
                >
                  →
                </span>
              </a>
            </motion.article>
          ))}
        </motion.div>

        {/* ─────────── Care plans block ─────────── */}
        <motion.div
          className="mt-32"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: "easeOut",
            delay: shouldReduceMotion ? 0 : 0.3,
          }}
        >
          <header className="mb-12">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#737373]"
              style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
            >
              CONTINUED PARTNERSHIP
            </p>
            <h3
              className="mt-3 text-[28px] font-normal leading-tight text-white md:text-[36px]"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontWeight: 400,
              }}
            >
              Care plans.
            </h3>
            <p
              className="mt-5 max-w-xl text-[14px] leading-relaxed text-[#a3a3a3]"
              style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
            >
              A site that ships well needs upkeep, not abandonment. Care plans
              begin at handover and run month-to-month with 30 days notice.
              Continued partnerships compound over time — most clients begin on
              Watch and grow into Standard or Pro as their site does more work.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {CARE_PLANS.map((plan) => (
              <article
                key={plan.num}
                className="flex flex-col border border-[#262626] p-6 md:p-8"
              >
                <h4
                  className="text-[24px] font-normal leading-tight text-white"
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    fontWeight: 400,
                  }}
                >
                  {plan.name}
                </h4>
                <p
                  className="mt-1 text-[13px] italic text-[#a3a3a3]"
                  style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
                >
                  {plan.subtitle}
                </p>

                <p
                  className="mt-6 text-[20px] font-normal leading-tight text-white"
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    fontWeight: 400,
                  }}
                >
                  {plan.price}
                </p>

                <div className="mt-6 mb-5 h-px w-full bg-[#262626]" />

                <ul
                  className="flex flex-col gap-2 text-[13px] leading-relaxed text-[#d4d4d4]"
                  style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
                >
                  {plan.included.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-[9px] block h-px w-2 flex-shrink-0 bg-[#B8935A]"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p
                  className="mt-6 text-[12px] italic leading-relaxed text-[#737373]"
                  style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
                >
                  {plan.bestFor}
                </p>
              </article>
            ))}
          </div>
        </motion.div>

        {/* ─────────── Footnote ─────────── */}
        <motion.p
          className="mt-16 max-w-2xl text-[12px] italic leading-relaxed text-[#737373]"
          style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.5 }}
        >
          Pricing reflects engagements paid in GBP. EUR and AUD invoicing
          available on request. All projects scoped against a written brief —
          fixed deliverables, fixed timeline, no scope drift. We do not run
          rush jobs.
        </motion.p>
      </div>
    </section>
  );
}
