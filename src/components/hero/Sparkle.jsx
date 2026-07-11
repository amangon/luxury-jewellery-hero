/**
 * Sparkle
 * Small decorative four-point sparkle icon used as an eyebrow mark
 * above the hero heading. Rendered as inline SVG so its color can
 * inherit the luxury accent token and scale cleanly at any size.
 */
function Sparkle({ className = "w-5 h-5", color = "#CFA36A" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2C12.4 6.6 13.4 9.6 16 12C13.4 14.4 12.4 17.4 12 22C11.6 17.4 10.6 14.4 8 12C10.6 9.6 11.6 6.6 12 2Z"
        fill={color}
      />
      <path
        d="M19.5 4C19.7 5.8 20.1 7 21.5 8C20.1 9 19.7 10.2 19.5 12C19.3 10.2 18.9 9 17.5 8C18.9 7 19.3 5.8 19.5 4Z"
        fill={color}
        opacity="0.7"
      />
    </svg>
  );
}

export default Sparkle;
