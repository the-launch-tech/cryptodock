import Model from './Model'

const { log, error } = console

class TestEvent extends Model {
  constructor() {
    super()
  }

  static save({ message, strategy_id, test_session_id }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO test_events (message,strategy_id,test_session_id) values (?,?,?)',
        [message, strategy_id, test_session_id],
        (err, data) => {
          if (err) reject(err)
          resolve(data.insertId)
        }
      )
    })
  }
}

export default TestEvent
