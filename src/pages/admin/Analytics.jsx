import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import Loader from "../../components/common/Loader.jsx";
import { formatPrice } from "../../components/products/ShopProductCard.jsx";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard/sales-analytics?days=30").then(({ data }) => setAnalytics(data.analytics)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullScreen />;

  const maxRevenue = Math.max(...analytics.salesByDay.map((d) => d.revenue), 1);

  return (
    <div>
      <h1 className="font-display text-3xl text-luxury-white mb-8">Analytics</h1>

      <div className="p-6 rounded-xl border border-luxury-white/10 bg-white/5 mb-8">
        <h2 className="font-display text-lg text-luxury-white mb-6">Revenue — Last 30 Days</h2>
        {analytics.salesByDay.length === 0 ? (
          <p className="text-luxury-white/50 text-sm">No sales data for this period yet.</p>
        ) : (
          <div className="flex items-end gap-1.5 h-48">
            {analytics.salesByDay.map((d) => (
              <div key={d._id} className="flex-1 flex flex-col items-center justify-end group relative">
                <div
                  className="w-full bg-luxury-accent/70 hover:bg-luxury-accent rounded-t transition-colors"
                  style={{ height: `${Math.max((d.revenue / maxRevenue) * 100, 3)}%` }}
                  title={`${d._id}: ${formatPrice(d.revenue)}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl border border-luxury-white/10 bg-white/5">
          <h2 className="font-display text-lg text-luxury-white mb-5">Orders by Status</h2>
          <div className="space-y-3">
            {analytics.ordersByStatus.map((s) => (
              <div key={s._id} className="flex items-center justify-between text-sm">
                <span className="capitalize text-luxury-white/70">{s._id}</span>
                <span className="text-luxury-white font-medium">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl border border-luxury-white/10 bg-white/5">
          <h2 className="font-display text-lg text-luxury-white mb-5">Top Selling Products</h2>
          <div className="space-y-4">
            {analytics.topProducts.map((p) => (
              <div key={p._id} className="flex items-center gap-3">
                <img src={p.images?.[0]?.url} alt={p.name} className="w-10 h-10 rounded object-cover bg-white/5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-luxury-white truncate">{p.name}</p>
                  <p className="text-xs text-luxury-white/40">{p.soldCount} sold</p>
                </div>
                <span className="text-sm text-luxury-accent">{formatPrice(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
