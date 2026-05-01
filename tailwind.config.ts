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
        // TODO: Replace with Speedy's real brand colors once confirmed.
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          500: "#f97316", // primary orange — confident, action-forward
          600: "#ea580c",
          700: "#c2410c",
          900: "#7c2d12",
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
