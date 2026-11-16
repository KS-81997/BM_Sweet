import { MessageCircle } from "lucide-react";
import { inquiryUrl } from "../../utils/whatsapp";
import { useSettings } from "../../hooks/useSettings";

// Click-to-chat inquiry button. The customer must press Send themselves in WhatsApp.
export default function WhatsAppButton({ topic = "general", children, className = "" }) {
  const { t } = useSettings();
  return (
    <a href={inquiryUrl(topic)} target="_blank" rel="noopener noreferrer" className={`btn-whatsapp ${className}`}>
      <MessageCircle size={18} aria-hidden="true" />
      {children ?? t("nav.order")}
    </a>
  );
}
