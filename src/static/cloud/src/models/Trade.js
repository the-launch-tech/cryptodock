const Model = require('./Model')

const { log, error } = console

class Trade extends Model {
  constructor() {
    super()
  }

  static getLastSequence(productId, exchangeId) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT sequence FROM trades WHERE product_id=? AND exchange_id=? ORDER BY sequence DESC LIMIT 1',
        [productId, exchangeId],
        (err, data) => {
          if (err) reject(err)
          resolve(data && data[0] ? data[0]['sequence'] : 0)
        }
      )
    })
  }

  static save(trade, productId, exchangeId, getTradesObject, tradeTimeFn) {
    log('Saving Trade', trade)
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO trades (sequence, server_time, price, size, quote_size, side, best_match, exchange_id, product_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          trade[getTradesObject['sequence']],
          tradeTimeFn(trade[getTradesObject['server_time']]),
          trade[getTradesObject['price']],
          trade[getTradesObject['size']],
          trade[getTradesObject['quote_size']],
          trade[getTradesObject['side']],
          trade[getTradesObject['best_match']],
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

module.exports = Trade
