import Model from './Model'

const { log, error } = console

class TestOrder extends Model {
  constructor() {
    super()
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('test_orders', args)
  }

  static async save({ meta, strategy_id, test_session_id, test_event_id }) {
    return await super.save('test_orders', {
      pair: meta.pair,
      exchange: meta.exchange,
      quantity: meta.quantity,
      direction: meta.direction,
      order_type: meta.order_type,
      strategy_id,
      test_session_id,
      test_event_id,
    })
  }
}

export default TestOrder
