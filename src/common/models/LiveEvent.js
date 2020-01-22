import Model from './Model'

const { log, error } = console

class LiveEvent extends Model {
  constructor() {
    super()
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('live_events', args)
  }

  static async save(args) {
    return await super.save('live_events', args)
  }
}

export default LiveEvent
