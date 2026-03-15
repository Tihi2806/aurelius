import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-saas",
});

export default function SaasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
        className={`${inter.variable} min-h-screen overflow-x-hidden bg-[#F6F9FC] text-[#1A1F36] antialiased`}
        style={{ fontFamily: "var(--font-saas), sans-serif" }}
      >
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1A1F36]/10 bg-[#F6F9FC]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/saas" className="text-lg font-semibold text-[#1A1F36]">
            Product
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/saas#features" className="text-[#1A1F36]/70 hover:text-[#1A1F36]">
              Features
            </Link>
            <Link href="/saas#pricing" className="text-[#1A1F36]/70 hover:text-[#1A1F36]">
              Pricing
            </Link>
            <Link
              href="/"
              className="rounded-lg bg-[#635BFF] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#1A1F36]/10 bg-[#F6F9FC] py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[#1A1F36]/60">
          <span>© {new Date().getFullYear()} Product. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[#1A1F36]">Switch Experience</Link>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
