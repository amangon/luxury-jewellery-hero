import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);
const STORAGE_KEY = "lj_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product._id);
      const maxStock = product.stock ?? 99;

      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, maxStock);
        toast.success("Cart updated");
        return prev.map((i) =>
          i.productId === product._id ? { ...i, quantity: newQty } : i
        );
      }

      toast.success("Added to cart");
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          image: product.images?.[0]?.url || "",
          price: product.discountPrice > 0 ? product.discountPrice : product.price,
          stock: maxStock,
          quantity: Math.min(quantity, maxStock),
        },
      ];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
          : i
      )
    );
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    toast.success("Removed from cart");
  };

  const clearCart = () => setItems([]);

  const { totalItems, totalPrice } = useMemo(() => {
    return items.reduce(
      (acc, i) => ({
        totalItems: acc.totalItems + i.quantity,
        totalPrice: acc.totalPrice + i.quantity * i.price,
      }),
      { totalItems: 0, totalPrice: 0 }
    );
  }, [items]);

  const value = { items, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
