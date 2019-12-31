const error = console.error
const log = console.log

export default {
  DATABASE: (event, arg, win) => {
    global.Pool.asyncQuery('SELECT DATABASE()')
      .then(data => data[0])
      .then(data => (Object.keys(data) ? data['DATABASE()'] : ''))
      .then(data => event.reply('res--db-DATABASE', data))
      .catch(error)
  },
  TABLES: (event, arg, win) => {
    global.Pool.asyncQuery('SHOW TABLES')
      .then(data => data.map(row => row[Object.keys(row)[0]]))
      .then(data => event.reply('res--db-TABLES', data))
      .catch(error)
  },
  TABLE_DETAILS: (event, arg, win) => {
    global.Pool.asyncQuery('DESCRIBE ' + arg.data.tableName)
      .then(data => {
        log(data)
        event.reply('res--db-TABLE_DETAILS', null)
      })
      .catch(error)
  },
}
