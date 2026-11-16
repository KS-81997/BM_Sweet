import { useRef, useState } from "react";
import { Play, Video } from "lucide-react";
import { placeholderImage } from "../../data/business";
import { useSettings } from "../../hooks/useSettings";

const youtubeId = (url) => {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
};

// MP4 player that always sits in a 16:9 landscape frame. Portrait (phone) videos are shown whole in the
// centre, and the sides are filled with a blurred, muted copy of the same video (nothing is cropped).
function Mp4Player({ video, url, title, unsupported }) {
  const main = useRef(null);
  const bg = useRef(null);
  const [portrait, setPortrait] = useState(false);

  const check = (node) => node?.videoWidth && setPortrait(node.videoWidth < node.videoHeight);
  const syncTime = () => { if (bg.current && main.current) bg.current.currentTime = main.current.currentTime; };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
      {portrait && (
        <video
          ref={bg}
          aria-hidden="true"
          tabIndex={-1}
          muted
          playsInline
          preload="metadata"
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl"
        >
          <source src={url} type="video/mp4" />
        </video>
      )}
      <video
        ref={(node) => { main.current = node; check(node); }}
        className="relative h-full w-full object-contain"
        controls
        playsInline
        preload="metadata"
        poster={video.thumbnail || undefined}
        title={title}
        onLoadedMetadata={(e) => check(e.currentTarget)}
        onPlay={() => { syncTime(); bg.current?.play().catch(() => {}); }}
        onPause={() => bg.current?.pause()}
        onEnded={() => bg.current?.pause()}
        onSeeked={syncTime}
      >
        <source src={url} type="video/mp4" />
        {unsupported}
      </video>
    </div>
  );
}

// Data-driven player. video = { videoType: "youtube" | "mp4", videoUrl, thumbnail }
export default function VideoPlayer({ video, title }) {
  const { t } = useSettings();
  const [playing, setPlaying] = useState(false);
  const url = video?.videoUrl?.trim();
  title = title || t("video.default");

  if (!url) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gold-500/50 bg-cream-100 p-4 text-center text-sm text-brown-700">
        <Video size={32} className="text-saffron-600" aria-hidden="true" />
        {t("video.soon")}
      </div>
    );
  }

  if (video.videoType === "mp4") {
    return <Mp4Player video={video} url={url} title={title} unsupported={t("video.unsupported")} />;
  }

  const id = youtubeId(url);
  if (!id) return <p className="text-sm text-red-700 dark:text-red-300">{t("video.invalid")}</p>;
  const thumb = video.thumbnail || `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label={t("video.play", { title })}>
          <img src={thumb} onError={(e) => (e.currentTarget.src = placeholderImage)} alt="" loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/35">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-saffron-500 text-white shadow-lg"><Play size={28} fill="currentColor" /></span>
          </span>
        </button>
      )}
    </div>
  );
}
