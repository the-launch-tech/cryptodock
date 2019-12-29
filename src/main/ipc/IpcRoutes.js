import { ipcMain as ipc } from 'electron'
import MainIpcController from './MainIpcController'

const { onDb, onMigration } = MainIpcController

export default {
  onRendererPing: cb => ipc.on('renderer-ping', cb),
  onRendererIPC: {
    db: () => ipc.on('db', onDb),
    migration: () => ipc.on('migration', onMigration),
  },
  onPythonIPC: {},
}
