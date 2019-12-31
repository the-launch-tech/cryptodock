import { dialog } from 'electron'
import dialogConfig from './dialogConfig'

const log = console.log
const error = console.error

export default {
  showMessage: async function(arg, win, name) {
    const config = dialogConfig[name]
    if (config) {
      try {
        return await dialog.showMessageBox(win, config(arg))
      } catch (e) {
        error(e)
      }
    }
  },
  showOpen: async function(arg, win, name) {
    const config = dialogConfig[name]
    if (config) {
      try {
        return await dialog.showOpenDialog(win, config(arg))
      } catch (e) {
        error(e)
      }
    }
  },
}
