/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["*.html", "./templates/**/*.ejs", "./pages/**/*.ejs"],
  theme: {
    extend: {},
  },
  fontFamily: {
    tektur: ["tektur"],
  },
  plugins: [],
};
