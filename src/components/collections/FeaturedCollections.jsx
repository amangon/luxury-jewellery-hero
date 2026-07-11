import { useCallback, useEffect, useState } from "react";
import SectionHeading from "../common/SectionHeading.jsx";
import FeaturedProductCard from "./FeaturedProductCard.jsx";
import { CollectionCardSkeleton } from "../common/Skeleton.jsx";
import SectionState from "../common/SectionState.jsx";
import api from "../../api/axios.js";

/**
 * FeaturedCollections
 * Showcases up to three hand-picked featured pieces, sourced live from
 * GET /api/products/featured, in a responsive grid: one column on
 * mobile, three columns from lg upward.
 */
function FeaturedCollections() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  const fetchFeatured = useCallback(() => {
    setStatus("loading");
    api
      .get("/products/featured")
      .then(({ data }) => {
        const top3 = data.products.slice(0, 3);
        setProducts(top3);
        setStatus(top3.length > 0 ? "success" : "empty");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return (
    <section id="collections" className="bg-luxury-bg py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Curated"
          title="Featured Collection"
          subtext="Hand-picked pieces the house is showcasing right now."
        />

        {status === "loading" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <CollectionCardSkeleton key={i} />)}
          </div>
        )}

        {status === "error" && (
          <SectionState message="Couldn't load the featured collection right now." onRetry={fetchFeatured} />
        )}

        {status === "empty" && (
          <SectionState message="No featured pieces have been highlighted yet." />
        )}

        {status === "success" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <FeaturedProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedCollections;
