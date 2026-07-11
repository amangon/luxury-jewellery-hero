import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sparkle from "./Sparkle.jsx";

/**
 * HeroContent
 * Right-side copy block: sparkle eyebrow mark, the display heading,
 * a short supporting subtitle, and the primary call-to-action button.
 * Each element enters with its own motion treatment per the spec:
 * heading slides in from the left, subtitle and button fade in.
 */
function HeroContent() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-[520px] mx-auto lg:mx-0">
      {/* Eyebrow sparkle icon */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <Sparkle className="w-6 h-6" />
      </motion.div>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-extrabold text-luxury-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-wide"
      >
        Elegant &amp; Luxury
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-6 font-body text-base sm:text-lg leading-relaxed max-w-[420px]"
        style={{ color: "rgba(255,255,255,0.75)" }}
      >
        Remarkable jewellery for the modern woman.
      </motion.p>

      {/* CTA button */}
      <motion.button
        type="button"
        onClick={() => navigate("/shop")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        whileHover={{
          scale: 1.04,
          y: -4,
          boxShadow: "0 20px 40px -12px rgba(255,255,255,0.25)",
        }}
        whileTap={{ scale: 0.98 }}
        className="mt-10 bg-luxury-white text-luxury-bg font-body font-medium tracking-[0.08em] text-sm uppercase rounded-full px-10 py-4 w-full sm:w-auto transition-shadow"
      >
        Shop Collection
      </motion.button>
    </div>
  );
}

export default HeroContent;
