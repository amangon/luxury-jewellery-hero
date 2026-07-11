import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../components/products/ShopProductCard.jsx";
import FormInput from "../components/common/FormInput.jsx";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const shipping = totalPrice >= 5000 ? 0 : 150;
  const tax = Math.round(totalPrice * 0.03 * 100) / 100;
  const grandTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    navigate("/cart", { replace: true });
    return null;
  }

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((i) => ({ product: i.productId, quantity: i.quantity })),
        shippingAddress: {
          fullName: values.fullName,
          phone: values.phone,
          line1: values.line1,
          line2: values.line2,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country || "India",
        },
        paymentMethod,
      };
      const { data } = await api.post("/orders", payload);
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/orders/${data.order._id}`, { replace: true });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <h1 className="font-display text-4xl text-luxury-white mb-10">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-display text-xl text-luxury-white">Shipping Address</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <FormInput
              label="Full Name"
              error={errors.fullName?.message}
              {...register("fullName", { required: "Required" })}
            />
            <FormInput
              label="Phone Number"
              error={errors.phone?.message}
              {...register("phone", { required: "Required" })}
            />
          </div>

          <FormInput
            label="Address Line 1"
            error={errors.line1?.message}
            {...register("line1", { required: "Required" })}
          />
          <FormInput label="Address Line 2 (optional)" {...register("line2")} />

          <div className="grid sm:grid-cols-3 gap-5">
            <FormInput
              label="City"
              error={errors.city?.message}
              {...register("city", { required: "Required" })}
            />
            <FormInput
              label="State"
              error={errors.state?.message}
              {...register("state", { required: "Required" })}
            />
            <FormInput
              label="Postal Code"
              error={errors.postalCode?.message}
              {...register("postalCode", { required: "Required" })}
            />
          </div>

          <FormInput label="Country" defaultValue="India" {...register("country")} />

          <h2 className="font-display text-xl text-luxury-white pt-4">Payment Method</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { id: "cod", label: "Cash on Delivery" },
              { id: "upi", label: "UPI" },
              { id: "card", label: "Credit / Debit Card" },
            ].map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`px-4 py-3 rounded-lg border text-sm transition-colors ${
                  paymentMethod === m.id
                    ? "border-luxury-accent text-luxury-accent bg-luxury-accent/10"
                    : "border-luxury-white/15 text-luxury-white/70"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl border border-luxury-white/10 bg-white/5 h-fit">
          <h2 className="font-display text-xl text-luxury-white mb-5">Order Summary</h2>
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {items.map((i) => (
              <div key={i.productId} className="flex justify-between text-sm text-luxury-white/70">
                <span className="truncate mr-2">{i.name} × {i.quantity}</span>
                <span className="whitespace-nowrap">{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm mt-4 pt-4 border-t border-luxury-white/10">
            <div className="flex justify-between text-luxury-white/70">
              <span>Subtotal</span><span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-luxury-white/70">
              <span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-luxury-white/70">
              <span>Tax (est.)</span><span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-luxury-white font-semibold text-base pt-3 border-t border-luxury-white/10">
              <span>Total</span><span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 py-3 rounded-full bg-luxury-accent text-luxury-bg font-semibold hover:bg-luxury-secondary transition-colors disabled:opacity-50"
          >
            {submitting ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
