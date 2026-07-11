import { useCallback, useEffect, useState } from "react";
import SectionHeading from "../common/SectionHeading.jsx";
import ShopProductCard from "./ShopProductCard.jsx";
import { ProductCardSkeleton } from "../common/Skeleton.jsx";
import SectionState from "../common/SectionState.jsx";
import api from "../../api/axios.js";

/**
 * NewArrivals
 * Grid of the most recently added pieces, sourced live from
 * GET /api/products/new-arrivals. Visually identical in structure to
 * Best Sellers but with a "New" badge instead.
 */
function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  const fetchProducts = useCallback(() => {
    setStatus("loading");
    api
      .get("/products/new-arrivals")
      .then(({ data }) => {
        setProducts(data.products);
        setStatus(data.products.length > 0 ? "success" : "empty");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="bg-luxury-bg py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Just In"
          title="New Arrivals"
          subtext="The latest additions to the house, fresh from the atelier."
        />

        {status === "loading" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        )}

        {status === "error" && (
          <SectionState message="Couldn't load new arrivals right now." onRetry={fetchProducts} />
        )}

        {status === "empty" && (
          <SectionState message="No new arrivals yet — check back soon." />
        )}

        {status === "success" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <ShopProductCard key={product._id} product={product} index={index} badgeLabel="New" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default NewArrivals;
