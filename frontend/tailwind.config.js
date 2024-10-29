/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        border: " #333336",
        grayText: "#535256",
        primary: "#D8A31A", // Changed from purple to new color
        secondary: "#32343C", // Card/secondary color
        accent: "#E2F0FF", // Text color
        background: "#100f10", // Set your custom background color
        button: "#ad241b", // Set your custom button color
        text: "#e5e9e9", // Set your custom text color
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        customtheme: {
          primary: "#D8A31A", // Changed from purple to new color
          secondary: "#32343C", // Card/secondary color
          accent: "#e5e9e9", // Text color
          neutral: "#100f10", // Background color
          "base-100": "#100f10", // Background color for other areas
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },

  darkMode: "class", // Use 'class' for toggling dark mode
};
