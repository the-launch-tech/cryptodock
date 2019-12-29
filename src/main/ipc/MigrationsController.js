import NotificationManager from '../NotificationManager'
import DialogManager from '../dialogs/DialogManager'

const log = console.log
const error = console.error

export default {
  ROLLBACK: async (event, arg, win) => {
    DialogManager.showMessage(arg, win, 'migrationConfirmation')
      .then(res => {
        if (res === 0) {
          event.reply('res--migration-ROLLBACK', true)
          NotificationManager.show('migration-ROLLBACK')
        } else {
          event.reply('res--migration-ROLLBACK', false)
          NotificationManager.show('migration-ROLLBACK_NULLED')
        }
      })
      .catch(error)
  },
  REFRESH: async (event, arg, win) => {
    DialogManager.showMessage(arg, win, 'migrationConfirmation')
      .then(res => {
        if (res === 0) {
          event.reply('res--migration-REFRESH', true)
          NotificationManager.show('migration-REFRESH')
        } else {
          event.reply('res--migration-REFRESH', false)
          NotificationManager.show('migration-REFRESH_NULLED')
        }
      })
      .catch(error)
  },
  CREATE: () => {},
  DROP: () => {},
}
