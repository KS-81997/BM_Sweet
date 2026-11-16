import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useSettings } from "../../hooks/useSettings";
import { buildOrderMessage, waUrl } from "../../utils/whatsapp";

// Optional customer details + click-to-chat order link. Cart is never cleared automatically.
export default function OrderForm() {
  const { items, totals } = useCart();
  const { t } = useSettings();
  const [c, setC] = useState({ name: "", phone: "", address: "", notes: "" });
  const [error, setError] = useState(false);
  const [opened, setOpened] = useState(false);
  const set = (k) => (e) => setC((s) => ({ ...s, [k]: e.target.value }));

  const href = items.length ? waUrl(buildOrderMessage(items, totals, c)) : "#";

  const onClick = (e) => {
    if (!items.length) {
      e.preventDefault();
      setError(true);
      return;
    }
    setError(false);
    setOpened(true);
  };

  return (
    <div className="card p-5">
      <h2 className="text-xl font-bold">{t("form.title")} <span className="text-sm font-normal text-brown-600">{t("form.optional")}</span></h2>
      <div className="mt-4 grid gap-3">
        <label className="text-sm font-medium">{t("form.name")}<input className="input mt-1" value={c.name} onChange={set("name")} autoComplete="name" /></label>
        <label className="text-sm font-medium">{t("form.phone")}<input className="input mt-1 text-start" dir="auto" type="tel" value={c.phone} onChange={set("phone")} autoComplete="tel" /></label>
        <label className="text-sm font-medium">{t("form.address")}<textarea className="input mt-1" dir="auto" rows={2} value={c.address} onChange={set("address")} autoComplete="street-address" /></label>
        <label className="text-sm font-medium">{t("form.notes")}<textarea className="input mt-1" dir="auto" rows={2} value={c.notes} onChange={set("notes")} /></label>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} aria-disabled={!items.length}
        className={`btn-whatsapp mt-5 w-full ${!items.length ? "opacity-60" : ""}`}>
        <MessageCircle size={18} aria-hidden="true" /> {t("form.order")}
      </a>
      <p className="mt-2 text-xs text-brown-600">{t("form.note")}</p>
      {error && <p role="alert" className="mt-3 text-sm font-medium text-red-700 dark:text-red-300">{t("form.empty")}</p>}
      {opened && !error && <p role="status" className="mt-3 rounded-lg bg-cream-100 p-3 text-sm">{t("form.opened")}</p>}
    </div>
  );
}
