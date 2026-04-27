/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1f2937',
        coral: '#f97316',
        cream: '#fff7ed',
        sand: '#fed7aa',
      },
      boxShadow: {
        float: '0 18px 45px -18px rgba(15, 23, 42, 0.28)',
      },
      backgroundImage: {
        hero: 'linear-gradient(135deg, rgba(249,115,22,0.96), rgba(245,158,11,0.92))',
      },
    },
  },
  plugins: [],
}
