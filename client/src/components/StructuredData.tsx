/* ============================================================
   Composant StructuredData — Données structurées JSON-LD
   Améliore le référencement et la compréhension par les moteurs de recherche
   ============================================================ */

export function useStructuredData(schema: Record<string, any>) {
  if (typeof document !== "undefined") {
    let scriptElement = document.querySelector('script[type="application/ld+json"]');
    
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptElement);
    }
    
    scriptElement.textContent = JSON.stringify(schema);
  }
}

// Schéma pour l'organisation (entreprise locale)
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Les Petits Papiers Faciles",
  "description": "Aide administrative et accompagnement numérique à domicile",
  "url": "https://lespetitspapiersfaciles.fr",
  "telephone": "+33750527227",
  "email": "lespetitspapiersfaciles@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hyères",
    "addressLocality": "Hyères",
    "postalCode": "83400",
    "addressCountry": "FR"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Hyères"
    },
    {
      "@type": "City",
      "name": "Carqueiranne"
    },
    {
      "@type": "City",
      "name": "Le Pradet"
    }
  ],
  "priceRange": "€€",
  "image": "https://lespetitspapiersfaciles.fr/logo.png",
  "sameAs": [
    "https://www.facebook.com/lespetitspapiersfaciles",
    "https://www.instagram.com/lespetitspapiersfaciles"
  ]
};

// Schéma pour les services
export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Les Petits Papiers Faciles",
  "url": "https://lespetitspapiersfaciles.fr/services",
  "description": "Services d'aide administrative et accompagnement numérique pour seniors",
  "serviceType": [
    "Aide administrative",
    "Accompagnement numérique",
    "Démarches administratives en ligne",
    "Formation numérique"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Hyères"
  },
  "provider": {
    "@type": "LocalBusiness",
    "name": "Les Petits Papiers Faciles"
  }
};

// Schéma pour les articles de blog
export const blogArticleSchema = (article: {
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "datePublished": article.date,
  "author": {
    "@type": "Person",
    "name": "Sandra Duchalet",
    "url": "https://lespetitspapiersfaciles.fr/qui-suis-je"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Les Petits Papiers Faciles",
    "url": "https://lespetitspapiersfaciles.fr"
  }
});

// Schéma pour les avis/témoignages
export const reviewSchema = (review: {
  author: string;
  rating: number;
  text: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": review.rating,
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Person",
    "name": review.author
  },
  "reviewBody": review.text,
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "Les Petits Papiers Faciles"
  }
});
