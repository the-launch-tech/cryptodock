import StrategiesController from '../controllers/StrategiesController'
import SettingsController from '../controllers/SettingsController'
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
  }
}
