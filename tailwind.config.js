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
      spacing: {
        "p-45": "45%",
        "p-46": "46%",
        "p-47": "47%",
        "p-48": "48%",
        "p-49": "49%",
        "p-50": "50%",
      },
    },
  },
  plugins: [],
};
