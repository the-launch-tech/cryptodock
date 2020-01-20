import React from 'react'
import { withRouter } from 'react-router'
import { Link, Switch, Route } from 'react-router-dom'
import Backtester from './components/Backtester/Backtester'
import Activity from './components/Activity/Activity'
import Header from './components/Header'

const { error, log } = console

const routes = [
  { link: '/', label: 'Activity', Component: Activity, exact: true },
  { link: '/backtesting', label: 'Backtester', Component: Backtester, exact: true },
]

class App extends React.Component {
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
