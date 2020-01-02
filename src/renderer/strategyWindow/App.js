import React from 'react'

const { error, log } = console

class App extends React.Component {
  constructor(props) {
    super(props)

    this.getStrategyById = this.getStrategyById.bind(this)
    this.onGetStrategyById = this.onGetStrategyById.bind(this)

    this.state = { id: null, type: null }
  }

  componentDidMount() {
    this.setState({ id: this.props.id, type: this.props.type })
  }

  getStrategyById() {
    ipc.send(`strategyWindow-${id}.strategy`, {
      id: 'GET_BY_ID',
      data: { id: this.state.id },
    })
  }

  onGetStrategyById(event, strategy) {
    this.setState({ strategy }, () => {
      log('Strategy Set After onGetStrategyById')
    })
  }

  render() {
    return (
      <main className="h-screen w-screen flex flex-wrap justify-start items-start bg-black-850">
        <article className="w-full h-full p-5 overflow-y-scroll">
          <h5>Needs:</h5>
          <h5>Data and MetaData</h5>
          <h5>Activate Button</h5>
          <h5>Backtest Button</h5>
          <h5>Progress MetaData</h5>
          <h5>Progress Data</h5>
          <h5>Backtest Data</h5>
        </article>
      </main>
    )
  }
}

export default App
