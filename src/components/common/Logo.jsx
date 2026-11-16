import { Link } from "react-router-dom";
import { useSettings } from "../../hooks/useSettings";

export default function Logo({ light = false }) {
  const { t } = useSettings();
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={t("nav.homeAria")}>
      <img src="/images/logo.png" alt="" width="44" height="44" className="h-11 w-11 shrink-0 rounded-full ring-1 ring-gold-400/60" />
      <span className={`font-display text-lg font-bold leading-tight ${light ? "text-[#fffdf8]" : "text-brown-900"}`}>
        {t("brand.name")}
      </span>
    </Link>
  );
}
