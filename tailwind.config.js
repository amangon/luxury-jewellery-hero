/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "luxury-bg": "#0F0F0F",
        "luxury-white": "#FFFFFF",
        "luxury-accent": "#CFA36A",
        "luxury-secondary": "#A56B46",
        "luxury-glow": "rgba(255,120,60,0.18)",
      },
      fontFamily: {
        display: ["'Playfair Display'", "'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "'Poppins'", "sans-serif"],
      },
      borderRadius: {
        "hero-image": "32px",
      },
    },
  },
  plugins: [],
};
