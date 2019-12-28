import { app } from 'electron'
import * as path from 'path'
import { Pool, Conn } from 'mysql-layer'
import WindowWrapper from './WindowWrapper'

if (module.hot) {
  module.hot.accept()
}

const AppWindow = new WindowWrapper()

const DBPool = new Pool({
  hostname: 'localhost',
  user: 'criptbot',
  password: 'criptbot',
  name: 'criptbot',
})

app.on('window-all-closed', () => {
  console.log('All Closed')
})

app.on('activate', () => {
  if (!AppWindow.active) {
    AppWindow.activate()
  }
})

app.on('ready', () => {
  if (!AppWindow.active) {
    AppWindow.activate()
  }
})
