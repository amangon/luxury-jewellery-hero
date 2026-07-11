import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../../api/axios.js";
import Loader from "../../components/common/Loader.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import { formatPrice } from "../../components/products/ShopProductCard.jsx";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

const STATUS_COLORS = {
  pending: "bg-amber-500/15 text-amber-400",
  processing: "bg-blue-500/15 text-blue-400",
  shipped: "bg-purple-500/15 text-purple-400",
  delivered: "bg-emerald-500/15 text-emerald-400",
  cancelled: "bg-red-500/15 text-red-400",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (statusFilter) params.status = statusFilter;
      const { data } = await api.get("/orders", { params });
      setOrders(data.orders);
      setPages(data.pages);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-luxury-white">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="bg-white/5 border border-luxury-white/15 rounded-lg px-4 py-2 text-sm text-luxury-white outline-none focus:border-luxury-accent"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-xl border border-luxury-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-luxury-white/50 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3">Order</th>
                <th className="text-left px-5 py-3">Customer</th>
                <th className="text-left px-5 py-3">Total</th>
                <th className="text-left px-5 py-3">Payment</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-t border-luxury-white/10">
                  <td className="px-5 py-3 text-luxury-white">#{o.orderNumber}</td>
                  <td className="px-5 py-3 text-luxury-white/60">{o.user?.name}<br /><span className="text-xs">{o.user?.email}</span></td>
                  <td className="px-5 py-3 text-luxury-accent">{formatPrice(o.totalPrice)}</td>
                  <td className="px-5 py-3 text-luxury-white/60 uppercase text-xs">{o.paymentMethod} · {o.paymentStatus}</td>
                  <td className="px-5 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                      className={`text-xs px-2.5 py-1.5 rounded-full border-0 outline-none capitalize ${STATUS_COLORS[o.status]}`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s} className="bg-luxury-bg text-luxury-white">{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-luxury-white/50 text-xs">
                    {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-luxury-white/40">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} pages={pages} onPageChange={setPage} />
    </div>
  );
}
