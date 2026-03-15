/* ============================================================
   Navigation — Les Petits Papiers Faciles
   Style : Clarté Provençale — Réorganisé pour plus d'harmonie
   ============================================================ */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, CalendarDays, ChevronDown } from "lucide-react";

const mainLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/comment-ca-fonctionne", label: "Fonctionnement" },
  { href: "/qui-suis-je", label: "Qui suis-je" },
  { href: "/contact", label: "Contact" },
];

const secondaryLinks = [
  { href: "/secteur", label: "Secteur" },
  { href: "/avantage-fiscal", label: "Avantage fiscal" },
  { href: "/france-retraite-2026", label: "France Retraite 2026" },
  { href: "/checklist-administrative", label: "Checklist" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowMore(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const textColor = "oklch(0.94 0.02 80)";
  const activeBg = "oklch(0.42 0.06 145 / 0.4)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "oklch(0.55 0.08 145)",
        boxShadow: scrolled ? "0 2px 20px oklch(0.22 0.02 65 / 0.25)" : "none",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 md:py-3">
          {/* Logo - Réduit et sur une seule ligne sur desktop */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-xl md:text-2xl font-semibold tracking-tight transition-opacity group-hover:opacity-80 flex items-center gap-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: textColor,
                    fontStyle: "italic",
                  }}>
              <span className="text-sm md:text-base opacity-70">♪</span>
              <span className="whitespace-nowrap">Les Petits Papiers Faciles</span>
              <span className="text-sm md:text-base opacity-70">♪</span>
            </span>
          </Link>

          {/* Desktop nav - Simplifiée */}
          <nav className="hidden xl:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm ${location === link.href ? 'nav-link-active' : ''}`}
                style={{ color: location === link.href ? textColor : "oklch(0.85 0.03 145)" }}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Menu "Plus" pour les liens secondaires */}
            <div className="relative group/more">
              <button 
                className="nav-link text-sm flex items-center gap-1"
                style={{ color: "oklch(0.85 0.03 145)" }}
                onMouseEnter={() => setShowMore(true)}
              >
                Plus <ChevronDown size={14} className={`transition-transform ${showMore ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`absolute top-full right-0 mt-1 w-48 rounded-lg shadow-xl py-2 transition-all duration-200 origin-top-right
                           ${showMore ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                style={{ backgroundColor: "oklch(0.28 0.07 145)" }}
                onMouseLeave={() => setShowMore(false)}
              >
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                    style={{ color: textColor }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* RDV + Phone CTA - Compactés */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/rendez-vous"
              className="cta-nav-primary text-xs md:text-sm py-2 px-4 flex items-center gap-2 rounded-full transition-all"
              style={{ backgroundColor: textColor, color: "oklch(0.28 0.07 145)" }}
            >
              <CalendarDays size={14} />
              Prendre RDV
            </Link>
            <a
              href="tel:0750527227"
              className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: textColor }}
            >
              <div className="p-2 rounded-full bg-white/10">
                <Phone size={14} />
              </div>
              <span className="hidden xl:inline">07 50 52 72 27</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="xl:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            style={{ color: textColor }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu - Amélioré */}
      {isOpen && (
        <div
          className="xl:hidden border-t overflow-y-auto max-h-[80vh]"
          style={{
            backgroundColor: "oklch(0.28 0.07 145)",
            borderColor: "oklch(0.38 0.06 145)",
          }}
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
            {[...mainLinks, ...secondaryLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors
                           ${location === link.href ? 'bg-white/10' : 'hover:bg-white/5'}`}
                style={{ color: textColor }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/rendez-vous"
                className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold"
                style={{ backgroundColor: textColor, color: "oklch(0.28 0.07 145)" }}
              >
                <CalendarDays size={18} />
                Prendre rendez-vous
              </Link>
              <a
                href="tel:0750527227"
                className="flex items-center justify-center gap-2 py-4 rounded-xl border border-white/20 font-medium"
                style={{ color: textColor }}
              >
                <Phone size={18} />
                07 50 52 72 27
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
