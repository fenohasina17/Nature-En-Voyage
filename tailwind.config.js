/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        clay: '#9b4d2f',
        canopy: '#1f5f4a',
        lagoon: '#0f766e',
        ember: '#c9892b',
        ink: '#17211d',
      },
      boxShadow: {
        crisp: '0 16px 40px rgba(23, 33, 29, 0.12)',
      },
    },
  },
  plugins: [],
}
