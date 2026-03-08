"use client";

import Link from "next/link";

const WORK_ITEMS = [
  { title: "Minimal Architecture", slug: "minimal-architecture", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", offset: false },
  { title: "Quiet Spaces", slug: "quiet-spaces", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", offset: true },
  { title: "Material World", slug: "material-world", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", offset: false },
  { title: "Light & Shadow", slug: "light-shadow", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80", offset: true },
  { title: "Form & Function", slug: "form-function", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", offset: false },
  { title: "The Line", slug: "the-line", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", offset: true },
];

export default function EditorialPage() {
  return (
    <main className="pt-16">
      {/* Hero: massive serif headline + vertical line + full-width image */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:pt-24">
        <div className="flex gap-8 lg:gap-12">
          <div className="hidden shrink-0 lg:block">
            <div className="w-px bg-[#1A1A1A] min-h-[120px]" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-6">
              Culture &amp; Design
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[1.1] text-[#1A1A1A] sm:text-6xl lg:text-7xl xl:text-8xl">
              The art of
              <br />
              the possible.
            </h1>
          </div>
        </div>
        <div className="mt-12 lg:mt-16">
          <div className="w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"
              alt="Editorial hero — minimal architecture"
              className="h-auto w-full object-cover contrast-[1.05]"
            />
          </div>
        </div>
      </section>

      {/* Asymmetrical Work grid */}
      <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-4">
          Selected
        </p>
        <h2 className="font-serif text-4xl font-semibold text-[#1A1A1A] sm:text-5xl">
          Work
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
          {WORK_ITEMS.map((item, i) => (
            <article
              key={item.slug}
              className={`group overflow-hidden ${item.offset ? "sm:mt-16 lg:mt-24" : ""}`}
            >
              <Link href={`#${item.slug}`} className="block">
                <div className="aspect-[4/5] overflow-hidden bg-[#1A1A1A]/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">
                    View
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Spacious about / CTA */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-4">
              About
            </p>
            <p className="font-serif text-2xl leading-relaxed text-[#1A1A1A] sm:text-3xl">
              We believe in thoughtful design, generous white space, and typography that demands attention.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
          >
            Switch experience
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
