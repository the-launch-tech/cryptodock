import Model from './Model'

const { log, error } = console

class Fill extends Model {
  constructor() {
    super()
  }

  static async save({ strategy_id, session_id, event_id, meta }) {
    meta.strategy_id = strategy_id
    meta.session_id = session_id
    meta.event_id = event_id
    return await super.save('fills', meta)
  }
}

export default Fill
