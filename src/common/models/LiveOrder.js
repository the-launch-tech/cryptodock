import Model from './Model'

const { log, error } = console

class LiveOrder extends Model {
  constructor() {
    super()
  }

  static save({ meta, strategy_id, live_session_id }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO live_orders (pair, exchange, quantity, direction, order_type, strategy_id, live_session_id) values (?,?,?,?,?,?,?)',
        [
          meta.pair,
          meta.exchange,
          meta.quantity,
          meta.direction,
          meta.order_type,
          strategy_id,
          live_session_id,
        ],
        (err, data) => {
          if (err) reject(err)
          resolve(data.insertId)
        }
      )
    })
  }
}

export default LiveOrder
