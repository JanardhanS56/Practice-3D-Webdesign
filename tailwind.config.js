/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          50: '#f4f7f4',
          100: '#e5ebe5',
          200: '#cbd8cb',
          300: '#a3bda4',
          400: '#759d77',
          500: '#538055',
          600: '#3f6641',
          700: '#335235',
          800: '#1c2e1f',
          900: '#0f1d11',
          950: '#070f08'
        },
        gold: {
          300: '#f9e2a8',
          400: '#f5cf74',
          500: '#e5b23d',
          600: '#c48f27',
          700: '#9b6c1a',
        },
        amber: {
          oil: '#d97706',
          warm: '#b45309',
          glow: '#f59e0b'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

