import { motion } from "framer-motion";

/**
 * TestimonialCard
 * Single customer quote with a star rating and attribution. Presented
 * on a subtly bordered panel to read as a quiet card within the
 * testimonials grid.
 */
function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col gap-4 p-8 rounded-2xl border border-luxury-white/10 bg-luxury-white/[0.02]"
    >
      <div className="flex gap-1 text-luxury-accent" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2L14.9 8.6L22 9.3L16.7 14.1L18.2 21.2L12 17.6L5.8 21.2L7.3 14.1L2 9.3L9.1 8.6L12 2Z" />
          </svg>
        ))}
      </div>

      <p className="font-body text-sm sm:text-base text-luxury-white/80 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-2">
        <p className="font-display text-base text-luxury-white">{testimonial.name}</p>
        <p className="font-body text-xs text-luxury-white/50">{testimonial.role}</p>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;
