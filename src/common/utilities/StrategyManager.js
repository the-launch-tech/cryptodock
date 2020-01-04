import cron from 'node-cron'
import chalk from 'chalk'
import path from 'path'
import { spawn } from 'child_process'
import Strategy from '../models/Strategy'
import Setting from '../models/Setting'

const { log, error } = console

class StrategyManager {
  constructor() {
    this.state = {}
    this.enabled = false
    this.uint8arrayToString = data => String.fromCharCode.apply(null, data)

    const bindings = [
      'manage',
      'initialize',
      'activate',
      'deActivate',
      'getAndPrepare',
      'setStrategyState',
    ].map(i => (this[i] = this[i].bind(this)))

    this.initialize()
  }

  initialize() {
    if (process.env.PYTHON_PATH && process.env.API_PORT) {
      this.enabled = true
    }

    if (!this.enabled) {
      return false
    }

    Strategy.getAll()
      .then(strategies => strategies.map(this.setStrategyState))
      .then(() =>
        Object.keys(this.state).map(id => {
          if (this.state[id].strategy.status === 'active') {
            this.bootShell(this.state[id])
          }
        })
      )
      .catch(error)
  }

  activate(id) {
    if (!this.enabled) {
      return false
    }

    this.getAndPrepare(id, 'active')
      .then(this.setStrategyState)
      .then(() => {
        if (this.state[id].strategy) {
          this.bootShell(this.state[id])
        }
      })
      .catch(error)
  }

  deActivate(id) {
    if (!this.enabled) {
      return false
    }

    this.getAndPrepare(id, 'latent')
      .then(this.setStrategyState)
      .then(() => {
        if (this.state[id].strategy) {
          this.deBootShell(this.state[id])
        }
      })
      .catch(error)
  }

  getAndPrepare(id, status) {
    return new Promise((resolve, reject) => {
      if (!this.state[id] || !this.state[id].strategy) {
        Strategy.getOneByValue('id', id)
          .then(strategy => {
            strategy.status = status
            resolve(strategy)
          })
          .catch(reject)
      } else {
        let strategy = this.state[id].strategy
        strategy.status = status
        resolve(strategy)
      }
    })
  }

  setStrategyState(strategy) {
    if (!this.state[strategy.id]) {
      this.state[strategy.id] = {}
    }
    this.state[strategy.id].strategy = strategy
  }

  async manage(id, status, callback) {
    if (!this.enabled) {
      return false
    }

    const onStatus = {
      active: this.activate,
      latent: this.deActivate,
    }

    const action = onStatus[status]

    try {
      await action(id)
      return status
    } catch (e) {
      error(e)
    }
  }

  bootShell(obj) {
    if (obj.process && !obj.process.killed) {
      this.deBootShell(obj)
    }
    obj.process = spawn(process.env.PYTHON_PATH, [
      path.join(obj.strategy.full_path, 'main.py'),
      process.env.API_PORT,
    ])
    obj.process.stdout.on('data', data => log(chalk.blue(this.uint8arrayToString(data))))
    obj.process.stderr.on('data', data => log(chalk.red(this.uint8arrayToString(data))))
    obj.process.on('exit', code => log(chalk.gray('Process quit with code : ' + code)))
  }

  deBootShell(obj) {
    if (obj && obj.process) {
      obj.process.kill('SIGHUP')
    }
  }

  async pauseAll() {
    await Object.keys(this.state).map(id => this.deBootShell(this.state[id]))
  }
}

export default StrategyManager
