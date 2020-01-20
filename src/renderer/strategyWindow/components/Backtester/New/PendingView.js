import React from 'react'
import moment from 'moment'

export default ({ currentData, toggleActivation }) => {
  return (
    <div className="w-full flex flex-wrap justify-center items-center my-5">
      <h3 className="w-full font-head text-center font-thin">Backtester Running...</h3>
      <ul>
        <li>{currentData.custom ? 'Custom Backtester' : 'CryptoDock Backtester'}</li>
        <li>
          Start: <b>{moment(currentData.start).format('LLLL')}</b>
        </li>
        <li>
          End: <b>{moment(currentData.end).format('LLLL')}</b>
        </li>
        <li>
          Funds: <b>{currentData.funds} (USD)</b>
        </li>
        <li>
          Granularity: <b>{currentData.granularity} (seconds)</b>
        </li>
        <li>
          Description: <p>{currentData.description}</p>
        </li>
      </ul>
      <button onClick={toggleActivation} className="" type="button">
        Cancel Test
      </button>
    </div>
  )
}
