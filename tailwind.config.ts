import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact brand palette extracted from the official PortiAr logo.
        navy: {
          DEFAULT: "#004aad",
          dark: "#00306e",
          light: "#1b92d0",
        },
        brand: {
          blue: "#1b92d0",
          orange: "#d17c28",
          light: "#eaf4fb",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #eaf4fb 0%, #ffffff 45%, #eaf4fb 100%)",
        "navy-gradient": "linear-gradient(135deg, #004aad 0%, #00306e 100%)",
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(0, 74, 173, 0.25)",
      },
      keyframes: {
        airflow: {
          "0%": { transform: "translateY(-4px) scaleY(0.85)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(30px) scaleY(1.15)", opacity: "0" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.2)", opacity: "0.9" },
        },
        sway: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        airflow: "airflow 2.2s ease-in-out infinite",
        breathe: "breathe 5s ease-in-out infinite",
        sway: "sway 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
