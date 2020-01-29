import Model from './Model'

const { log, error } = console

class LiveSignal extends Model {
  constructor() {
    super()
  }

  static async save(args) {
    return await super.save('live_signals', args)
  }
}

export default LiveSignal
