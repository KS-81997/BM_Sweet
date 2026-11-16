import { Link } from "react-router-dom";
import { useSeo } from "../utils/seo";
import { business, placeholderImage } from "../data/business";
import { products } from "../data/products";
import { useSettings } from "../hooks/useSettings";
import SectionHeading from "../components/common/SectionHeading";
import ProcessSteps from "../components/common/ProcessSteps";
import ContactDetails from "../components/common/ContactDetails";
import MapEmbed from "../components/common/MapEmbed";
import WhatsAppButton from "../components/whatsapp/WhatsAppButton";

const Block = ({ id, title, children }) => (
  <section aria-labelledby={id} className="py-10">
    <h2 id={id} className="mb-4 text-3xl font-bold">{title}</h2>
    <div className="space-y-3 text-brown-700">{children}</div>
  </section>
);

export default function About() {
  const { t, loc, lang } = useSettings();
  const name = t("brand.name");
  const owner = loc(business.ownerName);
  useSeo({ title: t("nav.about"), description: t("seo.about"), path: "/about" });
  return (
    <div className="container-page section">
      <SectionHeading as="h1" eyebrow={t("about.eyebrow")} title={t("about.title", { name })} text={t("brand.tagline")} />
      <img src="/images/shop-banner.jpg" alt={t("about.shopAlt")} width="1265" height="595" className="mx-auto h-auto w-full max-w-5xl rounded-2xl shadow-lg" />
      <div className="mx-auto max-w-3xl divide-y divide-gold-400/30">
        <Block id="story" title={t("about.story")}><p>{loc(business.history) || t("about.storyFallback")}</p></Block>
        <Block id="journey" title={t("about.journey")}>
          <p>{business.establishedYear ? t("about.journeyYear", { year: business.establishedYear }) : t("about.journeyFallback")}</p>
        </Block>
        <Block id="about" title={t("about.title", { name })}>
          <p>{loc(business.description)}</p>
          {owner && <p>{t("about.owner", { name: owner })}</p>}
        </Block>
        <Block id="process" title={t("about.process")}>
          <p>{loc(business.processIntro)}</p>
          <div className="pt-3"><ProcessSteps /></div>
          <p><Link to="/process" className="font-medium text-saffron-700 underline">{t("about.seeProcess")}</Link></p>
        </Block>
        <Block id="products" title={t("about.products")}>
          <p>{t("about.productsText", { list: products.map((p) => loc(p.name)).join(lang === "ur" ? "، " : ", ") })}</p>
          <Link to="/products" className="btn-primary">{t("cart.explore")}</Link>
        </Block>
        <Block id="commitment" title={t("about.commitment")}><p>{loc(business.commitment) || t("about.commitFallback")}</p></Block>
        <Block id="location" title={t("about.location")}><MapEmbed /></Block>
        <Block id="contact" title={t("about.contact")}>
          <ContactDetails />
          <WhatsAppButton className="mt-2">{t("about.msgUs")}</WhatsAppButton>
        </Block>
      </div>
    </div>
  );
}
