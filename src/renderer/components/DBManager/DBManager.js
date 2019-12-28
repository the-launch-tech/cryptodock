import React from 'react'

class DBManager extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dbName: 'cryptodock',
      tables: [
        'exchanges',
        'products',
        'product_exchange',
        'strategies',
        'strategymetas',
        'klines',
        'trades',
        'transations',
        'logs',
      ],
    }
  }

  componentDidMount() {
    // this.props.pool.asyncQuery('SELECT DATABASE()')
    //   .then(dbName => this.setState({ dbName }))
    //   .catch(console.error)
    // this.props.DBPool.asyncQuery('SHOW TABLES')
    //   .then(tables => this.setState({ tables }))
    //   .catch(console.error)
  }

  getTableDetails(e) {
    e.preventDefault()
    // this.props.pool.asyncQuery('DESCRIBE ' + tableName)
    //   .then(tableData => this.setState({ tableData }))
    //   .catch(console.error)
  }

  refresh(e) {
    e.preventDefault()
  }

  rollback(e) {
    e.preventDefault()
  }

  stepforward(e) {
    e.preventDefault()
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
            {this.state.tableData ? (
              <pre className="inline-block">{this.state.tableData.name}</pre>
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
