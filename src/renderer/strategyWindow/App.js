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
        <header className="w-1/4 h-full bg-gray-3-400 pt-10 pb-0">
          <h2>Strategy Window</h2>
        </header>
        <article className="w-3/4 h-full p-5 overflow-y-scroll">
          <p>This is a strategy window</p>
        </article>
      </main>
    )
  }
}

export default App
