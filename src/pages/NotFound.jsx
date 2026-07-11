import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-display text-7xl text-luxury-accent mb-4">404</h1>
      <h2 className="font-display text-2xl text-luxury-white mb-3">Page Not Found</h2>
      <p className="text-luxury-white/60 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-luxury-accent text-luxury-bg font-medium hover:bg-luxury-secondary transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
