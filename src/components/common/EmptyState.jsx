import { Link } from "react-router-dom";

export default function EmptyState({ icon: Icon, title, message, actionLabel, actionTo }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-6 py-16">
      {Icon && <Icon className="w-14 h-14 text-luxury-accent/60 mb-4" strokeWidth={1.25} />}
      <h3 className="font-display text-2xl text-luxury-white mb-2">{title}</h3>
      {message && <p className="text-luxury-white/60 max-w-md mb-6">{message}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxury-accent text-luxury-bg font-medium hover:bg-luxury-secondary transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
