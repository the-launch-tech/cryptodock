import Model from './Model'

const { log, error } = console

class Product extends Model {
  constructor() {
    super()
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SELECT * FROM products', (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static getExchangeProducts(exchangeId) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT * FROM product_exchange AS pe INNER JOIN products p ON pe.product_id = p.id WHERE pe.exchange_id=?',
        [exchangeId],
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }

  static save(exchangeId, product, map) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO products (pair, base, quote) values (?, ?, ?)',
        [product[map['pair']], product[map['base']], product[map['quote']]],
        (err, productData) => {
          if (err) reject(err)
          global.Conn.asyncQuery(
            'INSERT INTO product_exchange (trading, margin, iceberg, oco, spot_trading, base_min, base_max, quote_min, quote_max, product_id, exchange_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              product[map['trading']],
              product[map['margin']],
              product[map['iceberg']],
              product[map['oco']],
              product[map['spot_trading']],
              product[map['base_min']],
              product[map['base_max']],
              product[map['quote_min']],
              product[map['quote_max']],
              productData.insertId,
              exchangeId,
            ],
            (err, productExchangeData) => {
              if (err) reject(err)
              resolve(productExchangeData)
            }
          )
        }
      )
    })
  }
}

export default Product
