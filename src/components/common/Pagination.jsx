import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pages, onPageChange }) {
  if (!pages || pages <= 1) return null;

  const nums = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(pages, start + 4);
  for (let i = start; i <= end; i++) nums.push(i);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-luxury-white/15 text-luxury-white/70 disabled:opacity-30 hover:border-luxury-accent hover:text-luxury-accent transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {nums.map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`w-9 h-9 flex items-center justify-center rounded-full text-sm transition-colors ${
            n === page
              ? "bg-luxury-accent text-luxury-bg font-semibold"
              : "border border-luxury-white/15 text-luxury-white/70 hover:border-luxury-accent hover:text-luxury-accent"
          }`}
        >
          {n}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-luxury-white/15 text-luxury-white/70 disabled:opacity-30 hover:border-luxury-accent hover:text-luxury-accent transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
