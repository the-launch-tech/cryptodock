import React from 'react'

export default ({ history }) => {
  return (
    <div className="w-full flex flex-wrap justify-start items-start">
      <div className="w-full mb-2">
        <h5 className="w-full font-head text-center font-thin">Backtest Results</h5>
        <p className="font-body text-sm font-hairline text-center m-0 text-gray-1">
          View backtesting activity on this strategy.
        </p>
      </div>
      <div className="w-full border border-solid border-white-400 rounded p-2">
        <div className="font-body">
          {history && Object.keys(history).length ? (
            <div></div>
          ) : (
            <p className="font-head text-tiny text-center">No Activity Available</p>
          )}
        </div>
      </div>
    </div>
  )
}
