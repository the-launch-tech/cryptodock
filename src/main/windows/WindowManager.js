import { BrowserWindow } from 'electron'
import { format as formatUrl } from 'url'
import mainWindow from './mainWindow'
import isDev from '../../common/helpers/isDev'

export default class WindowManager {
  constructor() {
    this.windows = {
      mainWindow,
      warning: null,
    }
  }

  isActive(key) {
    return this.windows[key].active
  }

  setActive(key) {
    this.windows[key].active = true
  }

  activate(key) {
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

    this.windows[key].window.on('closed', () => {
      this.windows[key].active = false
      this.windows[key].window = null
    })
  }
}
