import Model from './Model'

const { log, error } = console

class LiveSession extends Model {
  constructor() {
    super()
  }

  static save({ strategy_id }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO live_sessions (strategy_id) values (?)',
        [strategy_id],
        (err, data) => {
          if (err) reject(err)
          resolve(data.insertId)
        }
      )
    })
  }

  static update({ meta, live_session_id, strategy_id }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'UPDATE live_sessions SET start_time=?, end_time=?, granularity=?, start_funds=?, end_funds=? WHERE strategy_id=? AND id=?',
        [
          meta.start_time,
          meta.end_time,
          meta.granularity,
          meta.start_funds,
          meta.end_funds,
          strategy_id,
          live_session_id,
        ],
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }
}

export default LiveSession
