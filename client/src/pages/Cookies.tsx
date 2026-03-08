/* ============================================================
   Page Gestion des cookies — Les Petits Papiers Faciles
   RGPD conforme — micro-entreprise française
   ============================================================ */

import { useEffect, useState } from "react";

export default function CookiesPage() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setConsent(localStorage.getItem("lpp-cookie-consent"));
  }, []);

  const resetConsent = () => {
    localStorage.removeItem("lpp-cookie-consent");
    setConsent(null);
    window.location.reload();
  };

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
            Gestion des cookies
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
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>Qu'est-ce qu'un cookie ?</h2>
              <p style={pStyle}>
                Un cookie est un petit fichier texte déposé sur votre appareil
                (ordinateur, tablette, smartphone) lors de votre visite sur un
                site internet. Il permet au site de mémoriser certaines
                informations vous concernant pour améliorer votre expérience.
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>Cookies utilisés sur ce site</h2>
              <p style={pStyle}>
                Ce site utilise <strong>uniquement des cookies techniques
                strictement nécessaires</strong> à son bon fonctionnement.
                Aucun cookie publicitaire, de suivi comportemental ou de
                profilage n'est utilisé.
              </p>

              <div
                className="rounded-xl overflow-hidden mt-4"
                style={{ border: "1px solid oklch(0.88 0.03 80)" }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "oklch(0.95 0.02 145)" }}>
                      {["Nom", "Finalité", "Durée"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "0.75rem 1rem",
                            textAlign: "left",
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            color: "oklch(0.35 0.02 65)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderTop: "1px solid oklch(0.88 0.03 80)" }}>
                      <td
                        style={{
                          padding: "0.75rem 1rem",
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "0.875rem",
                          color: "oklch(0.35 0.02 65)",
                          fontWeight: "600",
                        }}
                      >
                        lpp-cookie-consent
                      </td>
                      <td
                        style={{
                          padding: "0.75rem 1rem",
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "0.875rem",
                          color: "oklch(0.45 0.02 65)",
                        }}
                      >
                        Mémorise votre choix concernant les cookies (accepté ou refusé)
                      </td>
                      <td
                        style={{
                          padding: "0.75rem 1rem",
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "0.875rem",
                          color: "oklch(0.45 0.02 65)",
                        }}
                      >
                        Session (localStorage)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>Votre choix actuel</h2>
              <div
                className="rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap"
                style={{
                  backgroundColor: "oklch(0.95 0.02 145)",
                  border: "1px solid oklch(0.88 0.04 145)",
                }}
              >
                <div>
                  <p
                    style={{
                      ...pStyle,
                      marginBottom: "0.25rem",
                      fontWeight: "600",
                    }}
                  >
                    Statut actuel :{" "}
                    <span
                      style={{
                        color:
                          consent === "accepted"
                            ? "oklch(0.42 0.06 145)"
                            : consent === "refused"
                            ? "oklch(0.55 0.15 30)"
                            : "oklch(0.55 0.02 65)",
                      }}
                    >
                      {consent === "accepted"
                        ? "Cookies acceptés"
                        : consent === "refused"
                        ? "Cookies refusés"
                        : "Aucun choix effectué"}
                    </span>
                  </p>
                  <p style={{ ...pStyle, marginBottom: 0, fontSize: "0.85rem" }}>
                    Vous pouvez modifier votre choix à tout moment.
                  </p>
                </div>
                <button
                  onClick={resetConsent}
                  className="btn-outline-sage text-sm"
                  style={{ padding: "0.625rem 1.25rem" }}
                >
                  Réinitialiser mon choix
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={h2Style}>Gérer les cookies dans votre navigateur</h2>
              <p style={pStyle}>
                Vous pouvez également gérer ou supprimer les cookies directement
                depuis votre navigateur. Voici comment procéder selon votre
                navigateur :
              </p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                {[
                  {
                    name: "Google Chrome",
                    url: "https://support.google.com/chrome/answer/95647",
                  },
                  {
                    name: "Mozilla Firefox",
                    url: "https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent",
                  },
                  {
                    name: "Safari",
                    url: "https://support.apple.com/fr-fr/guide/safari/sfri11471/mac",
                  },
                  {
                    name: "Microsoft Edge",
                    url: "https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
                  },
                ].map((browser) => (
                  <li
                    key={browser.name}
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.9375rem",
                      color: "oklch(0.38 0.02 65)",
                      lineHeight: "1.7",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <a
                      href={browser.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "oklch(0.42 0.06 145)" }}
                    >
                      {browser.name}
                    </a>
                  </li>
                ))}
              </ul>
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
