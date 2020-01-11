import React from 'react'
import { ipcRenderer } from 'electron'

export default class Backtesters extends React.Component {
  constructor(props) {
    super(props)

    this.defaultData = {
      name: '',
      label: '',
      description: '',
      remote_host: '',
      remote_path: '',
      remote_entry: '',
    }

    this.setListeners = this.setListeners.bind(this)
    this.sendForDefaults = this.sendForDefaults.bind(this)
    this.removeListeners = this.removeListeners.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.invalidData = this.invalidData.bind(this)
    this.saveBacktester = this.saveBacktester.bind(this)
    this.clearData = this.clearData.bind(this)
    this.onGetTesters = this.onGetTesters.bind(this)

    this.state = {
      backtesters: [],
      newBacktester: this.defaultData,
    }
  }

  componentDidMount() {
    this.ipcAddress = `mainWindow.backtester`
    this.setListeners()
    this.sendForDefaults()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  setListeners() {
    ipcRenderer.once(`res--${this.ipcAddress}-GET_BACKTESTERS`, this.onGetTesters)
    ipcRenderer.on(`res--${this.ipcAddress}-SAVE_BACKTESTER`, this.onGetTesters)
  }

  removeListeners() {
    ipcRenderer.removeListener(`res--${this.ipcAddress}-GET_BACKTESTERS`, this.onGetTesters)
    ipcRenderer.removeListener(`res--${this.ipcAddress}-SAVE_BACKTESTER`, this.onGetTesters)
  }

  sendForDefaults() {
    ipcRenderer.send(`${this.ipcAddress}`, { id: 'GET_BACKTESTERS' })
  }

  onGetTesters(event, backtesters) {
    this.setState({ backtesters })
  }

  onSaveBacktester(event, backtester) {
    if (backtester) {
      this.setState({ backtesters: [backtester, ...backtesters], newBacktester: this.defaultData })
    }
  }

  saveBacktester() {
    ipcRenderer.send(`${this.ipcAddress}`, {
      id: 'SAVE_BACKTESTER',
      data: this.state.newBacktester,
    })
  }

  handleTextChange(e) {
    const name = e.target.name
    const value = e.target.value
    const newBacktester = Object.assign({}, this.state.newBacktester)
    newBacktester[name] = value
    this.setState({ newBacktester })
  }

  invalidData() {
    let invalid = false
    Object.keys(this.state.newBacktester).map(key => {
      const el = this.state.newBacktester[key]
      if (!el || el.length < 1) {
        invalid = true
      }
    })
    return invalid
  }

  clearData() {
    this.setState({ newBacktester: this.defaultData })
  }

  render() {
    const { backtesters } = this.state

    return (
      <div>
        <h4 className="font-display text-red-2 cursor-default text-center">Backtesters</h4>
        <div className="my-5">
          <h6 className="font-head text-center font-thin">Current Backtesters</h6>
          <div className="my-2 border border-solid border-white-400 rounded-lg py-2 px-2">
            {backtesters &&
              backtesters.map((tester, i) => (
                <div key={i} className="relative block my-2 px-4 py-2 bg-gray-3-400 rounded">
                  <label className="mb-2 block font-head text-red-2">
                    {tester.label}{' '}
                    <pre className="inline-block text-tiny text-gray-1">{tester.name}</pre>
                  </label>
                  <p className="font-body text-tiny text-gray-1 font-hairline">
                    {tester.description}
                  </p>
                  <ul className="mt-2">
                    <li className="font-head text-tiny text-gray-1">
                      Remote Host:{' '}
                      <pre className="ml-2 inline-block text-tiny m-0 text-yellow-2">
                        {tester.remote_host}
                      </pre>
                    </li>
                    <li className="font-head text-tiny text-gray-1">
                      Remote Path:{' '}
                      <pre className="ml-2 inline-block text-tiny m-0 text-yellow-2">
                        {tester.remote_path.length > 50
                          ? tester.remote_path.substr(0, 50) + '...'
                          : tester.remote_path}
                      </pre>
                    </li>
                    <li className="font-head text-tiny text-gray-1">
                      Remote Entry:{' '}
                      <pre className="ml-2 inline-block text-tiny m-0 text-yellow-2">
                        {tester.remote_entry}
                      </pre>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </div>
        <div className="my-6">
          <h6 className="font-head text-center font-thin">Bootstrap New Backtester</h6>
          <div className="w-full flex flex-wrap justify-between items-start my-2">
            <div className="w-1/2 p-1 block mb-2">
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                Name
              </label>
              <input
                className="appearance-none block w-full bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                type="text"
                name="name"
                onChange={this.handleTextChange}
              />
            </div>
            <div className="w-1/2 p-1 block mb-2">
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                Label
              </label>
              <input
                className="appearance-none block w-full bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                type="text"
                name="label"
                onChange={this.handleTextChange}
              />
            </div>
            <div className="w-full p-1 block mb-2">
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                Description
              </label>
              <input
                className="appearance-none block w-full bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                type="text"
                name="description"
                onChange={this.handleTextChange}
              />
            </div>
            <div className="w-1/3 p-1 block mb-2">
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                Remote Host
              </label>
              <input
                className="appearance-none block w-full bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                type="text"
                name="remote_host"
                onChange={this.handleTextChange}
              />
            </div>
            <div className="w-1/3 p-1 block mb-2">
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                Remote Path
              </label>
              <input
                className="appearance-none block w-full bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                type="text"
                name="remote_path"
                onChange={this.handleTextChange}
              />
            </div>
            <div className="w-1/3 p-1 block mb-2">
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                Remote Entry
              </label>
              <input
                className="appearance-none block w-full bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                type="text"
                name="remote_entry"
                onChange={this.handleTextChange}
              />
            </div>
            <div className="w-full p-2 flex justify-between items-center">
              <button
                className="py-2 px-3 bg-tran border-1 border-solid border-red-2 text-white rounded transition transition-200 font-head text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
                type="button"
                onClick={this.saveBacktester}
                disabled={this.invalidData()}
              >
                Bootstrap
              </button>
              <button
                className="py-2 px-3 bg-tran border-1 border-solid border-red-2 text-white rounded transition transition-200 font-head text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
                type="button"
                onClick={this.clearData}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
