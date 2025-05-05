const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#FF792D",
      "primary-hover": "#FF640A",
      secondary: "#F3F5FA",
    },
  },
  plugins: [],
});
