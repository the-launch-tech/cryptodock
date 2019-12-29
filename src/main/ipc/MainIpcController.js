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
        const details = {
          exchanges: {
            name: 'exchanges',
            columns: [
              { field: 'id', type: 'PRIMARY KEY ID', null: 'NO', default: 'Auto Increment' },
              { field: 'name', type: 'varchar(20)', null: 'NO', default: 'NULL' },
              { field: 'label', type: 'varchar(20)', null: 'NO', default: 'NULL' },
            ],
          },
          products: {
            name: 'products',
            columns: [
              { field: 'id', type: 'PRIMARY KEY ID', null: 'NO', default: 'Auto Increment' },
              { field: 'name', type: 'varchar(20)', null: 'NO', default: 'NULL' },
              { field: 'base', type: 'varchar(20)', null: 'NO', default: 'NULL' },
              { field: 'quote', type: 'varchar(20)', null: 'NO', default: 'NULL' },
            ],
          },
        }
        event.reply('res_db-table-details', details[arg.data])
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
    console.log('onMigration')
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
        console.log('onMigration refresh')
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
