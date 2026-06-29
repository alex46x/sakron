/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        acid: "#D7FF1E",
        ink: "#0a0a0a",
      },
      fontFamily: {
        display: ["var(--font-anton)"],
        body: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
