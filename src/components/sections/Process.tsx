import Container from "@/components/ui/Container";

interface ProcessStep {
  step: string;
  title: string;
  text: string;
}

const STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    text: "We learn your context, ambitions, and constraints through focused dialogue.",
  },
  {
    step: "02",
    title: "Define",
    text: "Strategy and creative direction are aligned with your vision and market.",
  },
  {
    step: "03",
    title: "Design",
    text: "We design and iterate in close collaboration until the work meets the bar.",
  },
  {
    step: "04",
    title: "Deliver",
    text: "Handover, documentation, and support so you can own what we build.",
  },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-[var(--border)] py-28">
      <Container>
        <p className="mb-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          How we work
        </p>
        <h2 className="mb-20 font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl">
          Process
        </h2>
        <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => (
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
      </Container>
    </section>
  );
}
