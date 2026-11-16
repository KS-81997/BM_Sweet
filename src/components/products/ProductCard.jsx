import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ShoppingBag } from "lucide-react";
import { formatPKR } from "../../utils/cart";
import { useCart } from "../../hooks/useCart";
import { useSettings } from "../../hooks/useSettings";

const startingPrice = (p) => {
  const prices = p.sizes.map((s) => s.price).filter((x) => typeof x === "number");
  return prices.length ? Math.min(...prices) : null;
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { t, loc, tSize } = useSettings();
  const [size, setSize] = useState(product.sizes[0].label);
  const [added, setAdded] = useState(false);
  const from = startingPrice(product);
  const name = loc(product.name);

  const add = () => {
    addItem(product.id, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="card flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-cream-100">
        <img src={product.image} alt={name} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <span className={`absolute start-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${product.available ? "bg-surface/90 text-green-700 dark:text-green-300" : "bg-[#2a170a]/80 text-white"}`}>
          {product.available ? t("product.available") : t("product.unavailable")}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-saffron-600">{t(`cat.${product.category}`)}</p>
        <h3 className="mt-1 text-xl font-bold"><Link to={`/products/${product.id}`}>{name}</Link></h3>
        <p className="mt-1 text-sm text-brown-700">{loc(product.description)}</p>
        <p className="mt-3 text-sm font-semibold">
          {product.perKg ? t("product.perKg", { price: formatPKR(product.perKg) })
            : from !== null ? t("product.from", { price: formatPKR(from) }) : <span className="text-brown-600">{t("price.wa")}</span>}
        </p>
        {product.note && <p className="mt-1 text-xs font-medium text-saffron-700">{loc(product.note)}</p>}
        <label className="mt-3 block text-xs font-medium text-brown-700">
          {t("product.size")}
          <select value={size} onChange={(e) => setSize(e.target.value)} className="input mt-1">
            {product.sizes.map((s) => <option key={s.label} value={s.label}>{tSize(s.label)}</option>)}
          </select>
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link to={`/products/${product.id}`} className="btn-outline !px-3">{t("product.view")}</Link>
          <button onClick={add} disabled={!product.available} className="btn-primary !px-3">
            {added ? <><Check size={16} /> {t("product.added")}</> : <><ShoppingBag size={16} /> {t("product.add")}</>}
          </button>
        </div>
      </div>
    </article>
  );
}
