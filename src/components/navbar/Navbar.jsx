import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../common/Logo.jsx";
import NavLinks from "./NavLinks.jsx";
import NavIcons from "./NavIcons.jsx";
import MobileMenu from "./MobileMenu.jsx";
import useScrolled from "../../hooks/useScrolled.js";

/**
 * Navbar
 * Sticky top navigation. Starts fully transparent over the hero image
 * and gains a soft dark, blurred, bordered background once the page is
 * scrolled, so it stays legible over any section beneath it. Collapses
 * to a hamburger-triggered slide-in panel below the lg breakpoint.
 */
function Navbar() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-30 transition-colors duration-500 ${
          scrolled
            ? "bg-luxury-bg/85 backdrop-blur-md border-b border-luxury-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
          <Logo />

          <NavLinks className="hidden lg:flex" />

          <div className="flex items-center gap-4">
            <NavIcons className="hidden lg:flex" />

            {/* Hamburger trigger (mobile/tablet) */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-luxury-white/90 hover:text-luxury-accent transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7H20M4 12H20M4 17H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Navbar;
