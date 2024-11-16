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
        primary: "#8B5CF6", // Vibrant purple
        secondary: "#32343C", // Dark gray
        accent: "#F472B6", // Pink accent
        text: "#E2E8F0", // Light gray text
        background: "#0D0D0D", // Deep black
        border: "#2D2D2D", // Subtle border

        grayText: "#535256",
        third: "#1C1C1C",
        button: "#ad241b", // Set your custom button color
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        "gradient-xy": "gradient-xy 15s ease infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            boxShadow:
              '0 0 5px theme("colors.primary"), 0 0 20px theme("colors.primary")',
          },
          "100%": {
            boxShadow:
              '0 0 8px theme("colors.primary"), 0 0 25px theme("colors.primary")',
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "25%": {
            "background-position": "100% 50%",
          },
          "50%": {
            "background-position": "100% 0%",
          },
          "75%": {
            "background-position": "0% 100%",
          },
        },
      },
    },
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        customtheme: {
          primary: "#8B5CF6", // Vibrant purple
          secondary: "#32343C", // Dark gray
          accent: "#F472B6",
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
