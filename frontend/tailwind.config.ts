import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    glow: (theme: any) => ({
      colors: {
        blue: theme("colors.blue"),
        white: theme("colors.white"),
        pink: theme("colors.pink.100"),
      },
      styles: {
        // Defaults to these values
        default: (baseColor: any) =>
          `0 1px 3px 0 rgba(${baseColor}, 0.4), 0 1px 2px 0 rgba(${baseColor}, 0.24)`,
        md: (baseColor: any) =>
          `0 4px 6px -1px rgba(${baseColor}, 0.4), 0 2px 4px -1px rgba(${baseColor}, 0.24)`,
        lg: (baseColor: any) =>
          `0 10px 15px -3px rgba(${baseColor}, 0.4), 0 4px 6px -2px rgba(${baseColor}, 0.20)`,
        xl: (baseColor: any) =>
          `0 20px 25px -5px rgba(${baseColor}, 0.4), 0 10px 10px -5px rgba(${baseColor}, 0.16)`,
        "2xl": (baseColor: any) => `0 25px 50px -12px rgba(${baseColor}, 1)`,
        outline: (baseColor: any) => `0 0 0 3px rgba(${baseColor}, 0.5)`,
        none: "none",
      },
    }),

    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "border-spin": {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      animation: {
        "border-spin": "border-spin 7s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-glow")()],
} satisfies Config;
