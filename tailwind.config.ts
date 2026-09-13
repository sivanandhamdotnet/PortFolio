import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: {
          50: "#FAF8F5",
          100: "#F5F2EB", // Warm Paper
          200: "#ECE7DD",
          300: "#E0D8CB",
          400: "#CBC1B0",
          500: "#A89C89",
        },
        forest: {
          950: "#060D0A",
          900: "#0B1512", // Deep Forest Ink
          850: "#0F1E1A",
          800: "#142822",
          700: "#1F3A32",
          600: "#2B4E44",
        },
        clay: {
          300: "#E0835D",
          400: "#D46D45",
          500: "#C85A32", // Burnt Clay / Terracotta
          600: "#B54E28",
          700: "#923D1E",
        },
        lime: {
          accent: "#D4F038", // Precision Acid Lime
          muted: "#AECB20",
          glow: "rgba(212, 240, 56, 0.15)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
      },
      transitionTimingFunction: {
        "editorial": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
