import { useState } from "react";
import { motion } from "framer-motion";

/**
 * NewsletterSection
 * Full-width standalone newsletter block placed near the bottom of the
 * home page, ahead of the Footer. Larger and more editorial than the
 * compact form inside the Footer, with its own centered layout and
 * background glow. Kept as a separate component from the Footer's
 * NewsletterForm since the two serve different placements and visual
 * weight.
 */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section id="newsletter" className="relative bg-luxury-bg py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,120,60,0.14) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-xs tracking-[0.25em] uppercase text-luxury-accent">
            Join the House
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-luxury-white">
            Never Miss a New Arrival
          </h2>
          <p className="mt-4 font-body text-sm sm:text-base text-luxury-white/65">
            Subscribe for early access to new collections, private previews, and styling notes from our jewellers.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <label htmlFor="section-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="section-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full flex-1 bg-transparent border border-luxury-white/25 rounded-full px-5 py-3 text-sm font-body text-luxury-white placeholder:text-luxury-white/40 focus:border-luxury-accent outline-none transition-colors"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto shrink-0 bg-luxury-white text-luxury-bg font-body font-medium tracking-[0.08em] text-sm uppercase rounded-full px-8 py-3"
            >
              Subscribe
            </motion.button>
          </form>

          <p className="mt-3 text-xs font-body text-luxury-accent min-h-[1rem]" aria-live="polite">
            {submitted ? "Subscribed. Welcome to the house." : ""}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default NewsletterSection;
