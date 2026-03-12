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
  "demarches-administratives-en-ligne": {
    title: "Démarches Administratives en Ligne : Un Guide Pratique pour les Seniors",
    date: "12 mars 2026",
    readTime: "12 min",
    category: "Démarches administratives",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663076661026/9oMMWuZH2kFyp4yTio8368/senior-demarches-administratives-mVEcWQmH4En93N4KYNSVNT.webp",
    content: `# Démarches Administratives en Ligne : Un Guide Pratique pour les Seniors

## Introduction

Les démarches administratives en ligne sont devenues incontournables en France. Que vous ayez besoin de déclarer vos impôts, de consulter votre dossier retraite ou de demander une allocation, internet offre des solutions pratiques et sécurisées. Cet article vous guide pas à pas pour accomplir les démarches administratives les plus courantes sans stress ni complications.

## 1. Impôts sur le Revenu : Déclarer en Ligne

### Pourquoi déclarer en ligne ?

La déclaration en ligne est devenue obligatoire pour tous les contribuables depuis 2019. Cette méthode offre plusieurs avantages : vous gagnez du temps, vous recevez votre avis d'imposition plus rapidement, et vous pouvez suivre votre dossier en temps réel.

### Étapes pour déclarer vos impôts

**Accéder au service** : Rendez-vous sur le site officiel des impôts (impots.gouv.fr) et connectez-vous avec votre numéro fiscal et votre mot de passe. Si c'est votre première connexion, vous devrez créer un compte en quelques minutes.

**Remplir votre déclaration** : Le formulaire en ligne vous guide étape par étape. Vous devez déclarer tous vos revenus : salaires, pensions de retraite, revenus fonciers, intérêts bancaires, etc.

**Vérifier et corriger** : Avant de valider, relisez attentivement votre déclaration. Vous pouvez corriger les erreurs directement.

**Valider et recevoir votre avis** : Une fois validée, votre déclaration est transmise aux impôts. Vous recevrez votre avis d'imposition par courrier ou par email.

## 2. Retraite : Consulter et Gérer Votre Dossier

### Accéder à votre espace retraite

**Pour les salariés du secteur privé** : Connectez-vous sur lassuranceretraite.fr avec votre numéro de sécurité sociale. Vous accédez à votre espace personnel où vous pouvez consulter votre carrière, vos cotisations et estimer votre retraite.

**Pour les fonctionnaires** : Utilisez le site info-retraite.fr qui regroupe tous les régimes de retraite.

### Estimer votre retraite

Le service « Mes droits retraite » vous permet de simuler le montant de votre pension selon différents scénarios : départ à 62 ans, 64 ans, 65 ans, etc.

## 3. Allocations Familiales et Aides Sociales

### Accéder à votre compte CAF

Connectez-vous sur caf.fr avec votre numéro d'allocataire et votre mot de passe. Vous accédez à votre espace personnel où vous pouvez consulter vos allocations, vos droits, et faire vos déclarations.

### Déclarer vos revenus

La CAF vous demande de déclarer vos revenus chaque année. Cette déclaration détermine le montant de vos allocations. Vous pouvez la faire en ligne directement dans votre espace CAF.

## 4. Sécurité Sociale : Consulter Votre Dossier Médical

### Accéder à votre espace Ameli

Rendez-vous sur ameli.fr et connectez-vous avec votre numéro de sécurité sociale. Vous accédez à votre espace personnel où vous pouvez consulter vos remboursements, vos droits, et vos documents.

### Consulter vos remboursements

Dans votre espace Ameli, vous pouvez voir tous vos remboursements des trois derniers mois. Vous visualisez le montant remboursé pour chaque soin.

## 5. Conseils Pratiques pour Réussir Vos Démarches en Ligne

### Préparez vos documents

Avant de commencer une démarche en ligne, rassemblez tous les documents dont vous aurez besoin : justificatif d'identité, relevé d'identité bancaire, avis d'imposition précédent, etc.

### Utilisez un mot de passe sécurisé

Pour protéger vos données personnelles, utilisez un mot de passe fort : au moins 12 caractères, avec des majuscules, des minuscules, des chiffres et des symboles.

### Conservez vos confirmations

Après chaque démarche, conservez la confirmation ou le numéro de dossier. Cela vous permet de suivre votre dossier et de prouver que vous avez fait votre démarche si nécessaire.

## Conclusion

Les démarches administratives en ligne peuvent sembler compliquées au premier abord, mais elles deviennent simples une fois que vous comprenez le processus. Avec ce guide, vous avez tous les outils pour gérer vos impôts, votre retraite, vos allocations et votre sécurité sociale en toute confiance.

N'oubliez pas : si vous avez besoin d'aide, vous n'êtes pas seul. Les administrations proposent des services d'assistance, et des professionnels comme nous sommes là pour vous accompagner dans chaque étape.`,
  },
  "securite-numerique-seniors": {
    title: "Sécurité Numérique pour les Seniors : Se Protéger en Ligne sans Panique",
    date: "8 mars 2026",
    readTime: "10 min",
    category: "Sécurité numérique",
    image: "/images/blog/securite-numerique.jpg",
    content: `![Illustration Sécurité Numérique](/images/blog/securite-numerique.jpg)

# Sécurité Numérique pour les Seniors : Se Protéger en Ligne sans Panique

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
  "autonomie-numerique-seniors": {
    title: "L'Autonomie Numérique pour les Seniors : Un Enjeu de Liberté et de Dignité",
    date: "7 mars 2026",
    readTime: "8 min",
    category: "Accompagnement numérique",
    image: "/images/blog/autonomie-numerique.jpg",
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
  "organisation-papiers-administratifs": {
    title: "L'Art d'Organiser ses Papiers : Gagner en Sérénité au Quotidien",
    date: "5 mars 2026",
    readTime: "7 min",
    category: "Aide administrative",
    image: "/images/blog/organisation-papiers.jpg",
    content: `# L'Art d'Organiser ses Papiers : Gagner en Sérénité au Quotidien

## Pourquoi s'organiser ?

Une bonne organisation administrative n'est pas qu'une question de rangement, c'est avant tout un moyen de libérer son esprit. Savoir exactement où se trouve chaque document important réduit considérablement le stress lié aux échéances et aux démarches imprévues.

L'accumulation de courriers, de dossiers éparpillés et de factures perdues peut rapidement devenir une source de stress majeure. Mais avec un système d'organisation simple et efficace, vous pouvez retrouver la sérénité et maîtriser vos démarches administratives.

## Les étapes clés d'un tri efficace

### 1. Le Grand Déballage

Rassemblez tous vos papiers au même endroit. Oui, tous ! Cela peut sembler intimidant, mais c'est la première étape indispensable pour avoir une vue d'ensemble.

### 2. Le Tri par Catégorie

Organisez vos documents selon ces catégories principales :
- **Santé** : Ordonnances, résultats d'analyses, cartes de mutuelle
- **Logement** : Bail, quittances de loyer, factures d'énergie
- **Banque** : Relevés de compte, chéquiers, contrats bancaires
- **Impôts** : Avis d'imposition, déclarations, justificatifs
- **Travail/Retraite** : Bulletins de salaire, contrats, documents de retraite

### 3. L'Élimination

Vérifiez les délais de conservation légaux et jetez ce qui n'est plus nécessaire. Par exemple :
- Les relevés bancaires : 5 ans
- Les factures : 2 ans
- Les contrats d'assurance : durée du contrat + 2 ans

## Nos Astuces pour un Classement Durable

### Utilisez des Chemises de Couleurs

Chaque couleur représente une catégorie. Cela rend le classement intuitif et rapide.

### Étiquetez Clairement

Un dossier bien étiqueté est un dossier qu'on retrouve facilement. Soyez précis dans vos libellés.

### Prévoyez une Bannette "À Traiter"

Tout courrier entrant doit d'abord passer par cette bannette avant d'être classé définitivement.

### Mettez à Jour Régulièrement

Dédier 30 minutes par mois au classement évite l'accumulation.

## Les Bénéfices d'une Bonne Organisation

- **Moins de stress** : Vous savez où trouver vos documents
- **Gain de temps** : Plus besoin de fouiller partout
- **Meilleure gestion** : Vous ne ratez plus aucune échéance
- **Sérénité** : Vous avez le contrôle de votre administration

## Conclusion

L'organisation administrative n'est pas une corvée — c'est un investissement dans votre sérénité. Avec un système simple et régulièrement entretenu, vous pouvez transformer votre relation aux papiers et aux démarches.

Chez **Les Petits Papiers Faciles**, nous vous aidons à mettre en place ce système chez vous, pour que l'administration ne soit plus une corvée mais une routine simple et maîtrisée.`,
  },
};

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const pageRef = useRef<HTMLDivElement>(null);

  const article = slug ? BLOG_ARTICLES[slug] : null;

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
                color: "oklch(0.45 0.08 145)",
              }}
            >
              Article non trouvé
            </h1>
            <Link href="/blog">
              <button
                className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "oklch(0.45 0.08 145)",
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
        style={{ backgroundColor: "oklch(0.45 0.08 145)" }}
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
              color: "oklch(0.45 0.08 145)",
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
            "linear-gradient(135deg, oklch(0.45 0.08 145) 0%, oklch(0.35 0.08 145) 100%)",
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
                color: "oklch(0.45 0.08 145)",
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
