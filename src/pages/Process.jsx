import { useSeo } from "../utils/seo";
import { business, placeholderImage } from "../data/business";
import { useSettings } from "../hooks/useSettings";
import ProcessSteps from "../components/common/ProcessSteps";
import ProcessVideos from "../components/common/ProcessVideos";
import SectionHeading from "../components/common/SectionHeading";

export default function Process() {
  const { t, loc } = useSettings();
  useSeo({ title: t("nav.process"), description: t("seo.process"), path: "/process" });
  return (
    <div className="container-page section">
      <SectionHeading as="h1" eyebrow={t("process.eyebrow")} title={t("process.title")} text={loc(business.processIntro)} />
      <ProcessSteps />
      <div className="mt-14 grid items-center gap-8 md:grid-cols-2">
        <img src={placeholderImage} alt={t("process.imgAlt")} loading="lazy" className="w-full rounded-2xl" />
        <p className="text-brown-700">{t("process.note")}</p>
      </div>
      <h2 className="mb-6 mt-14 text-center text-3xl font-bold">{t("process.videos")}</h2>
      <ProcessVideos />
    </div>
  );
}
