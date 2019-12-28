import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import App from './components/App'
import './assets/app.scss'

if (module.hot) {
  module.hot.accept()
}

console.log(global)

ipcRenderer.send('renderer-ping', 'ping')

ipcRenderer.on('renderer-pong', (event, arg) => {
  console.log('Renderer IPC Ponged')
})

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('app')
)

console.log('👋 This message is being logged by renderer, included via webpack')
