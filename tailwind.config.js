/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "box-length": "#E5F0EC",
        "box-depth": "#EDE5F0",
        "box-width": "#F0EBE5",
        "box-weight": "#EDF0E5",
      },
    },
  },
  plugins: [],
};
