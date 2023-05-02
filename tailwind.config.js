/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./client/components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        textShadow: {
          sm: '0 1px 2px var(--tw-shadow-color)',
          DEFAULT: '0 2px 4px var(--tw-shadow-color)',
          lg: '0 8px 16px var(--tw-shadow-color)',
        },
        black: {
          50: '#F2F3F4',
          100: '#E6E6E9',
          200: '#C0C1C7',
          300: '#9A9CA5',
          400: '#4F5162',
          500: '#03071E',
          600: '#03061B',
          700: '#020412',
          800: '#01030E',
          900: '#010209',
        },
        burgundy: {
          50: '#F9F4F3',
          100: '#F4E8E7',
          200: '#E2C6C4',
          300: '#D1A4A1',
          400: '#AF605A',
          500: '#8C1C13',
          600: '#7E1911',
          700: '#54110B',
          800: '#3F0D09',
          900: '#2A0806',
        },
        scarlet: {
          50: '#FCF6F6',
          100: '#F9ECEC',
          200: '#EFD0D0',
          300: '#E5B4B3',
          400: '#D27B7B',
          500: '#BF4342',
          600: '#AC3C3B',
          700: '#732828',
          800: '#561E1E',
          900: '#391414',
        },
        beige: {
          50: '#FEFDFC',
          100: '#FDFBF9',
          200: '#F9F5F0',
          300: '#F5EFE6',
          400: '#EEE3D4',
          500: '#E7D7C1',
          600: '#D0C2AE',
          700: '#8B8174',
          800: '#686157',
          900: '#45413A',
        },
        rosybrown: {
          50: '#FBF9F9',
          100: '#F6F3F2',
          200: '#E9E2DF',
          300: '#DCD0CC',
          400: '#C1ADA5',
          500: '#A78A7F',
          600: '#967C72',
          700: '#64534C',
          800: '#4B3E39',
          900: '#322926',
        },
        brown: {
          50: '#F8F7F6',
          100: '#F1EEEE',
          200: '#DCD5D4',
          300: '#C7BCB9',
          400: '#9D8985',
          500: '#735751',
          600: '#684E49',
          700: '#453431',
          800: '#342724',
          900: '#231A18',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
