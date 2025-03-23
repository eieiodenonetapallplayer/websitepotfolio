import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "royal-blue": "#0B3B8F",
        "light-blue": "#4B8BF4",
        "deep-navy": "#051B3B",
        "accent-blue": "#1E90FF",
        midnight: "#0A1929",
        "ice-blue": "#E8F0FE",
      },
    },
  },
  plugins: [],
};

export default config;
