import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, IndianRupee, AlertTriangle, Clock } from "lucide-react";
import api from "../../api/axios.js";
import Loader from "../../components/common/Loader.jsx";
import StatCard from "../../components/admin/StatCard.jsx";
import { formatPrice } from "../../components/products/ShopProductCard.jsx";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard/summary").then(({ data }) => setSummary(data.summary)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <h1 className="font-display text-3xl text-luxury-white mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard icon={IndianRupee} label="Total Revenue" value={formatPrice(summary.totalRevenue)} accent />
        <StatCard icon={ShoppingCart} label="Total Orders" value={summary.totalOrders} />
        <StatCard icon={Package} label="Total Products" value={summary.totalProducts} />
        <StatCard icon={Users} label="Total Customers" value={summary.totalUsers} />
        <StatCard icon={Clock} label="Pending Orders" value={summary.pendingOrders} />
        <StatCard icon={AlertTriangle} label="Low Stock Items" value={summary.lowStockCount} />
      </div>
    </div>
  );
}
