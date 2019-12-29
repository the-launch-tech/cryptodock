import * as path from 'path'

export default {
  window: null,
  active: false,
  devTools: true,
  template: path.join(__dirname, 'index.html'),
  address: `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`,
  args: {
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: { nodeIntegration: true },
    titleBarStyle: 'hidden',
  },
}
