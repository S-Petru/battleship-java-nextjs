import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "background-color": "#fffcf0",
        "text-color": "#252422",
        "primary-color": "#ccc5b8",
        "secondary-color": "#413e3a",
        "accent-color": "#447a9c",
      },
    },
  },
  plugins: [],
};
export default config;
