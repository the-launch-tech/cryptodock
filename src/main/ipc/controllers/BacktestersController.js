import NotificationManager from '../../notifications/NotificationManager'
import Session from '../../../common/models/Session'
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
