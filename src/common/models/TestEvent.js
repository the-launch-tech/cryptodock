import Model from './Model'

const { log, error } = console

class TestEvent extends Model {
  constructor() {
    super()
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('test_events', args)
  }

  static async save(args) {
    return await super.save('test_events', args)
  }
}

export default TestEvent
