import Model from './Model'

const { log, error } = console

class TestSession extends Model {
  constructor() {
    super()
  }

  static getHistory(strategyId) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT * FROM test_sessions WHERE strategy_id=?',
        [strategyId],
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }

  static save({
    label,
    custom,
    start_time,
    end_time,
    granularity,
    start_funds,
    end_funds,
    description,
    completed,
    strategy_id,
  }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO test_sessions (label,custom,start_time,end_time,granularity,start_funds,end_funds,description,completed,strategy_id) values (?,?,?,?,?,?,?,?,?,?)',
        [
          label,
          custom,
          start_time,
          end_time,
          granularity,
          start_funds,
          end_funds,
          description,
          completed,
          strategy_id,
        ],
        (err, data) => {
          if (err) reject(err)
          resolve(data.insertId)
        }
      )
    })
  }
}

export default TestSession
