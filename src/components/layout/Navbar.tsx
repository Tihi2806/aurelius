import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]/50 bg-[var(--background)]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-xl font-medium tracking-wide text-[var(--foreground)]"
        >
          Aurelius
        </Link>
        <div className="flex items-center gap-10 text-sm font-medium text-[var(--muted)]">
          <Link href="#services" className="transition-colors hover:text-[var(--foreground)]">
            Services
          </Link>
          <Link href="#work" className="transition-colors hover:text-[var(--foreground)]">
            Work
          </Link>
          <Link href="#process" className="transition-colors hover:text-[var(--foreground)]">
            Process
          </Link>
          <Link href="#contact" className="transition-colors hover:text-[var(--foreground)]">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
