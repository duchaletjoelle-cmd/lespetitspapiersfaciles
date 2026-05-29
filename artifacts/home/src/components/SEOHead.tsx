import { useEffect } from "react";

interface SEOHeadOptions {
  title: string;
  description: string;
  url?: string;
  keywords?: string;
  type?: string;
  image?: string;
}

export function useSEOHead({ title, description, url, keywords, type = "website", image }: SEOHeadOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    if (url) setMeta("og:url", url, "property");
    if (image) setMeta("og:image", image, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
  }, [title, description, url, keywords, type, image]);
}
