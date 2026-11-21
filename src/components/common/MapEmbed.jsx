import { Navigation } from "lucide-react";
import { business } from "../../data/business";
import { useSettings } from "../../hooks/useSettings";

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.mapQuery)}`;

export default function MapEmbed() {
  const { t } = useSettings();
  return (
    <div>
      <iframe
        title={t("map.title")}
        src={`https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full rounded-2xl border-0 sm:h-96"
        allowFullScreen
      />
      <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline mt-3">
        <Navigation size={16} aria-hidden="true" /> {t("map.directions")}
      </a>
    </div>
  );
}
