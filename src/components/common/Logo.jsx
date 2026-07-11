import { Link } from "react-router-dom";

/**
 * Logo
 * Shared brand mark for the jewellery house. A single sparkle glyph
 * paired with a Playfair Display wordmark, reused in the Navbar and
 * Footer so the identity stays consistent across the page.
 */
function Logo({ className = "", markSize = "w-5 h-5" }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={markSize}
        aria-hidden="true"
      >
        <path
          d="M12 2C12.4 6.6 13.4 9.6 16 12C13.4 14.4 12.4 17.4 12 22C11.6 17.4 10.6 14.4 8 12C10.6 9.6 11.6 6.6 12 2Z"
          fill="#CFA36A"
        />
      </svg>
      <span className="font-display text-xl tracking-[0.12em] text-luxury-white">
        AUR&Eacute;LIE
      </span>
    </Link>
  );
}

export default Logo;
