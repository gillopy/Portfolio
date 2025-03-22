/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0369a1', // sky-700
        secondary: '#0284c7', // sky-600 - changed from slate-600 to a lighter sky
        accent1: '#0ea5e9', // sky-500
        accent2: '#38bdf8', // sky-400 - changed from slate-500
        background: '#f8fafc', // slate-50
        foreground: '#0f172a', // slate-900
        'section-dark': '#e2e8f0', // slate-100 - slightly darker than background
        'section-light': '#f8fafc', // white - for light sections
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
