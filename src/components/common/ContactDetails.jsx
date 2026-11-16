import { Clock, Mail, MapPin, MessageCircle, Truck } from "lucide-react";
import { business } from "../../data/business";
import { inquiryUrl } from "../../utils/whatsapp";
import { useSettings } from "../../hooks/useSettings";

export default function ContactDetails() {
  const { t, loc } = useSettings();
  const row = "flex gap-3";
  const icon = "mt-1 shrink-0 text-saffron-600";
  return (
    <ul className="space-y-4">
      <li className={row}><MapPin className={icon} size={20} aria-hidden="true" /><span><strong className="block">{t("brand.name")}</strong>{loc(business.address)}</span></li>
      <li className={row}><MessageCircle className={icon} size={20} aria-hidden="true" />
        <a href={inquiryUrl()} target="_blank" rel="noopener noreferrer" className="underline">{t("contact.whatsapp")} <span className="ltr-text">{business.phoneDisplay}</span></a></li>
      {business.email && <li className={row}><Mail className={icon} size={20} aria-hidden="true" /><a href={`mailto:${business.email}`} className="underline">{business.email}</a></li>}
      <li className={row}><Truck className={icon} size={20} aria-hidden="true" /><span>{t("contact.delivery")} {loc(business.deliveryArea)}</span></li>
      <li className={row}><Clock className={icon} size={20} aria-hidden="true" />
        {business.openingHours.length
          ? <span>{business.openingHours.map((h, i) => <span key={i} className="block">{loc(h.days)}: {loc(h.hours)}</span>)}</span>
          : <span>{t("contact.timings")}</span>}
      </li>
    </ul>
  );
}
