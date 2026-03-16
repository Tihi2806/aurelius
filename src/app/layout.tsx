import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google";
import { AIConcierge } from "@/components/AIConcierge";
import { CustomCursor } from "@/components/CustomCursor";
import { GlobalNav } from "@/components/GlobalNav";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${cormorant.variable} ${dmSans.variable} ${inter.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen`}
      >
        <CustomCursor />
        <AIConcierge />
        <GlobalNav />
        {children}
      </body>
    </html>
  );
}
