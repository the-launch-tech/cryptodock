import React from 'react'
import { ipcRenderer } from 'electron'
import { withRouter } from 'react-router'
import { Link, Switch, Route } from 'react-router-dom'
import Details from './components/Details/Details'
import Backtester from './components/Backtester/Backtester'
import Activity from './components/Activity/Activity'
import Header from './components/Header'

const { error, log } = console

const routes = [
  { link: '/', label: 'Details', Component: Details, exact: true },
  { link: '/backtesting', label: 'Backtester', Component: Backtester, exact: true },
  { link: '/activity', label: 'Activity', Component: Activity, exact: true },
]

class App extends React.Component {
  constructor(props) {
    super(props)

    this.getStrategyById = this.getStrategyById.bind(this)
    this.onGetStrategyById = this.onGetStrategyById.bind(this)
    this.setListeners = this.setListeners.bind(this)
    this.onToggleActive = this.onToggleActive.bind(this)
    this.toggleActivation = this.toggleActivation.bind(this)
    this.updateStatus = this.updateStatus.bind(this)

    this.state = { id: null, type: null, strategy: null }
  }

  componentDidMount() {
    this.setState({ id: this.props.id, type: this.props.type }, () => {
      this.setListeners()
      this.getStrategyById()
    })
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  setListeners() {
    ipcRenderer.on(`res--strategyWindow-${this.state.id}.strategy-DETAILS`, this.onGetStrategyById)
    ipcRenderer.on(`res--strategyWindow-${this.state.id}.strategy-ACTIVATE`, this.onToggleActive)
  }

  removeListeners() {
    ipcRenderer.removeListener(
      `res--strategyWindow-${this.state.id}.strategy-DETAILS`,
      this.onGetStrategyById
    )
    ipcRenderer.removeListener(
      `res--strategyWindow-${this.state.id}.strategy-ACTIVATE`,
      this.onToggleActive
    )
  }

  getStrategyById() {
    ipcRenderer.send(`strategyWindow-${this.state.id}.strategy`, {
      id: 'DETAILS',
      data: { id: this.state.id },
    })
  }

  updateStatus(status, callback = null) {
    if (!status) {
      return false
    }

    const strategy = Object.assign({}, this.state.strategy)
    strategy.status = status
    this.setState({ strategy }, () => {
      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  toggleActivation(e) {
    this.updateStatus(this.state.strategy.status === 'active' ? 'latent' : 'active', () => {
      ipcRenderer.send(`strategyWindow-${this.state.id}.strategy`, {
        id: 'TOGGLE_ACTIVATION',
        data: {
          id: this.state.id,
          status: this.state.strategy.status,
        },
      })
    })
  }

  onGetStrategyById(event, strategy) {
    this.setState({ strategy, status: strategy.status })
  }

  onToggleActive(event, data) {
    if (data.status !== this.state.strategy.status) {
      this.updateStatus(data.status)
    }
  }

  render() {
    return (
      <main className="h-screen w-screen flex flex-wrap justify-start items-start bg-black-850">
        <header className="w-1/4 h-full bg-gray-3-400 pt-10 pb-0">
          <Header routes={routes} {...this.state} {...this.props} />
        </header>
        <article className="w-3/4 h-full p-5 overflow-y-scroll">
          <Switch>
            {routes.map(({ link, exact, Component }, i) => (
              <Route
                key={i}
                path={link}
                exact={exact}
                component={() => (
                  <Component
                    {...this.props}
                    {...this.state}
                    toggleActivation={this.toggleActivation}
                  />
                )}
              />
            ))}
          </Switch>
        </article>
      </main>
    )
  }
}

export default withRouter(App)
