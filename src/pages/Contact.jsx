import { useState } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { useSeo } from "../utils/seo";
import { useSettings } from "../hooks/useSettings";
import ContactDetails from "../components/common/ContactDetails";
import MapEmbed from "../components/common/MapEmbed";
import DeliveryNotice from "../components/common/DeliveryNotice";
import { buildInquiryMessage, waUrl } from "../utils/whatsapp";

export default function Contact() {
  const { t } = useSettings();
  const [c, setC] = useState({ name: "", phone: "", message: "" });
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  useSeo({ title: t("nav.contact"), description: t("seo.contact"), path: "/contact" });

  const set = (k) => (e) => setC((s) => ({ ...s, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!c.message.trim() && !c.name.trim()) {
      setError(true);
      return;
    }
    setError(false);

    // Build URL and open WhatsApp
    const message = buildInquiryMessage(c);
    const url = waUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");

    // Clear contact form info after sending
    setC({ name: "", phone: "", message: "" });
    setSent(true);
  };

  return (
    <div className="container-page section">
      <h1 className="text-4xl font-bold">{t("contact.title")}</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Left Column: Contact Form */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-brown-900">{t("contact.formTitle")}</h2>
          <p className="mt-1 text-sm text-brown-700">{t("contact.formSubtitle")}</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block text-sm font-medium">
              {t("contact.name")}
              <input
                className="input mt-1"
                value={c.name}
                onChange={set("name")}
                autoComplete="name"
                placeholder="e.g. Tariq Mehmood"
              />
            </label>
            <label className="block text-sm font-medium">
              {t("contact.phone")}
              <input
                className="input mt-1 text-start"
                dir="auto"
                type="tel"
                value={c.phone}
                onChange={set("phone")}
                autoComplete="tel"
                placeholder="0300 1234567"
              />
            </label>
            <label className="block text-sm font-medium">
              {t("contact.message")}
              <textarea
                className="input mt-1"
                dir="auto"
                rows={4}
                value={c.message}
                onChange={set("message")}
                placeholder="e.g. I would like to inquire about bulk jalebi delivery for a family event..."
              />
            </label>

            {error && (
              <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-300">
                {t("contact.emptyError")}
              </p>
            )}

            {sent && (
              <div role="status" className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800 border border-green-600/30 dark:bg-green-950/40 dark:text-green-200">
                <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                <span>{t("contact.success")}</span>
              </div>
            )}

            <button type="submit" className="btn-whatsapp w-full">
              <MessageCircle size={18} aria-hidden="true" />
              {t("contact.submit")}
            </button>
          </form>

          <DeliveryNotice className="mt-6" />
        </div>

        {/* Right Column: Contact Details & Map */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">{t("footer.contact")}</h2>
            <ContactDetails />
          </div>
          <MapEmbed />
        </div>
      </div>
    </div>
  );
}
