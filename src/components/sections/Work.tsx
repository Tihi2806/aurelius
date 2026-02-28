import Link from "next/link";
import Container from "@/components/ui/Container";

interface Project {
  name: string;
  category: string;
  year: string;
}

const PROJECTS: Project[] = [
  { name: "Meridian", category: "Brand & Digital", year: "2024" },
  { name: "Atlas Ventures", category: "Identity & Web", year: "2024" },
  { name: "Lumina", category: "Product & Motion", year: "2023" },
  { name: "Northgate", category: "Brand Strategy", year: "2023" },
  { name: "Echo Studio", category: "Identity & Film", year: "2023" },
];

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-[var(--border)] py-28">
      <Container>
        <p className="mb-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          Portfolio
        </p>
        <h2 className="mb-20 font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl">
          Selected Work
        </h2>
        <div className="space-y-1">
          {PROJECTS.map((project, i) => (
            <Link
              key={i}
              href="#"
              className="group flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] py-8 transition-colors hover:border-[var(--accent)]/30"
            >
              <span className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] sm:text-3xl lg:text-4xl">
                {project.name}
              </span>
              <div className="flex items-center gap-8 text-sm text-[var(--muted)]">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
