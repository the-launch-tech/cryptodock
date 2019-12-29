import React from 'react'
import { ipcRenderer as ipc } from 'electron'

class DBManager extends React.Component {
  constructor(props) {
    super(props)

    this.onGetDb = this.onGetDb.bind(this)
    this.onGetTables = this.onGetTables.bind(this)
    this.onGetTableDetails = this.onGetTableDetails.bind(this)
    this.refresh = this.refresh.bind(this)
    this.rollback = this.rollback.bind(this)
    this.onRollback = this.onRollback.bind(this)
    this.onRefresh = this.onRefresh.bind(this)

    this.state = {
      dbName: '',
      tables: [],
      tableDetails: null,
      migrating: false,
    }
  }

  componentDidMount() {
    this.on = true

    this.ipcListeners()

    ipc.send('db', { id: 'database' })
    ipc.send('db', { id: 'tables' })
  }

  getTableDetails(e, tableName) {
    ipc.send('db', { id: 'table-details', data: tableName })
  }

  refresh(e) {
    this.on &&
      this.setState({ migrating: true }, () => {
        ipc.send('migration', { id: 'refresh' })
      })
  }

  rollback(e) {
    this.on &&
      this.setState({ migrating: true }, () => {
        ipc.send('migration', { id: 'rollback' })
      })
  }

  ipcListeners() {
    ipc.on('res_db-database', this.onGetDb)
    ipc.on('res_db-tables', this.onGetTables)
    ipc.on('res_db-table-details', this.onGetTableDetails)
    ipc.on('res_migration-rollback', this.onRollback)
    ipc.on('res_migration-refresh', this.onRefresh)
  }

  onGetDb(event, dbName) {
    this.on && this.setState({ dbName })
  }

  onGetTables(event, tables) {
    this.on && this.setState({ tables })
  }

  onGetTableDetails(event, tableDetails) {
    this.on && this.setState({ tableDetails })
  }

  onRollback(event, message) {
    setTimeout(() => {
      this.on && this.setState({ migrating: false })
    }, 1000)
  }

  onRefresh(event, message) {
    setTimeout(() => {
      this.on && this.setState({ migrating: false })
    }, 1000)
  }

  render() {
    const { dbName, migrating, tables, tableDetails } = this.state

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
                className="mt-2 mb-2 pb-2 border-b border-solid border-white flex justify-between items-center"
              >
                <pre className="inline-block text-tiny m-0">{table}</pre>{' '}
                <button
                  type="button"
                  onClick={e => this.getTableDetails(e, table)}
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
            {tableDetails ? (
              <pre className="inline-block">{tableDetails.name}</pre>
            ) : (
              <span className="text-tiny font-head">(None Selected)</span>
            )}
          </h5>
          {tableDetails && (
            <table className="w-full h-full border border-solid border-white-400 bg-white-100">
              <thead>
                <tr className="bg-white-100 p-2 border-b-2 border-solid border-blue-2 mb-5">
                  <th className="text-tiny w-1/6">Field</th>
                  <th className="text-tiny w-1/6">Type</th>
                  <th className="text-tiny w-1/6">Null</th>
                  <th className="text-tiny w-1/6">Key</th>
                  <th className="text-tiny w-1/6">Default</th>
                  <th className="text-tiny w-1/6">Extra</th>
                </tr>
              </thead>
              <tbody>
                {tableDetails.columns.map((col, i) => (
                  <tr
                    key={i}
                    className={`border-b border-solid border-white-400 ${
                      i % 2 === 0 ? 'bg-tran' : 'bg-white-100'
                    }`}
                  >
                    <td className="w-1/6">
                      <pre className="text-tiny">{col.field}</pre>
                    </td>
                    <td className="w-1/6">
                      <pre className="text-tiny">{col.type}</pre>
                    </td>
                    <td className="w-1/6">
                      <pre className="text-tiny">{col.null}</pre>
                    </td>
                    <td className="w-1/6">
                      <pre className="text-tiny">{col.key}</pre>
                    </td>
                    <td className="w-1/6">
                      <pre className="text-tiny">{col.default}</pre>
                    </td>
                    <td className="w-1/6">
                      <pre className="text-tiny">{col.extra}</pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  }
}

export default DBManager
