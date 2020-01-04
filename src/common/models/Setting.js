import Model from './Model'

const { log, error } = console

class Setting extends Model {
  constructor() {
    super()
  }

  static getFieldByPair(field, key, value) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT ' + field + ' FROM settings WHERE ' + key + '="' + value + '"',
        (err, data) => {
          if (err) reject(err)
          resolve(data && data[0] ? data[0][field] : null)
        }
      )
    })
  }

  static replace(key, value) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'REPLACE INTO settings SET key_="' + key + '", _value="' + value + '"',
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }
}

export default Setting
