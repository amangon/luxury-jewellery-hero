import { motion } from "framer-motion";

/**
 * SectionHeading
 * Consistent heading block reused at the top of every home page section:
 * a small tracked-out eyebrow label, a Playfair Display title, and an
 * optional one-line subtext. Centered by default; pass align="left" for
 * sections that need a left-aligned header (e.g. paired with a "View all"
 * link).
 */
function SectionHeading({ eyebrow, title, subtext, align = "center" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${alignment} gap-3 mb-12`}
    >
      {eyebrow && (
        <span className="font-body text-xs tracking-[0.25em] uppercase text-luxury-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-luxury-white leading-tight">
        {title}
      </h2>
      {subtext && (
        <p className="font-body text-sm sm:text-base text-luxury-white/65 max-w-xl">
          {subtext}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
