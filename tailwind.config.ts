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
    },
  },
  plugins: [],
};
export default config;
