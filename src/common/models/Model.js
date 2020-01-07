import readFile from '../helpers/readFile'
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

  static getTableDetails(tableName) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('DESCRIBE ' + tableName, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static getTableRowCount(tableName) {
    return new Promise((resolve, reject) => {
      global.Conn.asyncQuery('SELECT COUNT(*) FROM ' + tableName, (err, data) => {
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

  static getRemoteTableDetails(tableName) {
    return new Promise((resolve, reject) => {
      global.RemoteConn.asyncQuery('DESCRIBE ' + tableName, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static getRemoteTableRowCount(tableName) {
    return new Promise((resolve, reject) => {
      global.RemoteConn.asyncQuery('SELECT COUNT(*) FROM ' + tableName, (err, data) => {
        if (err) reject(err)
        resolve(data && data[0] ? data[0]['COUNT(*)'] : 0)
      })
    })
  }
}

export default Model
