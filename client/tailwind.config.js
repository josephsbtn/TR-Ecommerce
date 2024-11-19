/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#F8F9FA", // Replace "#" with a valid color value
        myBlue: "#023047",
        myGold: "#C6A231", // Corrected "myGlod" to "myGold"
        anotherGrey: "#E7ECEF",
      },
      fontFamily: {
        montserrat: ["Montserrat", "system-ui"],
      },
    },
  },
  plugins: [],
};
