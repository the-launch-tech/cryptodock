import Model from './Model'

const { log, error } = console

class TestOrder extends Model {
  constructor() {
    super()
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('test_orders', args)
  }

  static async save(args) {
    return await super.save('test_orders', args)
  }
}

export default TestOrder
