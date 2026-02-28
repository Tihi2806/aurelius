import Container from "@/components/ui/Container";

interface Service {
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    title: "Brand Strategy & Identity",
    description:
      "Positioning, naming, visual identity, and brand systems that differentiate and resonate.",
  },
  {
    title: "Digital Product Design",
    description:
      "Web and app experiences built on clarity, usability, and lasting aesthetic quality.",
  },
  {
    title: "Content & Storytelling",
    description:
      "Narratives and content strategies that connect your brand to the right audiences.",
  },
  {
    title: "Experience Design",
    description:
      "End-to-end journey design from first touch to long-term engagement.",
  },
  {
    title: "Motion & Film",
    description:
      "Motion design and film that bring your brand to life with intention.",
  },
  {
    title: "Guidance & Workshops",
    description:
      "Workshops and ongoing guidance to align teams and elevate brand execution.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-[var(--border)] py-28">
      <Container>
        <p className="mb-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          What we do
        </p>
        <h2 className="mb-20 font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl">
          Services
        </h2>
        <div className="grid gap-px border border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="group bg-[var(--background)] p-10 transition-colors hover:bg-[#141414]"
            >
              <span className="text-xs font-medium text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-xl font-medium text-[var(--foreground)]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
