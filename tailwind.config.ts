import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        'dark-950': '#000000',
        'dark-900': '#080808',
        'dark-850': '#0f0f0f',
        'dark-800': '#151515',
        'dark-750': '#1c1c1c',
        'dark-700': '#262626',
        neutral: {
          950: '#050505',
          900: '#0c0c0c',
          850: '#141414',
          800: '#1c1c1c',
          700: '#2b2b2b',
          600: '#404040',
          500: '#666666',
          400: '#8c8c8c',
          300: '#b8b8b8',
          200: '#dedede',
          100: '#f0f0f0',
        },
        primary: {
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#ffffff',
          500: '#ffffff',
          600: '#e5e5e5',
          700: '#cccccc',
          800: '#999999',
          900: '#666666',
        },
        accent: {
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
        },
        gray: {
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#333333',
          800: '#1f1f1f',
        },
      },
      boxShadow: {
        'subtle-rim': '0 0 0 1px rgba(255, 255, 255, 0.08)',
        'editorial': '0 25px 50px -12px rgba(0, 0, 0, 0.95)',
        'glow-sm': '0 0 0 1px rgba(255, 255, 255, 0.15)',
        'glow-md': '0 0 0 1px rgba(255, 255, 255, 0.25)',
        'glow-lg': '0 0 0 1px rgba(255, 255, 255, 0.35)',
        'glow-gold': 'none',
        'cinema-card': '0 20px 40px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.07)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        widest: '0.2em',
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};

export default config;
