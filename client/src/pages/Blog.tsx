/* ============================================================
   Page Blog — Les Petits Papiers Faciles
   Liste des articles et détail des articles
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { useSEOHead } from "../components/SEOHead";

// Articles du blog
const BLOG_ARTICLES = [
  {
    id: "securite-numerique-seniors",
    title: "Sécurité Numérique pour les Seniors : Se Protéger en Ligne sans Panique",
    excerpt:
      "Internet offre des opportunités extraordinaires, mais aussi des risques. Découvrez comment reconnaître les arnaques, créer des mots de passe forts et naviguer en ligne en toute confiance.",
    date: "8 mars 2026",
    readTime: "10 min",
    category: "Sécurité numérique",
    image: "/images/blog/securite-numerique.jpg",
    content: `# Sécurité Numérique pour les Seniors : Se Protéger en Ligne sans Panique

## Introduction

Internet offre des opportunités extraordinaires — accès aux services, communication avec la famille, apprentissage — mais il présente aussi des risques réels. Les seniors sont particulièrement ciblés par les arnaqueurs en ligne, non pas parce qu'ils sont moins intelligents, mais parce que les criminels savent qu'ils sont souvent plus confiants et moins familiers avec les pièges numériques.

La bonne nouvelle ? **La sécurité numérique n'est pas compliquée.** Avec quelques règles simples et du bon sens, vous pouvez naviguer sur internet en toute confiance et protéger vos données personnelles et financières.

## Comprendre les Menaces Principales

### Les Arnaques par Email (Phishing)

Le phishing est une technique où les arnaqueurs se font passer pour une organisation de confiance (votre banque, Amazon, la Sécurité Sociale) pour vous voler vos identifiants. Un email de phishing ressemble souvent à un vrai email, avec le logo officiel et un message urgent.

**La règle d'or** : Une vraie banque ou administration ne vous demandera JAMAIS votre mot de passe par email.

### Les Faux Appels Téléphoniques (Tech Support Scams)

Vous recevez un appel téléphonique d'une personne prétendant travailler pour Microsoft, Apple ou votre fournisseur internet. Elle vous dit qu'il y a un virus sur votre ordinateur et vous demande de lui donner accès à distance.

**C'est une arnaque.** Les vraies entreprises ne vous appellent pas de cette façon.

## Les Bonnes Pratiques de Sécurité

### 1. Créer des Mots de Passe Forts

Un bon mot de passe est votre première ligne de défense. Utilisez au moins 12 caractères avec un mélange de majuscules, minuscules, chiffres et symboles.

### 2. Activer l'Authentification à Deux Facteurs (2FA)

L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire. Un code est envoyé à votre téléphone pour confirmer votre identité lors de la connexion.

## Conclusion

La sécurité numérique n'est pas une question de technologie complexe — c'est du bon sens appliqué à internet. En suivant ces règles simples, vous pouvez profiter d'internet en toute confiance, sans peur.

Chez **Les Petits Papiers Faciles**, nous sommes là pour vous aider à naviguer le monde numérique de manière sûre et confiante.`,
  },
  {
    id: "autonomie-numerique-seniors",
    title: "L'Autonomie Numérique pour les Seniors : Un Enjeu de Liberté et de Dignité",
    excerpt:
      "À l'ère du numérique, l'autonomie n'est plus un luxe — c'est une nécessité. Découvrez pourquoi maîtriser les outils numériques transforme la vie des seniors et comment progresser à son rythme.",
    date: "7 mars 2026",
    readTime: "8 min",
    category: "Accompagnement numérique",
    image: "/images/blog/autonomie-numerique.jpg",
    content: `# L'Autonomie Numérique pour les Seniors : Un Enjeu de Liberté et de Dignité

## Introduction

À l'ère du numérique, internet n'est plus un luxe réservé aux jeunes générations — c'est devenu une nécessité pour accéder aux services essentiels. Démarches administratives en ligne, prise de rendez-vous médicaux, consultation de comptes bancaires, communication avec la famille : tout passe désormais par l'écran.

## Pourquoi l'Autonomie Numérique Est Essentielle

### Accès aux Services Publics et Administratifs

Les administrations françaises ont massivement dématérialisé leurs services. Aujourd'hui, il est quasiment impossible de gérer ses impôts, sa retraite ou ses allocations sans accès à un ordinateur ou un smartphone.

### Lien Social et Famille

Le numérique est un formidable outil de connexion. Appels vidéo avec les petits-enfants, partage de photos, messages instantanés : ces technologies réduisent l'isolement et maintiennent les liens familiaux.

## Conclusion

L'autonomie numérique n'est pas un luxe — c'est un droit. Elle permet aux seniors de conserver leur indépendance, de rester connectés au monde et de vivre avec dignité à l'ère du numérique.

Chez **Les Petits Papiers Faciles**, nous croyons fermement que chacun peut devenir autonome numériquement. Notre mission est d'accompagner les seniors dans ce voyage, étape par étape, sans jugement et avec toute la patience nécessaire.`,
  },
  {
    id: "organisation-papiers-administratifs",
    title: "L'Art d'Organiser ses Papiers : Gagner en Sérénité au Quotidien",
    excerpt:
      "Accumulation de courriers, dossiers éparpillés, factures perdues... L'organisation administrative peut vite devenir une source de stress. Découvrez nos conseils pour trier, classer et retrouver vos documents en un clin d'œil.",
    date: "5 mars 2026",
    readTime: "7 min",
    category: "Aide administrative",
    image: "/images/blog/organisation-papiers.jpg",
    content: `# L'Art d'Organiser ses Papiers : Gagner en Sérénité au Quotidien

## Pourquoi s'organiser ?

Une bonne organisation administrative n'est pas qu'une question de rangement, c'est avant tout un moyen de libérer son esprit. Savoir exactement où se trouve chaque document important réduit considérablement le stress lié aux échéances et aux démarches imprévues.

## Les étapes clés d'un tri efficace

1. **Le grand déballage** : Rassemblez tous vos papiers au même endroit.
2. **Le tri par catégorie** : Santé, Logement, Banque, Impôts, Travail/Retraite.
3. **L'élimination** : Vérifiez les délais de conservation légaux et jetez ce qui n'est plus nécessaire.

## Nos astuces pour un classement durable

- Utilisez des **chemises de couleurs** différentes pour chaque thématique.
- Étiquetez clairement chaque dossier.
- Prévoyez une bannette "À traiter" pour le courrier entrant.

Chez **Les Petits Papiers Faciles**, nous vous aidons à mettre en place ce système chez vous, pour que l'administration ne soit plus une corvée.`,
  },
];

export default function BlogPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useSEOHead({
    title: "Blog | Les Petits Papiers Faciles",
    description: "Decouvrez nos articles sur l'autonomie numerique, la securite en ligne et les demarches administratives pour les seniors.",
    url: "https://lespetitspapiersfaciles.fr/blog",
    keywords: "blog, autonomie numerique, securite en ligne, seniors, demarches administratives",
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
            Blog
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.80 0.05 145)" }}
          />
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "oklch(0.90 0.02 80)",
            }}
          >
            Conseils, astuces et réflexions pour progresser dans vos démarches
            administratives et numériques.
          </p>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.01 80)" }}>
        <div className="container">
          <div className="grid gap-8">
            {BLOG_ARTICLES.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <article
                  className="reveal group cursor-pointer rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{
                    backgroundColor: "oklch(0.97 0.01 80)",
                    border: "1px solid oklch(0.90 0.02 80)",
                  }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-1/3 overflow-hidden bg-gray-200 h-64 md:h-auto">
                      <img
                        src={article.image}
                        alt={`${article.title} - Article blog Les Petits Papiers Faciles`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Contenu */}
                    <div className="p-8 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Tag size={16} />
                            <span>{article.category}</span>
                          </div>
                        </div>
                        <h2
                          className="text-2xl font-semibold mb-4 group-hover:text-[oklch(0.45_0.08_145)] transition-colors"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {article.title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 font-semibold" style={{ color: "oklch(0.45 0.08 145)" }}>
                        Lire la suite <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
