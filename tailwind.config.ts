import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-950': '#050507',
        'dark-900': '#09090c',
        'dark-850': '#0e0e12',
        'dark-800': '#131318',
        'dark-750': '#181820',
        'dark-700': '#1f1f28',
        'obsidian': {
          950: '#050507',
          900: '#09090c',
          850: '#0e0e12',
          800: '#131318',
          700: '#1f1f28',
        },
        'primary': {
          100: '#fdf6e7',
          200: '#fae8be',
          300: '#f5d48c',
          400: '#eabf60',
          500: '#d9a738',
          600: '#b88423',
          700: '#8f6117',
          800: '#6a4613',
          900: '#422b0c',
        },
        'gold': {
          100: '#fdf6e7',
          200: '#fae8be',
          300: '#f5d48c',
          400: '#eabf60',
          500: '#d9a738',
          600: '#b88423',
          700: '#8f6117',
        },
        'accent': {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7',
        },
        'gray': {
          100: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(217, 167, 56, 0.15)',
        'glow-md': '0 0 25px rgba(217, 167, 56, 0.22)',
        'glow-lg': '0 0 45px rgba(217, 167, 56, 0.3)',
        'glow-gold': '0 0 30px rgba(217, 167, 56, 0.25)',
        'glow-cyan': '0 0 30px rgba(56, 189, 248, 0.2)',
        'cinema-card': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
