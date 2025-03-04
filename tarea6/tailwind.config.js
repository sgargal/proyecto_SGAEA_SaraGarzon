/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./fuente/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'amarillo': {
          clarito: '#f7f2aa',
          normal: '#f7ec54',
          pollo: '#ffef00'
        }
      },
      spacing:{
        '27xl': '120rem'
      },
      screen:{
        '5xl': '2000px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
  ],
}

