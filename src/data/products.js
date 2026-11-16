// Central product catalogue (from the shop menu). Edit freely. Text fields are bilingual: { en, ur }.
// perKg: price of 1 KG in PKR. Smaller sizes are calculated from it (250 Gram = 1/4, 500 Gram = 1/2).
//   To use different prices per size, give `sizes` explicit prices instead of using sizesFromKg().
// price: null -> shown as "Price on WhatsApp" (never as a confirmed price).
// note: optional bilingual note shown on the card, product page, cart and WhatsApp message (e.g. extra charges).
// size labels stay in English ("250 Gram", "1 KG"); the site shows them as گرام / کلو in Urdu automatically.
// category must match a key in src/i18n/translations.js ("cat.<name>") so filters show in both languages.
// video: { videoType: "youtube" | "mp4", videoUrl: "", thumbnail: "" } -> leave videoUrl empty until the owner provides a video.
// image: put photos in /public/images/products and reference them as "/images/products/name.jpg".
const noVideo = () => ({ videoType: "youtube", videoUrl: "", thumbnail: "" });
const sizesFromKg = (kg) => [
  { label: "250 Gram", price: kg / 4 },
  { label: "500 Gram", price: kg / 2 },
  { label: "1 KG", price: kg },
];

const make = (id, name, description, longDescription, category, image, perKg, note) => ({
  id, name, description, longDescription, category,
  image, images: [image],
  perKg,
  sizes: sizesFromKg(perKg),
  note,
  video: noVideo(),
  available: true,
});

const orderLine = {
  en: "Choose your weight and order directly on WhatsApp.",
  ur: "اپنی پسند کا وزن منتخب کریں اور براہِ راست واٹس ایپ پر آرڈر کریں۔",
};
const long = (en, ur) => ({ en: `${en} ${orderLine.en}`, ur: `${ur} ${orderLine.ur}` });

export const products = [
  make("jalebi-full-sugar",
    { en: "Full Sugar Jalebi", ur: "فل شوگر جلیبی" },
    { en: "Traditional jalebi, full sugar.", ur: "روایتی جلیبی، فل شوگر۔" },
    long("Traditional jalebi in the full sugar variety, from Bismillah Jalebi House.", "بسم اللہ جلیبی ہاؤس کی روایتی جلیبی، فل شوگر قسم۔"),
    "Jalebi", "/images/products/full-sugar.jpg", 800),
  make("jalebi-lite-sugar",
    { en: "Lite Sugar Jalebi", ur: "لائٹ شوگر جلیبی" },
    { en: "Traditional jalebi, lite sugar.", ur: "روایتی جلیبی، لائٹ شوگر۔" },
    long("Traditional jalebi in the lite sugar variety, from Bismillah Jalebi House.", "بسم اللہ جلیبی ہاؤس کی روایتی جلیبی، لائٹ شوگر قسم۔"),
    "Jalebi", "/images/products/lite-sugar.jpg", 1200),
  make("jalebi-without-sugar",
    { en: "Without Sugar Jalebi", ur: "بغیر چینی جلیبی" },
    { en: "Traditional jalebi, without sugar.", ur: "روایتی جلیبی، بغیر چینی۔" },
    long("Traditional jalebi in the without sugar variety, from Bismillah Jalebi House.", "بسم اللہ جلیبی ہاؤس کی روایتی جلیبی، بغیر چینی قسم۔"),
    "Jalebi", "/images/products/without-sugar.jpg", 1600),
  {
    ...make("jalebi-flower-ring",
      { en: "Special Flower Ring Jalebi", ur: "اسپیشل فلاور رنگ جلیبی" },
      { en: "Special flower-ring shaped jalebi.", ur: "پھول کے چھلے کی شکل کی خاص جلیبی۔" },
      long("Special flower ring jalebi from Bismillah Jalebi House.", "بسم اللہ جلیبی ہاؤس کی اسپیشل فلاور رنگ جلیبی۔"),
      "Jalebi", "/images/products/flower-ring.jpg", 800,
      { en: "Extra charges: PKR 50", ur: "اضافی چارجز: 50 روپے" }),
    // Shop's own video of this product (portrait phone video – the player adapts to it).
    video: { videoType: "mp4", videoUrl: "/videos/finished-product.mp4", thumbnail: "" },
  },
  make("ram-pori",
    { en: "Ram Pori", ur: "رام پوری" },
    { en: "Ram Pori from Bismillah Jalebi House.", ur: "بسم اللہ جلیبی ہاؤس کی رام پوری۔" },
    long("Ram Pori from Bismillah Jalebi House.", "بسم اللہ جلیبی ہاؤس کی رام پوری۔"),
    "Jalebi", "/images/products/ram-pori.jpg", 800),
  make("special-gulguly",
    { en: "Special Gulguly", ur: "اسپیشل گلگلے" },
    { en: "Special gulguly sweet.", ur: "خاص گلگلے مٹھائی۔" },
    long("Special gulguly from Bismillah Jalebi House.", "بسم اللہ جلیبی ہاؤس کے اسپیشل گلگلے۔"),
    "Traditional Sweets", "/images/products/gulguly.jpg", 800),
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];
export const getProduct = (id) => products.find((p) => p.id === id);
