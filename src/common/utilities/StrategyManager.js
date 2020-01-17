import chalk from 'chalk'
import path from 'path'
import Cron from 'node-cron'
import WebSocket from 'ws'
import querystring from 'querystring'
import { spawn } from 'child_process'
import Strategy from '../models/Strategy'
import Setting from '../models/Setting'

const { log, error } = console

class StrategyManager {
  constructor() {
    this.state = {}
    this.enabled = false
    this.uint8arrayToString = data => String.fromCharCode.apply(null, data)
    this.wss = new WebSocket.Server({ port: process.env.TRADING_SOCKET_PORT })

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
    if (
      process.env.PYTHONPATH &&
      process.env.REMOTE_DB_HOST &&
      process.env.REMOTE_PORT &&
      process.env.REMOTE_VERSION &&
      process.env.TRADING_SOCKET_HOST &&
      process.env.TRADING_SOCKET_PORT
    ) {
      this.enabled = true
    }

    if (!this.enabled) {
      return false
    }

    Strategy.getAll()
      .then(strategies => strategies.map(this.setStrategyState))
      .then(() => {
        Object.keys(this.state).map(id => {
          if (this.state[id].strategy.status === 'active') {
            this.bootShell(this.state[id])
          }
        })
      })
      .catch(error)

    this.wss.on('connection', (ws, req) => {
      const qs = querystring.parse(req.url.substr(2))

      this.state[qs.id].socket = ws

      this.state[qs.id].ticker = Cron.schedule(
        '*/10 * * * * *',
        () => this.state[qs.id].socket.send('NEXT_TICK'),
        { scheduled: false }
      )

      this.state[qs.id].socket.on('message', data => {
        data = JSON.parse(data)
        log('data', data)
        if (this.state[data.id]) {
          if (data.command === 'START_TRADING') {
            this.state[data.id].ticker.start()
          } else if (data.command === 'FINISHED_TRADING') {
            const results = data.results

            log('use results', results)

            this.state[data.id].socket.send('TRADING_RESOLVED')

            this.getAndPrepare(data.id, 'latent')
              .then(this.setStrategyState)
              .then(() => {
                if (this.state[data.id].strategy) {
                  this.deBootShell(this.state[data.id])
                }
              })
              .catch(error)
          } else if (data.command === 'ACTIVE_POLL') {
            const results = data.results
            log('use results', results)
          } else if (data.command === 'LATENT_POLL') {
            const results = data.results
            log('use results', results)
            this.deActivate()
            this.state[data.id].ticker.destroy()
          } else if (data.command === 'PING') log('\nPINGED\n')
        }
      })
    })
  }

  pollChildProcess(id) {
    if (this.state[id] && this.state[id].socket) {
      this.state[id].socket.send('POLL_TRADING')
    }
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

    if (this.state[id] && this.state[id].socket) {
      log('SENDING FINISH')
      this.state[id].ticker.destroy()
      this.state[id].socket.send('FINISH_TRADING')
    }
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

  async manage(id, status) {
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
    obj.process = spawn(process.env.PYTHONPATH, [
      path.join(obj.strategy.full_path, 'main.py'),
      process.env.REMOTE_DB_HOST,
      process.env.REMOTE_PORT,
      process.env.REMOTE_VERSION,
      process.env.TRADING_SOCKET_HOST,
      process.env.TRADING_SOCKET_PORT,
      'live',
      JSON.stringify(obj.strategy),
    ])
    obj.process.stdout.on('data', results => log(chalk.blue(this.uint8arrayToString(results))))
    obj.process.stderr.on('data', e => error(chalk.red(this.uint8arrayToString(e))))
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
