module.exports = function({ addUtilities }) {
  // const hexToRgb = hex => {
  //   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  //   return result
  //     ? {
  //         r: parseInt(result[1], 16),
  //         g: parseInt(result[2], 16),
  //         b: parseInt(result[3], 16),
  //       }
  //     : null
  // }
  //
  // const utilities = {}
  // const classes = ['color', 'backgroundColor', 'borderColor']
  // const opacities = [0.25, 0.5, 0.75]
  // const base = 'trans'
  // const types = theme('colors')
  //
  // const createTransparentObject = (base = null, key, i) => {
  //   if (typeof base === 'string') {
  //     let utilKey = false
  //     let utilVal = false
  //     const { r, g, b } = hexToRgb(base)
  //     for (c in classes) {
  //       for (o in opacities) {
  //         utilKey = `${c}-${base}-${key}-${1}-${o}`
  //         utilVal = `rgba(${r}, ${g}, ${b}, ${o})`
  //
  //         if (utilKey && utilVal) {
  //           utilities[utilKey] = {
  //             textShadow: utilVal,
  //           }
  //         }
  //       }
  //     }
  //   } else {
  //     utilities = Object.keys(base).map((childKey, childi) =>
  //       createTransparentObject(types[key][typekey], childKey, childi)
  //     )
  //   }
  // }
  //
  // const utilities = Object.keys(types).map((key, i) => createTransparentObject(types[key], key, i))
  //
  // addUtilities(utilities)
}
