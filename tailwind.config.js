/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic status colors — mapped to Tailwind palette
        'status-online': {
          light: '#10b981', // emerald-500
          dark: '#34d399',  // emerald-400
        },
        'status-warning': {
          light: '#f59e0b', // amber-500
          dark: '#fbbf24',  // amber-400
        },
        'status-critical': {
          light: '#ef4444', // red-500
          dark: '#f87171',  // red-400
        },
        'status-offline': {
          light: '#64748b', // slate-500
          dark: '#94a3b8',  // slate-400
        },
        'status-info': {
          light: '#0ea5e9', // sky-500
          dark: '#38bdf8',  // sky-400
        },
      },
                  fontFamily: {
        // Headings + large KPI numbers
        heading: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        // Body / UI text
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        // Numeric / mono — IDs, IPs, timestamps
        mono: [
          'ui-monospace',
          'JetBrains Mono',
          'Menlo',
          'monospace',
        ],
      },
      spacing: {
        // Extra aliases (optional convenience)
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-in-right': 'slide-in-right 300ms ease-out',
      },
    },
  },
  plugins: [],
};