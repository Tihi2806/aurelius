import { Space_Grotesk, Inter } from "next/font/google";
import { FlashyNavbar } from "./FlashyNavbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function FlashyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen`}
      style={{
        background: "#050505",
        color: "white",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      <FlashyNavbar />
      {children}
      <footer
        className="px-6 py-8 lg:px-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span
            className="text-sm font-semibold text-white/30"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Aurelius
          </span>
          <span className="text-xs text-white/15">
            Strategic Brand &amp; Digital Agency
          </span>
        </div>
      </footer>
    </div>
  );
}
