import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        "to-top": {
          '0%': { top: "50px", scale: "0.75" },
          '100%': { top: "0px", scale: "1" },
        },
      },
      animation: {
        "init-bounce": 'to-top 700ms 0ms cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards',
      },
    },
  },
  plugins: [],
}
export default config
