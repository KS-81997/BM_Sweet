import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ShoppingBag } from "lucide-react";
import { getProduct, products } from "../data/products";
import { formatPKR, getSizePrice } from "../utils/cart";
import { useCart } from "../hooks/useCart";
import { useSettings } from "../hooks/useSettings";
import { useSeo } from "../utils/seo";
import { business } from "../data/business";
import QuantitySelector from "../components/common/QuantitySelector";
import VideoPlayer from "../components/common/VideoPlayer";
import DeliveryNotice from "../components/common/DeliveryNotice";
import ProductCard from "../components/products/ProductCard";
import NotFound from "./NotFound";

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProduct(id);
  if (!product) return <NotFound />;
  return <Details key={product.id} product={product} />;
}

function Details({ product }) {
  const { addItem } = useCart();
  const { t, loc, lang, tSize } = useSettings();
  const [size, setSize] = useState(product.sizes[0].label);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [added, setAdded] = useState(false);
  const price = getSizePrice(product, size);
  const name = loc(product.name);

  const jsonLd = useMemo(() => {
    const prices = product.sizes.map((s) => s.price).filter((x) => typeof x === "number");
    if (!prices.length) return undefined; // only emit Product data when real prices exist
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name[lang] || product.name.en,
      description: product.description[lang] || product.description.en,
      image: business.siteUrl + product.image,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "PKR",
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
        availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    };
  }, [product, lang]);

  useSeo({ title: name, description: loc(product.description), path: `/products/${product.id}`, jsonLd });
  useEffect(() => { setAdded(false); }, [size, qty]);

  const others = products.filter((p) => p.id !== product.id);
  const related = [...others.filter((p) => p.category === product.category), ...others.filter((p) => p.category !== product.category)].slice(0, 3);

  const add = () => {
    addItem(product.id, size, qty);
    setAdded(true);
  };

  return (
    <div className="container-page section">
      <nav className="mb-6 text-sm text-brown-700" aria-label={t("details.breadcrumb")}>
        <Link to="/products" className="hover:underline">{t("nav.products")}</Link> / <span>{name}</span>
      </nav>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-cream-100">
            <img src={product.images[img]} alt={name} className="h-full w-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((src, i) => (
                <button key={i} onClick={() => setImg(i)} aria-label={t("details.image", { n: i + 1 })} aria-pressed={img === i}
                  className={`h-16 w-20 overflow-hidden rounded-lg border-2 ${img === i ? "border-saffron-500" : "border-transparent"}`}>
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-saffron-600">{t(`cat.${product.category}`)}</p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{name}</h1>
          <p className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${product.available ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200" : "bg-[#2a170a] text-white"}`}>
            {product.available ? t("product.available") : t("product.unavailable")}
          </p>
          <p className="mt-4 text-brown-700">{loc(product.longDescription)}</p>

          <fieldset className="mt-6">
            <legend className="mb-2 text-sm font-semibold">{t("details.sizeWeight")}</legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s.label} onClick={() => setSize(s.label)} aria-pressed={size === s.label}
                  className={`rounded-full border px-4 py-2 text-sm font-medium ${size === s.label ? "border-saffron-500 bg-saffron-500 text-white" : "border-brown-700/20 bg-surface hover:border-saffron-500"}`}>
                  {tSize(s.label)}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="card mt-6 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-brown-700">{t("details.price", { size: tSize(size) })}</span>
              <span className="text-2xl font-bold">{price === null ? t("price.wa") : formatPKR(price)}</span>
            </div>
            {product.perKg && <p className="mt-1 text-xs text-brown-600">{t("product.perKg", { price: formatPKR(product.perKg) })}</p>}
            {product.note && <p className="mt-2 text-sm font-medium text-saffron-700">{loc(product.note)}</p>}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-semibold">{t("qty.label")}</span>
              <QuantitySelector value={qty} onChange={setQty} />
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-gold-400/30 pt-4">
              <span className="text-sm text-brown-700">{t("details.subtotal")}</span>
              <span className="text-lg font-bold">{price === null ? t("price.tbc") : formatPKR(price * qty)}</span>
            </div>
            <button onClick={add} disabled={!product.available} className="btn-primary mt-4 w-full">
              {added ? <><Check size={18} /> {t("details.addedCart")}</> : <><ShoppingBag size={18} /> {t("product.add")}</>}
            </button>
            {added && <Link to="/cart" className="mt-2 block text-center text-sm font-medium text-saffron-700 underline">{t("details.viewCart")}</Link>}
          </div>
          <DeliveryNotice className="mt-4" />
        </div>
      </div>

      <section className="mt-14" aria-labelledby="video-h">
        <h2 id="video-h" className="mb-4 text-2xl font-bold">{t("details.how")}</h2>
        <div className="max-w-3xl"><VideoPlayer video={product.video} title={`${name} – ${t("video.default")}`} /></div>
      </section>

      {related.length > 0 && (
        <section className="mt-14" aria-labelledby="rel-h">
          <h2 id="rel-h" className="mb-6 text-2xl font-bold">{t("details.related")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </div>
  );
}
