import Link from "next/link";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-editorial-serif",
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-editorial-sans",
  weight: ["300", "400", "500"],
});

export default function EditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
        className={`${playfair.variable} ${montserrat.variable} min-h-screen bg-[#FBFBFB] text-[#1A1A1A] antialiased`}
        style={{
          scrollBehavior: "smooth",
          ["--font-serif" as string]: "var(--font-editorial-serif), serif",
          ["--font-sans" as string]: "var(--font-editorial-sans), sans-serif",
        }}
      >
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1A1A1A]/10 bg-[#FBFBFB]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/editorial" className="font-serif text-xl font-semibold text-[#1A1A1A]">
            Editorial
          </Link>
          <nav className="flex items-center gap-8 text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A]/70">
            <Link href="/editorial#work" className="hover:text-[#1A1A1A]">Work</Link>
            <Link href="/editorial#about" className="hover:text-[#1A1A1A]">About</Link>
            <Link href="/" className="hover:text-[#1A1A1A]">Back</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#1A1A1A]/10 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-6 text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">
          <span>© {new Date().getFullYear()} Editorial</span>
          <Link href="/" className="hover:text-[#1A1A1A]">Switch Experience</Link>
        </div>
      </footer>
    </div>
  );
}
