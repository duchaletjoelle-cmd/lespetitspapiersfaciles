/* ============================================================
   Footer — Les Petits Papiers Faciles
   Style : Clarté Provençale — vert sauge foncé, liens légaux
   ============================================================ */

import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "oklch(0.22 0.04 145)",
        color: "oklch(0.88 0.03 80)",
      }}
    >
      {/* Main footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span
                className="text-2xl font-semibold"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "oklch(0.94 0.02 80)",
                  fontStyle: "italic",
                }}
              >
                Les Petits Papiers
              </span>
              <br />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.72 0.05 145)",
                  letterSpacing: "0.15em",
                }}
              >
                Faciles
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "oklch(0.75 0.03 80)" }}
            >
              <em>Parce que les papiers racontent aussi une histoire.</em>
            </p>
            <p
              className="text-xs"
              style={{ color: "oklch(0.65 0.03 80)" }}
            >
              Activité déclarée Services à la Personne
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.72 0.05 145)",
                letterSpacing: "0.12em",
              }}
            >
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Accueil" },
                { href: "/services", label: "Services" },
                { href: "/comment-ca-fonctionne", label: "Comment ça fonctionne" },
                { href: "/qui-suis-je", label: "Qui suis-je" },
                { href: "/secteur", label: "Secteur d'intervention" },
                { href: "/avantage-fiscal", label: "Avantage fiscal" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "oklch(0.75 0.03 80)" }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "oklch(0.94 0.02 80)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "oklch(0.75 0.03 80)";
                    }}
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
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.72 0.05 145)",
                letterSpacing: "0.12em",
              }}
            >
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.05 145)" }} />
                <a
                  href="tel:0750527227"
                  className="text-sm transition-colors"
                  style={{ color: "oklch(0.75 0.03 80)" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "oklch(0.94 0.02 80)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "oklch(0.75 0.03 80)";
                  }}
                >
                  07 50 52 72 27
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.05 145)" }} />
                <a
                  href="mailto:lespetitspapiersfaciles@gmail.com"
                  className="text-sm transition-colors break-all"
                  style={{ color: "oklch(0.75 0.03 80)" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "oklch(0.94 0.02 80)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "oklch(0.75 0.03 80)";
                  }}
                >
                  lespetitspapiersfaciles@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.05 145)" }} />
                <span className="text-sm" style={{ color: "oklch(0.75 0.03 80)" }}>
                  Hyères · Carqueiranne · Le Pradet<br />et communes environnantes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.05 145)" }} />
                <span className="text-sm" style={{ color: "oklch(0.75 0.03 80)" }}>
                  Lundi au Samedi · 9h – 17h30
                </span>
              </li>
            </ul>
          </div>

          {/* Infos pratiques */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.72 0.05 145)",
                letterSpacing: "0.12em",
              }}
            >
              Infos pratiques
            </h3>
            <div
              className="rounded-lg p-4 mb-4"
              style={{ backgroundColor: "oklch(0.30 0.07 145)" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "oklch(0.94 0.02 80)" }}>
                ✦ Première séance offerte
              </p>
              <p className="text-xs" style={{ color: "oklch(0.75 0.03 80)" }}>
                Séance découverte sans engagement pour faire connaissance et évaluer vos besoins.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "oklch(0.30 0.07 145)" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "oklch(0.94 0.02 80)" }}>
                42 €/h → 21 € réels
              </p>
              <p className="text-xs" style={{ color: "oklch(0.75 0.03 80)" }}>
                Après crédit d'impôt 50 % remboursé par l'État.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal footer */}
      <div
        className="border-t"
        style={{ borderColor: "oklch(0.30 0.07 145)" }}
      >
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "oklch(0.60 0.03 80)" }}>
            © {new Date().getFullYear()} Les Petits Papiers Faciles — Sandra. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            {[
              { href: "/mentions-legales", label: "Mentions légales" },
              { href: "/confidentialite", label: "Politique de confidentialité" },
              { href: "/cookies", label: "Gestion des cookies" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs transition-colors"
                style={{ color: "oklch(0.60 0.03 80)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "oklch(0.88 0.03 80)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "oklch(0.60 0.03 80)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
