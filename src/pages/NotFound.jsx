import { Link } from "react-router-dom";
import { useSeo } from "../utils/seo";
import { useSettings } from "../hooks/useSettings";

export default function NotFound() {
  const { t } = useSettings();
  useSeo({ title: "404", description: t("seo.nf") });
  return (
    <div className="container-page section text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-3 text-brown-700">{t("nf.text")}</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/" className="btn-primary">{t("nf.home")}</Link>
        <Link to="/products" className="btn-outline">{t("nf.products")}</Link>
      </div>
    </div>
  );
}
