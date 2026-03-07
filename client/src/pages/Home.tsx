/* ============================================================
   Page Accueil — Les Petits Papiers Faciles (v2 améliorée)
   Structure claire : aide administrative + accompagnement numérique
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
  MessageCircle,
  MapPin,
  Users,
  BookOpen,
  Smartphone,
  Mail,
  FileCheck,
  GraduationCap,
} from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663076661026/9oMMWuZH2kFyp4yTio8368/hero-lpp-2vxh93BzmXMTqLfzS9LorK.webp";

const PROFILE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663076661026/9oMMWuZH2kFyp4yTio8368/sandra-profile-new_9df37d2d.png";

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Aide administrative à Hyères | Les Petits Papiers Faciles";
  }, []);

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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.22 0.04 145 / 0.82) 0%, oklch(0.30 0.07 145 / 0.65) 50%, oklch(0.22 0.04 145 / 0.40) 100%)",
          }}
        />

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
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
              className="text-5xl md:text-6xl font-semibold leading-tight mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.97 0.01 80)",
              }}
            >
              Vos démarches administratives et numériques expliquées simplement,{" "}
              <em>pas à pas.</em>
            </h1>

            {/* Sous-titre clair */}
            <p
              className="text-2xl font-semibold mb-6"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.94 0.02 80)",
              }}
            >
              Aide administrative et accompagnement numérique à domicile
            </p>

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
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-base transition-all"
                style={{
                  borderColor: "oklch(0.94 0.02 80 / 0.80)",
                  color: "oklch(0.97 0.01 80)",
                  backgroundColor: "oklch(0.94 0.02 80 / 0.12)",
                  border: "2px solid oklch(0.94 0.02 80 / 0.80)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Découvrir les services
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: <Home size={16} />, label: "À votre domicile" },
                { icon: <Shield size={16} />, label: "Confidentiel" },
                { icon: <CheckCircle size={16} />, label: "Sans engagement" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm"
                  style={{
                    color: "oklch(0.88 0.03 80)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  <span style={{ color: "oklch(0.80 0.05 145)" }}>
                    {badge.icon}
                  </span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : DEUX TYPES D'AIDE (AIDE ADMINISTRATIVE + ACCOMPAGNEMENT NUMÉRIQUE) ── */}
      <section
        className="py-20 reveal"
        style={{
          backgroundColor: "oklch(0.97 0.01 80)",
        }}
      >
        <div className="container">
          <h2
            className="text-4xl md:text-5xl font-semibold text-center mb-16"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.30 0.07 145)",
            }}
          >
            Deux types d'accompagnement
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* AIDE ADMINISTRATIVE */}
            <div
              className="p-8 rounded-lg reveal"
              style={{
                backgroundColor: "oklch(0.94 0.02 80 / 0.08)",
                border: "2px solid oklch(0.30 0.07 145 / 0.15)",
              }}
            >
              <div
                className="flex items-center gap-3 mb-6"
                style={{ color: "oklch(0.30 0.07 145)" }}
              >
                <FileText size={28} />
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  Aide administrative
                </h3>
              </div>

              <ul
                className="space-y-3"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.30 0.07 145 / 0.85)",
                }}
              >
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                  <span>Aide pour les démarches administratives en ligne (CAF, impôts, Ameli, retraite)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                  <span>Compréhension ou rédaction de courriers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                  <span>Organisation et classement de documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                  <span>Accompagnement dans certaines démarches importantes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                  <span>Aide après un décès (prévenir les organismes, banques, administrations)</span>
                </li>
              </ul>
            </div>

            {/* ACCOMPAGNEMENT NUMÉRIQUE */}
            <div
              className="p-8 rounded-lg reveal"
              style={{
                backgroundColor: "oklch(0.94 0.02 80 / 0.08)",
                border: "2px solid oklch(0.30 0.07 145 / 0.15)",
              }}
            >
              <div
                className="flex items-center gap-3 mb-6"
                style={{ color: "oklch(0.30 0.07 145)" }}
              >
                <Monitor size={28} />
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  Accompagnement numérique
                </h3>
              </div>

              <ul
                className="space-y-3"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.30 0.07 145 / 0.85)",
                }}
              >
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                  <span>Apprendre à utiliser un smartphone ou une tablette</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                  <span>Envoyer des photos ou des documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                  <span>Comprendre Internet et les démarches en ligne</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                  <span>Apprendre les bases de l'informatique simplement</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                  <span>Être plus à l'aise avec les outils numériques au quotidien</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : ATELIERS NUMÉRIQUES ── */}
      <section
        className="py-20 reveal"
        style={{
          backgroundColor: "oklch(0.94 0.02 80 / 0.05)",
        }}
      >
        <div className="container">
          <div
            className="max-w-3xl mx-auto p-10 rounded-lg"
            style={{
              backgroundColor: "oklch(0.97 0.01 80)",
              border: "2px solid oklch(0.30 0.07 145 / 0.20)",
            }}
          >
            <div
              className="flex items-center gap-3 mb-6"
              style={{ color: "oklch(0.30 0.07 145)" }}
            >
              <Users size={32} />
              <h3
                className="text-3xl font-semibold"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                Ateliers numériques
              </h3>
            </div>

            <p
              className="text-lg mb-6"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.30 0.07 145 / 0.85)",
              }}
            >
              Je propose d'organiser des ateliers simples et accessibles pour :
            </p>

            <ul
              className="space-y-3 mb-8"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.30 0.07 145 / 0.85)",
              }}
            >
              <li className="flex items-start gap-3">
                <GraduationCap size={20} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                <span>Associations et groupes</span>
              </li>
              <li className="flex items-start gap-3">
                <Users size={20} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                <span>Groupes de seniors</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen size={20} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.30 0.07 145)" }} />
                <span>Structures locales (médiathèques, centres sociaux, résidences seniors)</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold"
              style={{
                backgroundColor: "oklch(0.30 0.07 145)",
                color: "oklch(0.97 0.01 80)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <MessageCircle size={18} />
              Me contacter pour un atelier
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION : COMMENT ÇA FONCTIONNE ── */}
      <section
        className="py-20 reveal"
        style={{
          backgroundColor: "oklch(0.97 0.01 80)",
        }}
      >
        <div className="container">
          <h2
            className="text-4xl md:text-5xl font-semibold text-center mb-16"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.30 0.07 145)",
            }}
          >
            Comment je vous accompagne
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                num: "1",
                title: "Nous faisons le point ensemble",
                desc: "Vous expliquez simplement votre situation.",
              },
              {
                num: "2",
                title: "Je vous guide pas à pas",
                desc: "Chaque démarche est expliquée clairement.",
              },
              {
                num: "3",
                title: "Vous devenez autonome",
                desc: "Vous comprenez et gagnez en sérénité.",
              },
            ].map((step) => (
              <div key={step.num} className="text-center reveal">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
                  style={{
                    backgroundColor: "oklch(0.30 0.07 145)",
                    color: "oklch(0.97 0.01 80)",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {step.num}
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: "oklch(0.30 0.07 145)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: "oklch(0.30 0.07 145 / 0.75)",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-12 p-6 rounded-lg text-center"
            style={{
              backgroundColor: "oklch(0.94 0.02 80 / 0.12)",
              border: "2px solid oklch(0.30 0.07 145 / 0.15)",
            }}
          >
            <p
              className="text-lg font-semibold"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.30 0.07 145)",
              }}
            >
              Ce n'est pas compliqué. Vous ne serez pas seul·e.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION : QUI SUIS-JE ── */}
      <section
        className="py-20 reveal"
        style={{
          backgroundColor: "oklch(0.94 0.02 80 / 0.05)",
        }}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="flex justify-center">
              <img
                src={PROFILE_IMG}
                alt="Sandra Duchalet"
                className="w-80 h-80 rounded-full object-cover shadow-lg"
                style={{
                  border: "4px solid oklch(0.30 0.07 145)",
                }}
              />
            </div>

            <div>
              <h2
                className="text-4xl md:text-5xl font-semibold mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "oklch(0.30 0.07 145)",
                }}
              >
                Sandra Duchalet
              </h2>

              <p
                className="text-xl font-semibold mb-6"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.30 0.07 145 / 0.75)",
                }}
              >
                Ancienne gestionnaire comptable – plus de 20 ans d'expérience.
              </p>

              <div
                className="space-y-4 mb-8"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.30 0.07 145 / 0.85)",
                  lineHeight: "1.8",
                }}
              >
                <p>
                  Spécialiste des démarches administratives et numériques du quotidien, j'accompagne les particuliers avec pédagogie, patience et bienveillance.
                </p>
                <p>
                  Mon objectif est de vous rendre autonome en vous expliquant simplement chaque étape, sans jargon et sans stress.
                </p>
                <p>
                  <strong>Je fais avec vous, jamais à votre place.</strong>
                </p>
              </div>

              <Link
                href="/qui-suis-je"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold"
                style={{
                  backgroundColor: "oklch(0.30 0.07 145)",
                  color: "oklch(0.97 0.01 80)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                En savoir plus
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : CTA FINAL ── */}
      <section
        className="py-20 reveal"
        style={{
          backgroundColor: "oklch(0.30 0.07 145)",
        }}
      >
        <div className="container text-center">
          <h2
            className="text-4xl md:text-5xl font-semibold mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Prêt à simplifier vos démarches ?
          </h2>

          <p
            className="text-xl mb-10 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "oklch(0.94 0.02 80)",
            }}
          >
            Un premier échange permet déjà d'y voir plus clair. Vous pouvez me contacter librement, sans engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rendez-vous"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-semibold text-lg"
              style={{
                backgroundColor: "oklch(0.94 0.02 80)",
                color: "oklch(0.30 0.07 145)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <CalendarDays size={20} />
              Prendre rendez-vous
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-semibold text-lg"
              style={{
                backgroundColor: "oklch(0.94 0.02 80 / 0.20)",
                color: "oklch(0.94 0.02 80)",
                border: "2px solid oklch(0.94 0.02 80)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <Mail size={20} />
              Me contacter
            </Link>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-8">
            <div className="flex items-center gap-3" style={{ color: "oklch(0.94 0.02 80)" }}>
              <Phone size={20} />
              <span style={{ fontFamily: "'Source Sans 3', sans-serif" }}>07 50 52 72 27</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: "oklch(0.94 0.02 80)" }}>
              <Mail size={20} />
              <span style={{ fontFamily: "'Source Sans 3', sans-serif" }}>lespetitspapiersfaciles@gmail.com</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
