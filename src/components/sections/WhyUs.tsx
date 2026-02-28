import Container from "@/components/ui/Container";

interface WhyUsItem {
  title: string;
  description: string;
}

const ITEMS: WhyUsItem[] = [
  {
    title: "Rigour over trends",
    description:
      "We favour timeless craft and strategic clarity over short-lived aesthetics.",
  },
  {
    title: "Partnership, not vendors",
    description:
      "We work as an extension of your team, invested in your long-term success.",
  },
  {
    title: "Outcomes that last",
    description:
      "Every deliverable is built to scale, evolve, and remain relevant for years.",
  },
];

export default function WhyUs() {
  return (
    <section className="scroll-mt-24 border-t border-[var(--border)] py-28">
      <Container>
        <p className="mb-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          Our difference
        </p>
        <h2 className="mb-20 font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl">
          Why Choose Us
        </h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
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
      </Container>
    </section>
  );
}
