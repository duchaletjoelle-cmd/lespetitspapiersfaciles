/* ============================================================
   Page Blog — Les Petits Papiers Faciles
   Liste des articles et détail des articles
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

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
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663076661026/9oMMWuZH2kFyp4yTio8368/blog-securite-numerique.jpg",
    content: `# Sécurité Numérique pour les Seniors : Se Protéger en Ligne sans Panique

## Introduction

Internet offre des opportunités extraordinaires — accès aux services, communication avec la famille, apprentissage — mais il présente aussi des risques réels. Les seniors sont particulièrement ciblés par les arnaqueurs en ligne, non pas parce qu'ils sont moins intelligents, mais parce que les criminels savent qu'ils sont souvent plus confiants et moins familiers avec les pièges numériques.

La bonne nouvelle ? **La sécurité numérique n'est pas compliquée.** Avec quelques règles simples et du bon sens, vous pouvez naviguer sur internet en toute confiance et protéger vos données personnelles et financières.

## Comprendre les Menaces Principales

### Les Arnaques par Email (Phishing)

Le phishing est une technique où les arnaqueurs se font passer pour une organisation de confiance (votre banque, Amazon, la Sécurité Sociale) pour vous voler vos identifiants. Un email de phishing ressemble souvent à un vrai email, avec le logo officiel et un message urgent.

**Comment les reconnaître** :
- Ils demandent de cliquer sur un lien pour "vérifier votre compte"
- Ils créent une urgence artificielle ("Votre compte sera fermé dans 24h")
- L'adresse email de l'expéditeur est légèrement différente de l'original
- Ils demandent des informations personnelles (mot de passe, numéro de carte)

**La règle d'or** : Une vraie banque ou administration ne vous demandera JAMAIS votre mot de passe par email.

### Les Faux Appels Téléphoniques (Tech Support Scams)

Vous recevez un appel téléphonique d'une personne prétendant travailler pour Microsoft, Apple ou votre fournisseur internet. Elle vous dit qu'il y a un virus sur votre ordinateur et vous demande de lui donner accès à distance.

**C'est une arnaque.** Les vraies entreprises ne vous appellent pas de cette façon.

### Les Logiciels Malveillants

Les logiciels malveillants (virus, spyware, ransomware) peuvent infecter votre ordinateur via des téléchargements douteux, des pièces jointes suspectes ou des sites non sécurisés. Une fois installés, ils peuvent voler vos données, bloquer votre ordinateur ou demander une rançon.

### Les Faux Sites Web

Les arnaqueurs créent des sites web qui ressemblent à des sites légitimes (Amazon, banques, etc.) pour vous faire entrer vos identifiants. Une fois qu'ils ont vos informations, ils peuvent accéder à vos comptes.

## Les Bonnes Pratiques de Sécurité

### 1. Créer des Mots de Passe Forts

Un bon mot de passe est votre première ligne de défense.

**Caractéristiques d'un mot de passe fort** :
- Au moins 12 caractères
- Mélange de majuscules, minuscules, chiffres et symboles
- Pas d'informations personnelles (date de naissance, nom)
- Unique pour chaque compte important

**Exemple faible** : "Marie1960" (trop court, contient des infos personnelles)
**Exemple fort** : "Hyères#2024@Soleil!" (long, mélangé, unique)

### 2. Utiliser un Gestionnaire de Mots de Passe

Mémoriser des dizaines de mots de passe forts est impossible. La solution ? Un gestionnaire de mots de passe comme **Bitwarden** (gratuit) ou **1Password** (payant).

Ces outils stockent tous vos mots de passe de manière sécurisée, chiffrée. Vous n'avez besoin de mémoriser qu'un seul mot de passe maître.

### 3. Activer l'Authentification à Deux Facteurs (2FA)

L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire. Même si quelqu'un connaît votre mot de passe, il ne peut pas accéder à votre compte sans le deuxième facteur.

**Comment ça marche** :
1. Vous entrez votre mot de passe
2. Un code est envoyé à votre téléphone
3. Vous entrez ce code pour confirmer votre identité

Activez la 2FA sur vos comptes importants : email, banque, réseaux sociaux.

### 4. Vérifier les URLs Avant de Cliquer

Avant de cliquer sur un lien, survolez-le avec votre souris (sans cliquer) pour voir l'adresse réelle. Si elle ne correspond pas à ce que vous attendez, ne cliquez pas.

### 5. Mettre à Jour Régulièrement

Les mises à jour de votre système d'exploitation, navigateur et logiciels corrigent les failles de sécurité. Ne les ignorez pas.

**Conseil** : Activez les mises à jour automatiques pour ne pas avoir à y penser.

### 6. Utiliser un Antivirus

Installez un antivirus fiable et gratuit comme **Windows Defender** (inclus dans Windows) ou **Avast** (gratuit). Mettez-le à jour régulièrement.

### 7. Sauvegarder Vos Données

Sauvegardez régulièrement vos fichiers importants sur un disque dur externe ou dans le cloud (Google Drive, OneDrive). Ainsi, même si vous êtes victime d'une attaque, vous ne perdrez pas vos données.

## Reconnaître et Signaler les Arnaques

### Signes d'Alerte

- Quelqu'un vous demande de l'argent ou des informations personnelles
- Un email ou appel crée une urgence artificielle
- L'adresse email ou le numéro de téléphone semble suspect
- On vous demande de cliquer sur un lien ou de télécharger quelque chose
- Les fautes d'orthographe ou de grammaire dans un email officiel

### Que Faire si Vous Êtes Victime

1. **Ne paniquez pas** — vous n'êtes pas seul
2. **Changez vos mots de passe immédiatement** (depuis un autre appareil)
3. **Contactez votre banque** si vos informations financières ont été compromises
4. **Signalez l'arnaque** à la police, la CNIL ou Signal Spam
5. **Consultez un professionnel** si vous avez besoin d'aide

## Conseils Pratiques pour Rester Sûr

### Avant de Faire Vos Achats en Ligne

- Cherchez le cadenas 🔒 dans la barre d'adresse
- L'adresse doit commencer par "https://" (pas "http://")
- Achetez uniquement sur des sites de confiance
- Utilisez une carte de crédit plutôt qu'une carte de débit

### Avant de Partager des Informations Personnelles

- Demandez-vous : "Pourquoi cette organisation a-t-elle besoin de cette information ?"
- Ne partagez jamais votre numéro de sécurité sociale, numéro de carte bancaire ou mot de passe
- Vérifiez que vous êtes sur le bon site avant d'entrer des identifiants

### Sur les Réseaux Sociaux

- Limitez les informations personnelles visibles publiquement
- Ne cliquez pas sur les liens suspects
- Méfiez-vous des demandes d'amitié de personnes inconnues
- Ne partagez pas vos photos d'identité ou documents officiels

## L'Importance de la Vigilance

La sécurité numérique repose en grande partie sur la vigilance. Les arnaqueurs comptent sur votre confiance naturelle et votre désir d'aider. Quelques secondes de réflexion — "Est-ce que ça a du sens ? Est-ce que c'est normal ?" — peuvent vous éviter des problèmes.

**Rappelez-vous** : Les vraies organisations ne vous demandent jamais vos informations sensibles par email ou téléphone. Si quelque chose semble suspect, c'est probablement une arnaque.

## Conclusion

La sécurité numérique n'est pas une question de technologie complexe — c'est du bon sens appliqué à internet. En suivant ces règles simples, vous pouvez profiter d'internet en toute confiance, sans peur.

Vous n'avez pas besoin d'être un expert en informatique pour rester sûr en ligne. Vous avez juste besoin de rester vigilant, de poser des questions et de ne pas hésiter à demander de l'aide.

Chez **Les Petits Papiers Faciles**, nous sommes là pour vous aider à naviguer le monde numérique de manière sûre et confiante. Que ce soit pour comprendre comment reconnaître une arnaque, sécuriser vos comptes ou simplement pour avoir quelqu'un à qui poser vos questions — contactez-moi. Votre sécurité en ligne est notre priorité.`,
  },
  {
    id: "autonomie-numerique-seniors",
    title: "L'Autonomie Numérique pour les Seniors : Un Enjeu de Liberté et de Dignité",
    excerpt:
      "À l'ère du numérique, l'autonomie n'est plus un luxe — c'est une nécessité. Découvrez pourquoi maîtriser les outils numériques transforme la vie des seniors et comment progresser à son rythme.",
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
];

export default function BlogPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Blog | Les Petits Papiers Faciles";
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
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Contenu */}
                    <div className="p-8 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span
                              style={{
                                fontFamily: "'Source Sans 3', sans-serif",
                                color: "oklch(0.42 0.06 145)",
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
                                color: "oklch(0.42 0.06 145)",
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
                                color: "oklch(0.42 0.06 145)",
                              }}
                            >
                              {article.category}
                            </span>
                          </div>
                        </div>

                        <h2
                          className="text-3xl font-semibold mb-4 group-hover:text-opacity-80 transition-colors"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            color: "oklch(0.30 0.07 145)",
                          }}
                        >
                          {article.title}
                        </h2>

                        <p
                          className="text-base mb-6"
                          style={{
                            fontFamily: "'Source Sans 3', sans-serif",
                            color: "oklch(0.50 0.05 145)",
                            lineHeight: "1.6",
                          }}
                        >
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
                        <span
                          style={{
                            fontFamily: "'Source Sans 3', sans-serif",
                            color: "oklch(0.42 0.06 145)",
                            fontWeight: "600",
                          }}
                        >
                          Lire l'article
                        </span>
                        <ArrowRight
                          size={18}
                          style={{ color: "oklch(0.42 0.06 145)" }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
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
