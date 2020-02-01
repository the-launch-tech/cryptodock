import React from 'react'
import { ipcRenderer } from 'electron'
import { bindings, commands } from './utils'

const { log, error } = console

export default class Suite extends React.Component {
  constructor(props) {
    super(props)

    bindings.map(i => (this[i] = this[i].bind(this)))

    this.state = {
      command: '',
      valid: false,
      strategy: {},
    }
  }

  componentDidMount() {
    this.ipcAddress_strategy = `strategyWindow-${this.props.id}.strategy`
    this.ipcAddress = `strategyWindow-${this.props.id}.suite`
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
  }

  setListeners() {
    ipcRenderer.on(`res--${this.ipcAddress_strategy}-DETAILS`, this.onGetStrategyById)
    ipcRenderer.on(`res--${this.ipcAddress}-RUN_SUITE`, () => {})
  }

  removeListeners() {
    ipcRenderer.removeListener(`res--${this.ipcAddress_strategy}-DETAILS`, this.onGetStrategyById)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-RUN_SUITE`, this.onRunSuite)
  }

  handleTextChange(e) {
    this.setState({ command: e.target.value }, () => {
      this.setState({ valid: this.state.command && this.state.command.length > 0 })
    })
  }

  invalidInput() {
    return !this.state.valid
  }

  runSuite(e) {
    ipcRenderer.send(`${this.ipcAddress}`, {
      id: 'RUN_SUITE',
      data: { strategy: this.state.strategy, command: this.state.command },
    })
  }

  onGetStrategyById(event, strategy) {
    this.setState({ strategy })
  }

  onRunSuite(event, args) {
    log('Ran Suite Command')
  }

  render() {
    return (
      <div>
        <h4 className="font-display text-red-2 cursor-default text-center">Suite</h4>
        <p className="font-body font-hairline text-tiny text-gray-0 my-5 text-center">
          The Suite package in the CryptoDock Bootstrap framework is used to easily built and run
          tests using collected results and meta data. Select from the provided commands, or extend
          the base CryptoDockSuite class to create your own commands. These commands can open Pandas
          DataFrames or return results.
        </p>
        <div>
          <div className="w-full block pl-2 pr-2 mt-1 mb-1">
            <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
              Suite Command
            </label>
            <input
              className="w-full appearance-none font-body block bg-tran text-white-850 border border-gray-1-400 transition-all transition-100 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
              type="text"
              name="suite_command"
              defaultValue="TEST_COMMAND"
              placeholder="Provide a command for your Suite"
              onChange={this.handleTextChange}
            />
          </div>
          <div className="w-full p-2 flex justify-center items-center">
            <button
              className="py-2 px-3 bg-tran border-1 border-solid border-red-2 text-white rounded transition transition-100 font-head text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
              type="button"
              onClick={this.runSuite}
              disabled={this.invalidInput()}
            >
              Run Suite Command
            </button>
          </div>
        </div>
        <div className="border border-solid border-white-400 rounded-lg py-2 px-5 mt-5">
          <h6 className="font-head text-green-2 text-center">Provided Commands</h6>
          <ul>
            {commands.map((command, i) => (
              <li key={i} className="my-2">
                <strong className="font-head text-tiny text-gray-0">{command.command}</strong>
                <p className="pl-5 font-body text-tiny font-hairline text-hairline text-gray-0">
                  {command.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
