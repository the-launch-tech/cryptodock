import React from 'react'
import moment from 'moment'
import { shell } from 'electron'
import Meta from './Meta'

export default class Details extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  toggleActivation(e) {
    e.preventDefault()
  }

  render() {
    const { strategy } = this.props
    return (
      <div>
        {strategy && <Meta strategy={strategy} toggleActivation={this.toggleActivation} />}
        <div>
          <h3>Recent Activity</h3>
          <div></div>
        </div>
      </div>
    )
  }
}
