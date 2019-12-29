import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { ipcRenderer as ipc } from 'electron'
import App from './components/App'
import './assets/app.scss'

if (module.hot) {
  module.hot.accept()
}

ipc.send('renderer-PING', 'ping')

ipc.on('res--renderer-PING', (event, arg) => {
  console.log('Renderer IPC Ponged')
})

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('app')
)

console.log('👋 This message is being logged by renderer, included via webpack')
