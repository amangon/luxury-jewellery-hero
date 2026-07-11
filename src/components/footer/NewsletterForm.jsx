import { useState } from "react";
import { motion } from "framer-motion";

/**
 * NewsletterForm
 * Email capture form for the footer. Kept intentionally simple: a
 * single input plus a submit control, with a quiet confirmation state
 * shown in the form's own voice after a successful submit. No network
 * request is wired up here since there is no backend endpoint yet.
 */
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div>
      <h3 className="font-display text-lg text-luxury-white mb-3">Stay in Touch</h3>
      <p className="font-body text-sm text-luxury-white/65 mb-5 max-w-xs">
        Be the first to know about new collections and private previews.
      </p>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 min-w-0 bg-transparent border border-luxury-white/25 rounded-full px-4 py-2.5 text-sm font-body text-luxury-white placeholder:text-luxury-white/40 focus:border-luxury-accent outline-none transition-colors"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Subscribe"
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-luxury-white text-luxury-bg"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </form>

      <p className="mt-3 text-xs font-body text-luxury-accent min-h-[1rem]" aria-live="polite">
        {submitted ? "Subscribed. Welcome to the list." : ""}
      </p>
    </div>
  );
}

export default NewsletterForm;
