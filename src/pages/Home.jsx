import { Link } from "react-router-dom";
import { Truck, MessageCircle, MapPin, ShieldCheck, Sparkles, Utensils } from "lucide-react";
import { useSeo } from "../utils/seo";
import { business } from "../data/business";
import { products } from "../data/products";
import { useSettings } from "../hooks/useSettings";
import ProductCard from "../components/products/ProductCard";
import SectionHeading from "../components/common/SectionHeading";
import ProcessSteps from "../components/common/ProcessSteps";
import ProcessVideos from "../components/common/ProcessVideos";
import DeliveryNotice from "../components/common/DeliveryNotice";
import ContactDetails from "../components/common/ContactDetails";
import MapEmbed from "../components/common/MapEmbed";
import WhatsAppButton from "../components/whatsapp/WhatsAppButton";

const specialties = [["home.spec1", Sparkles], ["home.spec2", Utensils], ["home.spec3", Truck]];
const whyItems = [["home.why1", MessageCircle], ["home.why2", ShieldCheck], ["home.why3", MapPin]];

export default function Home() {
  const { t, loc } = useSettings();
  useSeo({ description: t("seo.home"), path: "/" });

  const grid = (items) => (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map(([key, Icon]) => (
        <div key={key} className="card p-6">
          <Icon className="text-saffron-600" aria-hidden="true" />
          <h3 className="mt-3 text-xl font-bold">{t(`${key}t`)}</h3>
          <p className="mt-1 text-sm text-brown-700">{t(`${key}p`, { address: loc(business.address) })}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section className="bg-gradient-to-b from-cream-100 to-cream-50">
        <div className="container-page grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-2">
          <div className="fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-600">{t("brand.name")}</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{t("home.heroTitle")}</h1>
            <p className="mt-4 max-w-lg text-lg text-brown-700">{t("home.heroDesc")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="btn-primary">{t("home.explore")}</Link>
              <WhatsAppButton>{t("home.orderWa")}</WhatsAppButton>
            </div>
          </div>
          <img src="/images/hero.jpg" alt={t("home.heroAlt")} className="w-full rounded-3xl border-4 border-surface shadow-xl" />
        </div>
      </section>

      <section className="section container-page">
        <SectionHeading eyebrow={t("home.featuredEyebrow")} title={t("home.featured")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0, 3).map((p) => <ProductCard key={p.id} product={p} />)}</div>
        <div className="mt-8 text-center"><Link to="/products" className="btn-outline">{t("home.viewAll")}</Link></div>
      </section>

      <section className="section bg-cream-100">
        <div className="container-page">
          <SectionHeading eyebrow={t("home.specEyebrow")} title={t("home.spec")} />
          {grid(specialties)}
        </div>
      </section>

      <section className="section container-page">
        <SectionHeading eyebrow={t("home.procEyebrow")} title={t("home.proc")} text={t("home.procText")} />
        <ProcessSteps />
        <div className="mt-10"><ProcessVideos limit={2} /></div>
        <div className="mt-8 text-center"><Link to="/process" className="btn-outline">{t("home.learnMore")}</Link></div>
      </section>

      <section className="section bg-cream-100">
        <div className="container-page">
          <SectionHeading eyebrow={t("home.whyEyebrow")} title={t("home.why")} />
          {grid(whyItems)}
        </div>
      </section>

      <section className="section container-page">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading eyebrow={t("home.delEyebrow")} title={t("home.del")} text={t("home.delText")} />
          <DeliveryNotice className="text-start" />
          <WhatsAppButton topic="delivery" className="mt-6">{t("home.delBtn")}</WhatsAppButton>
        </div>
      </section>

      <section className="section bg-cream-100">
        <div className="container-page grid items-center gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border-4 border-surface shadow-xl">
            <img
              src="/images/shop-overview.jpg"
              alt={t("home.shopAlt")}
              width="768"
              height="1024"
              loading="lazy"
              className="max-h-[480px] w-full object-cover object-center transition duration-500 hover:scale-105"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-600">{t("about.eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-bold">{t("home.aboutShop")}</h2>
            <p className="mt-3 text-brown-700 leading-relaxed">{loc(business.description)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/about" className="btn-outline">{t("home.readMore")}</Link>
              <WhatsAppButton>{t("home.msgUs")}</WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section container-page">
        <SectionHeading eyebrow={t("home.visitEyebrow")} title={t("home.visit")} />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card p-6"><ContactDetails /><WhatsAppButton className="mt-6 w-full">{t("home.msgUs")}</WhatsAppButton></div>
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
