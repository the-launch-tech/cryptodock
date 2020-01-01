const { log, error } = console
const channel = (key, id) => `res--${key}.db-${id}`

export default {
  DATABASE: (event, arg, win, key) => {
    global.Conn.asyncQuery('SELECT DATABASE()')
      .then(data => data[0])
      .then(data => (Object.keys(data) ? data['DATABASE()'] : ''))
      .then(data => event.reply(channel(key, 'DATABASE'), data))
      .catch(error)
  },
  TABLES: (event, arg, win, key) => {
    global.Conn.asyncQuery('SHOW TABLES')
      .then(data => data.map(row => row[Object.keys(row)[0]]))
      .then(data => event.reply(channel(key, 'TABLES'), data))
      .catch(error)
  },
  TABLE_DETAILS: (event, arg, win, key) => {
    global.Conn.asyncQuery('DESCRIBE ' + arg.data.tableName)
      .then(data => event.reply(channel(key, 'TABLE_DETAILS'), data))
      .catch(error)
  },
  TABLE_ROW_COUNT: (event, arg, win, key) => {
    global.Conn.asyncQuery('SELECT COUNT(*) FROM ' + arg.data.tableName)
      .then(data => data[0])
      .then(data => (Object.keys(data) ? data['COUNT(*)'] : ''))
      .then(data => event.reply(channel(key, 'TABLE_ROW_COUNT'), data))
      .catch(error)
  },
}
