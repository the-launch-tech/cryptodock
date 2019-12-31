import DialogManager from '../dialogs/DialogManager'
import NotificationManager from '../NotificationManager'

const error = console.error
const log = console.log

export default {
  DIR_LINK: (event, arg, win) => {
    global.Conn.asyncQuery('SELECT _value FROM settings WHERE key_="strategy_dir_link"')
      .then(data => (data ? data[0]['_value'] : ''))
      .then(data => event.reply('res--setting-DIR_LINK', data))
      .catch(error)
  },
  SET_DIR_LINK: (event, arg, win) => {
    DialogManager.showOpen(arg, win, 'getStrategyDirectory')
      .then(res => {
        if (res && !res.canceled && Array.isArray(res)) {
          global.Conn.asyncQuery(
            'REPLACE INTO settings SET key_="strategy_dir_link", _value="' + res[0] + '"'
          )
            .then(data => {
              event.reply('res--setting-SET_DIR_LINK', res[0])
              NotificationManager.show('setting-SET_DIR_LINK')
            })
            .catch(error)
        } else {
          event.reply('res--setting-SET_DIR_LINK', false)
          NotificationManager.show('setting-SET_DIR_LINK_NULLED')
        }
      })
      .catch(error)
  },
}
