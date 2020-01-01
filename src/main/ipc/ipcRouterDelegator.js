const log = console.log
const error = console.error

export default (event, arg, reducer, win = null, key) => {
  if (!reducer || !event || !arg || !key) {
    return false
  }

  const action = reducer[arg.id]

  action ? action(event, arg, win, key) : log('Not a valid action!')
}
