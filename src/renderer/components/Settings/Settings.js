import React from 'react'
import { ipcRenderer as ipc } from 'electron'

class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.hanldeMigrationUpload = this.hanldeMigrationUpload.bind(this)
    this.onMigrationUpload = this.onMigrationUpload.bind(this)

    this.state = {
      uploading: false,
    }
  }

  hanldeMigrationUpload(e, type) {
    e.preventDefault()
    this.setState({ uploading: true }, () => {
      ipc.send('migration', { id: type })
    })
  }

  onMigrationUpload(event, arg) {
    this.setState({ uploading: false })
  }

  render() {
    return (
      <div className="p-3 mb-5 border-1 border-solid border-white-200 rounded">
        <button type="button" onClick={e => this.hanldeMigrationUpload(e, 'CREATE')}>
          Upload Migration File
        </button>
        <button type="button" onClick={e => this.hanldeMigrationUpload(e, 'DROP')}>
          Upload Migration Rollback File
        </button>
      </div>
    )
  }
}

export default Settings
