/** @type {import('tailwindcss').Config} */
// Theme colours that change in dark mode are CSS variables (see src/styles/index.css).
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: v("surface"),
        cream: { 50: v("cream-50"), 100: v("cream-100"), 200: v("cream-200") },
        saffron: { 400: "#f5a524", 500: "#e8920c", 600: v("saffron-600"), 700: v("saffron-700") },
        gold: { 400: "#e3b23c", 500: "#cf9a1e" },
        brown: { 600: v("brown-600"), 700: v("brown-700"), 800: v("brown-800"), 900: v("brown-900") },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
