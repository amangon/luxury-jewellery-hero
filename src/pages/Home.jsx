import Navbar from "../components/navbar/Navbar.jsx";
import Hero from "../components/hero/Hero.jsx";
import FeaturedCollections from "../components/collections/FeaturedCollections.jsx";
import ShopByCategory from "../components/categories/ShopByCategory.jsx";
import BestSellers from "../components/products/BestSellers.jsx";
import NewArrivals from "../components/products/NewArrivals.jsx";
import PromoBanner from "../components/banner/PromoBanner.jsx";
import WhyChooseUs from "../components/why-choose-us/WhyChooseUs.jsx";
import Testimonials from "../components/testimonials/Testimonials.jsx";
import InstagramGallery from "../components/instagram/InstagramGallery.jsx";
import NewsletterSection from "../components/newsletter/NewsletterSection.jsx";
import Footer from "../components/footer/Footer.jsx";

function Home() {
  return (
    <main className="min-h-screen bg-luxury-bg">
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <ShopByCategory />
      <BestSellers />
      <NewArrivals />
      <PromoBanner />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <NewsletterSection />
      <Footer />
    </main>
  );
}

export default Home;
