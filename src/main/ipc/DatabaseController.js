export default {
  DATABASE: (event, arg, win) => {
    global.Pool.getConnection((err, conn) => {
      if (err) throw err
      conn.query('SELECT DATABASE()', (e, data) => {
        if (e) throw e
        event.reply('res--db-DATABASE', data)
      })
    })
  },
  TABLES: (event, arg, win) => {
    global.Pool.getConnection((err, conn) => {
      if (err) throw err
      conn.query('SHOW TABLES', (e, data) => {
        if (e) throw e
        event.reply('res--db-TABLES', data)
      })
    })
  },
  TABLE_DETAILS: (event, arg, win) => {
    global.Pool.getConnection((err, conn) => {
      if (err) throw err
      conn.query('DESCRIBE ?', [arg.tableName], (e, data) => {
        if (e) throw e
        event.reply('res--db-TABLE_DETAILS', data)
      })
    })
  },
}
