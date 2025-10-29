/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-800': '#1e293b',
        'dark-900': '#0a0a0a',
        'primary': {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#fbbf24',
          600: '#d97706',
        },
        'accent': {
          500: '#b45309',
        },
        'gray': {
          300: '#f3f4f6',
          400: '#d1d5db',
          500: '#9ca3af',
        },
      },
      spacing: {
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
      },
      boxShadow: {
        'glow-md': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 30px rgba(59, 130, 246, 0.4)',
      },
    },
  },
};
