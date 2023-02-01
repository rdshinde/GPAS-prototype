/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#0075F2",
        orange: "FF4A1C",
        white: "#F2FDFF",
        black: "#00171F",
      },
    },
    // plugins: [require("tailwind-scrollbar")],
  },
};
