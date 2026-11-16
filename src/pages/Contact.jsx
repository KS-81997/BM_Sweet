import { useSeo } from "../utils/seo";
import { useSettings } from "../hooks/useSettings";
import ContactDetails from "../components/common/ContactDetails";
import MapEmbed from "../components/common/MapEmbed";
import WhatsAppButton from "../components/whatsapp/WhatsAppButton";
import DeliveryNotice from "../components/common/DeliveryNotice";

export default function Contact() {
  const { t } = useSettings();
  useSeo({ title: t("nav.contact"), description: t("seo.contact"), path: "/contact" });
  return (
    <div className="container-page section">
      <h1 className="text-4xl font-bold">{t("contact.title")}</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="card p-6">
          <ContactDetails />
          <WhatsAppButton className="mt-6 w-full">{t("contact.send")}</WhatsAppButton>
          <DeliveryNotice className="mt-4" />
        </div>
        <MapEmbed />
      </div>
    </div>
  );
}
