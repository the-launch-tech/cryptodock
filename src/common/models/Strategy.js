import Model from './Model'
import moment from 'moment'

const { log, error } = console

class Strategy extends Model {
  constructor() {
    super()
  }

  static async getAll() {
    return await super.getAll('strategies')
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('strategies', args)
  }

  static async getOneByFieldValue(args) {
    return await super.getOneByFieldValue('strategies', args)
  }

  static async updateOneFieldValue(args) {
    return await super.updateOneFieldValue('strategies', args)
  }

  static async delete(args) {
    return await super.delete('strategies', args)
  }

  static async save(args) {
    return await super.save('strategies', args)
  }

  static async update(args) {
    return await super.update('strategies', args)
  }

  static getRecent({ after }) {
    const time = moment()
      .subtract(after, 'seconds')
      .format('YYYY-MM-DD HH:mm:ss.SSS')

    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT s.label AS strategy_label, s.id AS strategy_id, ls.start_time AS session_start_time, ls.end_time AS session_end_time, ls.granularity AS session_granularity, ls.start_funds AS session_start_funds, ls.end_funds AS session_end_funds, ls.id AS live_session_id, le.id AS live_event_id, le.message AS live_event_message, lo.pair AS order_pair, lo.exchange AS order_exchange, lo.quantity AS order_quantity, lo.direction AS order_direction, lo.order_type AS order_type FROM strategies s LEFT JOIN live_events le ON s.id = le.strategy_id LEFT JOIN live_orders AS lo ON le.id=lo.live_event_id RIGHT JOIN live_sessions AS ls ON ls.id=le.live_session_id WHERE le.created>? OR ls.created>? ORDER BY le.created DESC',
        [time, time],
        (err, data) => {
          log(err, data)
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }

  static getRecentById({ id, after }) {
    const time = moment()
      .subtract(after, 'seconds')
      .format('YYYY-MM-DD HH:mm:ss.SSS')

    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT s.label AS strategy_label, s.id AS strategy_id, ls.start_time AS session_start_time, ls.end_time AS session_end_time, ls.granularity AS session_granularity, ls.start_funds AS session_start_funds, ls.end_funds AS session_end_funds, ls.id AS live_session_id, le.id AS live_event_id, le.message AS live_event_message, lo.pair AS order_pair, lo.exchange AS order_exchange, lo.quantity AS order_quantity, lo.direction AS order_direction, lo.order_type AS order_type FROM strategies s LEFT JOIN live_events le ON s.id = le.strategy_id LEFT JOIN live_orders AS lo ON le.id=lo.live_event_id RIGHT JOIN live_sessions AS ls ON ls.id=le.live_session_id WHERE id=? AND (WHERE le.created>? OR ls.created>?) ORDER BY le.created DESC',
        [id, time, time],
        (err, data) => {
          log(err, data)
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }
}

export default Strategy
