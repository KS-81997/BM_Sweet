import { business } from "../../data/business";
import { products } from "../../data/products";
import { useSettings } from "../../hooks/useSettings";
import VideoPlayer from "./VideoPlayer";

// Collects owner-provided videos (shop-level and per-product). Shows a placeholder if none exist.
const allVideos = () => [
  ...business.processVideos,
  ...products.filter((p) => p.video?.videoUrl).map((p) => ({ ...p.video, title: p.name })),
];

export default function ProcessVideos({ limit }) {
  const { loc } = useSettings();
  const vids = allVideos().slice(0, limit);
  if (!vids.length) return <div className="mx-auto max-w-3xl"><VideoPlayer video={null} /></div>;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {vids.map((v, i) => (
        <figure key={i}>
          <VideoPlayer video={v} title={loc(v.title) || undefined} />
          {v.title && <figcaption className="mt-2 text-sm text-brown-700">{loc(v.title)}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
