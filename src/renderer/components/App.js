import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Overview from './Overview/Overview'
import DBManager from './DBManager/DBManager'
import StrategyLoader from './StrategyLoader/StrategyLoader'
import StrategyManager from './StrategyManager/StrategyManager'
import Logs from './Logs/Logs'

const routes = [
  { link: '/', label: 'Overview', Component: Overview, exact: true },
  { link: '/db-manager', label: 'DB Manager', Component: DBManager },
  { link: '/strategy-loader', label: 'Strategy Loader', Component: StrategyLoader },
  { link: '/strategy-manager', label: 'Strategy Manager', Component: StrategyManager },
  { link: '/logs', label: 'Logs', Component: Logs },
]

class App extends React.Component {
  render() {
    return (
      <main className="h-screen w-screen flex flex-wrap justify-start items-start">
        <header className="w-1/4 h-full bg-gray-7 pt-5 pb-5">
          <Header routes={routes} {...this.props} />
        </header>
        <article className="w-3/4 h-full p-5 overflow-y-scroll">
          <Switch>
            {routes.map(({ link, exact, Component }, i) => (
              <Route
                key={i}
                path={link}
                exact={exact}
                component={() => <Component {...this.props} />}
              />
            ))}
          </Switch>
        </article>
      </main>
    )
  }
}

export default withRouter(App)
