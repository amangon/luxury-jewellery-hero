import { motion } from "framer-motion";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    path: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 17C10.5 12.5 10 8.5 12.5 8.5C14.2 8.5 14.8 10 14.4 11.5C14 13 12.8 14 11.5 13.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    path: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 8.5H12.8C12 8.5 11.5 9 11.5 9.8V11.5M11.5 11.5H14M11.5 11.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
];

/**
 * SocialIcons
 * Row of social platform links rendered as inline SVG glyphs, each
 * lifting slightly and shifting to the accent color on hover.
 */
function SocialIcons({ className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {SOCIALS.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          whileHover={{ y: -3, color: "#CFA36A" }}
          className="text-luxury-white/70 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {social.path}
          </svg>
        </motion.a>
      ))}
    </div>
  );
}

export default SocialIcons;
