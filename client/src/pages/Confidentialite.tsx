/* ============================================================
   Page Politique de confidentialité — Les Petits Papiers Faciles
   RGPD conforme — micro-entreprise française
   ============================================================ */

import { useEffect } from "react";

export default function ConfidentialitePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const h2Style = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "oklch(0.45 0.08 145)",
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

  const liStyle = {
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "0.9375rem",
    color: "oklch(0.38 0.02 65)",
    lineHeight: "1.7",
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ paddingTop: "72px" }}>
      <section
        className="py-12"
        style={{ backgroundColor: "oklch(0.45 0.08 145)" }}
      >
        <div className="container text-center">
          <h1
            className="text-4xl font-semibold"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Politique de confidentialité
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
            <p style={pStyle}>
              Les Petits Papiers Faciles s'engage à protéger la vie privée des
              utilisateurs de ce site et à traiter leurs données personnelles
              conformément au Règlement Général sur la Protection des Données
              (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés.
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>1. Responsable du traitement</h2>
              <p style={pStyle}>
                <strong>Sandra Duchalet</strong> — Les Petits Papiers Faciles<br />
                Hyères (83400), Var, France<br />
                Email : lespetitspapiersfaciles@gmail.com<br />
                Téléphone : 07 50 52 72 27
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>2. Données collectées</h2>
              <p style={pStyle}>
                Ce site collecte uniquement les données que vous nous transmettez
                volontairement via le formulaire de contact :
              </p>
              <ul style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
                <li style={liStyle}>Nom et prénom</li>
                <li style={liStyle}>Adresse email</li>
                <li style={liStyle}>Numéro de téléphone (facultatif)</li>
                <li style={liStyle}>Contenu de votre message</li>
              </ul>
              <p style={pStyle}>
                Aucune donnée sensible (santé, situation financière, etc.) n'est
                collectée via ce site.
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>3. Finalités du traitement</h2>
              <p style={pStyle}>
                Vos données sont collectées exclusivement pour :
              </p>
              <ul style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
                <li style={liStyle}>Répondre à vos demandes de contact</li>
                <li style={liStyle}>Organiser des rendez-vous d'accompagnement</li>
                <li style={liStyle}>Assurer le suivi de la relation client</li>
              </ul>
              <p style={pStyle}>
                <strong>Base légale :</strong> Intérêt légitime (répondre à vos
                demandes) et, le cas échéant, exécution d'un contrat de prestation
                de services.
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>4. Durée de conservation</h2>
              <p style={pStyle}>
                Vos données sont conservées pendant une durée maximale de
                <strong> 3 ans</strong> à compter du dernier contact, puis
                supprimées. Les données relatives aux prestations effectuées sont
                conservées 5 ans pour répondre aux obligations comptables et
                fiscales.
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>5. Destinataires des données</h2>
              <p style={pStyle}>
                Vos données personnelles ne sont jamais vendues, louées ou
                transmises à des tiers à des fins commerciales. Elles peuvent
                être communiquées uniquement aux autorités compétentes sur
                réquisition légale.
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>6. Vos droits</h2>
              <p style={pStyle}>
                Conformément au RGPD, vous disposez des droits suivants sur vos
                données personnelles :
              </p>
              <ul style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
                <li style={liStyle}><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
                <li style={liStyle}><strong>Droit de rectification</strong> : corriger des données inexactes</li>
                <li style={liStyle}><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
                <li style={liStyle}><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                <li style={liStyle}><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                <li style={liStyle}><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
              </ul>
              <p style={pStyle}>
                Pour exercer ces droits, contactez-nous par email à{" "}
                <a
                  href="mailto:lespetitspapiersfaciles@gmail.com"
                  style={{ color: "oklch(0.42 0.06 145)" }}
                >
                  lespetitspapiersfaciles@gmail.com
                </a>
                . Nous nous engageons à répondre dans un délai d'un mois.
              </p>
              <p style={pStyle}>
                En cas de réclamation, vous pouvez également saisir la{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "oklch(0.42 0.06 145)" }}
                >
                  CNIL (Commission Nationale de l'Informatique et des Libertés)
                </a>
                .
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>7. Sécurité des données</h2>
              <p style={pStyle}>
                Nous mettons en œuvre des mesures techniques et organisationnelles
                appropriées pour protéger vos données contre tout accès non
                autorisé, perte, destruction ou divulgation.
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>8. Cookies</h2>
              <p style={pStyle}>
                Ce site utilise uniquement des cookies techniques nécessaires à
                son fonctionnement (mémorisation de vos préférences de cookies).
                Aucun cookie publicitaire ou de suivi n'est utilisé. Pour en
                savoir plus, consultez notre{" "}
                <a
                  href="/cookies"
                  style={{ color: "oklch(0.42 0.06 145)" }}
                >
                  politique de gestion des cookies
                </a>
                .
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
