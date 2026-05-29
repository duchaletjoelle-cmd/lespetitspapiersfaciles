import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="py-16"
      style={{ backgroundColor: "oklch(0.18 0.02 72)", color: "oklch(0.75 0.02 72)" }}
    >
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "oklch(0.65 0.05 145)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "2px",
                }}
              >
                Les Petits Papiers
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Faciles
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Aide administrative et accompagnement numérique à domicile dans le Var.
              Activité déclarée Services à la Personne.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-semibold mb-4 text-white"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Accueil" },
                { href: "/rendez-vous", label: "Prendre rendez-vous" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                    style={{ textDecoration: "none", color: "oklch(0.75 0.02 72)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold mb-4 text-white"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={15} style={{ color: "oklch(0.65 0.05 145)", flexShrink: 0 }} />
                <a href="tel:0750527227" className="hover:text-white transition-colors" style={{ color: "oklch(0.75 0.02 72)" }}>
                  07 50 52 72 27
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} style={{ color: "oklch(0.65 0.05 145)", flexShrink: 0 }} />
                <a href="mailto:contact@lespetitspapiersfaciles.fr" className="hover:text-white transition-colors" style={{ color: "oklch(0.75 0.02 72)" }}>
                  contact@lespetitspapiersfaciles.fr
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} style={{ color: "oklch(0.65 0.05 145)", flexShrink: 0, marginTop: "2px" }} />
                <span>Hyères, Carqueiranne, Le Pradet, La Crau, Toulon</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 text-center text-sm"
          style={{ borderTop: "1px solid oklch(0.28 0.02 72)" }}
        >
          <p>© {new Date().getFullYear()} Les Petits Papiers Faciles — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
