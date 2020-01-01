import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Overview from './components/Overview/Overview'
import Database from './components/Database/Database'
import Table from './components/Database/Table'
import Strategies from './components/Strategies/Strategies'
import Logs from './components/Logs/Logs'

const routes = [
  { link: '/', label: 'Overview', Component: Overview, exact: true },
  { link: '/database', label: 'Database', Component: Database, exact: true },
  { link: '/strategies', label: 'Strategies', Component: Strategies, exact: true },
  { link: '/database/:id', label: null, Component: Table },
]

class App extends React.Component {
  render() {
    return (
      <main className="h-screen w-screen flex flex-wrap justify-start items-start bg-black-850">
        <header className="w-1/4 h-full bg-gray-3-400 pt-10 pb-0">
          <Header routes={routes} {...this.props} />
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
