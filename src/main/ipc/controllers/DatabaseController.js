import Model from '../../../common/models/Model'

const { log, error } = console
const channel = (key, id) => `res--${key}.db-${id}`

export default {
  DATABASE: (event, arg, win, key) => {
    Model.getDatabase()
      .then(data => event.reply(channel(key, 'DATABASE'), data))
      .catch(error)
  },
  TABLES: (event, arg, win, key) => {
    Model.getTables()
      .then(data => event.reply(channel(key, 'TABLES'), data))
      .catch(error)
  },
  TABLE_DETAILS: (event, arg, win, key) => {
    Model.getTableDetails(arg.data.tableName)
      .then(data => event.reply(channel(key, 'TABLE_DETAILS'), data))
      .catch(error)
  },
  TABLE_ROW_COUNT: (event, arg, win, key) => {
    Model.getTableRowCount(arg.data.tableName)
      .then(data => event.reply(channel(key, 'TABLE_ROW_COUNT'), data))
      .catch(error)
  },
}
