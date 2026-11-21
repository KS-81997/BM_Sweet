import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cartTotals, resolveCart } from "../utils/cart";
import { getProduct } from "../data/products";

const STORAGE_KEY = "bjh-cart-v1";
const CartContext = createContext(null);

const load = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(data)) return [];
    // Keep only well-formed lines; anything else in saved data is discarded instead of crashing the app.
    return data
      .filter((l) => l && typeof l.productId === "string" && typeof l.size === "string")
      .map((l) => ({ productId: l.productId, size: l.size, qty: Math.min(Math.max(parseInt(l.qty, 10) || 1, 1), 99) }));
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable – cart still works for this session */
    }
  }, [lines]);

  const value = useMemo(() => {
    const items = resolveCart(lines);
    const same = (l, id, size) => l.productId === id && l.size === size;
    return {
      items,
      totals: cartTotals(items),
      addItem: (productId, size, qty = 1) => {
        if (!getProduct(productId)?.available) return;
        setLines((ls) =>
          ls.some((l) => same(l, productId, size))
            ? ls.map((l) => (same(l, productId, size) ? { ...l, qty: Math.min(l.qty + qty, 99) } : l))
            : [...ls, { productId, size, qty: Math.min(qty, 99) }]
        );
      },
      removeItem: (productId, size) => setLines((ls) => ls.filter((l) => !same(l, productId, size))),
      setQty: (productId, size, qty) =>
        setLines((ls) =>
          qty < 1
            ? ls.filter((l) => !same(l, productId, size))
            : ls.map((l) => (same(l, productId, size) ? { ...l, qty: Math.min(qty, 99) } : l))
        ),
      changeSize: (productId, oldSize, newSize) =>
        setLines((ls) => {
          if (oldSize === newSize) return ls;
          const moving = ls.find((l) => same(l, productId, oldSize));
          if (!moving) return ls;
          const rest = ls.filter((l) => !same(l, productId, oldSize));
          return rest.some((l) => same(l, productId, newSize))
            ? rest.map((l) => (same(l, productId, newSize) ? { ...l, qty: Math.min(l.qty + moving.qty, 99) } : l))
            : ls.map((l) => (same(l, productId, oldSize) ? { ...l, size: newSize } : l));
        }),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
