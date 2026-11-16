import { Link } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useSettings } from "../hooks/useSettings";
import { formatPKR } from "../utils/cart";
import { useSeo } from "../utils/seo";
import QuantitySelector from "../components/common/QuantitySelector";
import DeliveryNotice from "../components/common/DeliveryNotice";
import OrderForm from "../components/whatsapp/OrderForm";
import WhatsAppButton from "../components/whatsapp/WhatsAppButton";

export default function Cart() {
  const { items, totals, setQty, removeItem, changeSize, clear } = useCart();
  const { t, loc, tSize } = useSettings();
  useSeo({ title: t("cart.title"), description: t("seo.cart"), path: "/cart" });

  if (!items.length) {
    return (
      <div className="container-page section text-center">
        <ShoppingBag size={48} className="mx-auto text-saffron-600" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-bold">{t("cart.empty")}</h1>
        <p className="mt-2 text-brown-700">{t("cart.emptyText")}</p>
        <Link to="/products" className="btn-primary mt-6">{t("cart.explore")}</Link>
      </div>
    );
  }

  return (
    <div className="container-page section">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">{t("cart.title")}</h1>
        <button onClick={() => window.confirm(t("cart.confirmClear")) && clear()} className="flex items-center gap-1 text-sm font-medium text-red-700 hover:underline dark:text-red-300">
          <Trash2 size={16} aria-hidden="true" /> {t("cart.clear")}
        </button>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((i) => {
            const name = loc(i.product.name);
            return (
              <div key={i.key} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <img src={i.product.image} alt={name} className="h-24 w-32 shrink-0 rounded-lg object-cover" />
                <div className="flex-1">
                  <Link to={`/products/${i.product.id}`} className="font-display text-lg font-bold">{name}</Link>
                  <label className="mt-1 block text-xs text-brown-700">{t("cart.size")}
                    <select value={i.size} onChange={(e) => changeSize(i.product.id, i.size, e.target.value)} className="input mt-1 !w-auto">
                      {i.product.sizes.map((s) => <option key={s.label} value={s.label}>{tSize(s.label)}</option>)}
                    </select>
                  </label>
                  <p className="mt-2 text-sm text-brown-700">{t("cart.unit", { price: i.unitPrice === null ? t("price.tbc") : formatPKR(i.unitPrice) })}</p>
                  {i.product.note && <p className="text-xs font-medium text-saffron-700">{loc(i.product.note)}</p>}
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <QuantitySelector value={i.qty} onChange={(q) => setQty(i.product.id, i.size, q)} label={t("cart.qtyFor", { name })} />
                  <p className="font-bold">{i.subtotal === null ? t("price.tbc") : formatPKR(i.subtotal)}</p>
                  <button onClick={() => removeItem(i.product.id, i.size)} className="text-sm text-red-700 hover:underline dark:text-red-300" aria-label={t("cart.removeAria", { name, size: tSize(i.size) })}>{t("cart.remove")}</button>
                </div>
              </div>
            );
          })}
        </div>
        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="text-xl font-bold">{t("cart.summary")}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt>{t("cart.subtotal")}</dt><dd className="font-semibold">{formatPKR(totals.subtotal)}</dd></div>
              <div className="flex justify-between"><dt>{t("cart.delivery")}</dt><dd className="font-semibold">{t("cart.notIncluded")}</dd></div>
              <div className="flex justify-between border-t border-gold-400/30 pt-2 text-base"><dt className="font-bold">{t("cart.total")}</dt><dd className="font-bold">{formatPKR(totals.subtotal)}</dd></div>
            </dl>
            {totals.hasUnpriced && <p className="mt-3 text-xs text-brown-700">{t("cart.unpriced")}</p>}
          </div>
          <DeliveryNotice />
          <OrderForm />
          <WhatsAppButton topic="delivery" className="w-full !bg-surface !text-brown-800 border border-brown-700/30 hover:!bg-cream-100">{t("cart.askDelivery")}</WhatsAppButton>
        </aside>
      </div>
    </div>
  );
}
