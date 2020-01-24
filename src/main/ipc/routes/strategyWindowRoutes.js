import StrategiesController from '../controllers/StrategiesController'
import SettingsController from '../controllers/SettingsController'
import BacktestersController from '../controllers/BacktestersController'
import ActivitiesController from '../controllers/ActivitiesController'
import ipcRouterDelegator from '../ipcRouterDelegator'

export default key => {
  return {
    strategy: {
      channel: `${key}.strategy`,
      listener: (event, arg, win) => {
        ipcRouterDelegator(
          event,
          arg,
          {
            DETAILS: StrategiesController.DETAILS,
            TOGGLE_ACTIVATION: StrategiesController.TOGGLE_ACTIVATION,
          },
          win,
          key
        )
      },
    },
    setting: {
      channel: `${key}.setting`,
      listener: (event, arg, win) => {
        ipcRouterDelegator(
          event,
          arg,
          {
            DIR_LINK: SettingsController.DIR_LINK,
          },
          win,
          key
        )
      },
    },
    backtester: {
      channel: `${key}.backtester`,
      listener: (event, arg, win) => {
        ipcRouterDelegator(
          event,
          arg,
          {
            HISTORY: BacktestersController.HISTORY,
            RESULTS: BacktestersController.RESULTS,
            RUN_TEST: BacktestersController.RUN_TEST,
          },
          win,
          key
        )
      },
    },
    activity: {
      channel: `${key}.activity`,
      listener: (event, arg, win) => {
        ipcRouterDelegator(
          event,
          arg,
          {
            RECENT: ActivitiesController.RECENT,
          },
          win,
          key
        )
      },
    },
  }
}
