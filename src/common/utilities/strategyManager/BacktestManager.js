import WebSocket from 'ws'
import path from 'path'
import Strategy from '../../models/Strategy'
import Session from '../../models/Session'
import Event from '../../models/Event'
import Order from '../../models/Order'
import { bindings, isEnabled } from './utils'
import { bootShell, deBootShell } from './process'
import websocketConnection from './websocketConnection'
import portInUse from '../../helpers/portInUse'

const { log, error } = console

export default class BacktestManager {
  constructor() {
    this.state = {}
    this.enabled = false

    portInUse(process.env.BACKTEST_SOCKET_PORT, inUse => {
      if (!inUse) {
        this.wss = new WebSocket.Server({ port: process.env.BACKTEST_SOCKET_PORT })

        bindings.map(i => (this[i] = this[i].bind(this)))

        this.initialize()
      }
    })
  }

  initialize() {
    this.enabled = isEnabled('backtest')

    if (!this.enabled) {
      return false
    }

    Strategy.getAll()
      .then(strategies => strategies.map(this.setStrategyState))
      .catch(error)

    this.wss.on('connection', (ws, req) =>
      websocketConnection({
        ws,
        req,
        state: this.state,
        reducer: {
          START_TRADING: this.onStartTrading,
          FINISHED_TRADING: this.onFinishedTrading,
          PING: this.onHeartbeat,
        },
      })
    )
  }

  setStrategyState(strategy) {
    if (!this.state[strategy.id]) {
      this.state[strategy.id] = {}
    }
    this.state[strategy.id].strategy = strategy
    return this.state[strategy.id].strategy
  }

  bootStrategyById(id) {
    if (this.state[id].strategy && this.state[id].strategy.backtest_status === 'active') {
      bootShell(this.state[id], [
        path.join(this.state[id].strategy.full_path, '/strategy/entry.py'),
        process.env.REMOTE_DB_HOST,
        process.env.REMOTE_PORT,
        process.env.REMOTE_VERSION,
        process.env.BACKTEST_SOCKET_HOST,
        process.env.BACKTEST_SOCKET_PORT,
        'backtest',
        JSON.stringify(this.state[id].strategy),
        this.state[id].args.label,
        this.state[id].args.description,
        this.state[id].args.funds,
        this.state[id].args.granularity,
        this.state[id].args.start,
        this.state[id].args.end,
      ])
    }
  }

  deBootStrategyById(id) {
    if (this.state[id].strategy) {
      this.state[id].socket.close()
      deBootShell(this.state[id])
    }
  }

  onStartTrading({ id, message }) {
    Session.save({ strategy_id: id, backtest: true })
      .then(session_id => {
        this.state[id].session = {
          id: session_id,
        }
        Event.save({
          strategy_id: id,
          session_id: this.state[id].session.id,
          message: message[0],
          meta: message[1],
        })
          .then(() => this.state[id].ticker.start())
          .catch(error)
      })
      .catch(error)
  }

  onHeartbeat({ id, message }) {
    Event.save({
      strategy_id: id,
      session_id: this.state[id].session.id,
      message: message[0],
      meta: message[1],
    })
      .then(event_id => {
        const args = {
          strategy_id: id,
          session_id: this.state[id].session.id,
          event_id,
          meta: message[2],
        }
        if (message[0] === 'SIGNAL_QUEUED') {
          Signal.save(args).catch(error)
        } else if (message[0] === 'ORDER_PLACED') {
          Order.save(args).catch(error)
        } else if (message[0] === 'ORDER_FILLED') {
          Fill.save(args).catch(error)
        }
      })
      .catch(error)
  }

  onFinishedTrading({ id, message }) {
    Event.save({
      strategy_id: id,
      session_id: this.state[id].session.id,
      message: message[0],
      meta: message[1],
    })
      .then(res =>
        Session.update({
          session_id: this.state[id].session.id,
          meta: message[2],
        })
      )
      .then(() => {
        this.state[id].socket.send('TRADING_RESOLVED')
        this.getAndPrepare(id, 'latent')
          .then(() => this.deBootStrategyById(id))
          .catch(error)
      })
      .catch(error)
  }

  async getAndPrepare(id, status, args) {
    if (this.state[id] && this.state[id].strategy) {
      this.state[id].strategy.backtest_status = status
      if (args) {
        this.state[id].args = args
      }
      return this.state[id]
    } else {
      const strategy = await Strategy.getOneByFieldValue({ key: 'id', value: id })
      try {
        if (!this.state[id]) {
          this.state[id] = {}
        }
        this.state[id].strategy = strategy
        if (args) {
          this.state[id].args = args
        }
        return this.state[id]
      } catch (e) {
        error(e)
      }
    }
  }

  activateSession(id, args, callback) {
    if (!this.enabled) {
      return false
    }

    this.getAndPrepare(id, 'active', args)
      .then(() => this.bootStrategyById(id))
      .then(() => callback())
  }

  deActivateSession(id, args, callback) {
    if (!this.enabled) {
      return false
    }

    if (this.state[id] && this.state[id].socket) {
      this.state[id].ticker.destroy()
      this.state[id].socket.send('FINISH_TRADING')
    }

    callback()
  }

  manage(id, status, args, callback) {
    if (!this.enabled) {
      return false
    }

    const onStatus = {
      active: this.activateSession,
      latent: this.deActivateSession,
    }

    try {
      const action = onStatus[status]
      action(id, args, callback)
    } catch (e) {
      error(e)
    }
  }

  deleteStrategy(id) {
    delete this.state[id]
  }
}
