import Model from './Model'

const { log, error } = console

class KLine extends Model {
  constructor() {
    super()
  }

  static getLastTimestamp(exchangeId) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT server_time FROM klines WHERE exchange_id="' +
          exchangeId +
          '" ORDERBY server_time DESC LIMIT 1',
        (err, data) => {
          if (err) reject(err)
          resolve(data && data[0] ? data[0]['_value'] : '')
        }
      )
    })
  }

  static save(key, value) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('INSERT INTO klines', (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

export default KLine
