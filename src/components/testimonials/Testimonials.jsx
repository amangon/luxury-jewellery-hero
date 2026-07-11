import SectionHeading from "../common/SectionHeading.jsx";
import TestimonialCard from "./TestimonialCard.jsx";
import { TESTIMONIALS } from "../../data/content.js";

/**
 * Testimonials
 * Three-column grid of verified customer quotes, stacking to a single
 * column on mobile.
 */
function Testimonials() {
  return (
    <section className="bg-luxury-bg py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
