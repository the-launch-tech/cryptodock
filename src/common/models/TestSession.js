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

  static save({ strategy_id }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO test_sessions (strategy_id) values (?)',
        [strategy_id],
        (err, data) => {
          if (err) reject(err)
          resolve(data.insertId)
        }
      )
    })
  }

  static update({
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
        'UPDATE test_sessions SET label=?, custom=?, start_time=?, end_time=?, granularity=?, start_funds=?, end_funds=?, description=?, completed=? WHERE strategy_id=?',
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
