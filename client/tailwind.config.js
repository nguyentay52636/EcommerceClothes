const withMT = require('@material-tailwind/react/utils/withMT');

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#41b294',
        },
        colorSecondary: {
          main: '#f6ba35',
        },
      },
      container: {
        center: true,
      },
      backgroundSize: {
        '10-10': '10px 10px',
      },
      keyframes: {
        _zoomInOut: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        cloudMove: {
          '50%': { opacity: 1, transform: 'translateX(0)' },
          '0%, 100%': { opacity: 0, transform: 'translateX(100%)' },
        },
        rotateMessage: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(30deg)',
          },
          '50%': {
            transform: 'rotate(0deg)',
          },
          '75%': {
            transform: 'rotate(-30deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
        _fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        _zoomInOut: '_zoomInOut 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        cloudMove: 'cloudMove 6s linear infinite',
        cloudMoveSlow: 'cloudMove 10s linear infinite',
        rotateMessage: 'rotateMessage 4s linear infinite',
        _fadeIn: '_fadeIn 1s linear',
        _fadeInFast: '_fadeIn 0.2s linear',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
});
