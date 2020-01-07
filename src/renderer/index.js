import React from 'react'
import ReactDOM from 'react-dom'
import querystring from 'querystring'
import { HashRouter } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import MainApp from './mainWindow/App'
import StrategyApp from './strategyWindow/App'
import './assets/app.scss'
import './assets/atom-one-dark.css'

const { log, error } = console

if (module.hot) {
  module.hot.accept()
}

const query = querystring.parse(window.location.search)
query.type = query['?type']
delete query['?type']

const loadWindow = async App => {
  if (App) {
    ipcRenderer.send('app.renderer-PING', query)
    ipcRenderer.once('res--app.renderer-PING', (event, arg) => log('Renderer IPC Ponged', arg))
  }

  try {
    return await ReactDOM.render(
      <HashRouter>
        <App type={query.type} id={query.id} />
      </HashRouter>,
      document.getElementById('app')
    )
  } catch (e) {
    error('Error Loading Window', e)
  }
}

if (query.type === 'mainWindow') {
  loadWindow(MainApp).catch(error)
} else if (query.type === 'strategyWindow') {
  loadWindow(StrategyApp).catch(error)
}
