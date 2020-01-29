import Model from './Model'

const { log, error } = console

class TestSignal extends Model {
  constructor() {
    super()
  }

  static async save(args) {
    return await super.save('test_signals', args)
  }
}

export default TestSignal
