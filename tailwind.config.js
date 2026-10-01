/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#4A7C7E",
        "background-light": "#ffffff",
        "background-dark": "#1a1a1a",
        "text-light": "#1a1a1a",
        "text-dark": "#ffffff"
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Trazo tipo plano: la línea se dibuja, se sostiene y se desvanece
        'blueprint-draw': {
          '0%': { strokeDashoffset: '1', opacity: '1' },
          '55%': { strokeDashoffset: '0', opacity: '1' },
          '85%': { strokeDashoffset: '0', opacity: '1' },
          '100%': { strokeDashoffset: '0', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'blueprint-draw': 'blueprint-draw 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
