import Model from './Model'

const { log, error } = console

class Event extends Model {
  constructor() {
    super()
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('events', args)
  }

  static async save({ strategy_id, session_id, message, meta }) {
    meta.message = message
    meta.strategy_id = strategy_id
    meta.session_id = session_id
    return await super.save('events', meta)
  }
}

export default Event
