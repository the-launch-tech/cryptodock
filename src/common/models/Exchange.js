import Model from './Model'

const { log, error } = console

class Exchange extends Model {
  constructor() {
    super()
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SELECT * FROM exchanges', (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static save(name) {
    const map = {
      coinbasepro: {
        label: 'CoinbasePro',
      },
      kucoin: {
        label: 'Kucoin',
      },
    }

    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO exchanges (name, label) values ("' + name + '", "' + map[name].label + '")',
        (err, data) => {
          if (err) reject(err)
          resolve(data.insertId)
        }
      )
    })
  }
}

export default Exchange
