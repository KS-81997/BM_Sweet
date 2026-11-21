// Central business configuration. Edit values here; the whole site updates.
// Text fields are bilingual: { en: "English text", ur: "اردو متن" }.
// Anything left empty ("" or []) is hidden or shown as "to be confirmed" on the site.
export const business = {
  name: "Bismillah Jalebi House",
  nameUr: "بسم اللہ جلیبی ہاؤس",
  whatsapp: "923034259262", // international format, digits only
  phoneDisplay: "+92 303 4259262",
  address: {
    en: "Outfall Road, near Begana Burger, Islampura, Lahore, Pakistan", // TODO(owner): verify
    ur: "آؤٹ فال روڈ، بیگانہ برگر کے قریب، اسلام پورہ، لاہور، پاکستان",
  },
  deliveryArea: { en: "Lahore, Pakistan", ur: "لاہور، پاکستان" },
  email: "", // TODO(owner)
  siteUrl: "https://YOUR-DOMAIN.com", // TODO: set after domain is configured
  googleBusinessUrl: "https://www.google.com/search?q=Bismillah+Jalebi+House",
  // Directions / embedded map are built from this query. Replace with the verified Google Maps place link when available.
  mapQuery: "Bismillah Jalebi House, Outfall Road, Islampura, Lahore, Pakistan",
  // Opening hours, e.g. [{ days: { en: "Monday – Sunday", ur: "پیر تا اتوار" }, hours: "9:00 AM – 10:00 PM" }]. Leave empty until verified.
  openingHours: [],
  // Social links: { label: "Facebook", url: "https://..." }. Leave empty until provided.
  socials: [],
  shopOverviewImage: "/images/shop-overview.jpg",

  description: {
    en: "Bismillah Jalebi House is a traditional Pakistani sweets and jalebi shop on Outfall Road, Islampura, Lahore.",
    ur: "بسم اللہ جلیبی ہاؤس لاہور کے علاقے اسلام پورہ، آؤٹ فال روڈ پر واقع روایتی پاکستانی مٹھائیوں اور جلیبی کی دکان ہے۔",
  },
  history: { en: "", ur: "" }, // TODO(owner): the shop's real story
  establishedYear: "1980", // confirmed by the owner (shop banner: "1980 سے قائم شدہ")
  ownerName: { en: "", ur: "" }, // TODO(owner)
  commitment: { en: "", ur: "" }, // TODO(owner)

  // Generic placeholder preparation steps – replace with the shop's actual process.
  processIntro: {
    en: "Jalebi is a traditional South Asian sweet made from a fermented batter that is fried in spirals and soaked in sugar syrup. The steps below are a general overview and are placeholders until the shop provides its own preparation process.",
    ur: "جلیبی جنوبی ایشیا کی روایتی مٹھائی ہے جو خمیر شدہ بیسن/میدے کے آمیزے کو گول چکروں کی شکل میں تل کر شیرے میں ڈبو کر بنائی جاتی ہے۔ نیچے دیے گئے مراحل ایک عمومی جائزہ ہیں اور دکان کا اپنا طریقہ فراہم ہونے تک عارضی ہیں۔",
  },
  processSteps: [
    {
      title: { en: "Preparing the batter", ur: "آمیزہ تیار کرنا" },
      text: {
        en: "A batter is prepared and left to rest. (General overview – replace with the shop's actual method.)",
        ur: "آمیزہ تیار کر کے کچھ دیر رکھا جاتا ہے۔ (عمومی جائزہ – دکان کے اصل طریقے سے بدل دیا جائے گا۔)",
      },
    },
    {
      title: { en: "Frying the spirals", ur: "چکر بنا کر تلنا" },
      text: {
        en: "The batter is piped into hot oil in the classic spiral shape and fried until golden.",
        ur: "آمیزے کو گرم تیل میں روایتی گول چکروں کی شکل میں ڈال کر سنہری ہونے تک تلا جاتا ہے۔",
      },
    },
    {
      title: { en: "Soaking in syrup", ur: "شیرے میں ڈبونا" },
      text: {
        en: "The fried jalebi is dipped in sugar syrup so it absorbs its sweetness.",
        ur: "تلی ہوئی جلیبی کو چینی کے شیرے میں ڈبویا جاتا ہے تاکہ اس میں مٹھاس رچ بس جائے۔",
      },
    },
    {
      title: { en: "Serving", ur: "پیش کرنا" },
      text: { en: "Jalebi is served and packed to order.", ur: "جلیبی آرڈر کے مطابق پیش اور پیک کی جاتی ہے۔" },
    },
  ],
  // Shop preparation videos: { title: {en, ur}, videoType: "youtube" | "mp4", videoUrl, thumbnail }
  processVideos: [
    {
      title: { en: "Jalebi preparation at our shop", ur: "ہماری دکان پر جلیبی کی تیاری" },
      videoType: "mp4",
      videoUrl: "/videos/shop-preparation.mp4",
      thumbnail: "",
    },
    // Product videos (e.g. Flower Ring) are added automatically from products.js – no need to list them here.
  ],
};

export const placeholderImage = "/images/placeholder.svg";
