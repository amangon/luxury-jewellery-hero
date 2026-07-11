import { motion } from "framer-motion";

/**
 * icons
 * Minimal inline SVG glyphs mapped by key, avoiding an external icon
 * dependency for this small, fixed set.
 */
const ICONS = {
  gem: (
    <path d="M6 9L12 3L18 9L12 21L6 9Z M6 9H18 M9 9L12 21 M15 9L12 21" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  ),
  shield: (
    <path d="M12 3L19 6V11C19 15.4 16 19 12 21C8 19 5 15.4 5 11V6L12 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  ),
  truck: (
    <>
      <path d="M3 7H14V16H3V7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M14 10H18L21 13V16H14V10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  sparkle: (
    <path d="M12 2C12.4 8 13.6 11 18 12C13.6 13 12.4 16 12 22C11.6 16 10.4 13 6 12C10.4 11 11.6 8 12 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  ),
};

/**
 * FeatureCard
 * Single trust-signal tile: icon, title, and short supporting line.
 */
function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center text-center gap-4 px-4"
    >
      <div className="w-14 h-14 rounded-full border border-luxury-accent/40 flex items-center justify-center text-luxury-accent">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {ICONS[feature.icon]}
        </svg>
      </div>
      <h3 className="font-display text-lg text-luxury-white">{feature.title}</h3>
      <p className="font-body text-sm text-luxury-white/60 max-w-[220px]">{feature.description}</p>
    </motion.div>
  );
}

export default FeatureCard;
