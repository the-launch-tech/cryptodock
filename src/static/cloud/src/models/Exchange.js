import Model from './Model'

const { log, error } = console

class Exchange extends Model {
  constructor() {
    super()
  }

  static get(name, fields) {
    log('fields <[string]>', fields)
    log('name <[string]>', name)

    let query = 'SELECT '
    let args = []

    if (fields) {
      if (Array.isArray(fields)) {
        query += fields.join(',')
      } else {
        query += fields.replace(/[^0-9a-z]/gi, '')
      }
    } else {
      query += '*'
    }

    query += ' FROM exchanges '

    if (name) {
      if (Array.isArray(name)) {
        let nameArr = []
        name.forEach(n => nameArr.push('name=? '))
        query += 'WHERE (' + nameArr.join('OR ') + ')'
        args = name
      } else {
        query += 'WHERE name=?'
        args.push(name)
      }
    }

    log(query, args)

    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(query, args, (err, data) => {
        if (err) reject(err)
        log(data)
        resolve(data)
      })
    })
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SELECT * FROM exchanges', (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static save(exchange) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO exchanges (name, label) values (?, ?)',
        [exchange.name, exchange.label],
        (err, data) => {
          if (err) reject(err)
          resolve(data.insertId)
        }
      )
    })
  }
}

export default Exchange
