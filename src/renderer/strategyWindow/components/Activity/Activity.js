import React from 'react'
import { ipcRenderer } from 'electron'
import Meta from './Meta'
import RecentActivity from './RecentActivity'
import { bindings } from './utils'

const { log, error } = console

export default class Activity extends React.Component {
  constructor(props) {
    super(props)

    bindings.map(i => (this[i] = this[i].bind(this)))

    this.state = { id: null, type: null, strategy: null }
  }

  componentDidMount() {
    this.ipcAddress = `strategyWindow-${this.props.id}.strategy`
    this.setState({ id: this.props.id, type: this.props.type }, () => {
      this.setListeners()
      this.sendForDefaults()
    })
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  sendForDefaults() {
    ipcRenderer.send(`${this.ipcAddress}`, {
      id: 'DETAILS',
      data: { id: this.state.id },
    })
  }

  setListeners() {
    ipcRenderer.on(`res--${this.ipcAddress}-DETAILS`, this.onGetStrategyById)
    ipcRenderer.on(`res--${this.ipcAddress}-TOGGLE_ACTIVATION`, this.onToggleActivation)
  }

  removeListeners() {
    ipcRenderer.removeListener(`res--${this.ipcAddress}-DETAILS`, this.onGetStrategyById)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-TOGGLE_ACTIVATION`, this.onToggleActivation)
  }

  toggleActivation(e) {
    this.updateField(
      'status',
      this.state.strategy.status === 'active' ? 'latent' : 'active',
      () => {
        ipcRenderer.send(`${this.ipcAddress}`, {
          id: 'TOGGLE_ACTIVATION',
          data: {
            id: this.props.id,
            status: this.state.strategy.status,
          },
        })
      }
    )
  }

  onToggleActivation(event, arg) {
    log('Activation Toggled: ', arg)
  }

  onGetStrategyById(event, strategy) {
    this.setState({ strategy }, () => {
      log('onGetStrategyById', this.state.strategy)
    })
  }

  updateField(name, value, callback = null) {
    if (!value) {
      return false
    }

    const strategy = Object.assign({}, this.state.strategy)
    strategy[name] = value
    this.setState({ strategy }, () => {
      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  render() {
    const { strategy } = this.state
    return (
      <div>
        {strategy && <Meta strategy={strategy} toggleActivation={this.toggleActivation} />}
        <RecentActivity strategy={strategy} />
      </div>
    )
  }
}
