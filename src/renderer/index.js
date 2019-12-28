import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './components/App'
import './assets/app.scss'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('app')
)

console.log('👋 This message is being logged by renderer, included via webpack')
