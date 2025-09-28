import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        brand: {
          50: "#fff1e9",
          100: "#ffd9c2",
          200: "#ffb58a",
          300: "#ff9051",
          400: "#ff6b2c",
          500: "#f75a1b",
          600: "#d14712",
          700: "#a33611",
          800: "#73250d",
          900: "#421307",
        },
      },
      boxShadow: {
        magic: "0 18px 50px -20px rgba(255,107,44,0.9)",
      },
    },
  },
  plugins: [],
};

export default config;
