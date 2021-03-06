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

    this.state = { id: null, type: null, strategy: null, recent: null, sessionLabel: null }
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
    ipcRenderer.send(`strategyWindow-${this.props.id}.activity`, {
      id: 'RECENT_BY_ID',
      data: { id: this.state.id, after: 86400 * 10 },
    })
  }

  setListeners() {
    ipcRenderer.on(`res--${this.ipcAddress}-DETAILS`, this.onGetStrategyById)
    ipcRenderer.on(`res--${this.ipcAddress}-TOGGLE_ACTIVATION`, this.onToggleActivation)
    ipcRenderer.on(`res--strategyWindow-${this.props.id}.activity-RECENT_BY_ID`, this.onGetRecent)
  }

  removeListeners() {
    ipcRenderer.removeListener(`res--${this.ipcAddress}-DETAILS`, this.onGetStrategyById)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-TOGGLE_ACTIVATION`, this.onToggleActivation)
    ipcRenderer.removeListener(
      `res--strategyWindow-${this.props.id}.activity-RECENT_BY_ID`,
      this.onGetRecent
    )
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
            label: this.state.sessionLabel,
          },
        })
      }
    )
  }

  onToggleActivation(event, arg) {
    this.setState({ sessionLabel: null })
  }

  onGetStrategyById(event, strategy) {
    this.setState({ strategy })
  }

  onGetRecent(event, recent) {
    this.setState({ recent })
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

  handleTextChange(e) {
    this.setState({ sessionLabel: e.target.value })
  }

  render() {
    const { strategy, recent, sessionLabel } = this.state
    return (
      <div>
        {strategy && (
          <Meta
            strategy={strategy}
            toggleActivation={this.toggleActivation}
            handleTextChange={this.handleTextChange}
            sessionLabel={sessionLabel}
          />
        )}
        <RecentActivity strategy={strategy} recent={recent} />
      </div>
    )
  }
}
