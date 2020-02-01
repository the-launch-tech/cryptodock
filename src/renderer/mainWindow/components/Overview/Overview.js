import React from 'react'
import { ipcRenderer } from 'electron'
import ActiveStrategies from './ActiveStrategies'
import Portfolio from './Portfolio'
import RecentActivity from './RecentActivity'

export default class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.sendForDefaults = this.sendForDefaults.bind(this)
    this.setListeners = this.setListeners.bind(this)
    this.removeListeners = this.removeListeners.bind(this)
    this.onRecentActivity = this.onRecentActivity.bind(this)
    this.onActiveStrategies = this.onActiveStrategies.bind(this)
    this.onGetPortfolio = this.onGetPortfolio.bind(this)

    this.state = {
      activeStrategies: null,
      recentActivity: null,
      accounts: null,
    }
  }

  componentDidMount() {
    this.setListeners()
    this.sendForDefaults()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  sendForDefaults() {
    ipcRenderer.send('mainWindow.activity', { id: 'RECENT', data: { after: 86400 * 3 } })
    ipcRenderer.send('mainWindow.strategy', { id: 'GET_ACTIVE' })
    ipcRenderer.send('mainWindow.activity', { id: 'GET_PORTFOLIO' })
  }

  setListeners() {
    ipcRenderer.once('res--mainWindow.activity-RECENT', this.onRecentActivity)
    ipcRenderer.once('res--mainWindow.strategy-GET_ACTIVE', this.onActiveStrategies)
    ipcRenderer.once('res--mainWindow.activity-GET_PORTFOLIO', this.onGetPortfolio)
  }

  removeListeners() {
    ipcRenderer.removeListener('res--mainWindow.activity-RECENT', this.onRecentActivity)
    ipcRenderer.removeListener('res--mainWindow.strategy-GET_ACTIVE', this.onActiveStrategies)
    ipcRenderer.removeListener('res--mainWindow.activity-GET_PORTFOLIO', this.onGetPortfolio)
  }

  onRecentActivity(event, recentActivity) {
    this.setState({ recentActivity })
  }

  onActiveStrategies(event, activeStrategies) {
    this.setState({ activeStrategies })
  }

  onGetPortfolio(event, accounts) {
    this.setState({ accounts })
  }

  openStrategy(e, id) {
    ipcRenderer.send('mainWindow.strategy', {
      id: 'WINDOW',
      data: { id, type: 'strategyWindow' },
    })
  }

  render() {
    const { activeStrategies, recentActivity, accounts } = this.state

    return (
      <div className="w-full h-full flex flex-col justify-start items-center">
        <h2 className="font-display text-red-2 cursor-default">CryptoDock</h2>
        {accounts && Object.keys(accounts) && <Portfolio accounts={accounts} />}
        {activeStrategies && activeStrategies.length ? (
          <div className="my-2 block p-5">
            <ActiveStrategies
              activeStrategies={activeStrategies}
              openStrategy={this.openStrategy}
            />
          </div>
        ) : (
          <div className="my-2 w-1/2">
            <p className="font-head text-sm font-normal text-center cursor-default">
              No Active Strategies
            </p>
          </div>
        )}
        {recentActivity && recentActivity.length ? (
          <div className="mt-2 mb-10 block p-5">
            <RecentActivity recentActivity={recentActivity} />
          </div>
        ) : (
          <div className="mt-2 mb-10 w-1/2">
            <p className="font-head text-sm font-normal text-center cursor-default">
              No Recent Activity
            </p>
          </div>
        )}
      </div>
    )
  }
}
