import Model from './Model'

const { log, error } = console

class Order extends Model {
  constructor() {
    super()
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('orders', args)
  }

  static async save({ strategy_id, session_id, event_id, meta }) {
    meta.strategy_id = strategy_id
    meta.session_id = session_id
    meta.event_id = event_id
    return await super.save('orders', meta)
  }
}

export default Order
