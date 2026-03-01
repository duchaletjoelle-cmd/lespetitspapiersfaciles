/* ============================================================
   Page Comment ça fonctionne — Les Petits Papiers Faciles
   Style : Clarté Provençale — timeline verticale, étapes numérotées
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Phone, Search, Users, LifeBuoy, ArrowRight, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Phone size={28} />,
    title: "Prise de contact",
    desc: "Tout commence par un simple appel téléphonique ou un message. Vous m'expliquez votre situation en quelques mots — il n'est pas nécessaire de tout détailler, je suis là pour vous guider.",
    details: [
      "Appel téléphonique ou email",
      "Échange informel et sans pression",
      "Disponible du lundi au samedi, 9h–17h30",
      "Réponse rapide sous 24h",
    ],
  },
  {
    number: "02",
    icon: <Search size={28} />,
    title: "Analyse du besoin",
    desc: "Lors d'un premier échange (par téléphone ou lors de la séance découverte offerte), nous identifions ensemble vos besoins précis : quelles démarches vous posent problème, quels outils vous utilisez, quel est votre niveau de confort avec le numérique.",
    details: [
      "Séance découverte offerte",
      "Évaluation de vos besoins réels",
      "Pas de jugement, pas de jargon",
      "Définition d'un plan d'accompagnement",
    ],
  },
  {
    number: "03",
    icon: <Users size={28} />,
    title: "Accompagnement personnalisé",
    desc: "Je me déplace à votre domicile aux heures qui vous conviennent. Nous travaillons ensemble, côte à côte, sur vos papiers et vos appareils. Je vous explique chaque étape, je réponds à vos questions, et je m'adapte à votre rythme.",
    details: [
      "Intervention à domicile",
      "Travail côte à côte, jamais à votre place",
      "Explication claire de chaque étape",
      "Possibilité d'accompagnement à distance",
    ],
  },
  {
    number: "04",
    icon: <LifeBuoy size={28} />,
    title: "Suivi si nécessaire",
    desc: "Selon vos besoins, je reste disponible pour des séances complémentaires ou un suivi ponctuel. L'objectif est votre autonomie — mais je suis là si vous avez besoin d'un coup de pouce supplémentaire.",
    details: [
      "Séances de suivi à la demande",
      "Disponibilité entre les séances",
      "Objectif d'autonomie progressive",
      "Accompagnement aussi longtemps que nécessaire",
    ],
  },
];

export default function CommentCaFonctionnePage() {
  const pageRef = useRef<HTMLDivElement>(null);

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
      {/* ── HEADER ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.30 0.07 145)" }}
      >
        <div className="container text-center">
          <h1
            className="text-5xl font-semibold mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Comment ça fonctionne
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.80 0.05 145)" }}
          />
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: "oklch(0.85 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Un accompagnement simple, humain et sans surprise — en quatre étapes.
          </p>
        </div>
      </section>

      {/* ── ÉTAPES ── */}
      <section className="section-beige py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`reveal flex flex-col lg:flex-row gap-8 mb-16 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Numéro & icône */}
                <div className="flex flex-col items-center lg:items-start shrink-0">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: "oklch(0.42 0.06 145)",
                      color: "oklch(0.97 0.01 80)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="text-5xl font-bold"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: "oklch(0.88 0.04 145)",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Contenu */}
                <div
                  className="flex-1 rounded-2xl p-8"
                  style={{
                    backgroundColor: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.88 0.03 80)",
                  }}
                >
                  <h2
                    className="text-3xl font-semibold mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {step.title}
                  </h2>
                  <div className="section-divider" />
                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{ color: "oklch(0.38 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {step.desc}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        <CheckCircle size={14} style={{ color: "oklch(0.42 0.06 145)" }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center reveal">
            <h2
              className="text-3xl font-semibold mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Mes engagements envers vous
            </h2>
            <div className="section-divider-center" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {[
                {
                  title: "Pédagogie",
                  desc: "J'explique chaque étape clairement, sans jargon technique, à votre rythme.",
                },
                {
                  title: "Patience",
                  desc: "Pas de jugement, pas de précipitation. Nous avançons ensemble, à votre mesure.",
                },
                {
                  title: "Confidentialité",
                  desc: "Vos données personnelles et vos documents sont traités avec la plus grande discrétion.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl p-6"
                  style={{
                    backgroundColor: "oklch(0.98 0.01 80)",
                    border: "1px solid oklch(0.88 0.03 80)",
                  }}
                >
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "oklch(0.42 0.06 145)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.42 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.42 0.06 145)" }}
      >
        <div className="container text-center reveal">
          <h2
            className="text-3xl font-semibold mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "oklch(0.97 0.01 80)" }}
          >
            Prêt à commencer ?
          </h2>
          <p
            className="text-lg mb-8 max-w-xl mx-auto"
            style={{ color: "oklch(0.88 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            La première séance est offerte. Aucun engagement, juste une
            rencontre pour faire connaissance et évaluer vos besoins.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded font-semibold text-lg transition-all"
            style={{
              backgroundColor: "oklch(0.97 0.01 80)",
              color: "oklch(0.30 0.07 145)",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Prendre contact
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
