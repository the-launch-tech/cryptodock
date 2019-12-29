export default {
  DATABASE: (event, arg, win) => {
    event.reply('res--db-DATABASE', 'criptbot')
  },
  TABLES: (event, arg, win) => {
    event.reply('res--db-TABLES', ['exchanges', 'products'])
  },
  TABLE_DETAILS: (event, arg, win) => {
    event.reply('res--db-TABLE_DETAILS', {})
  },
}
