import Model from './Model'

const { log, error } = console

class Log extends Model {
  constructor() {
    super()
  }

  static async save(args) {
    return await super.save('logs', args)
  }
}

export default Log
