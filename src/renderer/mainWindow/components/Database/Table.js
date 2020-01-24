import React from 'react'
import { ipcRenderer as ipc } from 'electron'
import { Link } from 'react-router-dom'

const log = console.log
const error = console.error

export default class Table extends React.Component {
  constructor(props) {
    super(props)

    this.getTableThroughPath = this.getTableThroughPath.bind(this)
    this.onGetTableDetails = this.onGetTableDetails.bind(this)
    this.onGetTableRowCount = this.onGetTableRowCount.bind(this)

    this.state = {
      table: null,
      tableDetails: null,
      tableRows: null,
      tableRowCount: 0,
    }
  }

  componentDidMount() {
    this.ipcListeners()

    log(this.props.location)

    if (this.props.location && this.props.location.state) {
      this.setState({ table: this.props.location.state.table, db: this.props.location.state.db })
    } else {
      this.getTableThroughPath()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.table !== prevState.table && this.state.table) {
      if (this.state.db === 'local') {
        this.getTableDetails()
        this.getTableRowCount()
      } else if (this.state.db === 'remote') {
        this.getRemoteTableDetails()
        this.getRemoteTableRowCount()
      }
    }
  }

  ipcListeners() {
    ipc.on('res--mainWindow.db-TABLE_DETAILS', this.onGetTableDetails)
    ipc.on('res--mainWindow.db-TABLE_ROW_COUNT', this.onGetTableRowCount)
    ipc.on('res--mainWindow.remote-REMOTE_TABLE_DETAILS', this.onGetTableDetails)
    ipc.on('res--mainWindow.remote-REMOTE_TABLE_ROW_COUNT', this.onGetTableRowCount)
  }

  getTableDetails() {
    ipc.send('mainWindow.db', { id: 'TABLE_DETAILS', data: { tableName: this.state.table } })
  }

  getTableRowCount() {
    ipc.send('mainWindow.db', { id: 'TABLE_ROW_COUNT', data: { tableName: this.state.table } })
  }

  getRemoteTableDetails() {
    ipc.send('mainWindow.remote', {
      id: 'REMOTE_TABLE_DETAILS',
      data: { tableName: this.state.table },
    })
  }

  getRemoteTableRowCount() {
    ipc.send('mainWindow.remote', {
      id: 'REMOTE_TABLE_ROW_COUNT',
      data: { tableName: this.state.table },
    })
  }

  onGetTableDetails(event, tableDetails) {
    this.setState({ tableDetails })
  }

  onGetTableRowCount(event, tableRowCount) {
    this.setState({ tableRowCount })
  }

  getTableThroughPath() {
    this.setState({
      table: this.props.location.pathname.substr(-12),
      db: this.props.location.pathname.substr(10, 1),
    })
  }

  render() {
    const { table, tableDetails, tableRows, tableRowCount } = this.state

    return (
      <div className="relative">
        <Link
          className="absolute top-0 left-0 pl-2 font-head text-red-2 transition-all transition-200 hover:text-yellow-2 active:text-red-2"
          to="/database"
        >
          Back
        </Link>
        <div className="pt-5" style={{ minHeight: '35vh' }}>
          <h5 className="text-center font-thin mb-3 font-head">
            Table Schema For{' '}
            {tableDetails ? (
              <pre className="inline-block">
                {table} ({tableRowCount} Rows)
              </pre>
            ) : (
              <span className="text-tiny font-head">(Unable To Get Table Details)</span>
            )}
          </h5>
          {tableDetails && (
            <table className="w-full h-full">
              <thead>
                <tr className="border border-b-0 border-solid border-white-400">
                  <th className="text-tiny w-1/6 font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
                    Field
                  </th>
                  <th className="text-tiny w-1/6 font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
                    Type
                  </th>
                  <th className="text-tiny w-1/6 font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
                    Null
                  </th>
                  <th className="text-tiny w-1/6 font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
                    Key
                  </th>
                  <th className="text-tiny w-1/6 font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
                    Default
                  </th>
                  <th className="text-tiny w-1/6 font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
                    Extra
                  </th>
                </tr>
              </thead>
              <tbody className="border border-solid border-white-400">
                {tableDetails.map((col, i) => (
                  <tr key={i} className="border-b border-solid border-white-200">
                    <td className="w-1/6 pl-3 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      <pre className="text-tiny">{col.Field}</pre>
                    </td>
                    <td className="w-1/6 pl-3 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      <pre className="text-tiny">{col.Type}</pre>
                    </td>
                    <td className="w-1/6 pl-3 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      <pre className="text-tiny">{col.Null}</pre>
                    </td>
                    <td className="w-1/6 pl-3 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      <pre className="text-tiny">{col.Key}</pre>
                    </td>
                    <td className="w-1/6 pl-3 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      <pre className="text-tiny">{col.Default}</pre>
                    </td>
                    <td className="w-1/6 pl-3 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      <pre className="text-tiny">{col.Extra}</pre>
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
