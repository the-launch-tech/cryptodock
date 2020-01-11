import React from 'react'
import { ipcRenderer } from 'electron'
import moment from 'moment'

export default class Backtester extends React.Component {
  constructor(props) {
    super(props)

    this.defaultCurrentData = {
      start: '',
      end: '',
      funds: '',
      tester: null,
    }

    this.setListeners = this.setListeners.bind(this)
    this.removeListeners = this.removeListeners.bind(this)
    this.sendForDefaults = this.sendForDefaults.bind(this)
    this.callBacktester = this.callBacktester.bind(this)
    this.onGetBacktestHistory = this.onGetBacktestHistory.bind(this)
    this.onBacktestResults = this.onBacktestResults.bind(this)
    this.onGetTesters = this.onGetTesters.bind(this)
    this.invalidInput = this.invalidInput.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleChoiceChange = this.handleChoiceChange.bind(this)
    this.toggleList = this.toggleList.bind(this)

    this.state = {
      history: [],
      lastTest: {},
      running: false,
      currentData: this.defaultCurrentData,
      visibleTests: 'HISTORICAL_TESTS',
      backtesters: [],
    }
  }

  componentDidMount() {
    this.ipcAddress = `strategyWindow-${this.props.id}.backtester`
    this.setListeners()
    this.sendForDefaults()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  setListeners() {
    ipcRenderer.once(`res--${this.ipcAddress}-HISTORY`, this.onGetBacktestHistory)
    ipcRenderer.once(`res--${this.ipcAddress}-GET_BACKTESTERS`, this.onGetTesters)
    ipcRenderer.on(`res--${this.ipcAddress}-RUN_TEST`, this.onCallBacktester)
  }

  removeListeners() {
    ipcRenderer.removeListener(`res--${this.ipcAddress}-RESULTS`, this.onBacktestResults)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-HISTORY`, this.onGetBacktestHistory)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-GET_BACKTESTERS`, this.onGetTesters)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-RUN_TEST`, this.onCallBacktester)
  }

  sendForDefaults() {
    ipcRenderer.send(`${this.ipcAddress}`, { id: 'HISTORY', data: { strategyId: this.props.id } })
    ipcRenderer.send(`${this.ipcAddress}`, { id: 'GET_BACKTESTERS' })
  }

  callBacktester(data) {
    ipcRenderer.send(`${this.ipcAddress}`, {
      id: 'RUN_TEST',
      data: { args: this.state.currentData, strategyId: this.props.id },
    })
  }

  onGetBacktestHistory(event, history) {
    this.setState({ history })
  }

  onGetTesters(event, backtesters) {
    this.setState({ backtesters })
  }

  onCallBacktester(event, isRunning) {
    this.setState({ running: isRunning }, () => {
      ipcRenderer.on(`res--${this.ipcAddress}-RESULTS`, this.onBacktestResults)
    })
  }

  onBacktestResults(event, lastTest) {
    this.setState(
      prev => ({
        history: [lastTest, ...prev.history],
        lastTest,
        running: false,
        currentData: this.defaultCurrentData,
      }),
      () => {
        ipcRenderer.removeListener(`res--${this.ipcAddress}-RESULTS`, this.onBacktestResults)
      }
    )
  }

  handleTextChange(e) {
    const name = e.target.name
    const type = e.target.type
    const value =
      type === 'datetime-local' || type === 'datetime' || type === 'date'
        ? moment(e.target.value).format('YYYY-MM-DD HH:mm:ss.SSS')
        : e.target.value
    const currentData = Object.assign({}, this.state.currentData)
    currentData[name] = value
    this.setState({ currentData })
  }

  handleChoiceChange(e) {
    let value
    const currentData = Object.assign({}, this.state.currentData)
    const name = e.target.name
    Array.from(e.target.children).map(option => {
      if (option.selected) {
        value = option.value
      }
    })
    currentData[name] = value
    this.setState({ currentData })
  }

  invalidInput() {
    const { start, end, funds } = this.state.currentData
    if (!end || !start || !funds) {
      return true
    }
    return false
  }

  toggleList(visibleTests) {
    this.setState({ visibleTests })
  }

  render() {
    const { running, currentData, backtesters, visibleTests, history, lastTest } = this.state
    return (
      <div>
        <h4 className="font-display text-red-2 cursor-default text-center">Backtester</h4>
        {!running ? (
          <div className="w-full flex flex-wrap justify-between items-start my-5">
            <div className="w-1/2 p-1 block mb-2">
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                Start Time
              </label>
              <input
                className="appearance-none block w-full bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                type="datetime-local"
                name="start"
                onChange={this.handleTextChange}
              />
            </div>
            <div className="w-1/2 p-1 block mb-2">
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                End Time
              </label>
              <input
                className="appearance-none block w-full bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                type="datetime-local"
                name="end"
                onChange={this.handleTextChange}
              />
            </div>
            <div className="w-1/2 p-1 block mb-2">
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                Starting Funds In USD
              </label>
              <input
                className="appearance-none block w-full bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                type="number"
                name="funds"
                defaultValue="5000"
                placeholder="Funds in USD"
                min="1000"
                max="1000000"
                onChange={this.handleTextChange}
              />
            </div>
            <div className="w-1/2 p-1 block mb-2">
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                Backtester Selection
              </label>
              <div className="relative">
                <select
                  className="appearance-none block w-full bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                  name="tester"
                  onChange={this.handleChoiceChange}
                  defaultValue="for_loop"
                >
                  {backtesters.map((tester, i) => (
                    <option key={i} value={tester.id}>
                      {tester.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white-850">
                  <svg
                    className="fill-white h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full p-2 block">
              <button
                className="py-2 px-3 bg-tran border-1 border-solid border-red-2 text-white rounded transition transition-200 font-head text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
                type="button"
                onClick={this.callBacktester}
                disabled={this.invalidInput()}
              >
                Run Backtest
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-wrap justify-center items-center my-5">
            <h3 className="w-full font-head text-center font-thin">Backtester Running...</h3>
            <ul>
              <li>
                Start: <b>{moment(currentData.start).format('LLLL')}</b>
              </li>
              <li>
                End: <b>{moment(currentData.end).format('LLLL')}</b>
              </li>
              <li>
                Funds: <b>{currentData.funds} (USD)</b>
              </li>
              <li>
                Type: <b>{currentData.type}</b>
              </li>
            </ul>
          </div>
        )}
        <div className="w-full flex flex-wrap justify-start items-start">
          <h5 className="w-full font-head text-center font-thin">Backtest Results</h5>
          <div className="w-full flex justify-center items-center my-2">
            <button
              className={`outline-none font-head text-green-2 font-tiny mx-3 transition-all transition-200 hover:text-green-2-400 cursor-pointer ${
                visibleTests === 'LAST_TEST'
                  ? 'text-green-2 hover:text-green-2-400'
                  : 'text-green-2-400 hover:text-green-2'
              }`}
              type="button"
              onClick={e => this.toggleList('LAST_TEST')}
            >
              Last Test
            </button>
            <button
              className={`outline-none font-head text-green-2 font-tiny mx-3 transition-all transition-200 hover:text-green-2-400 cursor-pointer ${
                visibleTests === 'HISTORICAL_TESTS'
                  ? 'text-green-2 hover:text-green-2-400'
                  : 'text-green-2-400 hover:text-green-2'
              }`}
              type="button"
              onClick={e => this.toggleList('HISTORICAL_TESTS')}
            >
              Historical Tests
            </button>
          </div>
          <div className="w-full border border-solid border-white-400 rounded p-2">
            {this.state.visibleTests === 'LAST_TEST' ? (
              <div className="font-body">
                {history && history.length ? (
                  <div></div>
                ) : (
                  <p className="font-head text-tiny text-center">No History On This Strategy</p>
                )}
              </div>
            ) : (
              <div className="font-body">
                {lastTest && Object.keys(lastTest).length ? (
                  <div></div>
                ) : (
                  <p className="font-head text-tiny text-center">
                    No Backtests Have Been Run This Session
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
