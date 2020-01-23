import NotificationManager from '../../notifications/NotificationManager'
import DialogManager from '../../dialogs/DialogManager'
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
  STRATEGY_DELETED,
} from '../../notifications/actions'

const { log, error } = console
const channel = (key, id) => `res--${key}.strategy-${id}`

export default {
  LIST: (event, arg, win, key) => {
    Strategy.getAll()
      .then(data => event.reply(channel(key, 'LIST'), data))
      .catch(error)
  },
  GET_ACTIVE: (event, arg, win, key) => {
    Strategy.getByFieldValue({ key: 'status', value: 'active' })
      .then(data => event.reply(channel(key, 'GET_ACTIVE'), data))
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
    Strategy.getOneByFieldValue({ key: 'id', value: arg.data.id })
      .then(data => event.reply(channel(key, 'DETAILS'), data))
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
    Strategy.updateOneFieldValue({
      id: arg.data.id,
      key: 'status',
      value: arg.data.status,
    })
      .then(() => {
        global.LiveTradingManager.manage(arg.data.id, arg.data.status, () => {
          event.reply(channel(key, 'TOGGLE_ACTIVATION'), {})
          event.reply('res--mainWindow.strategy-TOGGLE_ACTIVATION', {})
          NotificationManager.show(arg.data.status === 'active' ? STRATEGY_ACTIVE : STRATEGY_LATENT)
        })
      })
      .catch(error)
  },
  DELETE: (event, arg, win, key) => {
    DialogManager.showMessage(arg, win, 'strategyDelete')
      .then(confirmRes => {
        if (confirmRes === 0) {
          Strategy.getOneByFieldValue({ key: 'id', value: arg.data.id })
            .then(strategy => {
              if (strategy.status === 'latent' && strategy.backtest_status === 'latent') {
                Strategy.delete({ id: arg.data.id })
                  .then(() => global.LiveTradingManager.deleteStrategy(arg.data.id))
                  .then(() => global.BacktestManager.deleteStrategy(arg.data.id))
                  .then(() => global.StrategyWatcher.removeOldStrategy(arg.data.id))
                  .then(() => {
                    event.reply(channel(key, 'DELETE'), {})
                    NotificationManager.show(STRATEGY_DELETED)
                  })
                  .catch(error)
              }
            })
            .catch(error)
        }
      })
      .catch(error)
  },
}
