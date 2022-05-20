const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#180c3c',
        secondary: '#f2f8f9',
      },
    },
    fontfamily: {
      primary: ['"Lexend Deca"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
