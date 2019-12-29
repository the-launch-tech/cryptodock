import React from 'react'
import { ipcRenderer as ipc } from 'electron'

class DBManager extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dbName: '',
      tables: [],
      tableDetails: null,
    }

    this.onGetDb = this.onGetDb.bind(this)
    this.onGetTables = this.onGetTables.bind(this)
    this.onGetTableDetails = this.onGetTableDetails.bind(this)
  }

  componentDidMount() {
    this.ipcListeners()

    ipc.send('db', { id: 'database' })
    ipc.send('db', { id: 'tables' })
  }

  getTableDetails(e, tableName) {
    ipc.send('db', { id: 'table-details', data: tableName })
  }

  refresh(e) {
    ipc.send('migration', { id: 'refresh' })
  }

  rollback(e) {
    ipc.send('migration', { id: 'rollback' })
  }

  ipcListeners() {
    ipc.on('res_db-database', this.onGetDb)
    ipc.on('res_db-tables', this.onGetTables)
    ipc.on('res_db-table-details', this.onGetTableDetails)
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

  render() {
    return (
      <div>
        <div className="p-3 mb-5 border-1 border-solid border-white-200 rounded">
          <h5 className="text-center font-thin mb-3 font-head">
            Manage Migrations For{' '}
            {this.state.dbName ? this.state.dbName : <small>(None Selected)</small>}
          </h5>
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={this.refresh}
              disabled={!this.state.dbName}
              className="pt-1 pb-1 pl-3 pr-3 w-1/3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={this.rollback}
              disabled={!this.state.dbName}
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
        <div
          className="p-3 border-1 border-solid border-white-200 rounded"
          style={{ minHeight: '35vh' }}
        >
          <h5 className="text-center font-thin mb-3 font-head">
            Table Details For{' '}
            {this.state.tableDetails ? (
              <pre className="inline-block">{this.state.tableDetails.name}</pre>
            ) : (
              <span className="text-tiny font-head">(None Selected)</span>
            )}
          </h5>
          <div className="w-full h-full border border-solid border-white-400 bg-white-100 p-10"></div>
        </div>
      </div>
    )
  }
}

export default DBManager
