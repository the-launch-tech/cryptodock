import { ipcMain as ipc } from 'electron'
import MainIpcController from './MainIpcController'

const { onDb, onMigration } = MainIpcController

export default {
  onRendererPing: cb => ipc.on('renderer-ping', cb),
  onRendererIPC: {
    db: win => ipc.on('db', (event, arg) => onDb(event, arg, win)),
    migration: win => ipc.on('migration', (event, arg) => onMigration(event, arg, win)),
  },
  onPythonIPC: {},
}
