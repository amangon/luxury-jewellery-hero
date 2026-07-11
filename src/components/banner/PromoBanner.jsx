import { motion } from "framer-motion";

/**
 * PromoBanner
 * Full-bleed promotional strip between the product grids and the trust
 * section. A single striking image with a warm cinematic overlay,
 * matching the Hero's lighting treatment, carries a short offer and a
 * single CTA.
 */
function PromoBanner() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative rounded-2xl overflow-hidden min-h-[420px] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1600&q=80"
            alt="Close-up of a luxury diamond jewellery piece with warm cinematic lighting"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(15,15,15,0.92) 15%, rgba(15,15,15,0.55) 55%, rgba(255,120,60,0.15) 100%)",
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-md px-8 sm:px-14 py-14"
          >
            <span className="font-body text-xs tracking-[0.25em] uppercase text-luxury-accent">
              Private Preview
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-luxury-white leading-tight">
              Enjoy 15% off your first order
            </h2>
            <p className="mt-4 font-body text-sm sm:text-base text-luxury-white/75">
              Sign up for early access to new collections and a welcome offer on your first piece.
            </p>
            <motion.a
              href="#newsletter"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-block bg-luxury-white text-luxury-bg font-body font-medium tracking-[0.08em] text-sm uppercase rounded-full px-8 py-3.5"
            >
              Claim Offer
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
