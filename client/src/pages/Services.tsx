/* ============================================================
   Page Services — Les Petits Papiers Faciles
   Style : Clarté Provençale — deux sections distinctes, cartes détaillées
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  FileText,
  Monitor,
  CheckCircle,
  ArrowRight,
  Calculator,
  Building2,
  Mail,
  Receipt,
  Globe,
  Wifi,
  Send,
  Scan,
  TrendingUp,
} from "lucide-react";

const ADMIN_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663076661026/9oMMWuZH2kFyp4yTio8368/services-admin-lpp-RXGUcxaW9vY3r6SGMTExL5.webp";
const NUMERIQUE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663076661026/9oMMWuZH2kFyp4yTio8368/services-numerique-lpp-HNRcN8iwKENxYW58fVfJtc.webp";

const adminServices = [
  {
    icon: <Calculator size={22} />,
    title: "Impôts et déclarations",
    desc: "Déclaration de revenus en ligne, compréhension de votre avis d'imposition, suivi des remboursements et des prélèvements.",
  },
  {
    icon: <Building2 size={22} />,
    title: "Retraite et dossiers administratifs",
    desc: "Constitution de dossiers de retraite, demandes d'allocations, suivi des courriers avec les organismes (CARSAT, CPAM, CAF…).",
  },
  {
    icon: <Mail size={22} />,
    title: "Courriers et formulaires",
    desc: "Rédaction et envoi de courriers administratifs, compréhension et remplissage de formulaires officiels.",
  },
  {
    icon: <Receipt size={22} />,
    title: "Gestion des factures",
    desc: "Suivi et classement des factures d'énergie, d'eau, d'abonnements téléphoniques ou internet. Aide à la résiliation ou au changement de contrat.",
  },
  {
    icon: <Globe size={22} />,
    title: "Création d'espaces en ligne",
    desc: "Création et configuration de vos espaces personnels : impots.gouv.fr, ameli.fr, info-retraite.fr, France Connect et autres.",
  },
];

const numeriqueServices = [
  {
    icon: <Wifi size={22} />,
    title: "Utiliser internet simplement",
    desc: "Naviguer sur internet, effectuer des recherches, utiliser les sites du quotidien — à votre rythme, sans jargon.",
  },
  {
    icon: <Globe size={22} />,
    title: "Démarches en ligne",
    desc: "Effectuer vos démarches administratives en ligne en toute sécurité : prise de rendez-vous, téléconsultation, formulaires officiels.",
  },
  {
    icon: <Send size={22} />,
    title: "Envoyer documents et emails",
    desc: "Créer et utiliser une boîte mail, envoyer et recevoir des emails, joindre des documents, communiquer avec vos proches.",
  },
  {
    icon: <Scan size={22} />,
    title: "Scanner et organiser ses papiers",
    desc: "Numériser vos documents importants avec votre téléphone ou une imprimante, les classer et les retrouver facilement.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Gagner en autonomie",
    desc: "L'objectif final est que vous soyez autonome. Je vous transmets les bons réflexes pour gérer seul(e) au quotidien.",
  },
];

export default function ServicesPage() {
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
            Mes services
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.80 0.05 145)" }}
          />
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: "oklch(0.85 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Deux domaines d'intervention pour vous accompagner dans toutes vos
            démarches — toujours à votre domicile, à votre rythme.
          </p>
        </div>
      </section>

      {/* ── AIDE ADMINISTRATIVE ── */}
      <section className="section-beige py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4"
                style={{
                  backgroundColor: "oklch(0.95 0.02 145)",
                  color: "oklch(0.42 0.06 145)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <FileText size={14} />
                Domaine 1
              </div>
              <h2
                className="text-4xl font-semibold mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Aide administrative
              </h2>
              <div className="section-divider" />
              <p
                className="text-lg leading-relaxed"
                style={{ color: "oklch(0.38 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Les papiers administratifs peuvent sembler intimidants. Je vous
                aide à les comprendre, à les remplir et à les envoyer — sans
                stress et en toute confiance. Vos papiers remis en ordre :
                classés, compris, suivis.
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.15s" }}>
              <img
                src={ADMIN_IMG}
                alt="Documents administratifs organisés"
                className="rounded-2xl w-full object-cover shadow-lg"
                style={{ maxHeight: "380px" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminServices.map((service, i) => (
              <div
                key={service.title}
                className="card-service reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                >
                  <span style={{ color: "oklch(0.42 0.06 145)" }}>{service.icon}</span>
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.45 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPRENTISSAGE NUMÉRIQUE ── */}
      <section className="section-cream py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="reveal order-2 lg:order-1">
              <img
                src={NUMERIQUE_IMG}
                alt="Apprentissage numérique avec tablette"
                className="rounded-2xl w-full object-cover shadow-lg"
                style={{ maxHeight: "380px" }}
              />
            </div>
            <div className="reveal order-1 lg:order-2" style={{ transitionDelay: "0.15s" }}>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4"
                style={{
                  backgroundColor: "oklch(0.95 0.02 145)",
                  color: "oklch(0.42 0.06 145)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <Monitor size={14} />
                Domaine 2
              </div>
              <h2
                className="text-4xl font-semibold mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Apprentissage numérique
              </h2>
              <div className="section-divider" />
              <p
                className="text-lg leading-relaxed"
                style={{ color: "oklch(0.38 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Téléphone, tablette, ordinateur, internet… Ces outils peuvent
                devenir vos alliés. Je vous accompagne à votre niveau, sans
                jugement, pour que vous gagniez en confiance et en autonomie.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {numeriqueServices.map((service, i) => (
              <div
                key={service.title}
                className="card-service reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(0.95 0.02 145)" }}
                >
                  <span style={{ color: "oklch(0.42 0.06 145)" }}>{service.icon}</span>
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.45 0.02 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {service.desc}
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
            Vous avez un besoin particulier ?
          </h2>
          <p
            className="text-lg mb-8 max-w-xl mx-auto"
            style={{ color: "oklch(0.88 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Chaque situation est unique. Contactez-moi pour qu'on évalue
            ensemble comment je peux vous aider.
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
            Me contacter
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
