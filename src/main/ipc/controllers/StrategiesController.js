import NotificationManager from '../../NotificationManager'
import activateWindow from '../../../common/helpers/activateWindow'
import _key from '../../../common/helpers/_key'

const { log, error } = console
const channel = (key, id) => `res--${key}.strategy-${id}`

export default {
  LIST: (event, arg, win, key) => {
    global.Conn.asyncQuery('SELECT * FROM strategies')
      .then(data => event.reply(channel(key, 'LIST'), data))
      .catch(error)
  },
  WINDOW: (event, arg, win, key) => {
    const newKey = _key(arg.data.type, arg.data.id)

    if (!global.Windows.exists(newKey)) {
      global.Windows.configure(arg.data.type, arg.data.id, activateWindow)
    } else if (!global.Windows.isActive(newKey)) {
      activateWindow(newKey)
    } else {
      NotificationManager.show('STRATEGY_WINDOW_EXISTS')
    }
  },
  DETAILS: (event, arg, win, key) => {
    global.Conn.asyncQuery('SELECT * FROM strategies WHERE id="' + arg.data.id + '" LIMIT=1')
      .then(data => event.reply(channel(key, 'DETAILS'), data))
      .catch(error)
  },
}
