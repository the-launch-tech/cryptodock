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
      session: {},
      currentData: defaultCurrentData,
      visibleTests: 'HISTORICAL_TESTS',
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
    ipcRenderer.send(`${this.ipcAddress}`, { id: 'HISTORY', data: { strategyId: this.props.id } })
  }

  setListeners() {
    ipcRenderer.on(`res--${this.ipcAddress_strategy}-DETAILS`, this.onGetStrategyById)
    ipcRenderer.once(`res--${this.ipcAddress}-HISTORY`, this.onGetBacktestHistory)
    ipcRenderer.on(`res--${this.ipcAddress}-TOGGLE_ACTIVATION`, () => {})
    ipcRenderer.on(`res--${this.ipcAddress}-BACKTEST_RESULTS`, this.onGetBacktestResults)
  }

  removeListeners() {
    ipcRenderer.removeListener(`res--${this.ipcAddress_strategy}-DETAILS`, this.onGetStrategyById)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-HISTORY`, this.onGetBacktestHistory)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-TOGGLE_ACTIVATION`, () => {})
    ipcRenderer.removeListener(
      `res--${this.ipcAddress}-BACKTEST_RESULTS`,
      this.onGetBacktestResults
    )
  }

  toggleActivation(e) {
    this.updateField(
      'backtester_status',
      this.state.strategy.backtester_status === 'active' ? 'latent' : 'active',
      () => {
        const data = this.state.currentData
        data.id = this.props.id
        data.backtester_status = this.state.strategy.backtester_status
        ipcRenderer.send(`${this.ipcAddress}`, {
          id: 'TOGGLE_ACTIVATION',
          data: {
            id: this.props.id,
            backtester_status: this.state.strategy.backtester_status,
            data,
          },
        })
      }
    )
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

  onGetBacktestResults(event, results) {
    this.setState(prev => ({
      history: [results, ...prev.history],
      session: [results, ...prev.session],
      active: false,
      currentData: defaultCurrentData,
    }))
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
    const { currentData, visibleTests, visibleView, history, session, strategy } = this.state
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
            <HistoricalPane
              visibleTests={visibleTests}
              toggleList={visibleTests => this.setState({ visibleTests })}
              history={history}
              session={session}
            />
          )}
        </div>
      </div>
    )
  }
}
