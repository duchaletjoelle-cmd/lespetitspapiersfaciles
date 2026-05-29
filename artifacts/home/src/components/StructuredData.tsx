import { useEffect } from "react";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Les Petits Papiers Faciles",
  "description": "Aide administrative et accompagnement numérique à domicile à Hyères, Carqueiranne et communes environnantes.",
  "url": "https://lespetitspapiersfaciles.fr",
  "telephone": "+33750527227",
  "email": "contact@lespetitspapiersfaciles.fr",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyères",
    "addressRegion": "Var",
    "addressCountry": "FR"
  },
  "areaServed": ["Hyères", "Carqueiranne", "Le Pradet", "La Crau", "Toulon"],
  "serviceType": ["Aide administrative", "Accompagnement numérique", "Services à la Personne"],
};

export function useStructuredData(schema: object) {
  useEffect(() => {
    const id = "structured-data-json-ld";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      el?.remove();
    };
  }, [schema]);
}
