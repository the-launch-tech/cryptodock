import Model from './Model'
import moment from 'moment'

const { log, error } = console

class Session extends Model {
  constructor() {
    super()
  }

  static async getAll() {
    return await super.getAll('sessions')
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('sessions', args)
  }

  static async save(args) {
    return await super.save('sessions', args)
  }

  static async update({ meta, session_id }) {
    meta.id = session_id
    meta.start_time = meta.start_time ? moment(meta.start_time).format('YYYY-MM-DD HH:mm:ss') : null
    meta.end_time = meta.end_time ? moment(meta.end_time).format('YYYY-MM-DD HH:mm:ss') : null
    return await super.update('sessions', meta)
  }
}

export default Session
