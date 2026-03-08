"use client";

import Link from "next/link";
import "./saas.css";

const TRUST_LOGOS = [
  { name: "Stripe", src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&h=40&fit=crop" },
  { name: "Slack", src: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=120&h=40&fit=crop" },
  { name: "Apple", src: "https://images.unsplash.com/photo-1510557880182-3d0d3cba35a5?w=120&h=40&fit=crop" },
  { name: "Notion", src: "https://images.unsplash.com/photo-1629949008602-66b2ab2a1322?w=120&h=40&fit=crop" },
  { name: "Figma", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=40&fit=crop" },
];

const BENTO_ITEMS = [
  { title: "Analytics", desc: "Real-time insights and dashboards.", span: "col-span-1" },
  { title: "Integrations", desc: "Connect with 200+ tools.", span: "col-span-1" },
  { title: "Security", desc: "SOC 2, GDPR compliant.", span: "col-span-1" },
  { title: "Automation", desc: "Workflows that scale.", span: "col-span-2" },
  { title: "API", desc: "Build custom solutions.", span: "col-span-1" },
  { title: "Support", desc: "24/7 dedicated team.", span: "col-span-1" },
];

const PRICING_TIERS = [
  { name: "Starter", price: "$29", period: "/month", desc: "For small teams getting started.", features: ["Up to 5 seats", "10 GB storage", "Email support"], cta: "Start free trial", recommended: false },
  { name: "Pro", price: "$79", period: "/month", desc: "For growing teams that need more.", features: ["Unlimited seats", "100 GB storage", "Priority support", "Advanced analytics"], cta: "Get started", recommended: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "For organizations at scale.", features: ["Custom everything", "Unlimited storage", "Dedicated CSM", "SLA guarantee"], cta: "Contact sales", recommended: false },
];

export default function SaasPage() {
  return (
    <main className="pt-14">
      {/* Hero: left headline, right dashboard mockup */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#635BFF]">
              Trusted by 10,000+ teams
            </p>
            <h1 className="text-4xl font-bold leading-tight text-[#1A1F36] sm:text-5xl lg:text-6xl">
              Scale your product.
              <br />
              <span className="text-[#635BFF]">Ship faster.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-[#1A1F36]/80">
              The all-in-one platform for modern teams. Build, measure, and iterate with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/saas#pricing"
                className="rounded-lg bg-[#635BFF] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                Get started free
              </Link>
              <Link
                href="/saas#features"
                className="rounded-lg border border-[#1A1F36]/20 px-6 py-3 text-base font-medium text-[#1A1F36] transition hover:bg-[#1A1F36]/5"
              >
                See how it works
              </Link>
            </div>
          </div>
          <div className="relative flex justify-end">
            <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-[#1A1F36]/10 bg-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                alt="Dashboard mockup"
                className="h-auto w-full object-cover grayscale-[30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar: grayscale marquee */}
      <section className="border-y border-[#1A1F36]/10 bg-white/50 py-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-[#1A1F36]/50">
          Trusted by innovative teams
        </p>
        <div className="flex saas-marquee items-center gap-16 overflow-hidden">
          {[...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, i) => (
            <div key={i} className="flex shrink-0 items-center grayscale opacity-70">
              <img src={logo.src} alt={logo.name} className="h-8 w-auto object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* Bento grid */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1A1F36] sm:text-4xl">Everything you need</h2>
          <p className="mt-3 text-lg text-[#1A1F36]/70">One platform. Infinite possibilities.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {BENTO_ITEMS.map((item) => (
            <div
              key={item.title}
              className={`rounded-xl border border-[#1A1F36]/10 bg-white p-6 transition hover:shadow-xl ${item.span === "col-span-2" ? "md:col-span-2" : ""}`}
            >
              <h3 className="text-lg font-semibold text-[#1A1F36]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#1A1F36]/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing table */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1A1F36] sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-3 text-lg text-[#1A1F36]/70">Choose the plan that fits your team.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.recommended
                  ? "border-[#635BFF] bg-[#635BFF]/5 shadow-lg shadow-[#635BFF]/10"
                  : "border-[#1A1F36]/10 bg-white"
              }`}
            >
              {tier.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#635BFF] px-3 py-1 text-xs font-semibold text-white">
                  Recommended
                </span>
              )}
              <h3 className="text-xl font-semibold text-[#1A1F36]">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[#1A1F36]">{tier.price}</span>
                <span className="text-[#1A1F36]/60">{tier.period}</span>
              </div>
              <p className="mt-2 text-sm text-[#1A1F36]/70">{tier.desc}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-[#1A1F36]/80">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#635BFF]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-semibold transition ${
                  tier.recommended
                    ? "bg-[#635BFF] text-white shadow-md hover:opacity-90"
                    : "border border-[#1A1F36]/20 text-[#1A1F36] hover:bg-[#1A1F36]/5"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
