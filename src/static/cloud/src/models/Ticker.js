import Model from './Model'

const { log, error } = console

class Ticker extends Model {
  constructor() {
    super()
  }

  static getLastSequence(productId, exchangeId) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT sequence FROM tickers WHERE product_id=? AND exchange_id=? ORDER BY sequence DESC LIMIT 1',
        [productId, exchangeId],
        (err, data) => {
          if (err) reject(err)
          resolve(data && data[0] ? data[0]['sequence'] : 0)
        }
      )
    })
  }

  static save(ticker, productId, exchangeId, tickerObject, tickersTimeFn) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO tickers (sequence, server_time, price, size, bid, ask, volume, exchange_id, product_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          ticker[tickerObject['sequence']],
          tickersTimeFn(ticker[tickerObject['server_time']]),
          ticker[tickerObject['price']],
          ticker[tickerObject['size']],
          ticker[tickerObject['bid']],
          ticker[tickerObject['ask']],
          ticker[tickerObject['volume']],
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

export default Ticker
