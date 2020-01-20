import Model from './Model'

const { log, error } = console

class LiveEvent extends Model {
  constructor() {
    super()
  }

  static save({ message, strategy_id, live_session_id }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO live_events (message,strategy_id,live_session_id) values (?,?,?)',
        [message, strategy_id, live_session_id],
        (err, data) => {
          if (err) reject(err)
          resolve(data.insertId)
        }
      )
    })
  }
}

export default LiveEvent
