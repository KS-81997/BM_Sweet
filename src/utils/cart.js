import { getProduct } from "../data/products";

export const formatPKR = (n) => `PKR ${Number(n).toLocaleString("en-PK")}`;

export const lineKey = (productId, sizeLabel) => `${productId}|${sizeLabel}`;

export const getSizePrice = (product, sizeLabel) => {
  const s = product?.sizes.find((x) => x.label === sizeLabel);
  return typeof s?.price === "number" ? s.price : null;
};

// Cart is stored as [{ productId, size, qty }]; details are resolved from product data so edits to prices apply.
export const resolveCart = (raw) =>
  raw
    .map((l) => {
      const product = getProduct(l.productId);
      if (!product || !product.sizes.some((s) => s.label === l.size)) return null;
      const unitPrice = getSizePrice(product, l.size);
      return {
        key: lineKey(l.productId, l.size),
        product,
        size: l.size,
        qty: l.qty,
        unitPrice,
        subtotal: unitPrice === null ? null : unitPrice * l.qty,
      };
    })
    .filter(Boolean);

export const cartTotals = (items) => ({
  count: items.reduce((n, i) => n + i.qty, 0),
  subtotal: items.reduce((n, i) => n + (i.subtotal ?? 0), 0),
  hasUnpriced: items.some((i) => i.unitPrice === null),
});
