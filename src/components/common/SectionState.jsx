import { RefreshCcw } from "lucide-react";

/**
 * SectionState
 * Compact inline message used inside homepage sections (categories,
 * featured, best sellers, new arrivals) when a live-data fetch fails
 * or returns nothing — lighter weight than the full-page EmptyState.
 */
export default function SectionState({ message, onRetry }) {
  return (
    <div className="text-center py-16">
      <p className="text-luxury-white/50 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-sm text-luxury-accent hover:underline"
        >
          <RefreshCcw size={14} /> Try again
        </button>
      )}
    </div>
  );
}
