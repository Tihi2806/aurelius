"use client";

import Link from "next/link";

const FEATURES = [
  { title: "Motion", desc: "Cinematic motion design", icon: "◆" },
  { title: "Sound", desc: "Audio that hits different", icon: "◇" },
  { title: "Brand", desc: "Identity that stands out", icon: "◈" },
];

export default function MidnightPage() {
  return (
    <main>
      {/* Hero: massive headline + grain overlay + dark bg image */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="midnight-grain" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090A]/60 via-[#08090A]/40 to-[#08090A]" />
        </div>
        <div className="relative z-10 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#BC13FE]">
            Creative studio
          </p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#E6E6E6] sm:text-6xl md:text-7xl lg:text-8xl">
            Midnight.
            <br />
            <span className="text-[#00FF41]">Unlimited.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-md text-lg text-[#E6E6E6]/80">
            We craft immersive digital experiences at the edge of design and technology.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/midnight#work"
              className="midnight-glow-btn rounded-lg border-2 border-[#00FF41] bg-[#00FF41]/10 px-8 py-4 text-base font-bold text-[#00FF41] transition-all hover:bg-[#00FF41]/20"
            >
              View work
            </Link>
            <Link
              href="/midnight#contact"
              className="midnight-glow-purple rounded-lg border border-[#BC13FE]/60 bg-[#BC13FE]/10 px-8 py-4 text-base font-semibold text-[#BC13FE] transition-all hover:bg-[#BC13FE]/20"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Glassmorphism cards */}
      <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00FF41]/80 mb-4">
          What we do
        </p>
        <h2 className="text-3xl font-bold text-[#E6E6E6] sm:text-4xl">
          Services
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="midnight-glass rounded-2xl p-8 transition hover:border-[#00FF41]/20"
            >
              <span className="text-2xl text-[#00FF41]">{item.icon}</span>
              <h3 className="mt-4 text-xl font-bold text-[#E6E6E6]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#E6E6E6]/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full-width image strip */}
      <section className="px-0 py-8">
        <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80"
            alt="Cyberpunk city"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-[#08090A]/50" />
        </div>
      </section>

      {/* Contact CTA with glass card */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="midnight-glass rounded-3xl p-12 text-center sm:p-16">
          <h2 className="text-3xl font-bold text-[#E6E6E6] sm:text-4xl">
            Let&apos;s create something
            <span className="text-[#00FF41]"> bold.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#E6E6E6]/80">
            Ready to push the boundaries? We&apos;re always open to wild ideas.
          </p>
          <Link
            href="mailto:hello@midnight.studio"
            className="midnight-glow-btn mt-8 inline-block rounded-lg border-2 border-[#00FF41] bg-[#00FF41]/10 px-8 py-4 text-base font-bold text-[#00FF41] transition-all hover:bg-[#00FF41]/20"
          >
            hello@midnight.studio
          </Link>
        </div>
      </section>
    </main>
  );
}
