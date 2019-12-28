const dir = './tailwindcss/'
const plugins = dir + 'plugins/'

const {
  transitionProperty,
  transitionDuration,
  transitionTimingFunction,
  transitionDelay,
  willChange,
} = require(`${dir}transitions`)

module.exports = {
  important: true,
  theme: {
    boxShadow: require(`${dir}boxShadow`),
    maxHeight: require(`${dir}maxHeight`),
    maxWidth: require(`${dir}maxWidth`),
    screens: require(`${dir}screens`),
    fontFamily: require(`${dir}fontFamily`),
    fontSize: require(`${dir}fontSize`),
    borderWidth: require(`${dir}borderWidth`),
    borderRadius: require(`${dir}borderRadius`),
    colors: require(`${dir}colors`),
    fill: theme => theme('colors'),
    stroke: theme => theme('colors'),
    transitionProperty,
    transitionDuration,
    transitionTimingFunction,
    transitionDelay,
    willChange,
  },
  variants: require(`${dir}variants`),
  plugins: [
    require('tailwindcss-transitions')(),
    require(`${plugins}addBase`),
    require(`${plugins}addComponents`),
    require(`${plugins}addUtilities`),
  ],
}
