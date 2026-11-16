import { useSeo } from "../../utils/seo";
import { useSettings } from "../../hooks/useSettings";

// kind: "privacy" | "terms". Content lives in src/i18n/translations.js.
export default function LegalPage({ kind, path }) {
  const { t } = useSettings();
  const title = t(kind === "privacy" ? "legal.privacyTitle" : "legal.termsTitle");
  useSeo({ title, description: t(`seo.${kind}`), path });
  return (
    <div className="container-page section max-w-3xl">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-brown-600">{t("legal.note", { name: t("brand.name") })}</p>
      <div className="mt-8 space-y-6">
        {t(`legal.${kind}`).map(([h, p]) => (
          <section key={h}><h2 className="text-xl font-bold">{h}</h2><p className="mt-2 text-brown-700">{p}</p></section>
        ))}
      </div>
    </div>
  );
}
