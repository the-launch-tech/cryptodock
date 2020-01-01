import React from 'react'
import { Link } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import moment from 'moment'

class Strategies extends React.Component {
  constructor(props) {
    super(props)

    this.onSetLinkStrategy = this.onSetLinkStrategy.bind(this)
    this.onLinkStrategy = this.onLinkStrategy.bind(this)
    this.onStrategyList = this.onStrategyList.bind(this)
    this.onNewStrategy = this.onNewStrategy.bind(this)
    this.bootstrapStrategy = this.bootstrapStrategy.bind(this)
    this.submitStrategy = this.submitStrategy.bind(this)
    this.cancelSubmit = this.cancelSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)

    this.state = {
      strategyDirectory: null,
      loadedStrategies: null,
      newSlug: '',
      addingNew: false,
    }
  }

  componentDidMount() {
    this.sendForDefaults()
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  sendForDefaults() {
    ipcRenderer.send('mainWindow.setting', { id: 'DIR_LINK' })
    ipcRenderer.send('mainWindow.strategy', { id: 'LIST' })
  }

  addListeners() {
    ipcRenderer.once('res--mainWindow.setting-SET_DIR_LINK', this.onSetLinkStrategy)
    ipcRenderer.once('res--mainWindow.setting-DIR_LINK', this.onLinkStrategy)
    ipcRenderer.once('res--mainWindow.strategy-LIST', this.onStrategyList)
    ipcRenderer.once('res--mainWindow.strategy-NEW', this.onNewStrategy)
  }

  removeListeners() {
    ipcRenderer.removeListener('res--mainWindow.setting-SET_DIR_LINK', this.onSetLinkStrategy)
    ipcRenderer.removeListener('res--mainWindow.setting-DIR_LINK', this.onLinkStrategy)
    ipcRenderer.removeListener('res--mainWindow.strategy-LIST', this.onStrategyList)
    ipcRenderer.removeListener('res--mainWindow.strategy-NEW', this.onNewStrategy)
  }

  handleSetLinkStrategy(e) {
    ipcRenderer.send('mainWindow.setting', { id: 'SET_DIR_LINK' })
  }

  openStrategy(e, id) {
    ipcRenderer.send('mainWindow.strategy', {
      id: 'WINDOW',
      data: { id, type: 'strategyWindow' },
    })
  }

  onSetLinkStrategy(event, strategyDirectory) {
    this.setState({ strategyDirectory })
  }

  onLinkStrategy(event, strategyDirectory) {
    this.setState({ strategyDirectory })
  }

  onStrategyList(event, loadedStrategies) {
    this.setState({ loadedStrategies })
  }

  onNewStrategy(event, strategy) {
    this.setState({ addingNew: false, newSlug: '' }, () => {
      this.sendForDefaults()
    })
  }

  bootstrapStrategy(e) {
    e.preventDefault()
    this.setState({ addingNew: true, newSlug: '' })
  }

  handleTextChange(e) {
    let newSlug = e.target.value
    newSlug = newSlug.replace(/ /g, '-')
    newSlug = newSlug.trim()
    newSlug = newSlug.toLowerCase()
    this.setState({ newSlug })
  }

  isDuplicate() {
    this.state.loadedStrategies.map(strategy => {
      if (strategy.slug === this.state.newSlug) {
        return true
      }
    })
    return false
  }

  submitStrategy(e) {
    ipcRenderer.send('mainWindow.strategy', {
      id: 'NEW',
      data: { slug: this.state.newSlug, dirPath: this.state.strategyDirectory },
    })
  }

  cancelSubmit(e) {
    this.setState({ addingNew: false, newSlug: '' })
  }

  render() {
    return (
      <div className="pt-5 pb-5 w-full h-full flex flex-col justify-start items-center">
        <h4 className="font-display text-red-2 cursor-default">Strategy Loader</h4>
        <div className="w-full mt-5 border-1 border-solid border-white-400 p-5 rounded-lg">
          <div className="w-full flex justify-between items-center">
            <button
              type="button"
              className="pt-1 pb-1 pl-3 pr-3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
              onClick={this.handleSetLinkStrategy}
            >
              Link Directory
            </button>
            <pre className="inline-block text-tiny pt-1 pb-1 pr-2 pl-2 border border-solid border-yellow-2 text-yellow-1 rounded cursor-default">
              {this.state.strategyDirectory || 'No Directory Linked'}
            </pre>
          </div>
          {this.state.strategyDirectory && (
            <div className="mt-5 w-full flex justify-start items-center">
              {this.state.addingNew ? (
                <React.Fragment>
                  <input
                    type="text"
                    name="new_slug"
                    value={this.state.newSlug}
                    placeholder="add-slug"
                    onChange={this.handleTextChange}
                    className="w-1/2 mr-2 ml-2 appearance-none block w-full bg-white-650 text-gray-3 border border-red-2-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white-850 font-head transition-bg transition-200"
                  />
                  <button
                    className="w-1/4 pt-1 pb-1 pl-3 pr-3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
                    type="button"
                    onClick={this.submitStrategy}
                    disabled={
                      this.state.newSlug.length < 4 ||
                      typeof this.state.newSlug !== 'string' ||
                      this.isDuplicate()
                    }
                  >
                    Generate
                  </button>
                  <button
                    className="w-1/4 pt-1 pb-1 pl-3 pr-3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
                    type="button"
                    onClick={this.cancelSubmit}
                  >
                    Cancel
                  </button>
                </React.Fragment>
              ) : (
                <button
                  type="button"
                  className="w-full pt-1 pb-1 pl-3 pr-3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
                  onClick={this.bootstrapStrategy}
                >
                  Boostrap New Strategy
                </button>
              )}
            </div>
          )}
        </div>
        <div className="h-full w-full mt-5 p-5 rounded-lg">
          <h5 className="font-head text-white font-thin text-center cursor-default">
            Loaded Strategies
          </h5>
          <div className="mt-5 pl-2 pr-2 pt-0 pb-0 border-1 border-solid border-white-400 rounded-lg pt-5">
            {this.state.loadedStrategies && Array.isArray(this.state.loadedStrategies) ? (
              <ul>
                {this.state.loadedStrategies.map((strategy, i) => (
                  <li
                    key={i}
                    className="mb-5 w-full h-full flex flex-wrap justify-between items-start p-2 transition-bg transition-200 bg-tran border-b border-solid border-white-650 hover:bg-white-100 active:bg-tran"
                    onClick={e => this.openStrategy(e, strategy.id)}
                  >
                    <div className="w-7/12 mb-3 pr-2">
                      <h6 className="text-tiny font-head flex items-center justify-start mb-3">
                        <div
                          className={`${
                            strategy.active ? 'bg-green-2' : 'bg-yellow-2'
                          } rounded-full top-20 right-20 mr-3`}
                          style={{ width: 20, height: 20 }}
                        >
                          {strategy.active}
                        </div>
                        {strategy.name}
                      </h6>
                      <p className="font-body font-hairline text-white-850">
                        {strategy.description}
                      </p>
                    </div>
                    <div className="w-5/12 mb-3 flex flex-col justify-start items-start pl-2 border-l border-solid border-white-400">
                      <ul className="m-0 p-0 list-none">
                        {strategy.exchange &&
                          strategy.exchange.map(exchange => (
                            <li key={exchange} className="font-body text-tiny text-red-1">
                              {exchange}
                            </li>
                          ))}
                      </ul>
                      <small className="mt-1 font-body text-tiny font-hairline">
                        <i className="text-white-850">Last Updated:</i>{' '}
                        <strong className="ml-2 text-red-1">{strategy.updated}</strong>
                      </small>
                      <small className="mt-1 font-body text-tiny font-hairline">
                        <i className="text-white-850">Created At:</i>{' '}
                        <strong className="ml-2 text-red-1">{strategy.created}</strong>
                      </small>
                    </div>
                    <pre className="w-full text-tiny text-yellow-2 border-t border-solid border-white-400 pt-2">
                      {strategy.fullPath}
                    </pre>
                  </li>
                ))}
              </ul>
            ) : (
              <h6 className="font-body text-white font-thin text-center cursor-default pb-5">
                No Loaded Strategies
              </h6>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Strategies
