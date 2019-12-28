import { app as CryptoDock } from 'electron'
import * as path from 'path'
import { Pool } from 'mysql-layer'
import IpcRoutes from './ipc/IpcRoutes'
import WindowManager from './windows/WindowManager'

if (module.hot) {
  module.hot.accept()
}

const Windows = new WindowManager()

const _DBPool = new Pool({
  hostname: 'localhost',
  user: 'criptbot',
  password: 'criptbot',
  name: 'criptbot',
})

Object.defineProperty(global, 'DBPool', {
  get() {
    return _DBPool
  },
  set(value) {
    _DBPool = value
  },
})

CryptoDock.on('window-all-closed', () => {
  console.log('All Closed, Start Notification Squad')
})

CryptoDock.on('activate', () => {
  if (!Windows.isActive('mainWindow')) {
    Windows.activate('mainWindow')
  }
})

CryptoDock.on('ready', () => {
  if (!Windows.isActive('mainWindow')) {
    Windows.activate('mainWindow')
  }

  IpcRoutes.onRendererPing((event, arg) => {
    event.reply('renderer-pong', 'pong')
    console.log('Main IPC Pinged')

    Object.keys(IpcRoutes.onRendererIPC).map((key, i) => {
      const listener = IpcRoutes.onRendererIPC[key]
      if (typeof listener === 'function') {
        listener()
      }
    })
  })
})
