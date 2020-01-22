import Model from './Model'

const { log, error } = console

class Strategy extends Model {
  constructor() {
    super()
  }

  static async getAll() {
    return await super.getAll('strategies')
  }

  static async getOneByFieldValue(args) {
    return await super.getOneByFieldValue('strategies', args)
  }

  static async updateOneFieldValue(args) {
    return await super.updateOneFieldValue('strategies', args)
  }

  static async delete(args) {
    return await super.delete('strategies', args)
  }

  static async save(args) {
    return await super.save('strategies', args)
  }

  static async update(args) {
    return await super.update('strategies', args)
  }
}

export default Strategy
