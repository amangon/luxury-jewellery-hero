import { Star } from "lucide-react";

export default function StarRating({ rating = 0, count, size = 15, interactive = false, onChange }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange?.(s)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            size={size}
            className={s <= Math.round(rating) ? "fill-luxury-accent text-luxury-accent" : "text-luxury-white/25"}
          />
        </button>
      ))}
      {typeof count === "number" && (
        <span className="text-xs text-luxury-white/50 ml-1">({count})</span>
      )}
    </div>
  );
}
