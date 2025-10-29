import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-800': '#1a1f35',
        'dark-900': '#0f172a',
        'primary': {
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        'accent': {
          500: '#f97316',
        },
        'gray': {
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
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

export default config;
