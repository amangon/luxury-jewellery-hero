import { createContext, useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../api/axios.js";
import { useAuth } from "./AuthContext.jsx";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get("/users/wishlist");
      setWishlist(data.wishlist || []);
    } catch (err) {
      // silent fail - non-critical
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const isInWishlist = (productId) => wishlist.some((p) => p._id === productId);

  const toggleWishlist = async (product) => {
    if (!isAuthenticated) {
      toast.error("Please log in to save items to your wishlist");
      return;
    }
    try {
      const { data } = await api.post(`/users/wishlist/${product._id}`);
      toast.success(data.message);
      if (data.inWishlist) {
        setWishlist((prev) => [...prev, product]);
      } else {
        setWishlist((prev) => prev.filter((p) => p._id !== product._id));
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const value = { wishlist, loading, isInWishlist, toggleWishlist, fetchWishlist };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
