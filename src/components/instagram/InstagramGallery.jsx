import { motion } from "framer-motion";
import { INSTAGRAM_POSTS } from "../../data/content.js";
import SectionHeading from "../common/SectionHeading.jsx";

/**
 * InstagramGallery
 * Responsive image grid representing the brand's Instagram feed, with
 * a subtle hover overlay revealing the handle. Purely visual; each
 * tile links out to the platform.
 */
function InstagramGallery() {
  return (
    <section className="bg-luxury-bg py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Follow Along"
          title="@aurelie.jewellery"
          subtext="Join our community for styling inspiration and first looks."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {INSTAGRAM_POSTS.map((post, index) => (
            <motion.a
              key={post.id}
              href="#"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group relative aspect-square rounded-lg overflow-hidden"
              aria-label="View post on Instagram"
            >
              <img
                src={post.image}
                alt="Aurélie jewellery Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-luxury-bg/0 group-hover:bg-luxury-bg/50 transition-colors duration-300 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-luxury-white"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InstagramGallery;
