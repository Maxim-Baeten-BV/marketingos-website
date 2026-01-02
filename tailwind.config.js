/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./performance-marketing-software.html",
    "./features/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1C2E3D',
        'brand-blue': '#3E7BBE',
        'deep-gray': '#2E2E2E',
        'soft-gray': '#F5F7FA',
        'success': '#22C55E',
        'warning': '#EAB308',
        'critical': '#EF4444',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
