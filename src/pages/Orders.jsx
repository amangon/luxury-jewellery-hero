import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import api from "../api/axios.js";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { formatPrice } from "../components/products/ShopProductCard.jsx";

const STATUS_COLORS = {
  pending: "bg-amber-500/15 text-amber-400",
  processing: "bg-blue-500/15 text-blue-400",
  shipped: "bg-purple-500/15 text-purple-400",
  delivered: "bg-emerald-500/15 text-emerald-400",
  cancelled: "bg-red-500/15 text-red-400",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/my-orders")
      .then(({ data }) => setOrders(data.orders))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullScreen />;

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        message="Your placed orders will show up here."
        actionLabel="Start Shopping"
        actionTo="/shop"
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <h1 className="font-display text-4xl text-luxury-white mb-10">My Orders</h1>

      <div className="space-y-5">
        {orders.map((o) => (
          <Link
            key={o._id}
            to={`/orders/${o._id}`}
            className="block p-5 rounded-xl border border-luxury-white/10 bg-white/5 hover:border-luxury-accent/50 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-lg text-luxury-white">#{o.orderNumber}</p>
                <p className="text-xs text-luxury-white/50 mt-1">
                  {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  {" · "}{o.items.length} item{o.items.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-luxury-accent">{formatPrice(o.totalPrice)}</span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${STATUS_COLORS[o.status]}`}>
                  {o.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
