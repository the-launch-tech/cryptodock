import Model from './Model'

const { log, error } = console

class Strategy extends Model {
  constructor() {
    super()
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SELECT * FROM strategies', (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static async getOneByValue(key, value) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT * FROM strategies WHERE ' + key + '=' + value + ' LIMIT 1',
        (err, data) => {
          if (err) reject(err)
          resolve(data[0])
        }
      )
    })
  }

  static updateState(id, status) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'UPDATE strategies SET status="' + status + '" WHERE id=' + id,
        (err, data) => {
          if (err) reject(err)
          resolve(status)
        }
      )
    })
  }

  static updateBacktestState(id, backtestStatus) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'UPDATE strategies SET backtest_status="' + backtestStatus + '" WHERE id=' + id,
        (err, data) => {
          if (err) reject(err)
          resolve(status)
        }
      )
    })
  }
}

export default Strategy
