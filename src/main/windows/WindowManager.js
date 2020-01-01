import { BrowserWindow } from 'electron'
import { format as formatUrl } from 'url'
import windowConfig from './windowConfig'
import isFn from '../../common/helpers/isFn'
import _key from '../../common/helpers/_key'
import isDev from '../../common/helpers/isDev'

const { log, error } = console

export default class WindowManager {
  constructor() {
    this.windows = {}
  }

  exists(type, id = null) {
    const key = _key(type, id)
    return this.windows[key]
  }

  get(type, id = null) {
    const key = _key(type, id)
    return this.windows[key].window
  }

  isActive(type, id = null) {
    const key = _key(type, id)
    return this.windows[key].active
  }

  setActive(type, id = null) {
    const key = _key(type, id)
    this.windows[key].active = true
  }

  configure(type, id = null, callback) {
    const key = _key(type, id)

    this.windows[key] = windowConfig(type, id)

    if (isFn(callback)) {
      callback(key)
    }
  }

  activate(key, callback) {
    if (this.isActive(key)) {
      return false
    }

    this.setActive(key)

    this.windows[key].window = new BrowserWindow(this.windows[key].args)

    if (isDev() && this.windows[key].devTools) {
      this.windows[key].window.webContents.openDevTools()
    }

    if (isDev()) {
      this.windows[key].window.loadURL(this.windows[key].address)
    } else {
      this.windows[key].window.loadURL(
        formatUrl({
          pathname: this.windows[key].template,
          protocol: 'file',
          slashes: true,
        })
      )
    }

    this.windows[key].window.webContents.on('devtools-opened', () => {
      this.windows[key].window.focus()
      setImmediate(() => {
        this.windows[key].window.focus()
      })
    })

    if (isFn(callback)) {
      callback()
    }
  }

  onClosed(key, callback) {
    this.windows[key].window.on('closed', () => {
      this.windows[key].active = false

      this.windows[key].window = null

      if (isFn(callback)) {
        callback(key)
      }
    })
  }

  destroy(type, id = null) {
    const key = _key(type, id)

    if (this.exists(key)) {
      delete this.windows[key]
    }
  }
}
