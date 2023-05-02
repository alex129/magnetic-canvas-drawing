/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'wiring-primary': '#33E7FF',
        'wiring-secondary': '#ebac23',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
