import { useCallback, useEffect, useState } from "react";
import SectionHeading from "../common/SectionHeading.jsx";
import ShopProductCard from "./ShopProductCard.jsx";
import { ProductCardSkeleton } from "../common/Skeleton.jsx";
import SectionState from "../common/SectionState.jsx";
import api from "../../api/axios.js";

/**
 * BestSellers
 * Grid of the house's top-performing pieces, sourced live from
 * GET /api/products/best-sellers. 2 columns on mobile, 4 on desktop.
 */
function BestSellers() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error | empty

  const fetchProducts = useCallback(() => {
    setStatus("loading");
    api
      .get("/products/best-sellers")
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
    <section id="shop" className="bg-luxury-bg py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Most Loved"
          title="Best Sellers"
          subtext="The pieces our clients return to, order after order."
        />

        {status === "loading" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        )}

        {status === "error" && (
          <SectionState message="Couldn't load best sellers right now." onRetry={fetchProducts} />
        )}

        {status === "empty" && (
          <SectionState message="No best sellers have been added yet — check back soon." />
        )}

        {status === "success" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <ShopProductCard key={product._id} product={product} index={index} badgeLabel="Best Seller" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BestSellers;
