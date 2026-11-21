import { Moon, Sun } from "lucide-react";
import { useSettings } from "../../hooks/useSettings";

// Language (English/Urdu) and theme (light/dark) switchers.
export default function SettingsToggles({ className = "" }) {
  const { t, theme, toggleLang, toggleTheme } = useSettings();
  const btn = "flex h-11 items-center justify-center rounded-full text-sm font-semibold hover:bg-cream-200";
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button type="button" onClick={toggleLang} className={`${btn} min-w-11 border border-brown-700/20 px-3`} aria-label={t("lang.aria")} lang={t("lang.button") === "English" ? "en" : "ur"}>
        {t("lang.button")}
      </button>
      <button type="button" onClick={toggleTheme} className={`${btn} w-11`} aria-label={theme === "dark" ? t("theme.toLight") : t("theme.toDark")} aria-pressed={theme === "dark"}>
        {theme === "dark" ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
      </button>
    </div>
  );
}
