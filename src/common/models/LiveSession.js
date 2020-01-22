import Model from './Model'

const { log, error } = console

class LiveSession extends Model {
  constructor() {
    super()
  }

  static async getAll() {
    return await super.getAll('live_sessions')
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('live_sessions', args)
  }

  static async save(args) {
    return await super.save('live_sessions', args)
  }

  static async update({ meta, live_session_id }) {
    return await super.update('live_sessions', {
      start_time: meta.start_time,
      end_time: meta.end_time,
      granularity: meta.granularity,
      start_funds: meta.start_funds,
      end_funds: meta.end_funds,
      id: live_session_id,
    })
  }
}

export default LiveSession
