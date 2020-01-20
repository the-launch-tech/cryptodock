import Model from './Model'

const { log, error } = console

class Log extends Model {
  constructor() {
    super()
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SELECT * FROM logs', (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static save({ message }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('INSERT INTO logs (message) values (?)', [message], (err, data) => {
        if (err) reject(err)
        resolve(data.insertId)
      })
    })
  }
}

export default Log
