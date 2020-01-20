import DialogManager from '../../dialogs/DialogManager'
import NotificationManager from '../../notifications/NotificationManager'
import Setting from '../../../common/models/Setting'
import { STRATEGY_DIR_LINK_SET, STRATEGY_DIR_LINK_NOT_SET } from '../../notifications/actions'

const { log, error } = console
const channel = (key, id) => `res--${key}.setting-${id}`

export default {
  DIR_LINK: (event, arg, win, key) => {
    Setting.getFieldByPair('_value', 'key_', 'strategy_dir_link')
      .then(data => event.reply(channel(key, 'DIR_LINK'), data))
      .catch(error)
  },
  SET_DIR_LINK: (event, arg, win, key) => {
    DialogManager.showMessage(arg, win, 'changeDirConfirm')
      .then(confirmRes => {
        if (confirmRes === 0) {
          DialogManager.showOpen(arg, win, 'getStrategyDirectory')
            .then(res => {
              if (res && !res.canceled && Array.isArray(res)) {
                global.LiveTradingManager.pauseAll()
                  .then(() => Setting.replace('strategy_dir_link', res[0]))
                  .then(() => global.LiveTradingManager.initialize())
                  .then(() => {
                    event.reply(channel(key, 'SET_DIR_LINK'), res[0])
                    NotificationManager.show(STRATEGY_DIR_LINK_SET)
                  })
                  .catch(error)
              } else {
                event.reply(channel(key, 'SET_DIR_LINK'), false)
                NotificationManager.show(STRATEGY_DIR_LINK_NOT_SET)
              }
            })
            .catch(error)
        }
      })
      .catch(error)
  },
}
