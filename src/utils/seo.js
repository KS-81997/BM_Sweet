import { useEffect } from "react";
import { business } from "../data/business";
import { useSettings } from "../hooks/useSettings";

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

// Sets title, description, Open Graph, canonical, and optional JSON-LD for the current page (in the current language).
export function useSeo({ title, description, path = "/", jsonLd }) {
  const { t } = useSettings();
  useEffect(() => {
    const brand = t("brand.name");
    const full = title ? `${title} | ${brand}` : `${brand} – ${t("brand.tagline")}`;
    document.title = full;
    setMeta("name", "description", description);
    setMeta("property", "og:title", full);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", business.siteUrl + path);
    let canon = document.head.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement("link");
      canon.rel = "canonical";
      document.head.appendChild(canon);
    }
    canon.href = business.siteUrl + path;

    let ld = document.getElementById("page-jsonld");
    if (jsonLd) {
      if (!ld) {
        ld = document.createElement("script");
        ld.id = "page-jsonld";
        ld.type = "application/ld+json";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(jsonLd);
    } else if (ld) ld.remove();
  }, [title, description, path, jsonLd, t]);
}
