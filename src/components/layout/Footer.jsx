import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Truck, Clock } from "lucide-react";
import Logo from "../common/Logo";
import { business } from "../../data/business";
import { inquiryUrl } from "../../utils/whatsapp";
import { useSettings } from "../../hooks/useSettings";

const links = [["/", "nav.home"], ["/products", "nav.products"], ["/process", "nav.process"], ["/about", "nav.about"], ["/contact", "nav.contact"], ["/cart", "nav.cart"], ["/privacy-policy", "nav.privacy"], ["/terms", "nav.terms"]];

// Footer keeps a fixed dark-brown look in both themes.
export default function Footer() {
  const { t, loc } = useSettings();
  return (
    <footer className="mt-10 bg-[#2a170a] text-[#fdf6e7]">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-[#f8ebcf]/80">{loc(business.description)}</p>
        </div>
        <div>
          <h3 className="mb-3 font-display text-lg !text-gold-400">{t("footer.quick")}</h3>
          <ul className="space-y-2 text-sm">
            {links.map(([to, k]) => <li key={to}><Link to={to} className="hover:text-gold-400">{t(k)}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-display text-lg !text-gold-400">{t("footer.contact")}</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MessageCircle size={16} className="mt-1.5 shrink-0" aria-hidden="true" />
              <a href={inquiryUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">{t("footer.whatsapp", { phone: "" })}<span className="ltr-text">{business.phoneDisplay}</span></a></li>
            <li className="flex gap-2"><MapPin size={16} className="mt-1.5 shrink-0" aria-hidden="true" />{loc(business.address)}</li>
            {business.openingHours.length > 0 && (
              <li className="flex gap-2"><Clock size={16} className="mt-1.5 shrink-0" aria-hidden="true" />
                <span>{business.openingHours.map((h, i) => <span key={i} className="block">{loc(h.days)}: {loc(h.hours)}</span>)}</span></li>
            )}
          </ul>
          {business.socials.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-3 text-sm">
              {business.socials.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-400">{s.label}</a></li>)}
            </ul>
          )}
        </div>
        <div>
          <h3 className="mb-3 font-display text-lg !text-gold-400">{t("footer.delivery")}</h3>
          <p className="flex gap-2 text-sm"><Truck size={16} className="mt-1.5 shrink-0" aria-hidden="true" />{t("footer.deliveryText")}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-[#f8ebcf]/70">
        © {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}
      </div>
    </footer>
  );
}
