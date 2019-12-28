import React from 'react'
import { ipcRenderer } from 'electron'
import notifier from 'node-notifier'

class DBManager extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dbName: '',
      tables: [],
      tableDetails: null,
    }
  }

  componentDidMount() {
    ipcRenderer.send('get-db', 'ping')
    ipcRenderer.send('get-tables', 'ping')
  }

  ipcListeners() {
    ipcRenderer.on('get-db-res', this.onGetDb)
    ipcRenderer.on('get-tables-res', this.onGetTables)
    ipcRenderer.on('get-table-details-res', this.onGetTableDetails)
    ipcRenderer.on('refresh-migration-res', this.onRefreshMigration)
    ipcRenderer.on('rollback-migration-res', this.onRollbackMigration)
    ipcRenderer.on('stepforward-migration-res', this.onStepforwardMigration)
  }

  getTableDetails(e, tableName) {
    ipcRenderer.send('get-table-details', tableName)
  }

  refresh(e) {
    notifier.notify(
      {
        title: 'My awesome title',
        message: 'Hello from electron, Mr. User!',
        sound: true,
        wait: true,
      },
      (err, response) => {}
    )
    notifier.on('click', (notifierObject, options) => {
      console.log('You clicked on the notification')
    })
    notifier.on('timeout', (notifierObject, options) => {
      console.log('Notification timed out!')
    })

    ipcRenderer.send('migration', 'refresh')
  }

  rollback(e) {
    ipcRenderer.send('migration', 'rollback')
  }

  stepforward(e) {
    ipcRenderer.send('migration', 'stepforward')
  }

  onGetDb(event, dbName) {
    this.setState({ dbName })
  }

  onGetTables(event, tables) {
    this.setState({ tables })
  }

  onGetTableDetails(event, tableDetails) {
    this.setState({ tableDetails })
  }

  onRefreshMigration(event, message) {
    this.setState({ message })
  }

  onRollbackMigration(event, message) {
    this.setState({ message })
  }

  onStepforwardMigration(event, message) {
    this.setState({ message })
  }

  render() {
    return (
      <div>
        <div className="p-3 mb-5 border border-solid border-white rounded-lg">
          <h5 className="text-center font-thin mb-3 font-head">
            Manage Migrations For {this.state.dbName}
          </h5>
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={this.refresh}
              className="pt-1 pb-1 pl-3 pr-3 bg-tran border border-solid border-red-3 text-white rounded-lg transition transition-100 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={this.rollback}
              className="pt-1 pb-1 pl-3 pr-3 bg-tran border border-solid border-red-3 text-white rounded-lg transition transition-100 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8"
            >
              Rollback
            </button>
            <button
              type="button"
              onClick={this.stepforward}
              className="pt-1 pb-1 pl-3 pr-3 bg-tran border border-solid border-red-3 text-white rounded-lg transition transition-100 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8"
            >
              Stepforward
            </button>
          </div>
        </div>
        <div className="p-3 mb-5 border border-solid border-white rounded-lg">
          <h5 className="text-center font-thin mb-3 font-head">List Tables</h5>
          <ul>
            {this.state.tables.map((table, i) => (
              <li
                key={i}
                className="mt-2 mb-2 pb-2 border-b border-solid border-white flex justify-between items-center"
              >
                <pre className="inline-block">{table}</pre>{' '}
                <button
                  type="button"
                  onClick={this.getTableDetails}
                  className="p-0 bg-tran text-white transition transition-100 font-body ml-5 text-tiny outline-none hover:text-red-3 active:text-white"
                >
                  Details
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-3 border border-solid border-white rounded-lg">
          <h5 className="text-center font-thin mb-3 font-head">
            Table Details For{' '}
            {this.state.tableDetails ? (
              <pre className="inline-block">{this.state.tableDetails.name}</pre>
            ) : (
              <span className="text-tiny font-head">(None Selected)</span>
            )}
          </h5>
          <div className="w-full border border-solid border-white rounded-lg p-10"></div>
        </div>
      </div>
    )
  }
}

export default DBManager
