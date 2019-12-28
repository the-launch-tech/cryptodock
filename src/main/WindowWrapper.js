import * as path from 'path'
import { BrowserWindow } from 'electron'
import { format as formatUrl } from 'url'

export default class WindowWrapper {
  constructor() {
    this.obj = null
    this.active = false
    this.devMode = process.env.NODE_ENV !== 'production'
  }

  isActive = () => {
    return this.active
  }

  turnOn = () => {
    this.active = true
  }

  turnOff = () => {
    this.active = false
    this.obj = null
  }

  activate = () => {
    if (this.isActive()) {
      return false
    }

    this.turnOn()

    this.obj = new BrowserWindow({
      width: 800,
      height: 600,
      resizable: false,
      webPreferences: { nodeIntegration: true },
    })

    if (this.devMode) {
      this.obj.webContents.openDevTools()
    }

    if (this.devMode) {
      this.obj.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    } else {
      this.obj.loadURL(
        formatUrl({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file',
          slashes: true,
        })
      )
    }

    this.obj.on('closed', this.turnOff)
    this.obj.webContents.on('devtools-opened', this.focus)
  }

  focus = () => {
    this.obj.focus()
    setImmediate(() => {
      this.obj.focus()
    })
  }
}
