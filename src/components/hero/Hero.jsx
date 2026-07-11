import HeroImage from "./HeroImage.jsx";
import HeroContent from "./HeroContent.jsx";
import BackgroundEffects from "./BackgroundEffects.jsx";

/**
 * Hero
 * Top-level hero section for the luxury jewellery landing page.
 *
 * Layout behavior:
 * - Desktop (lg+): 50/50 split grid, image left, content right.
 * - Tablet (md): stacked, image first, content centered below.
 * - Mobile: single column, centered content, full-width button.
 */
function Hero() {
  return (
    <section
      className="relative bg-luxury-bg overflow-hidden"
      aria-label="Hero"
    >
      <BackgroundEffects />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Image column: appears first on all breakpoints (image-first on tablet/mobile too) */}
          <div className="order-1 lg:order-1">
            <HeroImage />
          </div>

          {/* Content column */}
          <div className="order-2 lg:order-2">
            <HeroContent />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
