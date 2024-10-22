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
        border: "#27272A",
        grayText: "#535256",
        background: "#100f10", // Set your custom background color
        button: "#ad241b", // Set your custom button color
        text: "#e5e9e9", // Set your custom text color
        secondary: "#161616", // Set your custom card/secondary color
      },
      fontFamily: {},
    },
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        customtheme: {
          primary: "#ad241b", // Button color
          secondary: "#161616", // Card/secondary color
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
