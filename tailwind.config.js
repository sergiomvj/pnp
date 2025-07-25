/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'paynes-gray': '#696d7d',
        'cambridge-blue': '#6f9283',
        'cambridge-blue-2': '#8d9f87',
        'sage': '#cdc6a5',
        'almond': '#f0dcca',
      }
    },
  },
  plugins: [],
}
