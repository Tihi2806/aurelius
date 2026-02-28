import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { work } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return work.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return work.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project | Aurelius" };
  return {
    title: `${project.name} | Aurelius`,
    description: project.overview,
  };
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen">
      <Container className="py-32">
        <Link
          href="/#work"
          className="mb-12 inline-block text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          ← Back to work
        </Link>

        <header className="mb-20">
          <p className="mb-2 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            {project.category} · {project.year}
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            {project.name}
          </h1>
        </header>

        <div className="space-y-20">
          <section>
            <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-lg font-medium text-[var(--foreground)]">
              Overview
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
              {project.overview}
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-lg font-medium text-[var(--foreground)]">
              Goals
            </h2>
            <ul className="list-inside list-disc space-y-2 text-[var(--muted)]">
              {project.goals.map((goal, i) => (
                <li key={i}>{goal}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-lg font-medium text-[var(--foreground)]">
              Approach
            </h2>
            <p className="max-w-2xl leading-relaxed text-[var(--muted)]">
              {project.approach}
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-lg font-medium text-[var(--foreground)]">
              Results
            </h2>
            <ul className="list-inside list-disc space-y-2 text-[var(--muted)]">
              {project.results.map((result, i) => (
                <li key={i}>{result}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-[family-name:var(--font-cormorant)] text-lg font-medium text-[var(--foreground)]">
              Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-24 border-t border-[var(--border)] pt-20">
          <p className="mb-6 font-[family-name:var(--font-cormorant)] text-2xl font-light text-[var(--foreground)]">
            Interested in working together?
          </p>
          <Link
            href="/#contact"
            className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-[var(--accent)] bg-[var(--accent)]/10 px-8 py-4 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/20"
          >
            Get in touch →
          </Link>
        </section>
      </Container>
    </main>
  );
}
