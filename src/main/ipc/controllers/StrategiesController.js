import NotificationManager from '../../notifications/NotificationManager'
import StrategyBootstrapper from '../../../common/utilities/StrategyBootstrapper'
import Strategy from '../../../common/models/Strategy'
import activateWindow from '../../../common/helpers/activateWindow'
import _key from '../../../common/helpers/_key'
import {
  STRATEGY_WINDOW_EXISTS,
  NEW_STRATEGY_BOOTSTRAPPED_FAILED,
  NEW_STRATEGY_BOOTSTRAPPED,
  STRATEGY_ACTIVE,
  STRATEGY_LATENT,
} from '../../notifications/actions'

const { log, error } = console
const channel = (key, id) => `res--${key}.strategy-${id}`

export default {
  LIST: (event, arg, win, key) => {
    Strategy.getAll()
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
      NotificationManager.show(STRATEGY_WINDOW_EXISTS)
    }
  },
  DETAILS: (event, arg, win, key) => {
    Strategy.getOneByValue('id', arg.data.id)
      .then(data => {
        event.reply(channel(key, 'DETAILS'), data)
      })
      .catch(error)
  },
  NEW: (event, arg, win, key) => {
    StrategyBootstrapper(arg.data, (err, strategy) => {
      if (err) {
        NotificationManager.show(NEW_STRATEGY_BOOTSTRAPPED_FAILED)
        return err
      }
      event.reply(channel(key, 'NEW'), strategy)
      NotificationManager.show(NEW_STRATEGY_BOOTSTRAPPED)
    })
  },
  TOGGLE_ACTIVATION: (event, arg, win, key) => {
    Strategy.updateState(arg.data.id, arg.data.status)
      .then(status => {
        global.LiveTradingManager.manage(arg.data.id, status, () => {
          event.reply(channel(key, 'TOGGLE_ACTIVATION'), {})
          NotificationManager.show(status === 'active' ? STRATEGY_ACTIVE : STRATEGY_LATENT)
        })
      })
      .catch(error)
  },
}
