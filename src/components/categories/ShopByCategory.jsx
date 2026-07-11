import { useCallback, useEffect, useState } from "react";
import SectionHeading from "../common/SectionHeading.jsx";
import CategoryCard from "./CategoryCard.jsx";
import { CategoryCardSkeleton } from "../common/Skeleton.jsx";
import SectionState from "../common/SectionState.jsx";
import api from "../../api/axios.js";

/**
 * ShopByCategory
 * Horizontal row of circular category tiles, sourced live from
 * GET /api/categories, wrapping to a centered grid on smaller screens.
 */
function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");

  const fetchCategories = useCallback(() => {
    setStatus("loading");
    api
      .get("/categories")
      .then(({ data }) => {
        setCategories(data.categories);
        setStatus(data.categories.length > 0 ? "success" : "empty");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="bg-luxury-bg py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="Browse" title="Shop by Category" />

        {status === "loading" && (
          <div className="flex flex-wrap justify-center gap-10 sm:gap-14">
            {Array.from({ length: 4 }).map((_, i) => <CategoryCardSkeleton key={i} />)}
          </div>
        )}

        {status === "error" && (
          <SectionState message="Couldn't load categories right now." onRetry={fetchCategories} />
        )}

        {status === "empty" && (
          <SectionState message="Categories are coming soon." />
        )}

        {status === "success" && (
          <div className="flex flex-wrap justify-center gap-10 sm:gap-14">
            {categories.map((category, index) => (
              <CategoryCard key={category._id} category={category} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ShopByCategory;
