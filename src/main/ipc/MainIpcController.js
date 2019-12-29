export default {
  onDb: (event, arg) => {
    if (arg.id === 'database') {
      event.reply('res_db-database', 'criptbot')
    } else if (arg.id === 'tables') {
      event.reply('res_db-tables', ['exchanges', 'products'])
    } else if (arg.id === 'table-details') {
      event.reply('res_db-table-details', null)
    }
  },
  onMigration: () => {
    if (arg.id === 'rollback') {
      event.reply('res_migration-rollback', 'Success')
    } else if (arg.id === 'refresh') {
      event.reply('res_migration-refresh', 'Success')
    }
  },
}
