import Model from '../../../common/models/Model'

const { log, error } = console
const channel = (key, id) => `res--${key}.db-${id}`
const remote = (key, id) => `res--${key}.remote-${id}`

export default {
  DATABASE: (event, arg, win, key) => {
    Model.getDatabase()
      .then(data => event.reply(channel(key, 'DATABASE'), data))
      .catch(error)
  },
  TABLES: (event, arg, win, key) => {
    log('LOCAL TABLEs', arg, key)
    Model.getTables()
      .then(data => event.reply(channel(key, 'TABLES'), data))
      .catch(error)
  },
  TABLE_DETAILS: (event, arg, win, key) => {
    log('LOCAL TABLE DETAILS', arg, key)
    Model.getTableDetails(arg.data.tableName)
      .then(data => event.reply(channel(key, 'TABLE_DETAILS'), data))
      .catch(error)
  },
  TABLE_ROW_COUNT: (event, arg, win, key) => {
    Model.getTableRowCount(arg.data.tableName)
      .then(data => event.reply(channel(key, 'TABLE_ROW_COUNT'), data))
      .catch(error)
  },
  REMOTE_DATABASE: (event, arg, win, key) => {
    Model.getRemoteDatabase()
      .then(data => event.reply(remote(key, 'REMOTE_DATABASE'), data))
      .catch(error)
  },
  REMOTE_TABLES: (event, arg, win, key) => {
    log('REMOTE TABLEs', arg, key)
    Model.getRemoteTables()
      .then(data => event.reply(remote(key, 'REMOTE_TABLES'), data))
      .catch(error)
  },
  REMOTE_TABLE_DETAILS: (event, arg, win, key) => {
    log('REMOTE TABLE DETAILS', arg, key)
    Model.getRemoteTableDetails(arg.data.tableName)
      .then(data => event.reply(remote(key, 'REMOTE_TABLE_DETAILS'), data))
      .catch(error)
  },
  REMOTE_TABLE_ROW_COUNT: (event, arg, win, key) => {
    Model.getRemoteTableRowCount(arg.data.tableName)
      .then(data => event.reply(remote(key, 'REMOTE_TABLE_ROW_COUNT'), data))
      .catch(error)
  },
}
