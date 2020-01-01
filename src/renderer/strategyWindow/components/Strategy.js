import React from 'react'
import { ipcRenderer as ipc } from 'electron'
import { Link } from 'react-router-dom'

const log = console.log
const error = console.error

export default class Strategy extends React.Component {
  constructor(props) {
    super(props)

    this.getStrategyById = this.getStrategyById.bind(this)
    this.onGetStrategyById = this.onGetStrategyById.bind(this)

    this.state = {
      strategy: null,
    }
  }

  componentDidMount() {
    console.log(this.props, this.state)
    if (this.props.location && this.props.location.state) {
      this.setState({ strategy: this.props.location.state.strategy }, () => {
        log('Strategy Set On Mount')
      })
    } else {
      this.getStrategyById()
    }
  }

  getStrategyById() {
    // ipc.send(`strategyWindow-${id}.strategy`, {
    //   id: 'GET_BY_ID',
    //   data: { id: this.props.location.pathname.substr(-12) },
    // })
  }

  onGetStrategyById(event, strategy) {
    this.setState({ strategy }, () => {
      log('Strategy Set After onGetStrategyById')
    })
  }

  render() {
    const { strategy } = this.props

    return (
      <div className="relative">
        <Link className="absolute top-0 left-0 pl-2 pt-2" to="/strategies">
          Back
        </Link>
        <h5>Single Strategy</h5>
      </div>
    )
  }
}
