import Link from "next/link";
import { Inter_Tight } from "next/font/google";
import "./midnight.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-midnight",
  weight: ["400", "600", "700"],
});

export default function MidnightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${interTight.variable} font-sans min-h-screen bg-[#08090A] text-[#E6E6E6] antialiased`}>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/midnight" className="text-lg font-bold tracking-wide text-[#00FF41]">
            Studio
          </Link>
          <nav className="flex items-center gap-6 text-sm text-[#E6E6E6]/80">
            <Link href="/midnight#work" className="hover:text-[#00FF41] transition-colors">Work</Link>
            <Link href="/midnight#contact" className="hover:text-[#00FF41] transition-colors">Contact</Link>
            <Link
              href="/"
              className="rounded-lg border border-[#00FF41]/50 px-4 py-2 text-sm font-semibold text-[#00FF41] transition-all hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]"
            >
              Back
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#E6E6E6]/10 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[#E6E6E6]/50">
          <span>© {new Date().getFullYear()} Midnight Studio</span>
          <Link href="/" className="text-[#00FF41]/80 hover:text-[#00FF41]">Switch Experience</Link>
        </div>
      </footer>
    </div>
  );
}
