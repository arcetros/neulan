/* eslint-disable global-require */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark100: '#22303C',
        dark200: '#192734',
        dark300: '#15202B',
        textDarkMain: '#f0f0f0',
        textDarkSub: '#8899A6',
      },
    },
    fontfamily: {
      primary: ['"Lexend Deca"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require('tailwind-scrollbar')],
  variants: { scrollbar: ['dark', 'rounded'] },
};
