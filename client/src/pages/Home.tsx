/* ============================================================
   Page Accueil — Les Petits Papiers Faciles
   Style : Clarté Provençale — hero pleine largeur, sections alternées
   ============================================================ */

import { Link } from "wouter";
import { useEffect, useRef } from "react";
import {
  FileText,
  Monitor,
  CheckCircle,
  Phone,
  ArrowRight,
  Shield,
  Home,
  Wifi,
  CalendarDays,
} from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663076661026/9oMMWuZH2kFyp4yTio8368/hero-lpp-2vxh93BzmXMTqLfzS9LorK.webp";

export default function HomePage() {
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
    <div ref={pageRef}>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ paddingTop: "80px" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.22 0.04 145 / 0.82) 0%, oklch(0.30 0.07 145 / 0.65) 50%, oklch(0.22 0.04 145 / 0.40) 100%)",
          }}
        />

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{
                backgroundColor: "oklch(0.94 0.02 80 / 0.15)",
                color: "oklch(0.94 0.02 80)",
                border: "1px solid oklch(0.94 0.02 80 / 0.30)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <Shield size={14} />
              Activité déclarée Services à la Personne
            </div>

            <h1
              className="text-5xl md:text-6xl font-semibold leading-tight mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.97 0.01 80)",
              }}
            >
              Vos démarches administratives et numériques expliquées simplement,{" "}
              <em>pas à pas.</em>
            </h1>

            <p
              className="text-xl leading-relaxed mb-10"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.95 0.01 80)",
                textShadow: "0 1px 4px oklch(0.15 0.05 145 / 0.5)",
              }}
            >
              Internet et les démarches évoluent. Je vous accompagne pour les
              rendre simples au quotidien.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/rendez-vous"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-base transition-all"
                style={{
                  backgroundColor: "oklch(0.94 0.02 80)",
                  color: "oklch(0.30 0.07 145)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <CalendarDays size={18} />
                Prendre rendez-vous
              </Link>
              <Link href="/services" className="btn-outline-sage text-base"
                style={{
                  borderColor: "oklch(0.94 0.02 80 / 0.80)",
                  color: "oklch(0.97 0.01 80)",
                  backgroundColor: "oklch(0.94 0.02 80 / 0.12)",
                }}
              >
                Découvrir les services
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: <Home size={16} />, label: "À votre domicile" },
                { icon: <Shield size={16} />, label: "Confidentiel" },
                { icon: <CheckCircle size={16} />, label: "Sans engagement" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "oklch(0.88 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <span style={{ color: "oklch(0.80 0.05 145)" }}>{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 80L1440 80L1440 30C1200 70 960 10 720 40C480 70 240 10 0 30L0 80Z"
              fill="oklch(0.94 0.02 80)"
            />
          </svg>
        </div>
      </section>

      {/* ── ACCROCHE ── */}
      <section className="section-beige py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center reveal">
            <p
              className="text-2xl md:text-3xl font-medium leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.30 0.07 145)",
              }}
            >
              « Perdus avec les nouvelles technologies ? Internet et les
              démarches deviendront enfin simples. »
            </p>
            <div className="section-divider-center mt-6" />
            <p
              className="text-lg mt-4"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.42 0.02 65)",
              }}
            >
              Je vous accompagne pas à pas pour apprendre à gérer vos démarches
              et votre ordinateur en toute confiance.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES APERÇU ── */}
      <section className="section-cream py-20">
        <div className="container">
          <div className="text-center mb-12 reveal">
            <h2
              className="text-4xl font-semibold mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Ce que je fais avec vous
            </h2>
            <div className="section-divider-center" />
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.42 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Deux domaines d'intervention complémentaires, toujours à votre
              rythme et sans jargon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Aide administrative */}
            <div className="card-service reveal" style={{ transitionDelay: "0.1s" }}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
              >
                <FileText size={24} style={{ color: "oklch(0.42 0.06 145)" }} />
              </div>
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Aide administrative
              </h3>
              <p
                className="mb-5"
                style={{ color: "oklch(0.42 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Impôts, retraite, courriers, factures, espaces en ligne… Je
                vous aide à comprendre et à agir sur chaque document.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Impôts et déclarations",
                  "Retraite et dossiers administratifs",
                  "Courriers et formulaires",
                  "Gestion des factures",
                  "Création d'espaces en ligne",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <CheckCircle size={15} style={{ color: "oklch(0.42 0.06 145)" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="text-sm font-semibold flex items-center gap-1 transition-colors"
                style={{ color: "oklch(0.42 0.06 145)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                En savoir plus <ArrowRight size={14} />
              </Link>
            </div>

            {/* Apprentissage numérique */}
            <div className="card-service reveal" style={{ transitionDelay: "0.2s" }}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
              >
                <Monitor size={24} style={{ color: "oklch(0.42 0.06 145)" }} />
              </div>
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Apprentissage numérique
              </h3>
              <p
                className="mb-5"
                style={{ color: "oklch(0.42 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Téléphone, tablette, ordinateur, internet… À votre niveau, à
                votre rythme, pour gagner en autonomie.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Utiliser internet simplement",
                  "Démarches en ligne",
                  "Envoyer documents et emails",
                  "Scanner et organiser ses papiers",
                  "Gagner en autonomie",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <CheckCircle size={15} style={{ color: "oklch(0.42 0.06 145)" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="text-sm font-semibold flex items-center gap-1 transition-colors"
                style={{ color: "oklch(0.42 0.06 145)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                En savoir plus <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TARIF & CRÉDIT D'IMPÔT ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="reveal">
                <h2
                  className="text-3xl font-semibold mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Un tarif transparent, un avantage fiscal réel
                </h2>
                <div className="section-divider" />
                <p
                  className="mb-6"
                  style={{ color: "oklch(0.42 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  En tant qu'activité déclarée Services à la Personne, vous
                  bénéficiez d'un crédit d'impôt de 50 % sur les sommes
                  engagées.
                </p>
                <Link href="/avantage-fiscal" className="btn-sage">
                  Comprendre le crédit d'impôt
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="reveal" style={{ transitionDelay: "0.15s" }}>
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{ backgroundColor: "oklch(0.98 0.01 80)", border: "1px solid oklch(0.88 0.03 80)" }}
                >
                  <div className="flex items-center justify-center gap-6 mb-4">
                    <div>
                      <div
                        className="text-4xl font-bold"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "oklch(0.45 0.02 65)" }}
                      >
                        42 €
                        <span className="text-xl font-normal">/h</span>
                      </div>
                      <div
                        className="text-xs uppercase tracking-wider mt-1"
                        style={{ color: "oklch(0.55 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        Tarif affiché
                      </div>
                    </div>
                    <ArrowRight size={24} style={{ color: "oklch(0.42 0.06 145)" }} />
                    <div>
                      <div
                        className="text-4xl font-bold"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "oklch(0.42 0.06 145)" }}
                      >
                        21 €
                        <span className="text-xl font-normal">/h</span>
                      </div>
                      <div
                        className="text-xs uppercase tracking-wider mt-1"
                        style={{ color: "oklch(0.42 0.06 145)", fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        Coût réel
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.50 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Après crédit d'impôt 50 % remboursé par l'État
                  </p>
                  <div
                    className="mt-4 pt-4 border-t text-sm font-semibold"
                    style={{
                      borderColor: "oklch(0.88 0.03 80)",
                      color: "oklch(0.42 0.06 145)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    ✦ Première séance découverte offerte
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA FONCTIONNE APERÇU ── */}
      <section className="section-beige py-20">
        <div className="container">
          <div className="text-center mb-12 reveal">
            <h2
              className="text-4xl font-semibold mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Comment ça fonctionne
            </h2>
            <div className="section-divider-center" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Prise de contact",
                desc: "Un simple appel ou un message pour se présenter et expliquer votre situation.",
              },
              {
                step: "02",
                title: "Analyse du besoin",
                desc: "Ensemble, nous identifions vos besoins précis et définissons comment je peux vous aider.",
              },
              {
                step: "03",
                title: "Accompagnement personnalisé",
                desc: "Je me déplace à votre domicile et travaille avec vous, à votre rythme, sans jargon.",
              },
              {
                step: "04",
                title: "Suivi si nécessaire",
                desc: "Si besoin, je reste disponible pour un suivi ou des séances complémentaires.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                  style={{
                    backgroundColor: "oklch(0.42 0.06 145)",
                    color: "oklch(0.97 0.01 80)",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {item.step}
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
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

          <div className="text-center mt-10 reveal">
            <Link href="/comment-ca-fonctionne" className="btn-outline-sage">
              En savoir plus
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUI SUIS-JE APERÇU ── */}
      <section className="section-cream py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="reveal">
                {/* Photo placeholder avec initiale */}
                <div className="flex justify-center md:justify-start">
                  <div
                    className="w-48 h-48 rounded-full flex items-center justify-center text-6xl font-bold border-4"
                    style={{
                      backgroundColor: "oklch(0.95 0.02 145)",
                      borderColor: "oklch(0.42 0.06 145)",
                      color: "oklch(0.42 0.06 145)",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    S
                  </div>
                </div>
              </div>
              <div className="reveal" style={{ transitionDelay: "0.15s" }}>
                <h2
                  className="text-4xl font-semibold mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Sandra
                </h2>
                <p
                  className="text-base font-medium mb-4"
                  style={{ color: "oklch(0.42 0.06 145)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Ancienne gestionnaire comptable · +20 ans d'expérience
                </p>
                <div className="section-divider" />
                <p
                  className="text-lg leading-relaxed mb-4"
                  style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Spécialiste des démarches administratives et numériques du
                  quotidien, j'accompagne les particuliers avec pédagogie,
                  patience et bienveillance — sans jamais faire à votre place.
                </p>
                <blockquote
                  className="italic text-xl pl-4 border-l-4 mb-6"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    borderColor: "oklch(0.42 0.06 145)",
                    color: "oklch(0.30 0.07 145)",
                  }}
                >
                  « Je fais avec vous, jamais à votre place. »
                </blockquote>
                <Link href="/qui-suis-je" className="btn-sage">
                  Me connaître
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-20"
        style={{ backgroundColor: "oklch(0.42 0.06 145)" }}
      >
        <div className="container text-center">
          <div className="max-w-2xl mx-auto reveal">
            <h2
              className="text-4xl font-semibold mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.97 0.01 80)",
              }}
            >
              Prêt à simplifier vos démarches ?
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: "oklch(0.88 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              La première séance est offerte. Contactez-moi pour qu'on en
              discute ensemble, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/rendez-vous"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-semibold text-lg transition-all"
                style={{
                  backgroundColor: "oklch(0.97 0.01 80)",
                  color: "oklch(0.30 0.07 145)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <CalendarDays size={20} />
                Prendre rendez-vous
              </Link>
              <a
                href="tel:0750527227"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-semibold text-lg transition-all border-2"
                style={{
                  borderColor: "oklch(0.97 0.01 80 / 0.50)",
                  color: "oklch(0.97 0.01 80)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <Phone size={20} />
                07 50 52 72 27
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
