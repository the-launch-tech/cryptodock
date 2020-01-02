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

  static save(exchangeId, product, map) {
    const pair = product[map[pair]]
    const base = product[map[base]]
    const quote = product[map[quote]]
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO products (pair, base, quote) values ("' +
          pair +
          '", "' +
          base +
          '", "' +
          quote +
          '")',
        (err, productData) => {
          if (err) reject(err)
          const id = productData.insertId
          global.Conn.asyncQuery(
            'INSERT INTO product_exchange () values ()',
            (err, productExchangeData) => {
              if (err) reject(err)
              resolve(data.insertId)
            }
          )
        }
      )
    })
  }
}

export default Product
