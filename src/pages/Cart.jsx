import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, CheckCircle2, MessageCircle, ArrowRight, UserCheck, PackageCheck, ShieldCheck } from "lucide-react";
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
  const [placedOrder, setPlacedOrder] = useState(null);

  useSeo({ title: t("cart.title"), description: t("seo.cart"), path: "/cart" });

  // If an order was just placed, display the professional order confirmation receipt
  if (placedOrder) {
    return (
      <div className="container-page section fade-up">
        <div className="mx-auto max-w-3xl">
          {/* Success Banner */}
          <div className="card overflow-hidden border-green-500/30 bg-gradient-to-b from-green-50/80 to-surface p-6 sm:p-8 dark:from-green-950/20">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                <CheckCircle2 size={36} aria-hidden="true" />
              </div>
              <h1 className="mt-4 text-3xl font-bold text-green-950 dark:text-green-200">
                {t("orderSuccess.title")}
              </h1>
              <p className="mt-2 text-sm text-brown-700 sm:text-base">
                {t("orderSuccess.subtitle")}
              </p>

              {/* Status Badges */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-200/60 px-3 py-1 font-mono text-xs font-semibold text-green-900 dark:bg-green-900/60 dark:text-green-200">
                  <PackageCheck size={14} /> #{placedOrder.orderId}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-medium text-brown-700 border border-gold-400/30 shadow-sm">
                  ✓ {t("orderSuccess.cartCleared")}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-medium text-brown-700 border border-gold-400/30 shadow-sm">
                  ✓ {t("orderSuccess.formCleared")}
                </span>
              </div>
            </div>

            {/* Next Steps Guidance */}
            <div className="mt-8 rounded-xl border border-green-600/20 bg-surface/90 p-4 text-sm sm:p-5">
              <h2 className="font-bold text-brown-900 flex items-center gap-2">
                <MessageCircle size={18} className="text-green-600" />
                {t("orderSuccess.status")}
              </h2>
              <ol className="mt-2 space-y-1.5 ps-5 list-decimal text-brown-700 text-xs sm:text-sm">
                <li>{t("orderSuccess.step1")}</li>
                <li>{t("orderSuccess.step2")}</li>
                <li>{t("orderSuccess.step3")}</li>
              </ol>

              {/* Actions */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={placedOrder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex-1 text-center"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  {t("orderSuccess.reopen")}
                </a>
                <button
                  type="button"
                  onClick={() => setPlacedOrder(null)}
                  className="btn-outline flex-1"
                >
                  {t("orderSuccess.newOrder")}
                </button>
              </div>

              {/* Privacy Isolation Guarantee */}
              <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-surface/70 px-3 py-2 text-xs text-brown-600 border border-gold-400/20 text-center">
                <ShieldCheck size={16} className="shrink-0 text-green-600" />
                <span>{t("orderSuccess.privacyNote")}</span>
              </div>
            </div>

            {/* Customer Details Snapshot */}
            <div className="mt-6 rounded-xl border border-brown-700/10 bg-surface/60 p-4 sm:p-5">
              <h3 className="text-base font-bold text-brown-900 flex items-center gap-2">
                <UserCheck size={16} className="text-saffron-600" />
                {t("orderSuccess.customer")}
              </h3>
              <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-brown-600">{t("form.name")}:</dt>
                  <dd className="font-medium text-brown-800">{placedOrder.customer.name || t("form.notProvided")}</dd>
                </div>
                <div>
                  <dt className="text-xs text-brown-600">{t("form.phone")}:</dt>
                  <dd className="font-medium text-brown-800 ltr-text">{placedOrder.customer.phone || t("form.notProvided")}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-brown-600">{t("form.address")}:</dt>
                  <dd className="font-medium text-brown-800">{placedOrder.customer.address || t("form.notProvided")}</dd>
                </div>
                {placedOrder.customer.notes && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-brown-600">{t("form.notes")}:</dt>
                    <dd className="font-medium text-brown-800">{placedOrder.customer.notes}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Ordered Items Summary */}
            <div className="mt-6 rounded-xl border border-brown-700/10 bg-surface/60 p-4 sm:p-5">
              <h3 className="text-base font-bold text-brown-900">
                {t("orderSuccess.items")}
              </h3>
              <div className="mt-3 divide-y divide-gold-400/20">
                {placedOrder.items.map((i, idx) => {
                  const name = loc(i.product.name);
                  return (
                    <div key={`${i.key || idx}`} className="flex items-center justify-between py-2 text-sm">
                      <div className="flex items-center gap-3">
                        <img src={i.product.image} alt={name} className="h-12 w-14 rounded-md object-cover" />
                        <div>
                          <p className="font-semibold text-brown-900">{name}</p>
                          <p className="text-xs text-brown-600">{tSize(i.size)} × {i.qty}</p>
                        </div>
                      </div>
                      <p className="font-bold text-brown-900">
                        {i.subtotal === null ? t("price.tbc") : formatPKR(i.subtotal)}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 border-t border-gold-400/30 pt-3 flex justify-between text-base font-bold">
                <span>{t("orderSuccess.total")}</span>
                <span className="text-saffron-700">{formatPKR(placedOrder.totals.subtotal)}</span>
              </div>
            </div>

            {/* Delivery reminder */}
            <div className="mt-6 text-center">
              <DeliveryNotice />
              <Link to="/products" className="btn-primary mt-6 inline-flex items-center gap-2">
                {t("cart.explore")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal empty cart view
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
        <button
          onClick={() => window.confirm(t("cart.confirmClear")) && clear()}
          className="flex items-center gap-1 text-sm font-medium text-red-700 hover:underline dark:text-red-300"
        >
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
                  <label className="mt-1 block text-xs text-brown-700">
                    {t("cart.size")}
                    <select
                      value={i.size}
                      onChange={(e) => changeSize(i.product.id, i.size, e.target.value)}
                      className="input mt-1 !w-auto"
                    >
                      {i.product.sizes.map((s) => (
                        <option key={s.label} value={s.label}>{tSize(s.label)}</option>
                      ))}
                    </select>
                  </label>
                  <p className="mt-2 text-sm text-brown-700">
                    {t("cart.unit", { price: i.unitPrice === null ? t("price.tbc") : formatPKR(i.unitPrice) })}
                  </p>
                  {i.product.note && <p className="text-xs font-medium text-saffron-700">{loc(i.product.note)}</p>}
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <QuantitySelector value={i.qty} onChange={(q) => setQty(i.product.id, i.size, q)} label={t("cart.qtyFor", { name })} />
                  <p className="font-bold">{i.subtotal === null ? t("price.tbc") : formatPKR(i.subtotal)}</p>
                  <button
                    onClick={() => removeItem(i.product.id, i.size)}
                    className="text-sm text-red-700 hover:underline dark:text-red-300"
                    aria-label={t("cart.removeAria", { name, size: tSize(i.size) })}
                  >
                    {t("cart.remove")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="text-xl font-bold">{t("cart.summary")}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>{t("cart.subtotal")}</dt>
                <dd className="font-semibold">{formatPKR(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>{t("cart.delivery")}</dt>
                <dd className="font-semibold">{t("cart.notIncluded")}</dd>
              </div>
              <div className="flex justify-between border-t border-gold-400/30 pt-2 text-base">
                <dt className="font-bold">{t("cart.total")}</dt>
                <dd className="font-bold">{formatPKR(totals.subtotal)}</dd>
              </div>
            </dl>
            {totals.hasUnpriced && <p className="mt-3 text-xs text-brown-700">{t("cart.unpriced")}</p>}
          </div>
          <DeliveryNotice />
          <OrderForm onOrderPlaced={(receipt) => setPlacedOrder(receipt)} />
          <WhatsAppButton topic="delivery" className="w-full !bg-surface !text-brown-800 border border-brown-700/30 hover:!bg-cream-100">
            {t("cart.askDelivery")}
          </WhatsAppButton>
        </aside>
      </div>
    </div>
  );
}
