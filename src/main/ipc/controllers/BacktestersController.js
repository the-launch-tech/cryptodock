import NotificationManager from '../../notifications/NotificationManager'
import Backtester from '../../../common/models/Backtester'
import _key from '../../../common/helpers/_key'
import {
  ERROR_GETTING_BACKTEST_HISTORY,
  ERROR_GETTING_BACKTESTERS,
  SUCCESS_STARTING_BACKTEST,
  NEW_BACKTESTER_SAVED,
  FAILED_SAVING_NEW_BACKTESTER,
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
  // Queue BacktestManager
  // Send to cryptodock-backtester server Manager
  // Listen for results
  RUN_TEST: (event, arg, win, key) => {
    global.BacktestManager.runNewTest(arg.data)
      .then(success => {
        event.reply(channel(key, 'RUN_TEST'), success)
        NotificationManager.show(SUCCESS_STARTING_BACKTEST)
      })
      .catch(err => {
        NotificationManager.show(ERROR_STARTING_BACKTEST)
        error(err)
      })
  },
  // We may handle this in the window, not the main process
  RESULTS: (event, arg, win, key) => {
    event.reply(channel(key, 'RESULTS'), data)
  },
  SAVE_BACKTESTER: (event, arg, win, key) => {
    Backtester.save(arg.data)
      .then(data => {
        event.reply(channel(key, 'SAVE_BACKTESTER'), arg.data)
        NotificationManager.show(NEW_BACKTESTER_SAVED)
      })
      .catch(err => {
        NotificationManager.show(FAILED_SAVING_NEW_BACKTESTER)
        error(err)
      })
  },
}
