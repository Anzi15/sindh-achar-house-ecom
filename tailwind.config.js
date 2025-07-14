const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        brandOrange: "#FE7F00",
        brandRed: "#FF3131"
      },
      backgroudImage:{
        'low-resolution-hero-cover':"url(/src/assets/website cover blur 100.png)"
      },
      fontFamily: {
        futura: ['Futura'],
      },
    },
  },
  plugins: [],
});
