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

    this.state = {
      table: null,
      tableDetails: null,
    }
  }

  componentDidMount() {
    this.ipcListeners()

    if (this.props.location && this.props.location.state) {
      this.setState({ table: this.props.location.state.table }, () => {
        log('Table Set On Mount')
      })
    } else {
      this.getTableThroughPath()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.table !== prevState.table && this.state.table) {
      this.getTableDetails()
    }
  }

  ipcListeners() {
    ipc.on('res--db-TABLE_DETAILS', this.onGetTableDetails)
  }

  getTableDetails() {
    ipc.send('db', { id: 'TABLE_DETAILS', data: { tableName: this.state.table } })
  }

  onGetTableDetails(event, tableDetails) {
    this.setState({ tableDetails }, () => {
      log('Table Details Recieved')
    })
  }

  getTableThroughPath() {
    this.setState({ table: this.props.location.pathname.substr(-12) }, () => {
      log('Table Set Through Path')
    })
  }

  render() {
    const { table, tableDetails } = this.state

    return (
      <div className="relative">
        <Link className="absolute top-0 left-0 pl-2 pt-2" to="/database">
          Back
        </Link>
        <div
          className="p-3 border-1 border-solid border-white-200 rounded"
          style={{ minHeight: '35vh' }}
        >
          <h5 className="text-center font-thin mb-3 font-head">
            Table Details For{' '}
            {tableDetails ? (
              <pre className="inline-block">{tableDetails.name}</pre>
            ) : (
              <span className="text-tiny font-head">(Unable To Get Table Details)</span>
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
