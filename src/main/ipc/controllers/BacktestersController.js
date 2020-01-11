import NotificationManager from '../../notifications/NotificationManager'
import Backtester from '../../../common/models/Backtester'
import _key from '../../../common/helpers/_key'
import {
  ERROR_GETTING_BACKTEST_HISTORY,
  ERROR_GETTING_BACKTESTERS,
  SUCCESS_STARTING_BACKTEST,
} from '../../notifications/actions'

const { log, error } = console
const channel = (key, id) => `res--${key}.backtester-${id}`

export default {
  GET_BACKTESTERS: (event, arg, win, key) => {
    Backtester.getTesters()
      .then(data => event.reply(channel(key, 'GET_BACKTESTERS'), data))
      .catch(err => {
        NotificationManager.show(ERROR_GETTING_BACKTESTERS)
        error(err)
      })
  },
  HISTORY: (event, arg, win, key) => {
    Backtester.getHistory(arg.data.strategyId)
      .then(data => event.reply(channel(key, 'HISTORY'), data))
      .catch(err => {
        NotificationManager.show(ERROR_GETTING_BACKTEST_HISTORY)
        error(err)
      })
  },
  RUN_TEST: (event, arg, win, key) => {
    const successStarting = true
    event.reply(channel(key, 'RUN_TEST'), successStarting)
    NotificationManager.show(SUCCESS_STARTING_BACKTEST)
    NotificationManager.show(ERROR_STARTING_BACKTEST)
  },
  RESULTS: (event, arg, win, key) => {
    event.reply(channel(key, 'RESULTS'), data)
  },
}
