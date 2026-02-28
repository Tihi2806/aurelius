import Container from "@/components/ui/Container";

export default function ContactCTA() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-[var(--border)] py-28">
      <Container className="max-w-4xl text-center">
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
          Let&apos;s build something lasting.
        </h2>
        <p className="mt-6 text-lg text-[var(--muted)]">
          Tell us about your project. We respond within 24 hours.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:hello@aurelius.studio"
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--accent)] bg-[var(--accent)]/10 px-8 py-4 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/20"
          >
            hello@aurelius.studio
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Book a call →
          </a>
        </div>
        <p className="mt-16 text-xs text-[var(--muted)]">
          Aurelius — Strategic Brand & Digital Agency
        </p>
      </Container>
    </section>
  );
}
