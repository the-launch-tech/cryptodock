import readFile from '../helpers/readFile'
import sanitize from '../helpers/sanitize'
import path from 'path'

const { error, log } = console

class Model {
  constructor() {}

  static staticFile(file) {
    return new Promise((resolve, reject) => {
      readFile(path.join(__static, file), false)
        .then(contents => contents.replace(/(\r\n|\n|\r)/gm, ' '))
        .then(contents => contents.replace(/\s+/g, ' '))
        .then(contents => contents.trim())
        .then(contents => global.Conn.asyncQuery(contents))
        .then(resolve)
        .catch(reject)
    })
  }

  static getDatabase() {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SELECT DATABASE()', (err, data) => {
        if (err) reject(err)
        resolve(data && data[0] && Object.keys(data[0]) ? data[0]['DATABASE()'] : '')
      })
    })
  }

  static getTables() {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SHOW TABLES', (err, data) => {
        if (err) reject(err)
        resolve(data.map(row => row[Object.keys(row)[0]]))
      })
    })
  }

  static getTableDetails(table) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('DESCRIBE ' + sanitize(table), (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static getTableRowCount(table) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SELECT COUNT(*) FROM ' + sanitize(table), (err, data) => {
        if (err) reject(err)
        resolve(data && data[0] ? data[0]['COUNT(*)'] : 0)
      })
    })
  }

  static getRemoteDatabase() {
    return new Promise((resolve, reject) => {
      global.RemoteConn.asyncQuery('SELECT DATABASE()', (err, data) => {
        if (err) reject(err)
        resolve(data && data[0] && Object.keys(data[0]) ? data[0]['DATABASE()'] : '')
      })
    })
  }

  static getRemoteTables() {
    return new Promise((resolve, reject) => {
      global.RemoteConn.asyncQuery('SHOW TABLES', (err, data) => {
        if (err) reject(err)
        resolve(data.map(row => row[Object.keys(row)[0]]))
      })
    })
  }

  static getRemoteTableDetails(table) {
    return new Promise((resolve, reject) => {
      global.RemoteConn.asyncQuery('DESCRIBE ' + sanitize(table), (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static getRemoteTableRowCount(table) {
    return new Promise((resolve, reject) => {
      global.RemoteConn.asyncQuery('SELECT COUNT(*) FROM ' + sanitize(table), (err, data) => {
        if (err) reject(err)
        resolve(data && data[0] ? data[0]['COUNT(*)'] : 0)
      })
    })
  }

  static getAll(table) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SELECT * FROM ' + sanitize(table), (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static getByFieldValue(table, { key, value }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT * FROM ' + sanitize(table) + ' WHERE ' + sanitize(key) + '=?',
        [value],
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }

  static async getOneByFieldValue(table, { key, value }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'SELECT * FROM ' + sanitize(table) + ' WHERE ' + sanitize(key) + '=? LIMIT 1',
        [value],
        (err, data) => {
          if (err) reject(err)
          resolve(data[0])
        }
      )
    })
  }

  static updateOneFieldValue(table, { id, key, value }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'UPDATE ' + sanitize(table) + ' SET ' + sanitize(key) + '=? WHERE id=?',
        [value, id],
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }

  static update(table, args) {
    let values = []

    const id = args.id

    Object.keys(args).map(key => {
      if (key !== 'id') {
        values.push(sanitize(key) + '="' + sanitize(args[key]) + '"')
      }
    })

    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'UPDATE ' +
          sanitize(table) +
          ' SET ' +
          values.join(',') +
          ' WHERE id="' +
          sanitize(id) +
          '"',
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }

  static save(table, args) {
    let bindings = []
    let shadow = []

    Object.keys(args).map(key => {
      bindings.push(sanitize(args[key]))
      shadow.push('?')
    })

    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'INSERT INTO ' +
          sanitize(table) +
          ' (' +
          bindings.join(',') +
          ') values (' +
          shadow.join(',') +
          ')',
        bindings,
        (err, data) => {
          if (err) reject(err)
          resolve(data.insertId)
        }
      )
    })
  }

  static delete(table, { id }) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery(
        'DELETE FROM ' + sanitize(table) + ' WHERE id=?',
        [id],
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        }
      )
    })
  }
}

export default Model
