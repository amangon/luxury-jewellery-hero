import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Heart, ShoppingBag, User, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";

/**
 * NavIcons
 * Right-hand cluster of navbar actions: search, wishlist, cart (with a
 * live item-count badge), and a profile/login entry point. Icons share
 * a subtle lift + accent-color hover treatment for a consistent, quiet
 * luxury feel.
 */
function NavIcons({ className = "" }) {
  const iconHover = { y: -2, color: "#CFA36A" };
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user } = useAuth();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {/* Search */}
      <motion.button
        type="button"
        aria-label="Search"
        whileHover={iconHover}
        onClick={() => navigate("/shop")}
        className="text-luxury-white/85 transition-colors"
      >
        <Search size={20} strokeWidth={1.5} />
      </motion.button>

      {/* Wishlist */}
      <motion.button
        type="button"
        aria-label={`Wishlist, ${wishlist.length} item${wishlist.length === 1 ? "" : "s"}`}
        whileHover={iconHover}
        onClick={() => navigate("/wishlist")}
        className="relative text-luxury-white/85 transition-colors"
      >
        <Heart size={20} strokeWidth={1.5} />
        {wishlist.length > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-luxury-accent text-[10px] font-body font-semibold text-luxury-bg">
            {wishlist.length}
          </span>
        )}
      </motion.button>

      {/* Cart with item-count badge */}
      <motion.button
        type="button"
        aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
        whileHover={iconHover}
        onClick={() => navigate("/cart")}
        className="relative text-luxury-white/85 transition-colors"
      >
        <ShoppingBag size={20} strokeWidth={1.5} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-luxury-accent text-[10px] font-body font-semibold text-luxury-bg">
            {totalItems}
          </span>
        )}
      </motion.button>

      {isAdmin && (
        <motion.button
          type="button"
          aria-label="Admin dashboard"
          whileHover={iconHover}
          onClick={() => navigate("/admin")}
          className="hidden sm:inline-flex text-luxury-white/85 transition-colors"
        >
          <LayoutDashboard size={20} strokeWidth={1.5} />
        </motion.button>
      )}

      {/* Profile / login */}
      {isAuthenticated ? (
        <motion.button
          type="button"
          whileHover={{ y: -2, borderColor: "#CFA36A" }}
          onClick={() => navigate("/profile")}
          className="hidden sm:flex items-center gap-2 border border-luxury-white/25 rounded-full pl-3 pr-4 py-1.5 text-sm font-body text-luxury-white/85 transition-colors max-w-[160px]"
        >
          <User size={16} strokeWidth={1.5} />
          <span className="truncate">{user?.name?.split(" ")[0] || "Account"}</span>
        </motion.button>
      ) : (
        <motion.button
          type="button"
          whileHover={{ y: -2, borderColor: "#CFA36A" }}
          onClick={() => navigate("/login")}
          className="hidden sm:flex items-center gap-2 border border-luxury-white/25 rounded-full pl-3 pr-4 py-1.5 text-sm font-body text-luxury-white/85 transition-colors"
        >
          <User size={16} strokeWidth={1.5} />
          Login
        </motion.button>
      )}
    </div>
  );
}

export default NavIcons;
