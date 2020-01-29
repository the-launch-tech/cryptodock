import Model from './Model'

const { log, error } = console

class LiveFill extends Model {
  constructor() {
    super()
  }

  static async save(args) {
    return await super.save('live_fills', args)
  }
}

export default LiveFill
