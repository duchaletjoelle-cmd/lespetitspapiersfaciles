/* ============================================================
 Page Accueil — Les Petits Papiers Faciles (v2 optimisée)
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
  Lock,
  Heart,
  Zap,
  HelpCircle,
} from "lucide-react";

const HERO_IMG = "/img/hero-new.jpg";

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
      {/* ── 1. HERO ── */}
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
              "linear-gradient(105deg, oklch(0.93 0.04 80 / 0.75) 0%, oklch(0.88 0.06 82 / 0.55) 50%, oklch(0.93 0.04 80 / 0.35) 100%)",
          }}
        />

        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{
                backgroundColor: "oklch(0.72 0.10 82 / 0.15)",
                color: "oklch(0.30 0.04 72)",
                border: "1px solid oklch(0.72 0.10 82 / 0.50)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <Shield size={14} />
              Activité déclarée Services à la Personne
            </div>

            <h1
              className="text-4xl md:text-6xl font-semibold leading-tight mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.25 0.03 72)",
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              }}
            >
              Vos démarches administratives, simplement et en toute confiance
            </h1>

            <p
              className="text-2xl md:text-3xl font-medium mb-10 max-w-2xl"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "oklch(0.35 0.04 72)",
                lineHeight: "1.4",
              }}
            >
              Je vous accompagne pas à pas, avec bienveillance, clarté et confidentialité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/rendez-vous"
                className="btn-sage text-lg px-8 py-4"
              >
                <CalendarDays size={20} />
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. BLOC CONFIANCE ── */}
      <section className="py-16 bg-white reveal">
        <div className="container">
          <div 
            className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl text-center"
            style={{
              backgroundColor: "oklch(0.98 0.01 80)",
              border: "1px solid oklch(0.90 0.02 80)",
              boxShadow: "0 10px 30px -10px oklch(0.30 0.04 72 / 0.1)"
            }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: "oklch(0.93 0.04 80)", color: "oklch(0.45 0.05 145)" }}>
              <Lock size={32} />
            </div>
            <h2 
              className="text-3xl md:text-4xl font-semibold mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.04 72)" }}
            >
              Confidentialité et discrétion garanties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Vos documents et informations personnelles sont traités avec le plus grand respect. 
              <strong> Aucune donnée n’est transmise sans votre accord.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. CE QUE JE PROPOSE ── */}
      <section className="py-24 bg-gray-50 reveal">
        <div className="container">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-semibold mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.04 72)" }}
            >
              Un accompagnement sur mesure
            </h2>
            <p className="text-xl text-gray-600 italic">
              “Je m’adapte à votre situation, à votre rythme, et je vous explique chaque étape.”
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FileText />, title: "Aide aux démarches administratives", desc: "CAF, impôts, Ameli, courriers divers..." },
              { icon: <GraduationCap />, title: "Dossiers retraite", desc: "Préparation, liquidation et suivi de vos droits." },
              { icon: <FileCheck />, title: "Courriers et formulaires", desc: "Rédaction, compréhension et organisation." },
              { icon: <Monitor />, title: "Accompagnement numérique", desc: "Smartphone, tablette, ordinateur et internet." },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: "oklch(0.93 0.04 80)", color: "oklch(0.45 0.05 145)" }}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: "oklch(0.30 0.04 72)" }}>{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. POUR QUI ? ── */}
      <section className="py-24 bg-white reveal">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 
                className="text-4xl md:text-5xl font-semibold mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.04 72)" }}
              >
                Vous n’êtes pas seul(e) face aux démarches
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Mon service s'adresse à toute personne ayant besoin d'un coup de pouce bienveillant pour gérer son quotidien administratif et numérique.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Heart />, title: "Seniors", text: "Pour rester autonome et serein face aux outils modernes." },
                  { icon: <Zap />, title: "Personnes en difficulté", text: "Pour ne plus subir la complexité administrative." },
                  { icon: <Users />, title: "Proches aidants", text: "Pour vous décharger de la gestion administrative de vos proches." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 text-sage-600" style={{ color: "oklch(0.45 0.05 145)" }}>{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold" style={{ color: "oklch(0.30 0.04 72)" }}>{item.title}</h4>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={PROFILE_IMG} 
                  alt="Sandra Duchalet" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="absolute -bottom-6 -right-6 p-8 rounded-xl shadow-xl max-w-xs hidden md:block"
                style={{ backgroundColor: "oklch(0.30 0.04 72)", color: "white" }}
              >
                <p className="italic text-lg">"Ma mission : vous rendre autonome avec patience et pédagogie."</p>
                <p className="mt-4 font-semibold">— Sandra Duchalet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. BLOC RASSURANT ── */}
      <section className="py-20 reveal" style={{ backgroundColor: "oklch(0.93 0.04 80)" }}>
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <HelpCircle size={48} className="mx-auto mb-8" style={{ color: "oklch(0.45 0.05 145)" }} />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.04 72)" }}>
              “Certaines démarches peuvent avoir des conséquences financières importantes. 
              Je vous aide à y voir clair avant de prendre une décision.”
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. APPEL À L'ACTION ── */}
      <section className="py-24 bg-white reveal">
        <div className="container text-center">
          <h2 
            className="text-4xl md:text-5xl font-semibold mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.04 72)" }}
          >
            Besoin d’aide ? Parlons-en simplement.
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Un premier échange par téléphone permet déjà d'y voir plus clair sur vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/contact"
              className="btn-sage text-xl px-10 py-5"
            >
              <MessageCircle size={24} />
              Prendre contact
            </Link>
            <a
              href="tel:0750527227"
              className="btn-outline-sage text-xl px-10 py-5"
            >
              <Phone size={24} />
              07 50 52 72 27
            </a>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
