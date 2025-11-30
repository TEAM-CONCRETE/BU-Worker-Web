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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "worker-primary": {
          700: "var(--worker-primary-700)",
          600: "var(--worker-primary-600)",
          50: "var(--worker-primary-50)",
        },
        "worker-neutral": {
          50: "var(--worker-neutral-50)",
          75: "var(--worker-neutral-75)",
          100: "var(--worker-neutral-100)",
          200: "var(--worker-neutral-200)",
          300: "var(--worker-neutral-300)",
          400: "var(--worker-neutral-400)",
          500: "var(--worker-neutral-500)",
          600: "var(--worker-neutral-600)",
          700: "var(--worker-neutral-700)",
          900: "var(--worker-neutral-900)",
        },
        "worker-disabled": "var(--worker-disabled)",
        "worker-placeholder": "var(--worker-placeholder)",
        "worker-success": "var(--worker-success)",
        "worker-warning": "var(--worker-warning)",
        "worker-danger": "var(--worker-danger)",
        "worker-surface-dark": "var(--worker-surface-dark)",
        "worker-surface-darker": "var(--worker-surface-darker)",
        "worker-accent-ring-blue": "var(--worker-accent-ring-blue)",
        "worker-accent-handle-gray": "var(--worker-accent-handle-gray)",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
