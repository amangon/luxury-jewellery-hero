import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import api, { getErrorMessage } from "../../api/axios.js";
import Loader from "../../components/common/Loader.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import { formatPrice } from "../../components/products/ShopProductCard.jsx";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15, includeInactive: "true" };
      if (search) params.search = search;
      const { data } = await api.get("/products", { params });
      setProducts(data.products);
      setPages(data.pages);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-luxury-white">Products</h1>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-luxury-accent text-luxury-bg font-medium text-sm hover:bg-luxury-secondary transition-colors"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-white/40" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full bg-white/5 border border-luxury-white/15 rounded-full pl-10 pr-4 py-2.5 text-sm text-luxury-white placeholder:text-luxury-white/35 outline-none focus:border-luxury-accent"
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-xl border border-luxury-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-luxury-white/50 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3">Product</th>
                <th className="text-left px-5 py-3">Category</th>
                <th className="text-left px-5 py-3">Price</th>
                <th className="text-left px-5 py-3">Stock</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t border-luxury-white/10">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <img src={p.images?.[0]?.url} alt={p.name} className="w-10 h-10 rounded object-cover bg-white/5" />
                    <span className="text-luxury-white">{p.name}</span>
                  </td>
                  <td className="px-5 py-3 text-luxury-white/60">{p.category?.name}</td>
                  <td className="px-5 py-3 text-luxury-accent">{formatPrice(p.discountPrice > 0 ? p.discountPrice : p.price)}</td>
                  <td className="px-5 py-3">
                    <span className={p.stock <= 5 ? "text-amber-400" : "text-luxury-white/70"}>{p.stock}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${p.isActive ? "bg-emerald-500/15 text-emerald-400" : "bg-white/10 text-luxury-white/50"}`}>
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/products/${p._id}/edit`} className="p-2 rounded-lg hover:bg-white/10 text-luxury-white/60 hover:text-luxury-accent transition-colors">
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => handleDelete(p._id, p.name)} className="p-2 rounded-lg hover:bg-white/10 text-luxury-white/60 hover:text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-luxury-white/40">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} pages={pages} onPageChange={setPage} />
    </div>
  );
}
