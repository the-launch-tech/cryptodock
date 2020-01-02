import React from 'react'
import { withRouter } from 'react-router'
import { Link, Switch, Route } from 'react-router-dom'
import Details from './components/Details/Details'
import Backtester from './components/Backtester/Backtester'
import Activity from './components/Activity/Activity'
import Header from './components/Header'

const { error, log } = console

const routes = [
  { link: '/', label: 'Details', Component: Details, exact: true },
  { link: '/backtesting', label: 'Backtester', Component: Backtester, exact: true },
  { link: '/activity', label: 'Activity', Component: Activity, exact: true },
]

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
          <Header routes={routes} {...this.state} {...this.props} />
        </header>
        <article className="w-3/4 h-full p-5 overflow-y-scroll">
          <Switch>
            {routes.map(({ link, exact, Component }, i) => (
              <Route
                key={i}
                path={link}
                exact={exact}
                component={() => <Component {...this.props} {...this.state} />}
              />
            ))}
          </Switch>
        </article>
      </main>
    )
  }
}

export default withRouter(App)
