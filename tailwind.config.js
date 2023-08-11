/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  theme: {
    minWidth: {
      398: "398px",
    },
    minHeight: {
      382: "382px",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
