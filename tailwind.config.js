const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '400px',
      ...defaultTheme.screens,
    },
    extend: {
      spacing: {
        86: '22rem',
      },
    },
  },
  plugins: [],
};
