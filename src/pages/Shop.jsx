import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import api from "../api/axios.js";
import ShopProductCard from "../components/products/ShopProductCard.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import Pagination from "../components/common/Pagination.jsx";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "-createdAt";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data.categories)).catch(() => {});
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12, sort };
      if (search) params.search = search;
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const { data } = await api.get("/products", { params });
      setProducts(data.products);
      setMeta({ page: data.page, pages: data.pages, total: data.total });
    } catch (err) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, minPrice, maxPrice, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams({});

  const hasActiveFilters = search || category || minPrice || maxPrice;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-luxury-white">Shop the Collection</h1>
          <p className="text-luxury-white/50 mt-2">{meta.total} exquisite pieces</p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            defaultValue={search}
            placeholder="Search jewellery..."
            onKeyDown={(e) => e.key === "Enter" && updateParam("search", e.currentTarget.value)}
            className="bg-white/5 border border-luxury-white/15 rounded-full px-5 py-2.5 text-sm text-luxury-white placeholder:text-luxury-white/35 outline-none focus:border-luxury-accent w-56"
          />
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 border border-luxury-white/15 rounded-full px-5 py-2.5 text-sm text-luxury-white/80 hover:border-luxury-accent hover:text-luxury-accent transition-colors"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="mb-10 p-6 rounded-xl border border-luxury-white/10 bg-white/5 flex flex-wrap gap-6">
          <div>
            <label className="block text-xs text-luxury-white/50 mb-2 uppercase tracking-wide">Category</label>
            <select
              value={category}
              onChange={(e) => updateParam("category", e.target.value)}
              className="bg-luxury-bg border border-luxury-white/15 rounded-lg px-4 py-2 text-sm text-luxury-white outline-none focus:border-luxury-accent"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-luxury-white/50 mb-2 uppercase tracking-wide">Min Price</label>
            <input
              type="number"
              defaultValue={minPrice}
              onBlur={(e) => updateParam("minPrice", e.target.value)}
              className="bg-luxury-bg border border-luxury-white/15 rounded-lg px-4 py-2 text-sm text-luxury-white w-28 outline-none focus:border-luxury-accent"
            />
          </div>

          <div>
            <label className="block text-xs text-luxury-white/50 mb-2 uppercase tracking-wide">Max Price</label>
            <input
              type="number"
              defaultValue={maxPrice}
              onBlur={(e) => updateParam("maxPrice", e.target.value)}
              className="bg-luxury-bg border border-luxury-white/15 rounded-lg px-4 py-2 text-sm text-luxury-white w-28 outline-none focus:border-luxury-accent"
            />
          </div>

          <div>
            <label className="block text-xs text-luxury-white/50 mb-2 uppercase tracking-wide">Sort By</label>
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="bg-luxury-bg border border-luxury-white/15 rounded-lg px-4 py-2 text-sm text-luxury-white outline-none focus:border-luxury-accent"
            >
              <option value="-createdAt">Newest</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-ratingsAverage">Top Rated</option>
              <option value="-soldCount">Best Selling</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="self-end flex items-center gap-1 text-sm text-luxury-white/60 hover:text-luxury-accent transition-colors"
            >
              <X size={14} /> Clear all
            </button>
          )}
        </div>
      )}

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <EmptyState title="No products found" message="Try adjusting your filters or search terms." />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p, i) => (
              <ShopProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
          <Pagination page={meta.page} pages={meta.pages} onPageChange={(p) => updateParam("page", p)} />
        </>
      )}
    </div>
  );
}
