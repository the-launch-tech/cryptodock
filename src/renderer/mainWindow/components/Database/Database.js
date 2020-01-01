import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { ipcRenderer } from 'electron'

class Database extends React.Component {
  constructor(props) {
    super(props)

    this.onGetDb = this.onGetDb.bind(this)
    this.onGetTables = this.onGetTables.bind(this)
    this.refresh = this.refresh.bind(this)
    this.rollback = this.rollback.bind(this)
    this.onRollback = this.onRollback.bind(this)
    this.onRefresh = this.onRefresh.bind(this)

    this.state = {
      dbName: '',
      tables: [],
      migrating: false,
    }
  }

  componentDidMount() {
    this.addListeners()
    this.sendForDefaults()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  addListeners() {
    ipcRenderer.once('res--mainWindow.db-DATABASE', this.onGetDb)
    ipcRenderer.once('res--mainWindow.db-TABLES', this.onGetTables)
    ipcRenderer.once('res--mainWindow.migration-ROLLBACK', this.onRollback)
    ipcRenderer.once('res--mainWindow.migration-REFRESH', this.onRefresh)
  }

  removeListeners() {
    ipcRenderer.removeListener('res--mainWindow.db-DATABASE', this.onGetDb)
    ipcRenderer.removeListener('res--mainWindow.db-TABLES', this.onGetTables)
    ipcRenderer.removeListener('res--mainWindow.migration-ROLLBACK', this.onRollback)
    ipcRenderer.removeListener('res--mainWindow.migration-REFRESH', this.onRefresh)
  }

  sendForDefaults() {
    ipcRenderer.send('mainWindow.db', { id: 'DATABASE' })
    ipcRenderer.send('mainWindow.db', { id: 'TABLES' })
  }

  refresh(e) {
    this.setState({ migrating: true }, () => {
      ipcRenderer.send('mainWindow.migration', { id: 'REFRESH' })
    })
  }

  rollback(e) {
    this.setState({ migrating: true }, () => {
      ipcRenderer.send('mainWindow.migration', { id: 'ROLLBACK' })
    })
  }

  onGetDb(event, dbName) {
    this.setState({ dbName })
  }

  onGetTables(event, tables) {
    this.setState({ tables })
  }

  onRollback(event, message) {
    this.setState({ migrating: false, tables: [] })
  }

  onRefresh(event, message) {
    this.setState({ migrating: false }, () => {
      ipcRenderer.send('mainWindow.db', { id: 'TABLES' })
    })
  }

  render() {
    const { dbName, migrating, tables } = this.state

    return (
      <div>
        <div className="p-3 mb-5 border-1 border-solid border-white-200 rounded">
          <h5 className="text-center font-thin mb-3 font-head">
            Manage Migrations For {dbName ? dbName : <small>(None Selected)</small>}
          </h5>
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={this.refresh}
              disabled={!dbName || migrating}
              className="pt-1 pb-1 pl-3 pr-3 w-1/3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={this.rollback}
              disabled={!dbName || migrating}
              className="pt-1 pb-1 pl-3 pr-3 w-1/3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
            >
              Rollback
            </button>
          </div>
        </div>
        <div
          className="p-3 mb-5 border-1 border-solid border-white-200 rounded"
          style={{ minHeight: '35vh' }}
        >
          <h5 className="text-center font-thin mb-3 font-head">List Tables</h5>
          <ul>
            {tables.map((table, i) => (
              <li
                key={i}
                className="mt-2 mb-2 pb-2 border-b border-solid border-white-200 flex justify-between items-center"
              >
                <pre className="inline-block text-tiny m-0">{table}</pre>{' '}
                <Link
                  className="p-0 bg-tran text-white transition transition-100 font-body ml-5 text-tiny outline-none hover:text-red-3 active:text-white"
                  to={{
                    pathname: `/database/${table}`,
                    state: { table },
                  }}
                >
                  Details
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(Database)
