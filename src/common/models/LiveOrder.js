import Model from './Model'

const { log, error } = console

class LiveOrder extends Model {
  constructor() {
    super()
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('live_orders', args)
  }

  static async save({ meta, strategy_id, live_session_id }) {
    return await super.save('live_orders', {
      pair: meta.pair,
      exchange: meta.exchange,
      quantity: meta.quantity,
      direction: meta.direction,
      order_type: meta.order_type,
      strategy_id,
      live_session_id,
    })
  }
}

export default LiveOrder
