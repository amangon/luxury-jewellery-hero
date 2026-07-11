/**
 * Skeleton
 * Base pulsing placeholder block. Compose with className to match the
 * shape of whatever content is loading (image tile, text line, circle).
 */
export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-luxury-white/8 rounded-lg ${className}`} />;
}

/** Matches the aspect-[4/5] image + two text lines of ShopProductCard. */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="aspect-[4/5] w-full rounded-xl" />
      <Skeleton className="h-3 w-16 mt-4 rounded" />
      <Skeleton className="h-5 w-3/4 mt-2 rounded" />
      <Skeleton className="h-4 w-20 mt-2 rounded" />
    </div>
  );
}

/** Matches the h-[420px] image card of the featured collection grid. */
export function CollectionCardSkeleton() {
  return <Skeleton className="h-[420px] w-full rounded-2xl" />;
}

/** Matches the circular image + label of CategoryCard. */
export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 rounded-full" />
      <Skeleton className="h-4 w-16 rounded" />
    </div>
  );
}
