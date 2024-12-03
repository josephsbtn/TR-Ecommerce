/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#F8F9FA",
        myBlue: "#023047",
        myGold: "#C6A231",
        anotherGrey: "#E7ECEF",
        borderGrey: "#F2F2F2",
      },
      fontFamily: {
        montserrat: ["Montserrat", "system-ui"],
        lateef: ["lateef", "serif"],
        roman: ["roman", "serif"],
        headlanone: ["Headlan one", "serif"],
        GreatVibes: ["Great Vibes", "serif"],
        Scheherazade: ["Scheherazade New", "serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
