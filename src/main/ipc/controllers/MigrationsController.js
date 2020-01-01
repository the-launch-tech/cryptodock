import NotificationManager from '../../NotificationManager'
import DialogManager from '../../dialogs/DialogManager'
import MysqlProvider from '../../../common/mysql/MysqlProvider'

const { log, error } = console
const channel = (key, id) => `res--${key}.migration-${id}`

export default {
  ROLLBACK: async (event, arg, win, key) => {
    DialogManager.showMessage(arg, win, 'migrationConfirmation')
      .then(res => {
        if (res === 0) {
          MysqlProvider.static('src/static/migration-ROLLBACK.sql', (err, data) => {
            if (err) {
              event.reply(channel(key, 'ROLLBACK'), false)
              NotificationManager.show('MIGRATION_ROLLBACK_NULLED')
              throw err
            } else {
              event.reply(channel(key, 'ROLLBACK'), true)
              NotificationManager.show('MIGRATION_ROLLEDBACK')
            }
          })
        } else {
          event.reply(channel(key, 'ROLLBACK'), false)
          NotificationManager.show('MIGRATION_ROLLBACK_NULLED')
        }
      })
      .catch(error)
  },
  REFRESH: async (event, arg, win, key) => {
    DialogManager.showMessage(arg, win, 'migrationConfirmation')
      .then(res => {
        if (res === 0) {
          MysqlProvider.static('src/static/migration-REFRESH.sql', (err, data) => {
            if (err) {
              event.reply(channel(key, 'REFRESH'), false)
              NotificationManager.show('MIGRATION_REFRESH_NULLED')
              throw err
            } else {
              event.reply(channel(key, 'REFRESH'), true)
              NotificationManager.show('MIGRATION_REFRESHED')
            }
          })
        } else {
          event.reply(channel(key, 'REFRESH'), false)
          NotificationManager.show('MIGRATION_REFRESH_NULLED')
        }
      })
      .catch(error)
  },
}
