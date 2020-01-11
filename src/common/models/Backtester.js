import Model from './Model'

const { log, error } = console

class Backtester extends Model {
  constructor() {
    super()
  }

  static getTesters() {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SELECT * FROM backtesters', (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static getHistory(strategyId) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT * FROM backtests RIGHT JOIN backtesters ON backtests.backtester_id = backtesters.id INNER JOIN test_orders ON test_orders.backtest_id = backtests.id WHERE backtests.strategy_id=?',
        [strategyId],
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }
}

export default Backtester
