import React from 'react'
import Meta from './Meta'

export default ({ strategy, toggleActivation }) => {
  console.log('Details', strategy)
  return (
    <div>
      {strategy && <Meta strategy={strategy} toggleActivation={toggleActivation} />}
      <div>
        <h3>Recent Activity</h3>
        <div></div>
      </div>
    </div>
  )
}
