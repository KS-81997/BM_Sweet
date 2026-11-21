import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import { categories, products } from "../data/products";
import { useSeo } from "../utils/seo";
import { useSettings } from "../hooks/useSettings";

export default function Products() {
  const { t } = useSettings();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  useSeo({ title: t("nav.products"), description: t("seo.products"), path: "/products" });

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    // Search matches both English and Urdu text.
    const hay = (p) => [p.name, p.description].flatMap((o) => [o.en, o.ur]).concat(p.category, t(`cat.${p.category}`)).join(" ").toLowerCase();
    return products.filter((p) => (cat === "All" || p.category === cat) && (!term || hay(p).includes(term)));
  }, [q, cat, t]);

  return (
    <div className="container-page section">
      <h1 className="text-4xl font-bold">{t("products.title")}</h1>
      <p className="mt-2 text-brown-700">{t("products.note")}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search size={18} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-brown-600" aria-hidden="true" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("products.search")} aria-label={t("products.search")} className="input !ps-10" />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t("products.filter")}>
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${cat === c ? "border-saffron-500 bg-saffron-500 text-white" : "border-brown-700/20 bg-surface hover:border-saffron-500"}`}>
              {t(`cat.${c}`)}
            </button>
          ))}
        </div>
      </div>
      {list.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="card mt-8 p-10 text-center">
          <p className="font-display text-xl">{t("products.none")}</p>
          <p className="mt-1 text-sm text-brown-700">{t("products.noneHint")}</p>
          <button className="btn-outline mt-4" onClick={() => { setQ(""); setCat("All"); }}>{t("products.clear")}</button>
        </div>
      )}
    </div>
  );
}
