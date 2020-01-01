import React from 'react'
import ReactDOM from 'react-dom'
import querystring from 'querystring'
import { HashRouter } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import MainApp from './mainWindow/App'
import StrategyApp from './strategyWindow/App'
import './assets/app.scss'

const { log, error } = console

if (module.hot) {
  module.hot.accept()
}

const query = querystring.parse(window.location.search)
query.type = query['?type']
delete query['?type']

const loadWindow = async App => {
  try {
    return await ReactDOM.render(
      <HashRouter>
        <App />
      </HashRouter>,
      document.getElementById('app')
    )
  } catch (e) {
    error('Error Loading Window', e)
  }
}

const sendSuccessPing = loadedApp => {
  if (loadedApp) {
    ipcRenderer.send('app.renderer-PING', query)
    ipcRenderer.once('res--app.renderer-PING', (event, arg) => log('Renderer IPC Ponged', arg))
  }
}

if (query.type === 'mainWindow') {
  loadWindow(MainApp)
    .then(sendSuccessPing)
    .catch(error)
} else if (query.type === 'strategyWindow') {
  loadWindow(StrategyApp)
    .then(sendSuccessPing)
    .catch(error)
}
