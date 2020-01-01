require('dotenv').config()

import { app as CryptoDock } from 'electron'
import * as path from 'path'
import { Conn } from 'mysql-layer'
import activateWindow from '../common/helpers/activateWindow'
import _key from '../common/helpers/_key'
import IpcManager from './ipc/IpcManager'
import WindowManager from './windows/WindowManager'
import NotificationManager from './notifications/NotificationManager'
import { ALL_WINDOWS_CLOSED, APP_READY } from './notifications/actions'

const { log, error } = console

if (module.hot) {
  module.hot.accept()
}

global.IPC = new IpcManager()

global.Windows = new WindowManager()

global.Conn = new Conn({
  hostname: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
})

global.Conn.connection.connect()

const mainKey = 'mainWindow'

CryptoDock.on('window-all-closed', () => {
  NotificationManager.show(ALL_WINDOWS_CLOSED)
  global.IPC.removeAllHandlers()
})

CryptoDock.on('activate', () => {
  if (!global.Windows.isActive(mainKey)) {
    activateWindow(mainKey)
  }
})

CryptoDock.on('ready', () => {
  if (!global.Windows.exists(mainKey)) {
    global.Windows.configure(mainKey, null, activateWindow)
  } else if (!global.Windows.isActive(mainKey)) {
    activateWindow(mainKey)
  }

  global.IPC.onRendererPing((event, windowArgs) => {
    event.reply('res--app.renderer-PING', windowArgs)
    global.IPC.createHandlers(windowArgs.type, windowArgs.id, (added, handlers) => {
      if (added) {
        global.IPC.addHandlers(windowArgs.type, windowArgs.id, handlers)
      }
    })
  })

  NotificationManager.show(APP_READY)
})
