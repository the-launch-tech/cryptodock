import { ipcMain as ipc } from 'electron'
import DatabaseController from './DatabaseController'
import MigrationsController from './MigrationsController'
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
  },
  onPythonIPC: {},
}
