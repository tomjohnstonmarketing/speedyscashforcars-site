import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Speedy's brand: hunter/forest green from the existing logo.
        brand: {
          50: "#ecfaef",
          100: "#d3f3d8",
          500: "#2d7a3e", // primary forest green — matches Speedy's logo
          600: "#226430",
          700: "#1a4f25",
          900: "#0d2c14",
        },
        ink: {
          900: "#0b1220",
          700: "#1f2937",
          500: "#4b5563",
          300: "#cbd5e1",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Impact", "Haettenschweiler", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
