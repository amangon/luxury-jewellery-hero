import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";
import api, { getErrorMessage } from "../api/axios.js";
import Loader from "../components/common/Loader.jsx";
import { formatPrice } from "../components/products/ShopProductCard.jsx";

const STATUS_STEPS = ["pending", "processing", "shipped", "delivered"];

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchOrder = () => {
    api.get(`/orders/${id}`).then(({ data }) => setOrder(data.order)).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Cancel this order? This cannot be undone.")) return;
    setCancelling(true);
    try {
      await api.put(`/orders/${id}/cancel`);
      toast.success("Order cancelled");
      fetchOrder();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Loader fullScreen />;
  if (!order) return <p className="text-center py-24 text-luxury-white/60">Order not found.</p>;

  const stepIndex = STATUS_STEPS.indexOf(order.status);
  const canCancel = !["shipped", "delivered", "cancelled"].includes(order.status);

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <div className="flex items-center gap-3 mb-2">
        <CheckCircle2 className="text-luxury-accent" size={24} />
        <h1 className="font-display text-3xl text-luxury-white">Order #{order.orderNumber}</h1>
      </div>
      <p className="text-luxury-white/50 mb-10">
        Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
      </p>

      {order.status !== "cancelled" ? (
        <div className="flex items-center justify-between mb-12">
          {STATUS_STEPS.map((step, i) => (
            <div key={step} className="flex-1 flex flex-col items-center relative">
              {i > 0 && (
                <div
                  className={`absolute top-3 right-1/2 w-full h-px ${
                    i <= stepIndex ? "bg-luxury-accent" : "bg-luxury-white/15"
                  }`}
                />
              )}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] z-10 ${
                  i <= stepIndex ? "bg-luxury-accent text-luxury-bg" : "bg-luxury-white/10 text-luxury-white/40"
                }`}
              >
                {i + 1}
              </div>
              <span className="text-xs text-luxury-white/60 mt-2 capitalize">{step}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-12 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
          This order was cancelled{order.cancelReason ? `: ${order.cancelReason}` : "."}
        </div>
      )}

      <div className="space-y-4 mb-10">
        {order.items.map((item) => (
          <div key={item.product} className="flex gap-4 pb-4 border-b border-luxury-white/10">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-luxury-white/5" />
            <div className="flex-1">
              <p className="text-luxury-white">{item.name}</p>
              <p className="text-sm text-luxury-white/50">Qty: {item.quantity}</p>
            </div>
            <span className="text-luxury-accent">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="font-display text-lg text-luxury-white mb-2">Shipping Address</h3>
          <p className="text-sm text-luxury-white/60 leading-relaxed">
            {order.shippingAddress.fullName}<br />
            {order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
            {order.shippingAddress.country}<br />
            {order.shippingAddress.phone}
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg text-luxury-white mb-2">Payment Summary</h3>
          <div className="text-sm text-luxury-white/60 space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(order.itemsPrice)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{order.shippingPrice === 0 ? "Free" : formatPrice(order.shippingPrice)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{formatPrice(order.taxPrice)}</span></div>
            <div className="flex justify-between text-luxury-white font-semibold pt-2 border-t border-luxury-white/10">
              <span>Total</span><span>{formatPrice(order.totalPrice)}</span>
            </div>
            <p className="pt-2 capitalize">Method: {order.paymentMethod} · Status: {order.paymentStatus}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/orders" className="text-sm text-luxury-white/60 hover:text-luxury-accent transition-colors">
          Back to Orders
        </Link>
        {canCancel && (
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="ml-auto text-sm px-5 py-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
          >
            {cancelling ? "Cancelling..." : "Cancel Order"}
          </button>
        )}
      </div>
    </div>
  );
}
