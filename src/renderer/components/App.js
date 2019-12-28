import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Overview from './Overview/Overview'
import Builders from './Builders/Builders'
import DBManager from './DBManager/DBManager'

class App extends React.Component {
  render() {
    return (
      <main className="h-screen w-screen flex flex-wrap justify-start items-start">
        <header className="w-1/4 h-screen">
          <Header />
        </header>
        <article className="w-3/4 h-screen">
          <Switch>
            <Route path="/" exact component={Overview} />
            <Route path="/builders" component={Builders} />
            <Route path="/dbmanager" component={DBManager} />
          </Switch>
        </article>
        <footer className="w-screen p-2"></footer>
      </main>
    )
  }
}

export default App
