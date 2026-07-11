import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About Us", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

const CATEGORIES = [
  { label: "Necklaces", to: "/shop" },
  { label: "Rings", to: "/shop" },
  { label: "Earrings", to: "/shop" },
  { label: "Bracelets", to: "/shop" },
];

/**
 * FooterLinks
 * Renders a single labeled column of footer links. Reused twice in the
 * Footer, once for "Quick Links" and once for "Categories", so the
 * heading style and spacing stay identical between both. Category
 * links route to the general Shop page (the footer has no category
 * ID context); use the live "Shop by Category" section above for
 * pre-filtered links.
 */
function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="font-display text-lg text-luxury-white mb-5">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="font-body text-sm text-luxury-white/65 hover:text-luxury-accent transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterLinks;
export { QUICK_LINKS, CATEGORIES };
