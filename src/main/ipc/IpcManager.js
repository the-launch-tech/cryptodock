import { ipcMain } from 'electron'
import isFn from '../../common/helpers/isFn'
import _key from '../../common/helpers/_key'
import ipcRouterConfig from './ipcRouterConfig'

const { log, error } = console

export default class IpcManager {
  constructor() {
    this.router = {}

    this.removeHandlers = this.removeHandlers.bind(this)
    this.createHandlers = this.createHandlers.bind(this)
  }

  exists(key) {
    return this.router[key]
  }

  onRendererPing(callback) {
    ipcMain.on('app.renderer-PING', (event, arg) => {
      if (isFn(callback)) {
        callback(event, arg)
      }
    })
  }

  createHandlers(type, id = null, callback) {
    const key = _key(type, id)
    let added = false

    if (!this.exists(key)) {
      added = true
      this.router[key] = ipcRouterConfig(type, id, key)
    }

    if (isFn(callback)) {
      callback(added, this.router[key])
    }
  }

  addHandlers(type, id = null, handlers) {
    const key = _key(type, id)

    Object.keys(handlers).map((k, i) => {
      const { channel, listener } = handlers[k]

      const win = global.Windows.get(key)

      ipcMain.on(channel, (event, arg) => listener(event, arg, win))
    })
  }

  removeHandlers(key) {
    if (this.exists(key)) {
      Object.keys(this.router[key]).map((k, i) => {
        const { channel, listener } = this.router[key][k]

        const win = global.Windows.get(key)

        ipcMain.removeListener(channel, (event, arg) => listener(event, arg, win))
      })
    }
  }

  removeAllHandlers() {}
}
