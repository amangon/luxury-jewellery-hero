import Logo from "../common/Logo.jsx";
import FooterLinks, { QUICK_LINKS, CATEGORIES } from "./FooterLinks.jsx";
import NewsletterForm from "./NewsletterForm.jsx";
import SocialIcons from "./SocialIcons.jsx";

/**
 * Footer
 * Site-wide footer: brand mark and short line, quick links, product
 * categories, newsletter signup, social icons, and a copyright line.
 * Stacks to a single centered column on mobile, then expands into a
 * multi-column grid from md upward.
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-luxury-bg border-t border-luxury-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Logo />
            <p className="mt-4 font-body text-sm text-luxury-white/65 max-w-xs">
              Fine jewellery crafted for the modern woman, one remarkable piece at a time.
            </p>
            <SocialIcons className="mt-6" />
          </div>

          <div className="flex justify-center md:justify-start">
            <FooterLinks title="Quick Links" links={QUICK_LINKS} />
          </div>

          <div className="flex justify-center md:justify-start">
            <FooterLinks title="Categories" links={CATEGORIES} />
          </div>

          <div className="flex justify-center md:justify-start">
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-luxury-white/10 text-center">
          <p className="font-body text-xs text-luxury-white/45 tracking-wide">
            &copy; {year} Aur&eacute;lie Jewellery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
