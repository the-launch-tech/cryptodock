import NotificationManager from '../../notifications/NotificationManager'
import DialogManager from '../../dialogs/DialogManager'
import Model from '../../../common/models/Model'
import {
  MIGRATION_ROLLEDBACK,
  MIGRATION_ROLLBACK_NULLED,
  MIGRATION_REFRESHED,
  MIGRATION_REFRESH_NULLED,
} from '../../notifications/actions'

const { log, error } = console
const channel = (key, id) => `res--${key}.migration-${id}`

export default {
  ROLLBACK: async (event, arg, win, key) => {
    DialogManager.showMessage(arg, win, 'migrationConfirmation')
      .then(res => {
        if (res === 0) {
          Model.staticFile('migrations/rollback.sql')
            .then(data => {
              event.reply(channel(key, 'ROLLBACK'), true)
              NotificationManager.show(MIGRATION_ROLLEDBACK)
            })
            .catch(err => {
              event.reply(channel(key, 'ROLLBACK'), false)
              NotificationManager.show(MIGRATION_ROLLBACK_NULLED)
              error(err)
            })
        } else {
          event.reply(channel(key, 'ROLLBACK'), false)
          NotificationManager.show(MIGRATION_ROLLBACK_NULLED)
        }
      })
      .catch(error)
  },
  REFRESH: async (event, arg, win, key) => {
    DialogManager.showMessage(arg, win, 'migrationConfirmation')
      .then(res => {
        if (res === 0) {
          Model.staticFile('migrations/refresh.sql')
            .then(data => Model.staticFile('migrations/seed.sql'))
            .then(data => {
              event.reply(channel(key, 'REFRESH'), true)
              NotificationManager.show(MIGRATION_REFRESHED)
            })
            .catch(err => {
              event.reply(channel(key, 'REFRESH'), false)
              NotificationManager.show(MIGRATION_REFRESH_NULLED)
              error(err)
            })
        } else {
          event.reply(channel(key, 'REFRESH'), false)
          NotificationManager.show(MIGRATION_REFRESH_NULLED)
        }
      })
      .catch(error)
  },
}
