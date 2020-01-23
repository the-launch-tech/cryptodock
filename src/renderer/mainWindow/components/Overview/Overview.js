import React from 'react'
import { ipcRenderer } from 'electron'
import ActiveStrategies from './ActiveStrategies'
import RecentActivity from './RecentActivity'

export default class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.sendForDefaults = this.sendForDefaults.bind(this)
    this.setListeners = this.setListeners.bind(this)
    this.removeListeners = this.removeListeners.bind(this)
    this.onRecentActivity = this.onRecentActivity.bind(this)
    this.onActiveStrategies = this.onActiveStrategies.bind(this)

    this.state = {
      activeStrategies: null,
      recentActivity: null,
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
  }

  setListeners() {
    ipcRenderer.once('res--mainWindow.activity-RECENT', this.onRecentActivity)
    ipcRenderer.once('res--mainWindow.strategy-GET_ACTIVE', this.onActiveStrategies)
  }

  removeListeners() {
    ipcRenderer.removeListener('res--mainWindow.activity-RECENT', this.onRecentActivity)
    ipcRenderer.removeListener('res--mainWindow.strategy-GET_ACTIVE', this.onActiveStrategies)
  }

  onRecentActivity(event, recentActivity) {
    this.setState({ recentActivity })
  }

  onActiveStrategies(event, activeStrategies) {
    this.setState({ activeStrategies })
  }

  render() {
    const { activeStrategies, recentActivity } = this.state

    return (
      <div className="w-full h-full flex flex-col justify-start items-center">
        <h2 className="font-display text-red-2 cursor-default">CryptoDock</h2>
        {activeStrategies && activeStrategies.length ? (
          <div className="mt-5 block p-5">
            <ActiveStrategies activeStrategies={activeStrategies} />
          </div>
        ) : (
          <div className="mt-10 w-1/2 border-1 border-solid border-white-400 p-5 rounded-lg">
            <p className="font-head text-lg text-center cursor-default">No Active Strategies</p>
          </div>
        )}
        {recentActivity && recentActivity.length ? (
          <div className="mt-5 block p-5">
            <RecentActivity recentActivity={recentActivity} />
          </div>
        ) : (
          <div className="mt-10 w-1/2 border-1 border-solid border-white-400 p-5 rounded-lg">
            <p className="font-head text-lg text-center cursor-default">No Recent Activity</p>
          </div>
        )}
      </div>
    )
  }
}
