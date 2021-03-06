import * as path from 'path'
import querystring from 'querystring'

export default function(type, id) {
  const reducer = {
    mainWindow: {
      window: null,
      active: false,
      devTools: true,
      show: true,
      template: path.join(__dirname, 'index.html'),
      address: `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}?${querystring.stringify({
        type,
      })}`,
      args: {
        opacity: 0.985,
        title: 'CryptoDock',
        width: 1000,
        height: 600,
        resizable: false,
        webPreferences: { nodeIntegration: true },
        titleBarStyle: 'hidden',
      },
    },
    strategyWindow: {
      window: null,
      active: false,
      devTools: true,
      show: true,
      template: path.join(__dirname, 'index.html'),
      address: `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}?${querystring.stringify({
        type,
        id,
      })}`,
      args: {
        opacity: 0.985,
        title: 'Strategy Viewer',
        width: 750,
        height: 500,
        resizable: false,
        webPreferences: { nodeIntegration: true },
        titleBarStyle: 'hidden',
      },
    },
  }

  return reducer[type]
}
