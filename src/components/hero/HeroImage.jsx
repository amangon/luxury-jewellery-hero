import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * HeroImage
 * Left-side visual: a large portrait of a model wearing diamond jewellery,
 * rendered inside a 32px-radius rounded rectangle with warm cinematic
 * lighting and a soft shadow. A decorative accent panel sits behind and
 * slightly overlaps the image edge. A gentle scroll-driven parallax shifts
 * the image within its frame.
 */
function HeroImage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: image drifts a small amount as the section scrolls
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[560px] mx-auto lg:mx-0"
    >
      {/* Decorative accent panel behind the image, slightly overlapping */}
      <div
        className="absolute -bottom-6 -left-6 w-[85%] h-[85%] rounded-hero-image"
        style={{
          background:
            "linear-gradient(135deg, rgba(207,163,106,0.25) 0%, rgba(165,107,70,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-hero-image overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
      >
        <motion.img
          src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80"
          alt="Female model wearing an elegant diamond jewellery set, lit with warm cinematic lighting"
          className="w-full h-[560px] md:h-[640px] object-cover"
          style={{ y: parallaxY }}
          loading="lazy"
        />

        {/* Warm orange/red cinematic lighting overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,120,60,0.28) 0%, rgba(15,15,15,0) 45%, rgba(15,15,15,0.35) 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}

export default HeroImage;
