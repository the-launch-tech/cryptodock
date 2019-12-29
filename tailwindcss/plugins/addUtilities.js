// const util = 'text-red-3-1/2': {
//   color: rgba(225, 225, 225, 0.5)
// }

module.exports = function({ addUtilities, theme, e }) {
  const hexToRgb = hex => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  const utils = {}
  const variants = [
    { val: 0.1, label: '100' },
    { val: 0.2, label: '200' },
    { val: 0.4, label: '400' },
    { val: 0.65, label: '650' },
    { val: 0.85, label: '850' },
  ]
  const groups = [
    { label: 'text', class: 'color' },
    { label: 'border', class: 'borderColor' },
    { label: 'bg', class: 'backgroundColor' },
  ]
  const colors = theme('colors')

  const createUtil = (gr, va, c) => {
    const hex = hexToRgb(c)
    if (hex) {
      const table = {}
      table[gr.class] = `rgba(${hex.r}, ${hex.g}, ${hex.b}, ${va.val})`
      return table
    }
    return false
  }

  groups.map(gr => {
    variants.map(va => {
      Object.keys(colors).map((k, i) => {
        if (typeof colors[k] === 'string') {
          let util = createUtil(gr, va, colors[k])
          if (util) {
            utils[`.${e(`${gr.label}-${k}-${va.label}`)}`] = util
          }
        } else {
          Object.keys(colors[k]).map((kk, ii) => {
            if (typeof colors[k][kk] === 'string') {
              let util = createUtil(gr, va, colors[k][kk])
              if (util) {
                utils[`.${e(`${gr.label}-${k}-${kk}-${va.label}`)}`] = util
              }
            }
          })
        }
      })
    })
  })

  console.log(utils)

  addUtilities(utils, {
    variants: [
      'responsive',
      'first',
      'last',
      'odd',
      'even',
      'hover',
      'focus',
      'active',
      'visited',
      'disabled',
    ],
  })
}
