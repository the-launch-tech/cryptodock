import React from 'react'
import { Link } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import LoadedStrategies from './LoadedStrategies'
import LinkDirectory from './LinkDirectory'
import BootstrapForm from './BootstrapForm'
import BootstrapButton from './BootstrapButton'

class Strategies extends React.Component {
  constructor(props) {
    super(props)

    this.defaultStrategyObj = {
      name: '',
      label: '',
      description: '',
    }

    this.onSetLinkStrategy = this.onSetLinkStrategy.bind(this)
    this.onLinkStrategy = this.onLinkStrategy.bind(this)
    this.onStrategyList = this.onStrategyList.bind(this)
    this.onNewStrategy = this.onNewStrategy.bind(this)
    this.bootstrapStrategy = this.bootstrapStrategy.bind(this)
    this.submitStrategy = this.submitStrategy.bind(this)
    this.cancelSubmit = this.cancelSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.onToggleActive = this.onToggleActive.bind(this)
    this.onDeleteStrategy = this.onDeleteStrategy.bind(this)
    this.deleteStrategy = this.deleteStrategy.bind(this)

    this.state = {
      strategyDirectory: null,
      loadedStrategies: null,
      newStrategy: this.defaultStrategyObj,
      addingNew: false,
      newStrategyValid: false,
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
    ipcRenderer.on('res--mainWindow.strategy-TOGGLE_ACTIVATION', this.onToggleActive)
    ipcRenderer.on('res--mainWindow.strategy-DELETE', this.onDeleteStrategy)
  }

  removeListeners() {
    ipcRenderer.removeListener('res--mainWindow.setting-SET_DIR_LINK', this.onSetLinkStrategy)
    ipcRenderer.removeListener('res--mainWindow.setting-DIR_LINK', this.onLinkStrategy)
    ipcRenderer.removeListener('res--mainWindow.strategy-LIST', this.onStrategyList)
    ipcRenderer.removeListener('res--mainWindow.strategy-NEW', this.onNewStrategy)
    ipcRenderer.removeListener('res--mainWindow.strategy-TOGGLE_ACTIVATION', this.onToggleActive)
    ipcRenderer.removeListener('res--mainWindow.strategy-DELETE', this.onDeleteStrategy)
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

  submitStrategy(e) {
    ipcRenderer.send('mainWindow.strategy', {
      id: 'NEW',
      data: { newStrategy: this.state.newStrategy, dirPath: this.state.strategyDirectory },
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

  onToggleActive(event, data) {
    const loadedStrategies = Object.assign([], this.state.loadedStrategies)
    const index = iOfArrObj(this.state.loadedStrategies, 'id', data.id)
    const strategy = loadedStrategies[index]
    strategy.status = data.status
    this.setState({ loadedStrategies })
  }

  onNewStrategy(event, newStrategy) {
    this.setState(
      {
        addingNew: false,
        newStrategy: this.defaultStrategyObj,
      },
      () => {
        this.sendForDefaults()
      }
    )
  }

  bootstrapStrategy(e) {
    e.preventDefault()
    this.setState({
      addingNew: true,
      newStrategy: this.defaultStrategyObj,
    })
  }

  cancelSubmit(e) {
    this.setState({
      addingNew: false,
      newStrategy: this.defaultStrategyObj,
    })
  }

  handleTextChange(e) {
    const newStrategy = Object.assign({}, this.state.newStrategy)

    const onChange = {
      name: (obj, val) => {
        val = val.replace(/ /g, '-')
        val = val.trim()
        val = val.toLowerCase()
        obj.name = val
        return { newStrategy: obj }
      },
      label: (obj, val) => {
        obj.label = val
        return { newStrategy: obj }
      },
      description: (obj, val) => {
        obj.description = val
        return { newStrategy: obj }
      },
    }

    const val = e.target.value
    const name = e.target.name
    const handleChange = onChange[name]
    const newStrategyObj = handleChange(newStrategy, val)

    this.setState(newStrategyObj, () => {
      const isDup = this.duplicateStrategy()
      const exists = this.state.newStrategy.name.length >= 4
      this.setState({ newStrategyValid: !isDup && exists })
    })
  }

  duplicateStrategy() {
    let duplicate = false
    this.state.loadedStrategies.map(strategy => {
      if (strategy.name === this.state.newStrategy.name) {
        duplicate = true
      }
    })
    return duplicate
  }

  deleteStrategy(id) {
    ipcRenderer.send('mainWindow.strategy', { id: 'DELETE', data: { id } })
  }

  onDeleteStrategy(event, id) {
    let loadedStrategies = Object.assign([], this.state.loadedStrategies)
    index = loadedStrategies.map(e => e.id).indexOf(id)
    if (index > -1) {
      loadedStrategies.splice(index, 1)
    }
    this.setState({ loadedStrategies })
  }

  render() {
    const { addingNew, strategyDirectory, newStrategy, newStrategyValid } = this.state

    return (
      <div className="pt-5 pb-5 w-full h-full flex flex-col justify-start items-center">
        <h4 className="font-display text-red-2 cursor-default">Strategy Loader</h4>
        <div className="w-full mt-5 border-1 border-solid border-white-400 p-5 rounded-lg">
          <LinkDirectory {...this.state} handleSetLinkStrategy={this.handleSetLinkStrategy} />
          {strategyDirectory && (
            <div className="mt-5 w-full flex justify-start items-center">
              <BootstrapButton bootstrapStrategy={this.bootstrapStrategy} {...this.state} />
            </div>
          )}
        </div>
        {addingNew && (
          <BootstrapForm
            newStrategy={newStrategy}
            newStrategyValid={newStrategyValid}
            handleTextChange={this.handleTextChange}
            submitStrategy={this.submitStrategy}
            cancelSubmit={this.cancelSubmit}
          />
        )}
        <LoadedStrategies
          {...this.state}
          openStrategy={this.openStrategy}
          deleteStrategy={this.deleteStrategy}
        />
      </div>
    )
  }
}

export default Strategies
