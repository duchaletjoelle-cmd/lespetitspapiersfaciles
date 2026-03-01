/* ============================================================
   Page Mentions légales — Les Petits Papiers Faciles
   Micro-entreprise française — RGPD conforme
   ============================================================ */

import { useEffect } from "react";

export default function MentionsLegalesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionStyle = {
    marginBottom: "2rem",
  };

  const h2Style = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "oklch(0.30 0.07 145)",
    marginBottom: "0.75rem",
    marginTop: "0",
  };

  const pStyle = {
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "0.9375rem",
    color: "oklch(0.38 0.02 65)",
    lineHeight: "1.7",
    marginBottom: "0.75rem",
  };

  return (
    <div style={{ paddingTop: "72px" }}>
      <section
        className="py-12"
        style={{ backgroundColor: "oklch(0.30 0.07 145)" }}
      >
        <div className="container text-center">
          <h1
            className="text-4xl font-semibold"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Mentions légales
          </h1>
        </div>
      </section>

      <section className="section-beige py-16">
        <div className="container">
          <div
            className="max-w-3xl mx-auto rounded-2xl p-8 md:p-12"
            style={{
              backgroundColor: "oklch(0.98 0.01 80)",
              border: "1px solid oklch(0.88 0.03 80)",
            }}
          >
            <div style={sectionStyle}>
              <h2 style={h2Style}>1. Éditeur du site</h2>
              <p style={pStyle}>
                Le présent site internet est édité par :<br />
                <strong>Sandra Duchalet</strong><br />
                Micro-entreprise — Les Petits Papiers Faciles<br />
                Activité : Services à la Personne — Aide administrative et numérique à domicile<br />
                Adresse : Hyères (83400), Var, France<br />
                Téléphone : 07 50 52 72 27<br />
                Email : lespetitspapiersfaciles@gmail.com<br />
                SIRET : [À compléter]<br />
                Numéro d'agrément SAP : [À compléter si applicable]
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={h2Style}>2. Hébergement</h2>
              <p style={pStyle}>
                Ce site est hébergé par :<br />
                <strong>Manus</strong><br />
                Pour toute question relative à l'hébergement, veuillez contacter l'éditeur du site.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={h2Style}>3. Propriété intellectuelle</h2>
              <p style={pStyle}>
                L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété
                exclusive de Les Petits Papiers Faciles, sauf mention contraire. Toute reproduction,
                distribution, modification, adaptation, retransmission ou publication de ces éléments
                est strictement interdite sans l'accord exprès par écrit de l'éditeur.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={h2Style}>4. Responsabilité</h2>
              <p style={pStyle}>
                Les informations contenues sur ce site sont données à titre indicatif et sont
                susceptibles d'évoluer. L'éditeur ne saurait être tenu responsable des erreurs ou
                omissions, ni des dommages directs ou indirects résultant de l'utilisation de ce site.
              </p>
              <p style={pStyle}>
                Les informations relatives au crédit d'impôt sont données à titre informatif et ne
                constituent pas un conseil fiscal. Pour toute question fiscale, consultez un
                professionnel qualifié ou les services des impôts.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={h2Style}>5. Liens hypertextes</h2>
              <p style={pStyle}>
                Ce site peut contenir des liens vers des sites tiers. L'éditeur n'exerce aucun
                contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={h2Style}>6. Droit applicable</h2>
              <p style={pStyle}>
                Le présent site et ses mentions légales sont soumis au droit français. En cas de
                litige, les tribunaux français seront seuls compétents.
              </p>
            </div>

            <p
              style={{
                ...pStyle,
                fontSize: "0.8rem",
                color: "oklch(0.55 0.02 65)",
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid oklch(0.88 0.03 80)",
              }}
            >
              Dernière mise à jour : mars 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
