/**
 * BackgroundEffects
 * Purely decorative, non-interactive background layer for the Hero section.
 * Composes a top-right warm radial glow, a soft vignette, and a set of
 * very subtle curved lines to add depth without introducing clutter.
 * aria-hidden because it carries no content meaning for assistive tech.
 */
function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top-right warm radial glow */}
      <div
        className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,120,60,0.18) 0%, rgba(255,120,60,0.06) 45%, transparent 70%)",
        }}
      />

      {/* Subtle curved decorative lines */}
      <svg
        className="absolute top-0 right-0 w-full h-full opacity-[0.08]"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMin slice"
      >
        <path
          d="M1440 100C1200 180 1000 60 780 160C560 260 500 480 300 520"
          stroke="#CFA36A"
          strokeWidth="1"
        />
        <path
          d="M1440 260C1220 320 1040 220 860 300C680 380 640 560 460 600"
          stroke="#CFA36A"
          strokeWidth="1"
        />
        <path
          d="M1440 40C1300 40 1150 -40 980 20"
          stroke="#A56B46"
          strokeWidth="1"
        />
      </svg>

      {/* Soft vignette to focus attention toward the center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

export default BackgroundEffects;
