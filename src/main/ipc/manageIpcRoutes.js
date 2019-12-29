const log = console.log
const error = console.error

export default async (event, arg, reducer, win = null) => {
  if (!reducer || !event || !arg) {
    return false
  }

  const action = reducer[arg.id]

  try {
    action ? await action(event, arg, win) : await log('Not a valid action!')
  } catch (e) {
    error(e)
  }
}
