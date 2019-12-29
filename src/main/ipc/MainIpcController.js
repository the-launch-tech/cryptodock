import { dialog } from 'electron'
import NotificationManager from '../NotificationManager'

export default {
  onDb: async (event, arg, win) => {
    const reducer = {
      database: () => {
        event.reply('res_db-database', 'criptbot')
      },
      tables: () => {
        event.reply('res_db-tables', ['exchanges', 'products'])
      },
      'table-details': () => {
        event.reply('res_db-table-details', null)
      },
    }

    try {
      const action = reducer[arg.id]
      action && (await action())
    } catch (e) {
      console.error(e)
    }
  },
  onMigration: async (event, arg, win) => {
    const reducer = {
      rollback: res => {
        if (res === 0) {
          event.reply('res_migration-rollback', true)
          NotificationManager.show('migration-rolledback')
        } else {
          event.reply('res_migration-rollback', false)
          NotificationManager.show('migration-rollback-nulled')
        }
      },
      refresh: res => {
        if (res === 0) {
          event.reply('res_migration-refresh', true)
          NotificationManager.show('migration-refreshed')
        } else {
          event.reply('res_migration-refresh', false)
          NotificationManager.show('migration-refresh-nulled')
        }
      },
    }

    try {
      const res = await dialog.showMessageBox(win, {
        type: 'question',
        title: 'Migration Confirmation',
        message: 'Are you sure you want to ' + arg.id + '?',
        detail: 'This action cannot be reversed',
        defaultId: 1,
        buttons: ['Yes', 'No'],
      })

      const action = reducer[arg.id]

      action && (await action(res))
    } catch (e) {
      console.error(e)
    }
  },
}
