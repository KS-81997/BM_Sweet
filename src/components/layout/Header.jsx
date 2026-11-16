import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import Logo from "../common/Logo";
import SettingsToggles from "../common/SettingsToggles";
import { useCart } from "../../hooks/useCart";
import { useSettings } from "../../hooks/useSettings";
import { inquiryUrl } from "../../utils/whatsapp";

export const navLinks = [
  { to: "/", key: "nav.home" },
  { to: "/products", key: "nav.products" },
  { to: "/process", key: "nav.process" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { totals } = useCart();
  const { t } = useSettings();
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  const linkCls = ({ isActive }) =>
    `whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? "bg-saffron-400/20 text-saffron-700" : "text-brown-800 hover:text-saffron-600"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-gold-400/30 bg-cream-50/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-2">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("nav.main")}>
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkCls}>{t(l.key)}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <SettingsToggles className="hidden sm:flex" />
          <Link to="/cart" className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-200" aria-label={t("nav.cartAria", { n: totals.count })}>
            <ShoppingBag size={22} aria-hidden="true" />
            {totals.count > 0 && (
              <span className="absolute end-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron-500 px-1 text-[11px] font-bold text-white">
                {totals.count}
              </span>
            )}
          </Link>
          <a href={inquiryUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp hidden whitespace-nowrap !px-4 !py-2 md:inline-flex lg:ms-1">
            <MessageCircle size={16} aria-hidden="true" /> {t("nav.order")}
          </a>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-200 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="border-t border-gold-400/30 bg-cream-50 lg:hidden" aria-label={t("nav.mobile")}>
          <div className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => `rounded-xl px-3 py-3 font-medium ${isActive ? "bg-saffron-400/20 text-saffron-700" : ""}`}>
                {t(l.key)}
              </NavLink>
            ))}
            <SettingsToggles className="px-1 sm:hidden" />
            <a href={inquiryUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-2">
              <MessageCircle size={18} aria-hidden="true" /> {t("nav.order")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
