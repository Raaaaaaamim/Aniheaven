/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#845FD6", // Vibrant purple
        secondary: "#32343C", // Dark gray
        secondaryBg: "#0f0f0f",
        accent: "#F472B6",
        text: "#E2E8F0", // Light gray text
        background: "#0D0D0D", // Deep black
        border: "#2D2D2D", // Subtle border

        grayText: "#535256",
        third: "#1C1C1C",
        button: "#ad241b", // Set your custom button color
        secText: "#999999",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        sans: ["Noto Sans", "serif"],
        Jost: ["Jost", "serif"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 12s ease-in-out infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".5",
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
