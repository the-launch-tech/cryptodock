import React from 'react'
import { ipcRenderer } from 'electron'
import moment from 'moment'
import PaneToggle from './PaneToggle'
import NewPane from './New/NewPane'
import HistoricalPane from './Historical/HistoricalPane'
import { bindings, defaultCurrentData } from './utils'

const { log, error } = console

export default class Backtester extends React.Component {
  constructor(props) {
    super(props)

    bindings.map(i => (this[i] = this[i].bind(this)))

    this.state = {
      id: null,
      type: null,
      strategy: null,
      history: [],
      currentData: defaultCurrentData,
      visibleView: 'NEW_TEST',
    }
  }

  componentDidMount() {
    this.ipcAddress_strategy = `strategyWindow-${this.props.id}.strategy`
    this.ipcAddress = `strategyWindow-${this.props.id}.backtester`
    this.setState({ id: this.props.id, type: this.props.type }, () => {
      this.setListeners()
      this.sendForDefaults()
    })
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  sendForDefaults() {
    ipcRenderer.send(`${this.ipcAddress_strategy}`, {
      id: 'DETAILS',
      data: { id: this.props.id },
    })
    ipcRenderer.send(`${this.ipcAddress}`, {
      id: 'RECENT_BY_ID',
      data: { id: this.props.id, backtest: true, after: 30 },
    })
  }

  setListeners() {
    ipcRenderer.on(`res--${this.ipcAddress_strategy}-DETAILS`, this.onGetStrategyById)
    ipcRenderer.once(`res--${this.ipcAddress}-RECENT_BY_ID`, this.onGetBacktestHistory)
    ipcRenderer.on(`res--${this.ipcAddress}-TOGGLE_ACTIVATION`, this.onToggleActivation)
  }

  removeListeners() {
    ipcRenderer.removeListener(`res--${this.ipcAddress_strategy}-DETAILS`, this.onGetStrategyById)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-RECENT_BY_ID`, this.onGetBacktestHistory)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-TOGGLE_ACTIVATION`, this.onToggleActivation)
  }

  toggleActivation(e) {
    this.updateField(
      'backtest_status',
      this.state.strategy.backtest_status === 'active' ? 'latent' : 'active',
      () => {
        const data = Object.assign({}, this.state.currentData)
        data.id = this.props.id
        data.backtest_status = this.state.strategy.backtest_status
        ipcRenderer.send(`${this.ipcAddress}`, {
          id: 'TOGGLE_ACTIVATION',
          data: {
            id: this.props.id,
            backtest_status: this.state.strategy.backtest_status,
            data,
          },
        })
      }
    )
  }

  onToggleActivation(event, args) {
    this.setState({ currentData: defaultCurrentData })
  }

  onGetStrategyById(event, strategy) {
    this.setState({ strategy })
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

  onGetBacktestHistory(event, history) {
    this.setState({ history })
  }

  handleTextChange(e) {
    const type = e.target.type
    const currentData = Object.assign({}, this.state.currentData)
    currentData[e.target.name] =
      type === 'datetime-local' || type === 'datetime' || type === 'date'
        ? moment(e.target.value).format('YYYY-MM-DD HH:mm:ss.SSS')
        : e.target.value
    this.setState({ currentData })
  }

  handleChoiceChange(e) {
    const currentData = Object.assign({}, this.state.currentData)
    currentData[e.target.name] = e.target.checked
    this.setState({ currentData })
  }

  invalidInput() {
    const { start, end, funds, granularity, description, label } = this.state.currentData
    if (!end || !start || !funds || !granularity || !description || !label) {
      return true
    }
    return false
  }

  render() {
    const { currentData, visibleView, history, strategy } = this.state
    return (
      <div>
        <h4 className="font-display text-red-2 cursor-default text-center">Backtester</h4>
        <PaneToggle
          visibleView={visibleView}
          toggleView={visibleView => this.setState({ visibleView })}
        />
        <div className="flex justify-center items-center mt-5">
          {visibleView === 'NEW_TEST' ? (
            <NewPane
              strategy={strategy}
              handleTextChange={this.handleTextChange}
              handleChoiceChange={this.handleChoiceChange}
              toggleActivation={this.toggleActivation}
              invalidInput={this.invalidInput}
              currentData={currentData}
            />
          ) : (
            <HistoricalPane history={history} />
          )}
        </div>
      </div>
    )
  }
}
