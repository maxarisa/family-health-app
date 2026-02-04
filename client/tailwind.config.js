/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - calming blues and greens
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Secondary - health green
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Status colors
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'Roboto', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Senior-friendly font sizes
        'base': ['18px', '1.6'],
        'lg': ['20px', '1.6'],
        'xl': ['22px', '1.5'],
        '2xl': ['26px', '1.4'],
        '3xl': ['32px', '1.3'],
      },
      spacing: {
        // Touch-friendly spacing
        '18': '4.5rem',
        '22': '5.5rem',
      },
      minHeight: {
        // Minimum touch target size (44px)
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
}
