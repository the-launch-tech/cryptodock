require('dotenv').config()

import { app as CryptoDock } from 'electron'
import * as path from 'path'
import { Pool } from 'mysql-layer'
import IpcRoutes from './ipc/IpcRoutes'
import WindowManager from './windows/WindowManager'
import NotificationManager from './NotificationManager'

if (module.hot) {
  module.hot.accept()
}

const Windows = new WindowManager()

global.Pool = new Pool({
  hostname: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
})

CryptoDock.on('window-all-closed', () => {
  console.log('All Closed, Start Notification Squad')
  NotificationManager.show('app-CLOSED')
})

CryptoDock.on('activate', () => {
  if (!Windows.isActive('mainWindow')) {
    Windows.activate('mainWindow')
    NotificationManager.show('mainWindow-ACTIVATING')
  }
})

CryptoDock.on('ready', () => {
  if (!Windows.isActive('mainWindow')) {
    Windows.activate('mainWindow')
  }

  IpcRoutes.onRendererPing((event, arg) => {
    event.reply('res--renderer-PING', 'pong')
    console.log('Main IPC Pinged')

    Object.keys(IpcRoutes.onRendererIPC).map((key, i) => {
      const listener = IpcRoutes.onRendererIPC[key]
      if (typeof listener === 'function') {
        listener(Windows.get('mainWindow'))
      }
    })
  })

  NotificationManager.show('app-READY')
})
