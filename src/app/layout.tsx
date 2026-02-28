import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = "https://aurelius-sigma.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aurelius — Strategic Brand & Digital Agency",
    template: "%s | Aurelius",
  },
  description:
    "We craft distinctive brands and digital experiences for ambitious companies.",
  keywords: [
    "brand strategy",
    "digital agency",
    "brand identity",
    "web design",
    "product design",
    "Aurelius",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Aurelius",
    title: "Aurelius — Strategic Brand & Digital Agency",
    description:
      "We craft distinctive brands and digital experiences for ambitious companies.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aurelius" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurelius — Strategic Brand & Digital Agency",
    description:
      "We craft distinctive brands and digital experiences for ambitious companies.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
