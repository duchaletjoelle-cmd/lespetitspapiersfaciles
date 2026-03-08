/* ============================================================
   Page Qui suis-je — Les Petits Papiers Faciles
   Style : Clarté Provençale — présentation humaine, photo ronde
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Heart, BookOpen, Award, Target } from "lucide-react";

export default function QuiSuisJePage() {
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
        style={{ backgroundColor: "oklch(0.45 0.08 145)" }}
      >
        <div className="container text-center">
          <h1
            className="text-5xl font-semibold mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Qui suis-je
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.80 0.05 145)" }}
          />
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: "oklch(0.85 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Une professionnelle à votre écoute, avec patience et bienveillance.
          </p>
        </div>
      </section>

      {/* ── PRÉSENTATION PRINCIPALE ── */}
      <section className="section-beige py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Photo & infos */}
              <div className="lg:col-span-2 flex flex-col items-center text-center reveal">
                {/* Photo de profil */}
                <div
                  className="w-56 h-56 rounded-full border-4 mb-6 shadow-lg overflow-hidden"
                  style={{
                    borderColor: "oklch(0.42 0.06 145)",
                  }}
                >
                  <img
                    src="https:///facebook_photo_profil;png-1.manuscdn.com/user_upload_by_module/session_file/310519663409785356/pjJXdSkoiwINljsn.png?Expires=1804360552&Signature=DfE6qeTAWVAcx4rg423n2cyO5vFErxMWgLv26uoIQluLKJPbSesbbDqyZ5ARoEHyOOJUWn3392hCfFE32L1FilYNwgYXQ8Li1SHS5ZsXp3irVU4J6Mopp6hPohmjNjLuFFVm5W5Xzd2MqZo2hubJuaRe2KOUZX7PqxntLUAVgnVeqnnQhhBCe8vyFeQrBu0teUhfSWtnJa3a3NZVSCXIV5Ih~66SM-mZQEG72PC~ZzJKlRjQ7eQLfW61C0detgZ4S~YLdGGIH~6o9DXfD88VbNDiJxnyUpS8duCLdU2KjzttBKB-fT5qefJDi3pBrWPX12GXlEzfNXd1FClODdH3nQ__&Key-Pair-Id=K2HSFNDJXOU9YS"
                    alt="Sandra Duchalet — Les Petits Papiers Faciles"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <h2
                  className="text-3xl font-semibold mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Sandra
                </h2>
                <p
                  className="text-base font-medium mb-4"
                  style={{ color: "oklch(0.42 0.06 145)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Fondatrice des Petits Papiers Faciles
                </p>

                {/* Badges */}
                <div className="flex flex-col gap-2 w-full">
                  {[
                    "Ancienne gestionnaire comptable",
                    "+20 ans d'expérience",
                    "Spécialiste démarches administratives",
                    "Basée à Hyères (Var)",
                  ].map((badge) => (
                    <div
                      key={badge}
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "oklch(0.98 0.01 80)",
                        color: "oklch(0.35 0.02 65)",
                        border: "1px solid oklch(0.88 0.03 80)",
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>

              {/* Texte */}
              <div className="lg:col-span-3 reveal" style={{ transitionDelay: "0.15s" }}>
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Mon parcours
                </h3>
                <div className="section-divider" />

                <p
                  className="text-base leading-relaxed mb-5"
                  style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Après plus de vingt ans passés dans la gestion administrative
                  et comptable en entreprise, j'ai décidé de mettre mon
                  expérience au service des particuliers. J'ai vu, au fil des
                  années, combien les démarches administratives et numériques
                  pouvaient être source de stress et d'inquiétude pour beaucoup
                  de personnes.
                </p>

                <p
                  className="text-base leading-relaxed mb-5"
                  style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  J'ai créé <strong>Les Petits Papiers Faciles</strong> avec
                  une conviction simple : tout le monde mérite d'être accompagné
                  avec patience et sans jugement, quelle que soit sa maîtrise
                  des outils numériques ou sa familiarité avec l'administration.
                </p>

                <blockquote
                  className="italic text-2xl pl-5 border-l-4 mb-6 py-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    borderColor: "oklch(0.42 0.06 145)",
                    color: "oklch(0.45 0.08 145)",
                  }}
                >
                  « Je fais avec vous, jamais à votre place. »
                </blockquote>

                <p
                  className="text-base leading-relaxed"
                  style={{ color: "oklch(0.35 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Mon objectif n'est pas de faire à votre place, mais de vous
                  transmettre les clés pour que vous puissiez, progressivement,
                  gérer vos démarches en toute autonomie. Chaque séance est un
                  pas de plus vers votre indépendance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="section-cream py-20">
        <div className="container">
          <div className="text-center mb-12 reveal">
            <h2
              className="text-4xl font-semibold mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Mes valeurs
            </h2>
            <div className="section-divider-center" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <BookOpen size={28} />,
                title: "Pédagogie",
                desc: "J'explique chaque étape clairement, avec des mots simples, en m'assurant que vous avez bien compris avant de passer à la suivante.",
              },
              {
                icon: <Heart size={28} />,
                title: "Bienveillance",
                desc: "Aucun jugement, aucune impatience. Vous avancez à votre rythme, et c'est parfaitement normal de ne pas tout savoir.",
              },
              {
                icon: <Award size={28} />,
                title: "Professionnalisme",
                desc: "Fort de plus de 20 ans d'expérience, j'apporte rigueur et fiabilité dans chaque accompagnement.",
              },
              {
                icon: <Target size={28} />,
                title: "Autonomie",
                desc: "L'objectif final est votre indépendance. Je vous transmets les bons réflexes pour que vous puissiez agir seul(e) avec confiance.",
              },
            ].map((value, i) => (
              <div
                key={value.title}
                className="card-service text-center reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                >
                  <span style={{ color: "oklch(0.42 0.06 145)" }}>{value.icon}</span>
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.42 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {value.desc}
                </p>
              </div>
            ))}
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
            Faisons connaissance
          </h2>
          <p
            className="text-lg mb-8 max-w-xl mx-auto"
            style={{ color: "oklch(0.88 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            La première séance est offerte. C'est l'occasion idéale pour se
            rencontrer et voir si mon accompagnement vous correspond.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded font-semibold text-lg transition-all"
            style={{
              backgroundColor: "oklch(0.97 0.01 80)",
              color: "oklch(0.45 0.08 145)",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Me contacter
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
