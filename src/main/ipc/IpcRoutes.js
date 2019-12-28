import { ipcMain } from 'electron'
import MainIpcController from './MainIpcController'

const {
  getDb,
  getTables,
  getTableDetails,
  refreshMigration,
  rollbackMigration,
  stepforwardMigration,
} = MainIpcController

export default {
  onRendererPing: cb => ipcMain.on('renderer-ping', cb),
  onRendererIPC: {
    getDb: () => ipcMain.on('get-db', getDb),
    getTables: () => ipcMain.on('get-tables', getTables),
    getTableDetails: () => ipcMain.on('get-table-details', getTableDetails),
    refreshMigration: () => ipcMain.on('refresh-migration', refreshMigration),
    rollbackMigration: () => ipcMain.on('rollback-migration', rollbackMigration),
    stepforwardMigration: () => ipcMain.on('stepforward-migration', stepforwardMigration),
  },
  onPythonIPC: {},
}
