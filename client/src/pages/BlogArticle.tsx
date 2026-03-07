/* ============================================================
   Page Article Blog — Les Petits Papiers Faciles
   Affichage détaillé d'un article
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Streamdown } from "streamdown";

// Articles du blog
const BLOG_ARTICLES: Record<
  string,
  {
    title: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    content: string;
  }
> = {
  "autonomie-numerique-seniors": {
    title: "L'Autonomie Numérique pour les Seniors : Un Enjeu de Liberté et de Dignité",
    date: "7 mars 2026",
    readTime: "8 min",
    category: "Accompagnement numérique",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663076661026/9oMMWuZH2kFyp4yTio8368/blog-autonomie-numerique.jpg",
    content: `# L'Autonomie Numérique pour les Seniors : Un Enjeu de Liberté et de Dignité

## Introduction

À l'ère du numérique, internet n'est plus un luxe réservé aux jeunes générations — c'est devenu une nécessité pour accéder aux services essentiels. Démarches administratives en ligne, prise de rendez-vous médicaux, consultation de comptes bancaires, communication avec la famille : tout passe désormais par l'écran. Pour les seniors, cette transition numérique représente un défi majeur, mais aussi une opportunité extraordinaire de retrouver autonomie, indépendance et connexion avec le monde.

Cet article explore pourquoi l'autonomie numérique est cruciale pour les seniors et comment elle transforme la vie quotidienne.

## Pourquoi l'Autonomie Numérique Est Essentielle

### Accès aux Services Publics et Administratifs

Les administrations françaises ont massivement dématérialisé leurs services. Aujourd'hui, il est quasiment impossible de gérer ses impôts, sa retraite ou ses allocations sans accès à un ordinateur ou un smartphone. Les seniors qui ne maîtrisent pas ces outils se retrouvent dépendants d'un tiers pour accomplir des démarches simples, ce qui génère frustration et perte d'autonomie.

Pouvoir consulter son compte impôts.gouv.fr, vérifier son dossier retraite ou demander une allocation directement en ligne représente une liberté retrouvée.

### Santé et Bien-Être

L'accès aux services de santé en ligne s'est considérablement développé. Prendre rendez-vous chez son médecin, consulter ses résultats d'analyses, renouveler ses ordonnances : toutes ces actions requièrent des compétences numériques de base. Un senior autonome numériquement peut gérer sa santé de manière proactive et indépendante.

### Lien Social et Famille

Le numérique est un formidable outil de connexion. Appels vidéo avec les petits-enfants, partage de photos, messages instantanés : ces technologies réduisent l'isolement et maintiennent les liens familiaux, particulièrement pour les seniors éloignés géographiquement de leur famille.

### Sécurité Financière

Comprendre les arnaques en ligne, reconnaître un email de phishing, sécuriser ses données bancaires : l'autonomie numérique inclut aussi la capacité à se protéger. Un senior informé est un senior moins vulnérable aux fraudes.

## Les Obstacles à Surmonter

### La Peur de l'Inconnu

Beaucoup de seniors ont grandi sans technologie. Cette absence de familiarité crée une appréhension naturelle : « Et si je me trompe ? Et si je casse quelque chose ? » Cette peur est légitime mais surmontable avec un accompagnement bienveillant.

### La Complexité Perçue

Les interfaces numériques ne sont pas toujours intuitives. Les menus imbriqués, les termes techniques, les mises à jour constantes : tout cela peut sembler insurmontable. Pourtant, avec une explication progressive et patiente, ces obstacles deviennent franchissables.

### L'Isolement Numérique

Certains seniors n'ont personne pour les aider à progresser. Pas de petit-enfant disponible, pas d'ami technophile : cet isolement renforce le sentiment d'exclusion du monde numérique.

## Comment Progresser Vers l'Autonomie

### Commencer par les Bases

L'autonomie numérique ne s'acquiert pas en un jour. Elle se construit étape par étape : allumer l'ordinateur, utiliser la souris, naviguer sur internet, puis progressivement accéder aux services en ligne. Chaque petit progrès renforce la confiance.

### Apprendre à Son Rythme

Il n'y a pas de limite de temps. Prendre une heure pour comprendre comment envoyer un email n'est pas une perte de temps — c'est un investissement dans l'autonomie future. La patience est la clé.

### S'Entourer de Soutien Bienveillant

Un accompagnateur patient, sans jugement, fait toute la différence. Que ce soit un membre de la famille, un ami ou un professionnel, avoir quelqu'un qui explique simplement, sans condescendance, transforme l'expérience d'apprentissage.

### Pratiquer Régulièrement

Comme toute compétence, le numérique s'oublie si on ne le pratique pas. Une utilisation régulière — même 15 minutes par jour — consolide les apprentissages et renforce la confiance.

## Les Bénéfices Concrets de l'Autonomie Numérique

### Liberté et Indépendance

Un senior autonome numériquement n'a plus besoin d'attendre que quelqu'un d'autre fasse ses démarches. Il peut agir quand il le souhaite, à son rythme, sans dépendre de la disponibilité d'un tiers.

### Confiance en Soi

Chaque démarche réussie en ligne renforce l'estime de soi. Réussir à prendre rendez-vous seul, consulter ses comptes, envoyer un email : ces petites victoires quotidiennes restaurent la confiance en ses capacités.

### Économies de Temps et d'Argent

Pouvoir gérer ses affaires en ligne 24h/24 sans avoir à se déplacer ou à payer quelqu'un pour le faire représente des économies significatives et un gain de temps précieux.

### Accès à l'Information et à la Culture

Internet offre un accès illimité à l'information, aux loisirs, à la culture. Un senior autonome peut explorer, apprendre, se divertir selon ses intérêts : documentaires, livres numériques, jeux, apprentissage de nouvelles compétences.

## Conclusion

L'autonomie numérique n'est pas un luxe — c'est un droit. Elle permet aux seniors de conserver leur indépendance, de rester connectés au monde et de vivre avec dignité à l'ère du numérique.

Le chemin vers cette autonomie demande de la patience, de la bienveillance et un accompagnement adapté. Mais les bénéfices — liberté, confiance, connexion, sécurité — en valent largement la peine.

Chez **Les Petits Papiers Faciles**, nous croyons fermement que chacun peut devenir autonome numériquement. Notre mission est d'accompagner les seniors dans ce voyage, étape par étape, sans jugement et avec toute la patience nécessaire. Parce que l'autonomie numérique, c'est la liberté retrouvée.`,
  },
};

export default function BlogArticlePage() {
  const { id } = useParams<{ id: string }>();
  const pageRef = useRef<HTMLDivElement>(null);

  const article = id ? BLOG_ARTICLES[id] : null;

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Blog | Les Petits Papiers Faciles`;
    }
  }, [article]);

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

  if (!article) {
    return (
      <div ref={pageRef} style={{ paddingTop: "72px" }}>
        <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
          <div className="container text-center">
            <h1
              className="text-4xl font-semibold mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "oklch(0.30 0.07 145)",
              }}
            >
              Article non trouvé
            </h1>
            <Link href="/blog">
              <button
                className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "oklch(0.30 0.07 145)",
                  color: "oklch(0.97 0.01 80)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Retour au blog
              </button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div ref={pageRef} style={{ paddingTop: "72px" }}>
      {/* ── BACK BUTTON ── */}
      <div
        className="py-6"
        style={{ backgroundColor: "oklch(0.97 0.01 80)", borderBottom: "1px solid oklch(0.90 0.02 80)" }}
      >
        <div className="container">
          <Link href="/blog">
            <button className="flex items-center gap-2 transition-all hover:gap-3">
              <ArrowLeft size={18} />
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.42 0.06 145)",
                  fontWeight: "600",
                }}
              >
                Retour au blog
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* ── HEADER ── */}
      <section
        className="py-12"
        style={{ backgroundColor: "oklch(0.30 0.07 145)" }}
      >
        <div className="container">
          <h1
            className="text-5xl font-semibold mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.90 0.02 80)",
                }}
              >
                {article.date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.90 0.02 80)",
                }}
              >
                {article.readTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "oklch(0.90 0.02 80)",
                }}
              >
                {article.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE ── */}
      <section style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
        <div className="w-full h-96 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── CONTENU ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
        <div className="container max-w-3xl">
          <div
            className="prose prose-lg"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "oklch(0.30 0.07 145)",
              lineHeight: "1.8",
            }}
          >
            <Streamdown>{article.content}</Streamdown>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.30 0.07 145) 0%, oklch(0.35 0.08 145) 100%)",
        }}
      >
        <div className="container text-center">
          <h2
            className="text-4xl font-semibold mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Besoin d'aide pour vos démarches ?
          </h2>
          <p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "oklch(0.90 0.02 80)",
            }}
          >
            Contactez-moi pour un accompagnement personnalisé. Un premier
            échange permet déjà d'y voir plus clair.
          </p>
          <Link href="/contact">
            <button
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "oklch(0.94 0.02 80)",
                color: "oklch(0.30 0.07 145)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Me contacter
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
