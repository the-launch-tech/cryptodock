import Model from './Model'

const { log, error } = console

class TestOrder extends Model {
  constructor() {
    super()
  }

  static save({ pair, exchange, quantity, direction, order_type, strategy_id, live_session_id }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO test_orders (pair, exchange, quantity, direction, order_type, strategy_id, live_session_id) values (?,?,?,?,?,?,?)',
        [pair, exchange, quantity, direction, order_type, strategy_id, live_session_id],
        (err, data) => {
          if (err) reject(err)
          resolve(data.insertId)
        }
      )
    })
  }
}

export default TestOrder
