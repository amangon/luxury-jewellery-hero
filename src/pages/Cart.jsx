import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { formatPrice } from "../components/products/ShopProductCard.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        message="Discover our latest pieces and add something beautiful to your bag."
        actionLabel="Continue Shopping"
        actionTo="/shop"
      />
    );
  }

  const shipping = totalPrice >= 5000 ? 0 : 150;
  const tax = Math.round(totalPrice * 0.03 * 100) / 100;
  const grandTotal = totalPrice + shipping + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <h1 className="font-display text-4xl text-luxury-white mb-10">Your Bag ({totalItems})</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 pb-6 border-b border-luxury-white/10">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover bg-luxury-white/5" />

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between">
                  <h3 className="font-display text-lg text-luxury-white">{item.name}</h3>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-luxury-white/40 hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <span className="text-luxury-accent mt-1">{formatPrice(item.price)}</span>

                <div className="mt-auto flex items-center gap-3">
                  <div className="flex items-center border border-luxury-white/15 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-luxury-white/70 hover:text-luxury-accent"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-7 text-center text-sm text-luxury-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-luxury-white/70 hover:text-luxury-accent"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-xl border border-luxury-white/10 bg-white/5 h-fit">
          <h2 className="font-display text-xl text-luxury-white mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-luxury-white/70">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-luxury-white/70">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-luxury-white/70">
              <span>Tax (est.)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-luxury-white font-semibold text-base pt-3 border-t border-luxury-white/10">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 py-3 rounded-full bg-luxury-accent text-luxury-bg font-semibold hover:bg-luxury-secondary transition-colors"
          >
            Proceed to Checkout
          </button>
          <Link to="/shop" className="block text-center text-sm text-luxury-white/50 hover:text-luxury-accent mt-4 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
