module.exports = function({ addBase, config }) {
  addBase({
    body: {
      backgroundColor: config('theme.colors.gray.10'),
    },
    h1: {
      fontSize: config('theme.fontSize.5xl'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.display'),
      color: config('theme.colors.white'),
    },
    h2: {
      fontSize: config('theme.fontSize.3xl'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.display'),
      color: config('theme.colors.white'),
    },
    h3: {
      fontSize: config('theme.fontSize.xl'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.head'),
      color: config('theme.colors.white'),
    },
    h4: {
      fontSize: config('theme.fontSize.lg'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.head'),
      color: config('theme.colors.white'),
    },
    h5: {
      fontSize: config('theme.fontSize.base'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.head'),
      color: config('theme.colors.white'),
    },
    h6: {
      fontSize: config('theme.fontSize.sm'),
      fontWeight: 700,
      fontFamily: config('theme.fontFamily.head'),
      color: config('theme.colors.white'),
    },
    p: {
      fontSize: config('theme.fontSize.xs'),
      fontWeight: 300,
      fontFamily: config('theme.fontFamily.body'),
      color: config('theme.colors.white'),
    },
    span: {
      fontSize: config('theme.fontSize.xs'),
      fontWeight: 300,
      fontFamily: config('theme.fontFamily.body'),
      color: config('theme.colors.white'),
    },
    li: {
      fontSize: config('theme.fontSize.xs'),
      fontWeight: 300,
      fontFamily: config('theme.fontFamily.body'),
      color: config('theme.colors.white'),
    },
    a: {
      fontSize: config('theme.fontSize.xs'),
      fontWeight: 300,
      fontFamily: config('theme.fontFamily.body'),
      color: config('theme.colors.white'),
    },
    div: {
      fontSize: config('theme.fontSize.xs'),
      fontWeight: 300,
      fontFamily: config('theme.fontFamily.body'),
      color: config('theme.colors.white'),
    },
  })
}
