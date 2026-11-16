import { Minus, Plus } from "lucide-react";
import { useSettings } from "../../hooks/useSettings";

export default function QuantitySelector({ value, onChange, min = 1, max = 99, label }) {
  const { t } = useSettings();
  const btn = "flex h-10 w-10 items-center justify-center rounded-full border border-brown-700/20 bg-surface hover:bg-cream-100 disabled:opacity-40";
  return (
    <div className="inline-flex items-center gap-3" role="group" aria-label={label ?? t("qty.label")}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={t("qty.dec")}><Minus size={16} /></button>
      <span className="w-8 text-center font-semibold" aria-live="polite">{value}</span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={t("qty.inc")}><Plus size={16} /></button>
    </div>
  );
}
