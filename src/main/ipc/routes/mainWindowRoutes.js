import DatabaseController from '../controllers/DatabaseController'
import MigrationsController from '../controllers/MigrationsController'
import StrategiesController from '../controllers/StrategiesController'
import SettingsController from '../controllers/SettingsController'
import ipcRouterDelegator from '../ipcRouterDelegator'

export default key => {
  return {
    db: {
      channel: `${key}.db`,
      listener: (event, arg, win) => {
        ipcRouterDelegator(
          event,
          arg,
          {
            DATABASE: DatabaseController.DATABASE,
            TABLES: DatabaseController.TABLES,
            TABLE_DETAILS: DatabaseController.TABLE_DETAILS,
            TABLE_ROW_COUNT: DatabaseController.TABLE_ROW_COUNT,
          },
          win,
          key
        )
      },
    },
    migration: {
      channel: `${key}.migration`,
      listener: (event, arg, win) => {
        ipcRouterDelegator(
          event,
          arg,
          {
            ROLLBACK: MigrationsController.ROLLBACK,
            REFRESH: MigrationsController.REFRESH,
          },
          win,
          key
        )
      },
    },
    strategy: {
      channel: `${key}.strategy`,
      listener: (event, arg, win) => {
        ipcRouterDelegator(
          event,
          arg,
          {
            LIST: StrategiesController.LIST,
            WINDOW: StrategiesController.WINDOW,
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
            SET_DIR_LINK: SettingsController.SET_DIR_LINK,
          },
          win,
          key
        )
      },
    },
  }
}
