import { ipcMain as ipc } from 'electron'
import DatabaseController from './DatabaseController'
import MigrationsController from './MigrationsController'
import StrategiesController from './StrategiesController'
import SettingsController from './SettingsController'
import manageIpcRoutes from './manageIpcRoutes'

export default {
  onRendererPing: cb => ipc.on('renderer-PING', cb),
  onRendererIPC: {
    db: win =>
      ipc.on('db', (event, arg) =>
        manageIpcRoutes(
          event,
          arg,
          {
            DATABASE: DatabaseController.DATABASE,
            TABLES: DatabaseController.TABLES,
            TABLE_DETAILS: DatabaseController.TABLE_DETAILS,
            TABLE_ROW_COUNT: DatabaseController.TABLE_ROW_COUNT,
          },
          win
        )
      ),
    migration: win =>
      ipc.on('migration', (event, arg) =>
        manageIpcRoutes(
          event,
          arg,
          {
            ROLLBACK: MigrationsController.ROLLBACK,
            REFRESH: MigrationsController.REFRESH,
          },
          win
        )
      ),
    strategy: win =>
      ipc.on('strategy', (event, arg) =>
        manageIpcRoutes(
          event,
          arg,
          {
            LIST: StrategiesController.LIST,
          },
          win
        )
      ),
    setting: win =>
      ipc.on('setting', (event, arg) =>
        manageIpcRoutes(
          event,
          arg,
          {
            DIR_LINK: SettingsController.DIR_LINK,
            SET_DIR_LINK: SettingsController.SET_DIR_LINK,
          },
          win
        )
      ),
  },
  onPythonIPC: {},
}
