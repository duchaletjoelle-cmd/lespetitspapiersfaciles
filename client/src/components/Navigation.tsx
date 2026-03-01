/* ============================================================
   Navigation — Les Petits Papiers Faciles
   Style : Clarté Provençale — sticky, vert sauge foncé, logo serif
   ============================================================ */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/comment-ca-fonctionne", label: "Comment ça fonctionne" },
  { href: "/qui-suis-je", label: "Qui suis-je" },
  { href: "/secteur", label: "Secteur" },
  { href: "/avantage-fiscal", label: "Avantage fiscal" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "oklch(0.30 0.07 145)",
        boxShadow: scrolled ? "0 2px 20px oklch(0.22 0.02 65 / 0.25)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span
              className="text-xl font-semibold tracking-wide transition-opacity group-hover:opacity-80"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.94 0.02 80)",
                fontStyle: "italic",
              }}
            >
              Les Petits Papiers
            </span>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.80 0.04 145)",
                letterSpacing: "0.15em",
              }}
            >
              Faciles
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color:
                    location === link.href
                      ? "oklch(0.94 0.02 80)"
                      : "oklch(0.82 0.04 145)",
                  backgroundColor:
                    location === link.href
                      ? "oklch(0.42 0.06 145 / 0.6)"
                      : "transparent",
                  fontWeight: location === link.href ? "600" : "400",
                }}
                onMouseEnter={(e) => {
                  if (location !== link.href) {
                    (e.target as HTMLElement).style.color = "oklch(0.94 0.02 80)";
                    (e.target as HTMLElement).style.backgroundColor = "oklch(0.42 0.06 145 / 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (location !== link.href) {
                    (e.target as HTMLElement).style.color = "oklch(0.82 0.04 145)";
                    (e.target as HTMLElement).style.backgroundColor = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone CTA */}
          <a
            href="tel:0750527227"
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-all duration-200"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              backgroundColor: "oklch(0.94 0.02 80)",
              color: "oklch(0.30 0.07 145)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.88 0.04 145)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.94 0.02 80)";
            }}
          >
            <Phone size={14} />
            07 50 52 72 27
          </a>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            style={{ color: "oklch(0.94 0.02 80)" }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden border-t"
          style={{
            backgroundColor: "oklch(0.28 0.07 145)",
            borderColor: "oklch(0.38 0.06 145)",
          }}
        >
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded text-base font-medium transition-all"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color:
                    location === link.href
                      ? "oklch(0.94 0.02 80)"
                      : "oklch(0.82 0.04 145)",
                  backgroundColor:
                    location === link.href
                      ? "oklch(0.42 0.06 145 / 0.5)"
                      : "transparent",
                  fontWeight: location === link.href ? "600" : "400",
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:0750527227"
              className="flex items-center gap-2 mt-3 px-4 py-3 rounded font-semibold"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                backgroundColor: "oklch(0.94 0.02 80)",
                color: "oklch(0.30 0.07 145)",
              }}
            >
              <Phone size={16} />
              07 50 52 72 27
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
