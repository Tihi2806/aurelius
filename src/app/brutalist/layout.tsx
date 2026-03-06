import Link from "next/link";
import {
  Bebas_Neue,
  Courier_Prime,
  Oswald,
} from "next/font/google";
import "./brutalist.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});

const oswald = Oswald({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-oswald",
});

export default function BrutalistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bebasNeue.variable} ${courierPrime.variable} ${oswald.variable} brutalist-theme`}
    >
      <header className="brutalist-nav">
        <div className="brutalist-nav-inner">
          <Link href="/brutalist" className="brutalist-nav-left">
            <span className="brutalist-hamburger" aria-hidden>
              <span />
              <span />
            </span>
            <span className="brutalist-logo">Aurelius</span>
          </Link>
          <nav className="brutalist-nav-center">
            <Link href="/brutalist#work">Work</Link>
            <Link href="/brutalist#services">Services</Link>
            <Link href="/brutalist#process">Process</Link>
            <Link href="/brutalist#contact">Contact</Link>
          </nav>
          <Link href="/brutalist#contact" className="brutalist-nav-cta">
            Brief Us →
          </Link>
        </div>
      </header>

      {children}

      <footer className="brutalist-footer">
        <div className="brutalist-footer-inner">
          <span className="brutalist-footer-logo">Aurelius</span>
          <div className="brutalist-footer-center">
            <span>© {new Date().getFullYear()} Aurelius Agency</span>
            <Link href="/brutalist/privacy">Privacy</Link>
            <Link href="/brutalist/terms">Terms</Link>
          </div>
          <Link href="/" className="brutalist-footer-switch">
            ← Switch Experience
          </Link>
        </div>
      </footer>
    </div>
  );
}
