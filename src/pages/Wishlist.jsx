import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext.jsx";
import ShopProductCard from "../components/products/ShopProductCard.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

export default function Wishlist() {
  const { wishlist, loading } = useWishlist();

  if (loading) return <Loader fullScreen />;

  if (wishlist.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        message="Save pieces you love to find them here later."
        actionLabel="Explore the Shop"
        actionTo="/shop"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <h1 className="font-display text-4xl text-luxury-white mb-10">My Wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {wishlist.map((p, i) => (
          <ShopProductCard key={p._id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
