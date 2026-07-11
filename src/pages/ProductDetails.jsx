import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Heart, Minus, Plus, ShoppingBag, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import api, { getErrorMessage } from "../api/axios.js";
import { formatPrice } from "../components/products/ShopProductCard.jsx";
import ShopProductCard from "../components/products/ShopProductCard.jsx";
import Loader from "../components/common/Loader.jsx";
import StarRating from "../components/common/StarRating.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setActiveImage(0);
    setQuantity(1);

    api
      .get(`/products/${slug}`)
      .then(({ data }) => {
        if (ignore) return;
        setProduct(data.product);
        return api.get(`/products/${data.product._id}/related`);
      })
      .then((res) => {
        if (res && !ignore) setRelated(res.data.products);
      })
      .catch(() => {})
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [slug]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please log in to write a review");
      return;
    }
    setSubmittingReview(true);
    try {
      await api.post(`/products/${product._id}/reviews`, reviewForm);
      toast.success("Review submitted");
      const { data } = await api.get(`/products/${slug}`);
      setProduct(data.product);
      setReviewForm({ rating: 5, comment: "" });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <Loader fullScreen />;
  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-2xl text-luxury-white mb-4">Product not found</h2>
        <Link to="/shop" className="text-luxury-accent hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const price = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount = product.discountPrice > 0 && product.discountPrice < product.price;
  const inWishlist = isInWishlist(product._id);
  const outOfStock = product.stock <= 0;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="rounded-xl overflow-hidden aspect-square bg-luxury-white/5 mb-4">
            <img
              src={product.images[activeImage]?.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img.publicId}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeImage ? "border-luxury-accent" : "border-transparent"
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="font-body text-xs tracking-[0.1em] uppercase text-luxury-accent">
            {product.category?.name}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-luxury-white mt-2">{product.name}</h1>

          <div className="flex items-center gap-3 mt-3">
            <StarRating rating={product.ratingsAverage} count={product.ratingsCount} />
          </div>

          <div className="flex items-center gap-3 mt-5">
            <span className="font-display text-2xl text-luxury-accent">{formatPrice(price)}</span>
            {hasDiscount && (
              <span className="text-luxury-white/40 line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="text-luxury-white/65 mt-6 leading-relaxed">
            {product.shortDescription || product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            {product.material && (
              <div><span className="text-luxury-white/40">Material: </span><span className="text-luxury-white/80">{product.material}</span></div>
            )}
            {product.gemstone && (
              <div><span className="text-luxury-white/40">Gemstone: </span><span className="text-luxury-white/80">{product.gemstone}</span></div>
            )}
            {product.weight && (
              <div><span className="text-luxury-white/40">Weight: </span><span className="text-luxury-white/80">{product.weight}</span></div>
            )}
            <div>
              <span className="text-luxury-white/40">Availability: </span>
              <span className={outOfStock ? "text-red-400" : "text-emerald-400"}>
                {outOfStock ? "Out of Stock" : `${product.stock} in stock`}
              </span>
            </div>
          </div>

          {!outOfStock && (
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border border-luxury-white/15 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-luxury-white/70 hover:text-luxury-accent"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-luxury-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-luxury-white/70 hover:text-luxury-accent"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-luxury-accent text-luxury-bg font-semibold hover:bg-luxury-secondary transition-colors"
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle wishlist"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-luxury-white/15 text-luxury-white/70 hover:text-luxury-accent hover:border-luxury-accent transition-colors"
              >
                <Heart size={18} className={inWishlist ? "fill-luxury-accent text-luxury-accent" : ""} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-luxury-white/10 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck size={20} className="text-luxury-accent" />
              <span className="text-xs text-luxury-white/60">Free shipping over ₹5,000</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck size={20} className="text-luxury-accent" />
              <span className="text-xs text-luxury-white/60">Certified authenticity</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RotateCcw size={20} className="text-luxury-accent" />
              <span className="text-xs text-luxury-white/60">7-day easy returns</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      <div className="mt-20 max-w-3xl">
        <h2 className="font-display text-2xl text-luxury-white mb-6">Customer Reviews</h2>

        {product.reviews.length === 0 ? (
          <p className="text-luxury-white/50 mb-8">No reviews yet. Be the first to share your thoughts.</p>
        ) : (
          <div className="space-y-6 mb-10">
            {product.reviews.map((r) => (
              <div key={r._id} className="pb-6 border-b border-luxury-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-luxury-white">{r.name}</span>
                  <StarRating rating={r.rating} size={13} />
                </div>
                {r.comment && <p className="text-luxury-white/60 text-sm mt-2">{r.comment}</p>}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={submitReview} className="p-6 rounded-xl border border-luxury-white/10 bg-white/5">
          <h3 className="font-display text-lg text-luxury-white mb-4">Write a Review</h3>
          <StarRating
            rating={reviewForm.rating}
            interactive
            size={22}
            onChange={(r) => setReviewForm((f) => ({ ...f, rating: r }))}
          />
          <textarea
            value={reviewForm.comment}
            onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
            placeholder="Share your experience with this piece..."
            rows={3}
            className="w-full mt-4 bg-white/5 border border-luxury-white/15 rounded-lg px-4 py-2.5 text-luxury-white placeholder:text-luxury-white/35 outline-none focus:border-luxury-accent"
          />
          <button
            type="submit"
            disabled={submittingReview}
            className="mt-4 px-6 py-2.5 rounded-full bg-luxury-accent text-luxury-bg font-medium hover:bg-luxury-secondary transition-colors disabled:opacity-50"
          >
            {submittingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl text-luxury-white mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <ShopProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
