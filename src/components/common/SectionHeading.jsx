export default function SectionHeading({ eyebrow, title, text, center = true, as: H = "h2" }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-saffron-600">{eyebrow}</p>}
      <H className="text-3xl font-bold sm:text-4xl">{title}</H>
      {text && <p className="mt-3 text-brown-700">{text}</p>}
    </div>
  );
}
