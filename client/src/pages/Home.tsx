/* ============================================================
 Page Accueil — Les Petits Papiers Faciles (v2 améliorée)
 Structure claire : aide administrative + accompagnement numérique
 ============================================================ */

import { Link } from "wouter";
import { useEffect, useRef } from "react";
import Testimonials from "../components/Testimonials";
import { useSEOHead } from "../components/SEOHead";
import { useStructuredData, organizationSchema } from "../components/StructuredData";
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

  useSEOHead({
    title: "Aide administrative & accompagnement numérique à Hyères | Les Petits Papiers Faciles",
    description: "Aide administrative et accompagnement numérique à domicile à Hyères, Carqueiranne et communes environnantes. Démarches administratives, sécurité en ligne, autonomie numérique pour seniors.",
    url: "https://lespetitspapiersfaciles.fr",
    keywords: "aide administrative Hyères, accompagnement numérique seniors Var, démarches administratives Hyères, assistance papiers Carqueiranne, aide numérique Le Pradet, autonomie numérique Var, aide administrative La Crau, accompagnement seniors Toulon, sécurité en ligne seniors, Services à la Personne Var",
    type: "website",
  });

  useStructuredData(organizationSchema);

  useEffect(() => {}, []);

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
              "linear-gradient(105deg, oklch(0.42 0.08 145 / 0.70) 0%, oklch(0.48 0.10 145 / 0.55) 50%, oklch(0.42 0.08 145 / 0.35) 100%)",
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
              className="text-4xl md:text-5xl font-semibold leading-tight mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.97 0.01 80)",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
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
                className="btn-sage"
              >
                <CalendarDays size={18} />
                Prendre rendez-vous
              </Link>
              <Link
                href="/services"
                className="btn-outline-sage"
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

      {/* ── SECTION : DEUX TYPES D'AIDE ── */}
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
              color: "oklch(0.45 0.08 145)",
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
              <div className="mb-6 flex justify-center">
                <div className="w-48 h-48 flex items-center justify-center" dangerouslySetInnerHTML={{__html: `
<div style="width:192px;height:192px;position:relative;border-radius:12px;overflow:hidden;">
  <div style="position:absolute;inset:0;background:linear-gradient(145deg,#e8dfc8 0%,#d4c9a8 40%,#c8bc96 100%);"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 20%, rgba(255,248,220,0.6) 0%, transparent 60%);"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:155px;background:linear-gradient(175deg,#c8b882 0%,#b8a870 30%,#a89860 60%,#988850 100%);border-radius:0 0 12px 12px;box-shadow:inset 0 4px 12px rgba(0,0,0,0.2);"></div>
  <div style="position:absolute;bottom:50px;left:32px;width:100px;height:120px;background:linear-gradient(160deg,#f0e8d0 0%,#e8dcc0 100%);border-radius:2px;box-shadow:2px 3px 8px rgba(0,0,0,0.15);transform:rotate(4deg);opacity:0.85;"></div>
  <div style="position:absolute;bottom:54px;left:22px;width:102px;height:125px;background:linear-gradient(160deg,#fdf8ee 0%,#f5edd6 100%);border-radius:2px 10px 2px 2px;box-shadow:3px 4px 12px rgba(0,0,0,0.25);transform:rotate(-3deg);">
    <div style="position:absolute;top:0;right:0;width:18px;height:18px;background:linear-gradient(225deg,#e0d5b0 50%,#f5edd6 50%);border-radius:0 10px 0 0;"></div>
    <div style="padding:22px 11px 11px;">
      <div style="height:3px;border-radius:1px;margin-bottom:9px;background:rgba(59,101,69,0.35);width:70%;"></div>
      <div style="height:1px;border-radius:1px;margin-bottom:8px;background:rgba(201,168,76,0.5);width:100%;"></div>
      <div style="height:2px;border-radius:1px;margin-bottom:7px;background:rgba(59,101,69,0.18);width:80%;"></div>
      <div style="height:2px;border-radius:1px;margin-bottom:7px;background:rgba(59,101,69,0.18);width:60%;"></div>
      <div style="height:2px;border-radius:1px;margin-bottom:7px;background:rgba(59,101,69,0.18);width:75%;"></div>
      <div style="height:2px;border-radius:1px;margin-bottom:7px;background:rgba(59,101,69,0.18);width:65%;"></div>
      <div style="display:flex;align-items:center;gap:5px;margin-top:8px;">
        <div style="width:11px;height:11px;border:1.5px solid rgba(59,101,69,0.6);border-radius:2px;display:flex;align-items:center;justify-content:center;font-size:8px;color:rgba(59,101,69,0.8);">✓</div>
        <div style="height:2px;border-radius:1px;background:rgba(59,101,69,0.18);width:55%;"></div>
      </div>
    </div>
  </div>
  <div style="position:absolute;bottom:42px;right:14px;width:58px;height:40px;background:linear-gradient(160deg,#f8f2e0 0%,#ede4c8 100%);border-radius:3px;box-shadow:2px 3px 8px rgba(0,0,0,0.2);transform:rotate(6deg);overflow:hidden;">
    <div style="position:absolute;top:0;left:0;right:0;height:0;border-left:29px solid transparent;border-right:29px solid transparent;border-top:16px solid rgba(201,168,76,0.35);"></div>
  </div>
  <div style="position:absolute;top:18px;left:16px;width:42px;height:42px;border-radius:50%;background:radial-gradient(circle,#c9a84c 0%,#b89830 60%,#a88820 100%);box-shadow:0 3px 10px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;border:2px solid #a88820;">
    <div style="width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,248,180,0.5);display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-size:7px;color:rgba(250,246,230,0.9);text-align:center;line-height:1.2;font-style:italic;">Les Petits Papiers</div>
  </div>
  <div style="position:absolute;top:42px;right:17px;width:8px;height:105px;transform:rotate(28deg);transform-origin:50% 90%;">
    <div style="position:absolute;top:0;left:0;right:0;height:19px;background:linear-gradient(180deg,#d4a830 0%,#c9a84c 40%,#b89830 100%);clip-path:polygon(30% 0%,70% 0%,100% 100%,0% 100%);"></div>
    <div style="position:absolute;top:18px;left:1px;right:1px;height:4px;background:linear-gradient(90deg,#c9a84c,#e8c86a,#c9a84c);border-radius:1px;"></div>
    <div style="position:absolute;top:21px;left:2px;right:2px;bottom:0;background:linear-gradient(90deg,#1a2a18,#2a3a28,#1a2a18);border-radius:0 0 2px 2px;"></div>
  </div>
  <div style="position:absolute;top:0;left:0;right:0;height:95px;background:radial-gradient(ellipse at 40% 10%, rgba(255,252,220,0.5) 0%, transparent 55%);pointer-events:none;"></div>
</div>
`}} />
              </div>
              <div
                className="flex items-center gap-3 mb-6"
                style={{ color: "oklch(0.45 0.08 145)" }}
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
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                  <span>Aide pour les démarches administratives en ligne (CAF, impôts, Ameli, retraite)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                  <span>Compréhension ou rédaction de courriers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                  <span>Organisation et classement de documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                  <span>Accompagnement dans certaines démarches importantes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
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
              <div className="mb-6 flex justify-center">
                <div className="w-48 h-48 flex items-center justify-center" dangerouslySetInnerHTML={{__html: `
<div style="width:192px;height:192px;position:relative;border-radius:12px;overflow:hidden;">
  <div style="position:absolute;inset:0;background:linear-gradient(145deg,#dde8d5 0%,#c8dcc0 40%,#b8cca8 100%);"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 35% 25%, rgba(240,255,230,0.65) 0%, transparent 60%);"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:150px;background:linear-gradient(175deg,#b8d0a8 0%,#a8c098 30%,#98b088 100%);border-radius:0 0 12px 12px;"></div>
  <div style="position:absolute;top:22px;left:27px;width:104px;height:140px;background:linear-gradient(160deg,#1c2820 0%,#243228 50%,#1c2820 100%);border-radius:10px;box-shadow:4px 6px 18px rgba(0,0,0,0.5);">
    <div style="position:absolute;top:8px;left:6px;right:6px;bottom:16px;background:linear-gradient(160deg,#e8f4e8 0%,#dceee0 100%);border-radius:6px;overflow:hidden;">
      <div style="position:absolute;top:0;left:0;width:55%;height:35%;background:linear-gradient(135deg,rgba(255,255,255,0.35) 0%,transparent 70%);border-radius:6px 0 0 0;z-index:2;pointer-events:none;"></div>
      <div style="position:absolute;top:0;left:0;right:0;height:16px;background:linear-gradient(90deg,#3b6545,#4a7a55);display:flex;align-items:center;justify-content:center;">
        <span style="font-family:Georgia,serif;font-size:5.5px;color:rgba(240,248,234,0.95);font-style:italic;letter-spacing:0.05em;">✦ Mes démarches ✦</span>
      </div>
      <div style="position:absolute;top:20px;left:6px;right:6px;display:grid;grid-template-columns:repeat(3,1fr);gap:5px;">
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#3b6545,#5a8a65);display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">📧</div>
          <span style="font-family:Georgia,serif;font-size:4.5px;color:#2a4a30;margin-top:1px;">Email</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#4a7055,#6a9070);display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">🏥</div>
          <span style="font-family:Georgia,serif;font-size:4.5px;color:#2a4a30;margin-top:1px;">Ameli</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#c9a84c,#e0c060);display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">📑</div>
          <span style="font-family:Georgia,serif;font-size:4.5px;color:#2a4a30;margin-top:1px;">Impôts</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#5a7a65,#78a080);display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">👴</div>
          <span style="font-family:Georgia,serif;font-size:4.5px;color:#2a4a30;margin-top:1px;">Retraite</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#3b5a45,#5a7a60);display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">📂</div>
          <span style="font-family:Georgia,serif;font-size:4.5px;color:#2a4a30;margin-top:1px;">Docs</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#b89830,#d4b040);display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">⭐</div>
          <span style="font-family:Georgia,serif;font-size:4.5px;color:#2a4a30;margin-top:1px;">Favoris</span>
        </div>
      </div>
      <div style="position:absolute;bottom:6px;left:6px;right:6px;height:14px;background:#3b6545;border-radius:4px;display:flex;align-items:center;justify-content:center;">
        <span style="font-family:Georgia,serif;font-size:5px;color:#f0f8f0;">Valider →</span>
      </div>
    </div>
    <div style="position:absolute;bottom:5px;left:50%;transform:translateX(-50%);width:14px;height:5px;background:rgba(70,100,70,0.5);border-radius:3px;"></div>
  </div>
  <svg style="position:absolute;bottom:0;left:0;right:0;width:100%;height:105px;" viewBox="0 0 192 105" preserveAspectRatio="xMidYMax meet">
    <path d="M24,105 C16,105 8,96 8,86 L8,52 C8,48 11,46 14,48 L14,34 C14,30 18,29 21,31 L21,22 C21,18 25,17 28,19 L28,26 C31,21 36,21 36,27 L36,42 C39,37 45,38 45,46 L45,64 C45,80 40,96 32,103 Z" fill="#d4c8a8" stroke="#b8a888" stroke-width="0.8"/>
    <path d="M168,105 C176,105 184,96 184,86 L184,52 C184,48 181,46 178,48 L178,34 C178,30 174,29 171,31 L171,22 C171,18 167,17 164,19 L164,26 C161,21 156,21 156,27 L156,42 C153,37 147,38 147,46 L147,64 C147,80 152,96 160,103 Z" fill="#ccc0a0" stroke="#b8a888" stroke-width="0.8"/>
    <circle cx="96" cy="24" r="5" fill="rgba(201,168,76,0.55)"/>
    <circle cx="96" cy="24" r="8.5" fill="none" stroke="rgba(201,168,76,0.35)" stroke-width="1"/>
    <circle cx="96" cy="24" r="12" fill="none" stroke="rgba(201,168,76,0.2)" stroke-width="0.8"/>
  </svg>
  <div style="position:absolute;top:0;left:0;right:0;height:88px;background:radial-gradient(ellipse at 40% 10%, rgba(240,255,220,0.5) 0%, transparent 55%);pointer-events:none;"></div>
</div>
`}} />
              </div>
              <div
                className="flex items-center gap-3 mb-6"
                style={{ color: "oklch(0.45 0.08 145)" }}
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
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                  <span>Apprendre à utiliser un smartphone ou une tablette</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                  <span>Envoyer des photos ou des documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                  <span>Comprendre Internet et les démarches en ligne</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                  <span>Apprendre les bases de l'informatique simplement</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
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
              style={{ color: "oklch(0.45 0.08 145)" }}
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
                <GraduationCap size={20} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                <span>Associations et groupes</span>
              </li>
              <li className="flex items-start gap-3">
                <Users size={20} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                <span>Groupes de seniors</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen size={20} className="mt-1 flex-shrink-0" style={{ color: "oklch(0.45 0.08 145)" }} />
                <span>Structures locales (médiathèques, centres sociaux, résidences seniors)</span>
              </li>
            </ul>

            <div
              className="p-4 rounded-lg mb-8"
              style={{
                backgroundColor: "oklch(0.45 0.08 145 / 0.08)",
                border: "2px solid oklch(0.45 0.08 145 / 0.20)",
              }}
            >
              <h4
                className="font-semibold mb-3"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.45 0.08 145)",
                }}
              >
                📚 Supports Pédagogiques Inclus :
              </h4>
              <ul
                className="space-y-2 text-sm"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.30 0.07 145 / 0.85)",
                }}
              >
                <li className="flex items-start gap-2">
                  <span style={{ color: "oklch(0.45 0.08 145)" }}>✓</span>
                  <span>Fiches pratiques à emporter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "oklch(0.45 0.08 145)" }}>✓</span>
                  <span>Guides illustrés étape par étape</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "oklch(0.45 0.08 145)" }}>✓</span>
                  <span>Ressources numériques accessibles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "oklch(0.45 0.08 145)" }}>✓</span>
                  <span>Exercices pratiques et mises en situation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "oklch(0.45 0.08 145)" }}>✓</span>
                  <span>Support post-atelier par email ou téléphone</span>
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold"
              style={{
                backgroundColor: "oklch(0.45 0.08 145)",
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
              color: "oklch(0.45 0.08 145)",
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
                    backgroundColor: "oklch(0.45 0.08 145)",
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
                    color: "oklch(0.45 0.08 145)",
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
                color: "oklch(0.45 0.08 145)",
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
                  border: "4px solid oklch(0.45 0.08 145)",
                }}
              />
            </div>

            <div>
              <h2
                className="text-4xl md:text-5xl font-semibold mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "oklch(0.45 0.08 145)",
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
                  backgroundColor: "oklch(0.45 0.08 145)",
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

      {/* ── SECTION : CONFIDENTIALITÉ & AVANTAGES FISCAUX ── */}
      <section
        className="py-20 reveal"
        style={{
          backgroundColor: "oklch(0.42 0.06 145 / 0.08)",
        }}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* CONFIDENTIALITÉ */}
            <div
              className="p-8 rounded-lg"
              style={{
                backgroundColor: "oklch(0.97 0.01 80)",
                border: "2px solid oklch(0.45 0.08 145 / 0.20)",
              }}
            >
              <div
                className="flex items-center gap-3 mb-4"
                style={{ color: "oklch(0.45 0.08 145)" }}
              >
                <Shield size={28} />
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  Confidentialité Absolue
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.30 0.07 145 / 0.85)",
                  lineHeight: "1.8",
                }}
              >
                Vos documents personnels (impôts, retraite, allocations, courriers sensibles) sont traités avec le plus grand respect et la plus stricte confidentialité. <strong>Aucune information ne sera jamais partagée</strong> en dehors de votre accompagnement.
              </p>
              <div
                className="mt-4 p-4 rounded"
                style={{
                  backgroundColor: "oklch(0.97 0.01 80)",
                  border: "1px solid oklch(0.45 0.08 145 / 0.15)",
                }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: "oklch(0.45 0.08 145)",
                  }}
                >
                  ✓ Professionnel agréé Services à la Personne
                </p>
              </div>
            </div>

            {/* CRÉDIT D'IMPÔT */}
            <div
              className="p-8 rounded-lg"
              style={{
                backgroundColor: "oklch(0.97 0.01 80)",
                border: "2px solid oklch(0.45 0.08 145 / 0.20)",
              }}
            >
              <div
                className="flex items-center gap-3 mb-4"
                style={{ color: "oklch(0.45 0.08 145)" }}
              >
                <FileCheck size={28} />
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  Crédit d'Impôt 50%
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.30 0.07 145 / 0.85)",
                  lineHeight: "1.8",
                }}
              >
                Grâce au statut Services à la Personne, <strong>l'État rembourse 50% de vos dépenses</strong>. Si vous payez 42€, vous ne débourserez réellement que 21€ après le crédit d'impôt.
              </p>
              <div
                className="mt-4 p-4 rounded"
                style={{
                  backgroundColor: "oklch(0.97 0.01 80)",
                  border: "1px solid oklch(0.45 0.08 145 / 0.15)",
                }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: "oklch(0.45 0.08 145)",
                  }}
                >
                  ✓ Applicable à tous (imposables ou non)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION : TESTIMONIALS ── */}
      <Testimonials />

      {/* ── SECTION : BLOG PREVIEW ── */}
      <section className="py-20 reveal" style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2
                className="text-4xl md:text-5xl font-semibold mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "oklch(0.45 0.08 145)",
                }}
              >
                Derniers articles du blog
              </h2>
              <p
                className="text-lg max-w-2xl"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.30 0.07 145 / 0.85)",
                }}
              >
                Conseils et astuces pour mieux gérer vos démarches administratives et numériques.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
              style={{ color: "oklch(0.45 0.08 145)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Voir tout le blog <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: "demarches-administratives-en-ligne",
                title: "Démarches Administratives en Ligne",
                excerpt: "Impôts, retraite, allocations... Un guide pratique pour accomplir vos démarches simplement.",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663076661026/9oMMWuZH2kFyp4yTio8368/senior-demarches-administratives-mVEcWQmH4En93N4KYNSVNT.webp",
                category: "Démarches"
              },
              {
                id: "securite-numerique-seniors",
                title: "Sécurité Numérique pour les Seniors",
                excerpt: "Découvrez comment reconnaître les arnaques et naviguer en ligne en toute confiance.",
                image: "/images/blog/securite-numerique.jpg",
                category: "Sécurité"
              },
              {
                id: "autonomie-numerique-seniors",
                title: "L'Autonomie Numérique",
                excerpt: "Pourquoi maîtriser les outils numériques transforme la vie des seniors au quotidien.",
                image: "/images/blog/autonomie-numerique.jpg",
                category: "Autonomie"
              }
            ].map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <article
                  className="group cursor-pointer rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col"
                  style={{ backgroundColor: "white", border: "1px solid oklch(0.90 0.02 80)" }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span
                      className="text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: "oklch(0.45 0.08 145)" }}
                    >
                      {post.category}
                    </span>
                    <h3
                      className="text-xl font-semibold mb-3 group-hover:text-[oklch(0.45_0.08_145)] transition-colors"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "oklch(0.45 0.08 145)" }}>
                      Lire l'article <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION : CTA FINAL ── */}
      <section
        className="py-20 reveal"
        style={{
          backgroundColor: "oklch(0.45 0.08 145)",
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
                color: "oklch(0.45 0.08 145)",
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
