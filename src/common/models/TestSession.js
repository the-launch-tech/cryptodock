import Model from './Model'

const { log, error } = console

class TestSession extends Model {
  constructor() {
    super()
  }

  static async getAll() {
    return await super.getAll('test_sessions')
  }

  static async getByFieldValue(args) {
    return await super.getByFieldValue('test_sessions', args)
  }

  static async save(args) {
    return await super.save('test_sessions', args)
  }

  static async update({ meta, test_session_id }) {
    return await super.update('test_sessions', {
      label: meta.label,
      custom: meta.custom,
      start_time: meta.start_time,
      end_time: meta.end_time,
      granularity: meta.granularity,
      start_funds: meta.start_funds,
      end_funds: meta.end_funds,
      description: meta.description,
      completed: meta.completed,
      id: test_session_id,
    })
  }
}

export default TestSession
