import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-[family-name:var(--font-cormorant)] text-sm text-[var(--foreground)]">
          Aurelius
        </span>
        <div className="flex gap-8 text-xs text-[var(--muted)]">
          <Link href="#" className="transition-colors hover:text-[var(--foreground)]">
            Privacy
          </Link>
          <Link href="#" className="transition-colors hover:text-[var(--foreground)]">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
