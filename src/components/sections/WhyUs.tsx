import Container from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { whyUs } from "@/lib/content";

export default function WhyUs() {
  return (
    <section className="scroll-mt-24 border-t border-[var(--border)] py-28">
      <Container>
        <FadeInUp useViewport>
          <p className="mb-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            Our difference
          </p>
          <h2 className="mb-20 font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl">
            Why Choose Us
          </h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, i) => (
              <div key={i} className="border-l border-[var(--border)] pl-8">
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
