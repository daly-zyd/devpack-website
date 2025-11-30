/** @type {import('tailwindcss').Config} */
import path from 'path';

const config = {
  darkMode: 'class',
  content: [
    path.resolve(__dirname, './index.html'),
    path.resolve(__dirname, './src/**/*.{jsx,js}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A1F44',
        secondary: '#6366F1',
        accent: '#06B6D4',
        dark: '#0f172a',
        light: '#f8fafc'
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

export default config;