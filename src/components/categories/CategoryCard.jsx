import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * CategoryCard
 * Circular image tile representing one live product category. Kept
 * small and repeatable so the row reads as a quick-navigation strip
 * rather than a full product grid. Links into the Shop pre-filtered
 * to this category.
 */
function CategoryCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link to={`/shop?category=${category._id}`} className="group flex flex-col items-center gap-4">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border border-luxury-white/10 bg-luxury-white/5">
          <motion.img
            src={category.image?.url}
            alt={category.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
          />
          <div
            className="absolute inset-0 rounded-full ring-1 ring-inset ring-luxury-accent/0 group-hover:ring-luxury-accent/60 transition-all duration-300"
            aria-hidden="true"
          />
        </div>
        <span className="font-body text-sm tracking-[0.05em] text-luxury-white/85 group-hover:text-luxury-accent transition-colors">
          {category.name}
        </span>
      </Link>
    </motion.div>
  );
}

export default CategoryCard;
