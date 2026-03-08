/* ============================================================
   Composant SEOHead — Gestion des métadonnées SEO
   Permet de définir les métadonnées pour chaque page
   ============================================================ */

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string;
  author?: string;
  type?: string;
}

export function useSEOHead({
  title,
  description,
  url,
  image,
  keywords,
  author = "Les Petits Papiers Faciles",
  type = "website",
}: SEOHeadProps) {
  // Mettre à jour le titre de la page
  if (typeof document !== "undefined") {
    document.title = title;
    
    // Mettre à jour les métadonnées
    updateMeta("description", description);
    if (keywords) updateMeta("keywords", keywords);
    updateMeta("author", author);
    
    // Open Graph
    updateMeta("og:title", title, "property");
    updateMeta("og:description", description, "property");
    updateMeta("og:type", type, "property");
    updateMeta("og:url", url, "property");
    if (image) updateMeta("og:image", image, "property");
    
    // Twitter Card
    updateMeta("twitter:title", title, "name");
    updateMeta("twitter:description", description, "name");
    if (image) updateMeta("twitter:image", image, "name");
    
    // Canonical URL
    updateCanonical(url);
  }
}

function updateMeta(
  name: string,
  content: string,
  attribute: "name" | "property" = "name"
) {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute("content", content);
}

function updateCanonical(url: string) {
  let canonical = document.querySelector('link[rel="canonical"]');
  
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  
  canonical.setAttribute("href", url);
}
