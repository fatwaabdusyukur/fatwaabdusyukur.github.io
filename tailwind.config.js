/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["*.html", "./templates/**/*.ejs", "./pages/**/*.ejs"],
  theme: {
    extend: {},
  },
  fontFamily: {
    tektur: ["tektur"],
    synemono: ["synemono"],
    vt323: ["vt323"],
  },
  plugins: [],
};
