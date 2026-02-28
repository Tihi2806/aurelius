import Container from "@/components/ui/Container";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { processSteps } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-[var(--border)] py-28">
      <Container>
        <FadeInUp useViewport>
          <p className="mb-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            How we work
          </p>
          <h2 className="mb-20 font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl">
            Process
          </h2>
          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div key={item.step}>
                <span className="text-xs font-medium text-[var(--accent)]">{item.step}</span>
                <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
