import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end scroll-mt-24 pb-32 pt-32">
      <Container className="w-full">
        <p className="mb-6 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          Strategic Brand & Digital
        </p>
        <h1 className="max-w-4xl font-[family-name:var(--font-cormorant)] text-5xl font-light leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl xl:text-8xl">
          We craft brands and experiences that endure.
        </h1>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
          Aurelius partners with ambitious companies to build distinctive identities,
          digital products, and narratives that stand the test of time.
        </p>
        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--border)] bg-transparent px-8 py-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/5"
          >
            Start a project
          </Link>
          <Link
            href="#work"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            View our work →
          </Link>
        </div>
      </Container>
    </section>
  );
}
