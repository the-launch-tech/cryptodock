import Model from './Model'

const { log, error } = console

class TestFill extends Model {
  constructor() {
    super()
  }

  static async save(args) {
    return await super.save('test_fills', args)
  }
}

export default TestFill
