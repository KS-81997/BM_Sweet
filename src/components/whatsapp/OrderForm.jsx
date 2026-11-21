import { useState } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useSettings } from "../../hooks/useSettings";
import { buildOrderMessage, waUrl } from "../../utils/whatsapp";

export default function OrderForm({ onOrderPlaced }) {
  const { items, totals, clear } = useCart();
  const { t } = useSettings();
  const [c, setC] = useState({ name: "", phone: "", address: "", notes: "" });
  const [error, setError] = useState(false);
  const [lastPlaced, setLastPlaced] = useState(null);

  const set = (k) => (e) => setC((s) => ({ ...s, [k]: e.target.value }));

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!items.length) {
      setError(true);
      return;
    }
    setError(false);

    // 1. Generate unique order reference ID and construct WhatsApp message
    const orderId = "BJH-" + Math.floor(100000 + Math.random() * 900000);
    const message = buildOrderMessage(items, totals, c, orderId);
    const url = waUrl(message);

    // 2. Snapshot the placed order details for professional confirmation handling
    const orderReceipt = {
      orderId,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      items: items.map((i) => ({ ...i })),
      totals: { ...totals },
      customer: { ...c },
      url,
    };

    // 3. Open WhatsApp in a new tab/window
    window.open(url, "_blank", "noopener,noreferrer");

    // 4. Remove all cart data
    clear();

    // 5. Delete/reset customer contact form fields
    setC({ name: "", phone: "", address: "", notes: "" });

    // 6. Notify parent component to show professional receipt & summary
    setLastPlaced(orderReceipt);
    if (onOrderPlaced) {
      onOrderPlaced(orderReceipt);
    }
  };

  return (
    <div className="card p-5">
      <h2 className="text-xl font-bold">
        {t("form.title")} <span className="text-sm font-normal text-brown-600">{t("form.optional")}</span>
      </h2>
      <form onSubmit={handleSubmitOrder} className="mt-4 grid gap-3">
        <label className="text-sm font-medium">
          {t("form.name")}
          <input className="input mt-1" value={c.name} onChange={set("name")} autoComplete="name" placeholder="e.g. Ali Khan" />
        </label>
        <label className="text-sm font-medium">
          {t("form.phone")}
          <input className="input mt-1 text-start" dir="auto" type="tel" value={c.phone} onChange={set("phone")} autoComplete="tel" placeholder="0300 1234567" />
        </label>
        <label className="text-sm font-medium">
          {t("form.address")}
          <textarea className="input mt-1" dir="auto" rows={2} value={c.address} onChange={set("address")} autoComplete="street-address" placeholder="e.g. Street 4, Islampura, Lahore" />
        </label>
        <label className="text-sm font-medium">
          {t("form.notes")}
          <textarea className="input mt-1" dir="auto" rows={2} value={c.notes} onChange={set("notes")} placeholder="e.g. Please pack warm jalebis in separate boxes" />
        </label>

        <button
          type="submit"
          disabled={!items.length}
          aria-disabled={!items.length}
          className={`btn-whatsapp mt-3 w-full cursor-pointer ${!items.length ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <MessageCircle size={18} aria-hidden="true" /> {t("form.order")}
        </button>
      </form>

      <p className="mt-2 text-xs text-brown-600">{t("form.note")}</p>
      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-700 dark:text-red-300">
          {t("form.empty")}
        </p>
      )}

      {lastPlaced && (
        <div role="status" className="mt-4 rounded-xl border border-green-500/30 bg-green-50/70 p-4 text-sm text-green-900 dark:bg-green-950/30 dark:text-green-200">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 size={18} className="text-green-600" />
            <span>{t("orderSuccess.title")}</span>
          </div>
          <p className="mt-1 text-xs">{t("orderSuccess.subtitle")}</p>
          <div className="mt-2 text-xs font-mono">Ref: #{lastPlaced.orderId}</div>
        </div>
      )}
    </div>
  );
}
