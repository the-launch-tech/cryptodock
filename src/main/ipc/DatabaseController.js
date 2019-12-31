const error = console.error
const log = console.log

export default {
  DATABASE: (event, arg, win) => {
    global.Conn.asyncQuery('SELECT DATABASE()')
      .then(data => data[0])
      .then(data => (Object.keys(data) ? data['DATABASE()'] : ''))
      .then(data => event.reply('res--db-DATABASE', data))
      .catch(error)
  },
  TABLES: (event, arg, win) => {
    global.Conn.asyncQuery('SHOW TABLES')
      .then(data => data.map(row => row[Object.keys(row)[0]]))
      .then(data => event.reply('res--db-TABLES', data))
      .catch(error)
  },
  TABLE_DETAILS: (event, arg, win) => {
    global.Conn.asyncQuery('DESCRIBE ' + arg.data.tableName)
      .then(data => event.reply('res--db-TABLE_DETAILS', data))
      .catch(error)
  },
  TABLE_ROW_COUNT: (event, arg, win) => {
    global.Conn.asyncQuery('SELECT COUNT(*) FROM ' + arg.data.tableName)
      .then(data => data[0])
      .then(data => (Object.keys(data) ? data['COUNT(*)'] : ''))
      .then(data => event.reply('res--db-TABLE_ROW_COUNT', data))
      .catch(error)
  },
}
