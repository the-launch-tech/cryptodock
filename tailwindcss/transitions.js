module.exports = {
  transitionProperty: {
    none: 'none',
    all: 'all',
    color: 'color',
    bg: 'background-color',
    border: 'border-color',
    colors: ['color', 'background-color', 'border-color'],
    opacity: 'opacity',
    transform: 'transform',
  },
  transitionDuration: {
    default: '200ms',
    '0': '0ms',
    '100': '100ms',
    '200': '200ms',
    '500': '500ms',
  },
  transitionTimingFunction: {
    default: 'ease',
    linear: 'linear',
  },
  transitionDelay: {
    default: '0ms',
  },
  willChange: {
    auto: 'auto',
    scroll: 'scroll-position',
    contents: 'contents',
    opacity: 'opacity',
    transform: 'transform',
  },
}
