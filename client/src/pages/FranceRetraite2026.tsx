/* ============================================================
   Page France Retraite 2026 — Les Petits Papiers Faciles
   Style : Clarté Provençale — informations actualisées et structurées
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSEOHead } from "../components/SEOHead";
import {
  Calendar,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  DollarSign,
  Briefcase,
} from "lucide-react";

export default function FranceRetraite2026Page() {
  const pageRef = useRef<HTMLDivElement>(null);

  useSEOHead({
    title: "France Retraite 2026 : Les changements clés expliqués simplement",
    description: "Découvrez les dernières réglementations France Retraite 2026 : suspension de la réforme, revalorisation des pensions, cumul emploi-retraite. Guide complet et actualisé.",
    url: "https://lespetitspapiersfaciles.fr/france-retraite-2026",
    keywords: "France Retraite 2026, réforme retraite, suspension réforme, revalorisation pensions, cumul emploi-retraite, âge légal retraite",
    type: "website",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = pageRef.current?.querySelectorAll(".reveal") ?? [];
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} style={{ paddingTop: "72px" }}>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          background: "linear-gradient(135deg, oklch(0.42 0.06 145) 0%, oklch(0.50 0.07 145) 100%)",
        }}
      >
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{
                backgroundColor: "oklch(0.94 0.02 80 / 0.15)",
                color: "oklch(0.94 0.02 80)",
                border: "1px solid oklch(0.94 0.02 80 / 0.30)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <AlertCircle size={14} />
              Mise à jour 2026
            </div>

            <h1
              className="text-5xl md:text-6xl font-semibold leading-tight mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.97 0.01 80)",
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
              }}
            >
              France Retraite 2026 : Ce qui change pour vous
            </h1>

            <p
              className="text-xl leading-relaxed mb-8"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.95 0.01 80)",
              }}
            >
              Les dernières évolutions de la réforme des retraites expliquées simplement. Suspension, revalorisation, cumul emploi-retraite : tout ce que vous devez savoir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/rendez-vous"
                className="btn-sage"
              >
                <Calendar size={18} />
                Prendre rendez-vous
              </Link>
              <Link
                href="/contact"
                className="btn-outline-sage"
              >
                Poser une question
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1 : SUSPENSION DE LA RÉFORME ── */}
      <section className="section-beige py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 reveal">
              <div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-lg mb-6"
                style={{
                  backgroundColor: "oklch(0.95 0.02 145)",
                  color: "oklch(0.42 0.06 145)",
                }}
              >
                <Calendar size={20} />
                <span
                  className="font-semibold"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Point clé 1
                </span>
              </div>

              <h2
                className="text-4xl font-semibold mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "oklch(0.45 0.08 145)",
                }}
              >
                Suspension de la réforme : L'âge légal "figé"
              </h2>
              <div className="section-divider" />

              <p
                className="text-lg leading-relaxed mb-6"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.35 0.02 65)",
                }}
              >
                La grande nouveauté de 2026 est la <strong>suspension du relèvement de l'âge légal</strong> de départ en retraite instauré en 2023. Cette décision offre un répit important pour les générations concernées.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {[
                  {
                    title: "Générations 1964-1968",
                    content: "L'âge légal est temporairement fixé entre 62 ans et 9 mois et 63 ans et 9 mois (selon votre année de naissance).",
                  },
                  {
                    title: "Génération 1969 et après",
                    content: "Le passage aux 64 ans ne concernera finalement que les personnes nées à partir de 1969.",
                  },
                  {
                    title: "Carrières longues",
                    content: "Les conditions de départ anticipé sont assouplies pour les générations 1964-1968 ayant commencé à travailler avant 16, 18, 20 ou 21 ans.",
                  },
                  {
                    title: "Durée de suspension",
                    content: "Cette suspension s'applique jusqu'en 2028, offrant une période de transition claire.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="card-service reveal"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <h3
                      className="text-lg font-semibold mb-3"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: "oklch(0.42 0.06 145)",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: "oklch(0.45 0.02 65)",
                      }}
                    >
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 : REVALORISATION ── */}
      <section className="section-cream py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 reveal">
              <div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-lg mb-6"
                style={{
                  backgroundColor: "oklch(0.95 0.02 145)",
                  color: "oklch(0.42 0.06 145)",
                }}
              >
                <DollarSign size={20} />
                <span
                  className="font-semibold"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Point clé 2
                </span>
              </div>

              <h2
                className="text-4xl font-semibold mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "oklch(0.45 0.08 145)",
                }}
              >
                Revalorisation des pensions au 1er janvier 2026
              </h2>
              <div className="section-divider" />

              <div
                className="p-8 rounded-lg mb-6 reveal"
                style={{
                  backgroundColor: "oklch(0.95 0.02 145)",
                  border: "2px solid oklch(0.42 0.06 145)",
                }}
              >
                <div
                  className="text-5xl font-bold mb-3"
                  style={{
                    color: "oklch(0.42 0.06 145)",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  +0,9 %
                </div>
                <p
                  className="text-lg"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: "oklch(0.35 0.02 65)",
                  }}
                >
                  Hausse des pensions de retraite de base depuis le 1er janvier 2026
                </p>
              </div>

              <p
                className="text-lg leading-relaxed mb-6"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.35 0.02 65)",
                }}
              >
                Cette revalorisation, bien que plus modérée que celle de 2025 (2,2 %), vise à maintenir votre pouvoir d'achat face à une inflation qui se stabilise. À noter que cette hausse s'applique automatiquement sur votre versement de février (pour la pension de janvier).
              </p>

              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: "oklch(0.94 0.02 80)",
                  border: "1px solid oklch(0.88 0.03 80)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: "oklch(0.35 0.02 65)",
                  }}
                >
                  <strong>💡 Conseil :</strong> Vérifiez votre relevé de carrière sur info-retraite.fr pour estimer le montant de votre future pension. Nous pouvons vous aider à accéder à ce site en toute sécurité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 : CUMUL EMPLOI-RETRAITE ── */}
      <section className="section-beige py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 reveal">
              <div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-lg mb-6"
                style={{
                  backgroundColor: "oklch(0.95 0.02 145)",
                  color: "oklch(0.42 0.06 145)",
                }}
              >
                <Briefcase size={20} />
                <span
                  className="font-semibold"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Point clé 3
                </span>
              </div>

              <h2
                className="text-4xl font-semibold mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "oklch(0.45 0.08 145)",
                }}
              >
                Cumul Emploi-Retraite : Plus de liberté après 67 ans
              </h2>
              <div className="section-divider" />

              <p
                className="text-lg leading-relaxed mb-8"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.35 0.02 65)",
                }}
              >
                Le cumul emploi-retraite évolue pour encourager l'activité des seniors tout en simplifiant les règles. Les conditions varient selon votre âge :
              </p>

              <div className="space-y-6">
                {[
                  {
                    age: "Après 67 ans",
                    icon: <CheckCircle size={24} />,
                    details: [
                      "Cumul totalement libre et libéralisé",
                      "Aucun plafond de revenus d'activité",
                      "Possibilité d'ouvrir des droits pour une seconde pension",
                    ],
                  },
                  {
                    age: "Avant 67 ans",
                    icon: <AlertCircle size={24} />,
                    details: [
                      "Cumul possible mais peut être plafonné",
                      "Plafond généralement fixé à 160 % du SMIC (≈ 2 916,85 € brut/mois en 2026)",
                      "Conditions variables selon le taux plein atteint",
                    ],
                  },
                ].map((item, i) => (
                  <div
                    key={item.age}
                    className="p-6 rounded-lg reveal"
                    style={{
                      backgroundColor: "oklch(0.98 0.01 80)",
                      border: "2px solid oklch(0.42 0.06 145)",
                      transitionDelay: `${i * 0.1}s`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        style={{ color: "oklch(0.42 0.06 145)" }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-xl font-semibold mb-3"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            color: "oklch(0.42 0.06 145)",
                          }}
                        >
                          {item.age}
                        </h3>
                        <ul className="space-y-2">
                          {item.details.map((detail, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2"
                              style={{
                                fontFamily: "'Source Sans 3', sans-serif",
                                color: "oklch(0.35 0.02 65)",
                              }}
                            >
                              <span
                                style={{ color: "oklch(0.42 0.06 145)", marginTop: "2px" }}
                              >
                                ✓
                              </span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 : FRANCE RETRAITE ── */}
      <section className="section-cream py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="reveal">
              <div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-lg mb-6"
                style={{
                  backgroundColor: "oklch(0.95 0.02 145)",
                  color: "oklch(0.42 0.06 145)",
                }}
              >
                <Users size={20} />
                <span
                  className="font-semibold"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  À savoir
                </span>
              </div>

              <h2
                className="text-4xl font-semibold mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "oklch(0.45 0.08 145)",
                }}
              >
                France Retraite : Un interlocuteur unique
              </h2>
              <div className="section-divider" />

              <p
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.35 0.02 65)",
                }}
              >
                Le déploiement de <strong>France Retraite</strong> (issu de la fusion des services d'information de l'Assurance Retraite et de France Travail pour les seniors) continue de se structurer pour offrir un accompagnement plus fluide et personnalisé. Cet effort de centralisation vise à simplifier vos démarches et à vous offrir un point d'entrée unique pour toutes vos questions relatives à la retraite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-20"
        style={{ backgroundColor: "oklch(0.42 0.06 145)" }}
      >
        <div className="container text-center reveal">
          <h2
            className="text-4xl font-semibold mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Besoin d'aide pour y voir clair ?
          </h2>
          <p
            className="text-xl mb-10 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "oklch(0.88 0.03 80)",
            }}
          >
            Les Petits Papiers Faciles vous accompagnent dans la simulation de votre retraite, la vérification de votre relevé de carrière et la réalisation de vos démarches en ligne. Contactez-moi pour un bilan retraite personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rendez-vous"
              className="btn-sage"
            >
              <Calendar size={18} />
              Prendre rendez-vous
            </Link>
            <Link
              href="/contact"
              className="btn-outline-sage"
            >
              Me contacter
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
