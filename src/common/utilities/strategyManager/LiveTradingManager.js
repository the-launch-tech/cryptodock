import WebSocket from 'ws'
import path from 'path'
import Strategy from '../../models/Strategy'
import LiveSession from '../../models/LiveSession'
import LiveEvent from '../../models/LiveEvent'
import LiveOrder from '../../models/LiveOrder'
import { bindings, isEnabled } from './utils'
import { bootShell, deBootShell } from './process'
import websocketConnection from './websocketConnection'
import portInUse from '../../helpers/portInUse'

const { log, error } = console

export default class LiveTradingManager {
  constructor() {
    this.state = {}
    this.enabled = false

    portInUse(process.env.TRADING_SOCKET_PORT, inUse => {
      if (!inUse) {
        this.wss = new WebSocket.Server({ port: process.env.TRADING_SOCKET_PORT })

        bindings.map(i => (this[i] = this[i].bind(this)))

        this.initialize()
      } else {
        log('PORT IN USE', process.env.BACKTEST_SOCKET_PORT)
      }
    })
  }

  initialize() {
    this.enabled = isEnabled('live')

    if (!this.enabled) {
      return false
    }

    Strategy.getAll()
      .then(strategies => strategies.map(this.setStrategyState))
      .then(() => Object.keys(this.state).map(this.bootStrategyById))
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
          LOG_MESSAGE: this.onLogMessage,
        },
      })
    )
  }

  setStrategyState(strategy) {
    if (!this.state[strategy.id]) {
      this.state[strategy.id] = {}
    }
    this.state[strategy.id].strategy = strategy
    return this.state[strategy.id]
  }

  bootStrategyById(id) {
    if (this.state[id].strategy && this.state[id].strategy.status === 'active') {
      bootShell(this.state[id], [
        path.join(this.state[id].strategy.full_path, '/strategy/app.py'),
        process.env.REMOTE_DB_HOST,
        process.env.REMOTE_PORT,
        process.env.REMOTE_VERSION,
        process.env.TRADING_SOCKET_HOST,
        process.env.TRADING_SOCKET_PORT,
        'live',
        JSON.stringify(this.state[id].strategy),
      ])
    }
  }

  deBootStrategyById(id) {
    if (this.state[id].strategy) {
      this.state[id].socket.close()
      deBootShell(this.state[id])
    }
  }

  onStartTrading({ id }) {
    LiveSession.save({ strategy_id: id })
      .then(live_session_id => {
        this.state[id].live_session = {
          id: live_session_id,
        }
        LiveEvent.save({
          strategy_id: id,
          live_session_id: this.state[id].live_session.id,
          message: 'Trading Started',
        })
          .then(() => this.state[id].ticker.start())
          .catch(error)
      })
      .catch(error)
  }

  onHeartbeat({ id, message }) {
    LiveEvent.save({
      strategy_id: id,
      live_session_id: this.state[id].live_session.id,
      message: message[0],
    })
      .then(() => {
        if (message[0] === 'ORDER_SUCCESS') {
          LiveOrder.save({
            strategy_id: id,
            live_session_id: this.state[id].live_session.id,
            meta: message[1],
          }).catch(error)
        }
      })
      .catch(error)
  }

  onFinishedTrading({ id, meta }) {
    LiveSession.update({
      strategy_id: id,
      live_session_id: this.state[id].live_session.id,
      meta,
    })
      .then(res =>
        LiveEvent.save({
          strategy_id: id,
          live_session_id: this.state[id].live_session.id,
          message: 'Trading Finished',
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

  onLogMessage({ id, message }) {
    LiveEvent.save({
      strategy_id: id,
      live_session_id: this.state[id].live_session.id,
      message,
    })
      .then(() => log('Log Message Saved'))
      .catch(error)
  }

  async getAndPrepare(id, status) {
    if (this.state[id] && this.state[id].strategy) {
      this.state[id].strategy.status = status
      return this.state[id]
    } else {
      const strategy = await Strategy.getOneByFieldValue({ key: 'id', value: id })
      try {
        return this.setStrategyState(strategy)
      } catch (e) {
        error(e)
      }
    }
  }

  activateSession(id, callback) {
    if (!this.enabled) {
      return false
    }

    this.getAndPrepare(id, 'active')
      .then(() => this.bootStrategyById(id))
      .then(() => callback())
  }

  deActivateSession(id, callback) {
    if (!this.enabled) {
      return false
    }

    if (this.state[id] && this.state[id].socket) {
      this.state[id].ticker.destroy()
      this.state[id].socket.send('FINISH_TRADING')
    }

    callback()
  }

  manage(id, status, callback) {
    if (!this.enabled) {
      return false
    }

    const onStatus = {
      active: this.activateSession,
      latent: this.deActivateSession,
    }

    try {
      const action = onStatus[status]
      action(id, callback)
    } catch (e) {
      error(e)
    }
  }

  deleteStrategy(id) {
    delete this.state[id]
  }
}
