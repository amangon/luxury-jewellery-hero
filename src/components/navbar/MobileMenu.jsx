import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { LINKS } from "./NavLinks.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

/**
 * MobileMenu
 * Full-height slide-in panel for small screens, triggered by the
 * hamburger icon in the Navbar. Contains the primary links plus a
 * login entry point. Animates in from the right and fades a backdrop
 * behind it; both are removed from the DOM when closed.
 *
 * isOpen: whether the menu is currently visible.
 * onClose: handler invoked when a link, the close icon, or the
 *          backdrop is activated.
 */
function MobileMenu({ isOpen, onClose }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    onClose();
    navigate(isAuthenticated ? "/profile" : "/login");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-[78%] max-w-sm bg-luxury-bg border-l border-luxury-white/10 z-50 lg:hidden flex flex-col px-8 py-8"
            aria-label="Mobile navigation"
          >
            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="text-luxury-white/85 hover:text-luxury-accent transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col gap-8 mt-12">
              {LINKS.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={onClose}
                    className="font-display text-2xl text-luxury-white hover:text-luxury-accent transition-colors"
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <button
              type="button"
              onClick={handleAccountClick}
              className="mt-auto border border-luxury-white/25 rounded-full py-3 text-sm font-body tracking-[0.08em] text-luxury-white hover:border-luxury-accent hover:text-luxury-accent transition-colors"
            >
              {isAuthenticated ? "My Account" : "Login"}
            </button>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
