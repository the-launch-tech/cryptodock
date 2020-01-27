import NotificationManager from '../../notifications/NotificationManager'
import TestSession from '../../../common/models/TestSession'
import Strategy from '../../../common/models/Strategy'
import _key from '../../../common/helpers/_key'
import {
  ERROR_GETTING_BACKTEST_HISTORY,
  SUCCESS_STARTING_BACKTEST,
  BACKTEST_ACTIVE,
  BACKTEST_LATENT,
} from '../../notifications/actions'

const { log, error } = console
const channel = (key, id) => `res--${key}.backtester-${id}`

export default {
  HISTORY: (event, arg, win, key) => {
    TestSession.getByFieldValue({ key: 'id', value: arg.data.strategyId })
      .then(data => event.reply(channel(key, 'HISTORY'), data))
      .catch(err => {
        NotificationManager.show(ERROR_GETTING_BACKTEST_HISTORY)
        error(err)
      })
  },
  TOGGLE_ACTIVATION: (event, arg, win, key) => {
    Strategy.updateOneFieldValue({
      id: arg.data.id,
      key: 'backtest_status',
      value: arg.data.backtest_status,
    })
      .then(() => {
        global.BacktestManager.manage(arg.data.id, arg.data.backtest_status, arg.data.data, () => {
          event.reply(channel(key, 'TOGGLE_ACTIVATION'), {})
          NotificationManager.show(
            arg.data.backtest_status === 'active' ? BACKTEST_ACTIVE : BACKTEST_LATENT
          )
        })
      })
      .catch(error)
  },
}
