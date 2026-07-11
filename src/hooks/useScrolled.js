import { useEffect, useState } from "react";

/**
 * useScrolled
 * Returns true once the page has scrolled past `threshold` pixels.
 * Used by the Navbar to switch from a transparent hero-overlay state
 * to a solid, backdrop-blurred state as the user scrolls down.
 */
function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}

export default useScrolled;
