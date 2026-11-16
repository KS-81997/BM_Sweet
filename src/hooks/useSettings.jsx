import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations";

const LANG_KEY = "bjh-lang";
const THEME_KEY = "bjh-theme";

const read = (key, allowed, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return allowed.includes(v) ? v : fallback;
  } catch {
    return fallback;
  }
};
const systemTheme = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [lang, setLang] = useState(() => read(LANG_KEY, ["en", "ur"], "en"));
  const [theme, setTheme] = useState(() => read(THEME_KEY, ["light", "dark"], systemTheme()));

  // Apply to <html> and persist.
  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ur" ? "rtl" : "ltr";
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* ignore */ }
  }, [lang]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* ignore */ }
  }, [theme]);

  // t("key", { var }) – string (or array) from the dictionary, English fallback.
  const t = useCallback(
    (key, vars) => {
      let v = translations[lang][key] ?? translations.en[key] ?? key;
      if (typeof v === "string" && vars) v = v.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
      return v;
    },
    [lang]
  );
  // loc({ en, ur }) – picks the current language from a bilingual data value; plain strings pass through.
  const loc = useCallback((o) => (o && typeof o === "object" && !Array.isArray(o) ? o[lang] ?? o.en ?? "" : o ?? ""), [lang]);
  // Cart/product size labels are stored in English ("1 KG"); display them in the current language.
  const tSize = useCallback((label) => (lang === "ur" ? label.replace(/gram/i, "گرام").replace(/\bkg\b/i, "کلو") : label), [lang]);

  const value = useMemo(
    () => ({
      lang, theme, t, loc, tSize,
      isRtl: lang === "ur",
      toggleLang: () => setLang((l) => (l === "en" ? "ur" : "en")),
      toggleTheme: () => setTheme((x) => (x === "dark" ? "light" : "dark")),
    }),
    [lang, theme, t, loc, tSize]
  );
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);
