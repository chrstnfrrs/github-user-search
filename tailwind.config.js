module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        offWhite: '#FEFEFE',
        offBlack: '#2B3442',
        offBlue: '#1E2A47',
        lightGrey: '#697C9A',
        lightBlue: '#F6F8FF',
        midBlue: '#90A4D4',
        darkBlue: '#141D2F',
        primary: '#0079FF',
        secondary: '#60ABFF',
        primaryText: '#4B6A9B',
        red: '#F74646',
      },
      dropShadow: {
        lightInput: '0 16px 30px rgba(70, 96, 187, 19.86%)',
      },
    },
  },
  variants: {
    fill: ['hover'],
  },
  plugins: [],
};
