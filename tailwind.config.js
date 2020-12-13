module.exports = {
  purge: {
    enabled: false,
    content: ['./src/**/*.vue'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Poppins']
    },
    extend: {
      colors: {
        'xmas-green': '#58b69b',
        'xmas-white': '#f2f3f8',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
