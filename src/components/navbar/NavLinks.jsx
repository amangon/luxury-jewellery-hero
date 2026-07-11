import { NavLink } from "react-router-dom";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/#collections" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

/**
 * NavLinks
 * Horizontal primary navigation for desktop/tablet. Each link reveals
 * a thin accent underline on hover/focus, growing from the center out,
 * rather than a default underline, to match the restrained luxury tone.
 */
function NavLinks({ className = "" }) {
  return (
    <ul className={`flex items-center gap-10 ${className}`}>
      {LINKS.map((link) => (
        <li key={link.label}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              `group relative font-body text-sm tracking-[0.06em] transition-colors ${
                isActive ? "text-luxury-accent" : "text-luxury-white/85 hover:text-luxury-white"
              }`
            }
          >
            {link.label}
            <span
              className="absolute left-1/2 -bottom-1.5 h-px w-0 bg-luxury-accent transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"
              aria-hidden="true"
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
export { LINKS };
