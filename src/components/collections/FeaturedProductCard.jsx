import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatPrice } from "../products/ShopProductCard.jsx";

/**
 * FeaturedProductCard
 * Large image-led card for a hand-picked featured piece. The image
 * scales gently on hover while a gradient caption panel holds the
 * name, category, and price, matching the cinematic tone of the
 * Hero image. Links straight through to the product page.
 */
function FeaturedProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.slug}`} className="group relative block h-[420px] rounded-2xl overflow-hidden">
        <motion.img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="font-body text-xs tracking-[0.1em] uppercase text-luxury-accent">
            {product.category?.name}
          </span>
          <h3 className="mt-2 font-display text-2xl text-luxury-white">{product.name}</h3>
          <p className="mt-2 font-body text-sm text-luxury-white/75 max-w-xs">
            {product.shortDescription || formatPrice(product.discountPrice > 0 ? product.discountPrice : product.price)}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 font-body text-xs tracking-[0.1em] uppercase text-luxury-accent">
            Explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default FeaturedProductCard;
