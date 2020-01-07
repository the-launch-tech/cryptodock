import Model from './Model'
import moment from 'moment'

const { log, error } = console

class KLine extends Model {
  constructor() {
    super()
  }

  static getLastTimestamp(productId, exchangeId) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT server_time FROM klines WHERE product_id=? AND exchange_id=? ORDER BY server_time DESC LIMIT 1',
        [productId, exchangeId],
        (err, data) => {
          if (err) reject(err)
          resolve(data && data[0] ? data[0]['server_time'] : moment().subtract({ hours: 1 }))
        }
      )
    })
  }

  static save(kline, productId, exchangeId, map, periodInSeconds) {
    log('Saving Kline', kline)
    const klineArr = map.klineArr
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO klines (server_time, low, high, open, close, amount, volume, period, exchange_id, product_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          moment(kline[klineArr[0]]).format('YYYY-MM-DD HH:mm:ss.SSS'),
          kline[klineArr[1]],
          kline[klineArr[2]],
          kline[klineArr[3]],
          kline[klineArr[4]],
          kline[klineArr[5]],
          kline[klineArr[6]],
          periodInSeconds,
          exchangeId,
          productId,
        ],
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }
}

export default KLine
