import { business } from "../data/business";
import { formatPKR } from "./cart";

// NOTE: the WhatsApp order message is always written in English so the shopkeeper receives one consistent format,
// whichever language the customer is browsing in. WhatsApp formatting is used: *bold*.

export const waUrl = (text = "") =>
  `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const inquiryUrl = (topic = "general") =>
  waUrl(
    topic === "delivery"
      ? `Assalam-o-Alaikum! I would like to inquire about delivery from ${business.name} in Lahore.`
      : `Assalam-o-Alaikum! I would like to make an inquiry about ${business.name}.`
  );

const LINE = "━━━━━━━━━━━━━━━━━━";

export const buildInquiryMessage = ({ name = "", phone = "", message = "" }) => {
  const val = (v) => (v && v.trim() ? v.trim() : "_Not provided_");
  const lines = [
    "Assalam-o-Alaikum! 🌙",
    "",
    `I would like to make an inquiry about *${business.name}*.`,
    "",
    LINE,
    "👤 *SENDER DETAILS*",
    LINE,
    `*Name:* ${val(name)}`,
    `*Phone:* ${val(phone)}`,
    "",
    LINE,
    "💬 *MESSAGE*",
    LINE,
    message.trim(),
    "",
    "Kindly respond when convenient.",
    "Thank you! 🙏",
  ];
  return lines.join("\n");
};

export const buildOrderMessage = (items, totals, customer = {}, orderId = null) => {
  const val = (v) => (v && v.trim() ? v.trim() : "_Not provided_");
  const money = (n) => (n === null ? "_To be confirmed_" : formatPKR(n));

  const lines = [
    "Assalam-o-Alaikum! 🌙",
    "",
    `I would like to place an order from *${business.name}*.`,
    ...(orderId ? [`*Order Reference:* #${orderId}`] : []),
    "",
    LINE,
    "👤 *CUSTOMER DETAILS*",
    LINE,
    `*Name:* ${val(customer.name)}`,
    `*Phone:* ${val(customer.phone)}`,
    `*Delivery Address:* ${val(customer.address)}`,
    "",
    LINE,
    "🛒 *ORDER DETAILS*",
    LINE,
    "",
  ];

  items.forEach((i, idx) => {
    lines.push(
      `*${idx + 1}. ${i.product.name.en}*`,
      `   • Size: ${i.size}`,
      `   • Quantity: ${i.qty}`,
      `   • Unit Price: ${money(i.unitPrice)}`,
      `   • Subtotal: *${money(i.subtotal)}*`
    );
    if (i.product.note) lines.push(`   • Note: ${i.product.note.en} (not included in subtotal)`);
    lines.push("");
  });

  lines.push(
    LINE,
    totals.hasUnpriced
      ? `💰 *Subtotal (priced items only): ${formatPKR(totals.subtotal)}*`
      : `💰 *Subtotal: ${formatPKR(totals.subtotal)}*`
  );
  if (totals.hasUnpriced) lines.push("_Some item prices are to be confirmed by the shopkeeper._");
  lines.push(
    "🚚 *Delivery Charges: Not Included*",
    LINE,
    "",
    "⚠️ *IMPORTANT:*",
    "Delivery charges and delivery timing are not included in this order total. Please confirm the applicable delivery charges and estimated delivery time directly."
  );
  if (customer.notes && customer.notes.trim()) lines.push("", `📝 *Additional Instructions:* ${customer.notes.trim()}`);
  lines.push("", "Kindly confirm my order.", "Thank you! 🙏");
  return lines.join("\n");
};
