import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";

const formatPrice = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);

/**
 * ShopProductCard
 * Live, API-backed counterpart to the homepage's static ProductCard -
 * same visual language (rounded image tile, wishlist corner button,
 * lift on hover) but wired to real Product documents, routing, cart,
 * and wishlist state.
 */
function ShopProductCard({ product, index = 0, badgeLabel }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const price = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount = product.discountPrice > 0 && product.discountPrice < product.price;
  const outOfStock = product.stock <= 0;
  const inWishlist = isInWishlist(product._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col"
    >
      <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-luxury-white/5">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images?.[0]?.url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {(badgeLabel || product.isNewArrival) && (
          <span className="absolute top-3 left-3 bg-luxury-white text-luxury-bg text-[10px] font-body font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full">
            {badgeLabel || "New"}
          </span>
        )}
        {outOfStock && (
          <span className="absolute top-3 left-3 bg-luxury-bg/80 text-luxury-white text-[10px] font-body font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full border border-luxury-white/20">
            Sold Out
          </span>
        )}

        <button
          type="button"
          aria-label={`${inWishlist ? "Remove from" : "Add"} wishlist`}
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-luxury-bg/60 backdrop-blur-sm text-luxury-white hover:text-luxury-accent transition-colors"
        >
          <Heart size={15} className={inWishlist ? "fill-luxury-accent text-luxury-accent" : ""} />
        </button>

        {!outOfStock && (
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-luxury-accent text-luxury-bg text-xs font-semibold tracking-[0.08em] uppercase py-3 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>
        )}
      </div>

      <Link to={`/product/${product.slug}`}>
        <span className="mt-4 block font-body text-xs tracking-[0.08em] uppercase text-luxury-white/50">
          {product.category?.name || ""}
        </span>
        <h3 className="mt-1 font-display text-lg text-luxury-white">{product.name}</h3>
        <span className="mt-1 flex items-center gap-2">
          <span className="font-body text-sm text-luxury-accent">{formatPrice(price)}</span>
          {hasDiscount && (
            <span className="font-body text-xs text-luxury-white/40 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </span>
      </Link>
    </motion.div>
  );
}

export default ShopProductCard;
export { formatPrice };
