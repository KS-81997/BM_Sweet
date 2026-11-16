import { Info } from "lucide-react";
import { useSettings } from "../../hooks/useSettings";

export default function DeliveryNotice({ className = "" }) {
  const { t } = useSettings();
  return (
    <div role="note" className={`flex gap-3 rounded-xl border border-saffron-500/40 bg-saffron-400/10 p-4 text-sm text-brown-800 ${className}`}>
      <Info size={20} className="mt-0.5 shrink-0 text-saffron-600" aria-hidden="true" />
      <p>{t("delivery.disclaimer")}</p>
    </div>
  );
}
