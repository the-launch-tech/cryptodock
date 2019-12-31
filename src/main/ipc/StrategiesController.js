const error = console.error
const log = console.log

export default {
  LIST: (event, arg, win) => {
    global.Conn.asyncQuery('SELECT * FROM strategies')
      .then(data => event.reply('res--strategy-LIST', data))
      .catch(error)
  },
}
