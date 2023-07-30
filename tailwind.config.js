/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["*.html", "./templates/**/*.ejs", "./pages/**/*.ejs"],
  theme: {
    extend: {
      keyframes: {
        type: {
          "0%": { opacity: "100%" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        type: "type 1s linear infinite",
      },
    },
  },
  fontFamily: {
    tektur: ["Tektur"],
    vt323: ["VT323"],
  },
  plugins: [],
};
