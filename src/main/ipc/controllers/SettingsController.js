import DialogManager from '../../dialogs/DialogManager'
import NotificationManager from '../../NotificationManager'

const { log, error } = console
const channel = (key, id) => `res--${key}.setting-${id}`

export default {
  DIR_LINK: (event, arg, win, key) => {
    global.Conn.asyncQuery('SELECT _value FROM settings WHERE key_="strategy_dir_link"')
      .then(data => (data ? data[0]['_value'] : ''))
      .then(data => event.reply(channel(key, 'DIR_LINK'), data))
      .catch(error)
  },
  SET_DIR_LINK: (event, arg, win, key) => {
    DialogManager.showOpen(arg, win, 'getStrategyDirectory')
      .then(res => {
        if (res && !res.canceled && Array.isArray(res)) {
          global.Conn.asyncQuery(
            'REPLACE INTO settings SET key_="strategy_dir_link", _value="' + res[0] + '"'
          )
            .then(data => {
              event.reply(channel(key, 'SET_DIR_LINK'), res[0])
              NotificationManager.show('STRATEGY_DIR_LINK_SET')
            })
            .catch(error)
        } else {
          event.reply(channel(key, 'SET_DIR_LINK'), false)
          NotificationManager.show('STRATEGY_DIR_LINK_NOT_SET')
        }
      })
      .catch(error)
  },
}
