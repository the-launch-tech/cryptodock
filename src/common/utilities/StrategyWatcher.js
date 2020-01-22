import Hound from 'hound'
import moment from 'moment'
import Strategy from '../models/Strategy'
import Logger from '../models/Log'

const { log, error } = console

export default class StrategyWatcher {
  constructor() {
    this.strategies = {}

    this.getStrategies = this.getStrategies.bind(this)
    this.addNewStrategy = this.addNewStrategy.bind(this)
    this.removeOldStrategy = this.removeOldStrategy.bind(this)
    this.setStrategy = this.setStrategy.bind(this)
    this.setWatchers = this.setWatchers.bind(this)
    this.watchStrategy = this.watchStrategy.bind(this)
    this.updateTime = this.updateTime.bind(this)

    this.getStrategies()
  }

  getStrategies() {
    Strategy.getAll()
      .then(strategies => strategies.map(this.setStrategy))
      .then(this.setWatchers)
      .catch(error)
  }

  addNewStrategy(id) {
    if (this.strategies[id]) return

    Strategy.getOneByValue('id', id)
      .then(this.setStrategy)
      .then(this.watchStrategy)
      .catch(error)
  }

  removeOldStrategy(id) {
    if (!this.strategies[id]) return
    this.strategies[id].watcher.clear()
    delete this.strategies[id]
  }

  setStrategy(strategy) {
    this.strategies[strategy.id] = {
      strategy,
      watcher: Hound.watch(strategy.full_path),
    }
    return this.strategies[strategy.id]
  }

  setWatchers() {
    Object.keys(this.strategies).map(key => this.watchStrategy(this.strategies[key]))
  }

  watchStrategy(obj) {
    obj.watcher.on('create', file => this.updateTime(obj, 'created', file))
    obj.watcher.on('change', file => this.updateTime(obj, 'changed', file))
    obj.watcher.on('delete', file => this.updateTime(obj, 'deleted', file))
  }

  updateTime({ watcher, strategy }, action, file) {
    const updated = moment()
      .local()
      .format('YYYY-MM-DD HH:mm:ss.SSS')

    Logger.save({ message: `${file} ${action} for ${strategy.label} at ${updated}` })
      .then(() => Strategy.fileUpdated({ id: strategy.id, updated }))
      .then(() => {
        if (action === 'deleted') {
          watcher.unwatch(file)
        }
      })
      .catch(error)
  }
}
