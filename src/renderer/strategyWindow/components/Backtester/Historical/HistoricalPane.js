import React from 'react'

export default ({ visibleTests, toggleList, history, session }) => {
  return (
    <div className="w-full flex flex-wrap justify-start items-start">
      <div className="w-full mb-2">
        <h5 className="w-full font-head text-center font-thin">Backtest Results</h5>
        <p className="font-body text-sm font-hairline text-center m-0 text-gray-1">
          View results of historical and session backtests on this strategy.
        </p>
      </div>
      <div className="w-full flex justify-center items-center my-2">
        <button
          className={`outline-none font-head text-green-2 font-tiny mx-3 transition-all transition-100 hover:text-green-2-400 cursor-pointer ${
            visibleTests === 'LAST_TESTS'
              ? 'text-green-2 hover:text-green-2-400'
              : 'text-green-2-400 hover:text-green-2'
          }`}
          type="button"
          onClick={e => toggleList('LAST_TESTS')}
        >
          Session Tests
        </button>
        <button
          className={`outline-none font-head text-green-2 font-tiny mx-3 transition-all transition-100 hover:text-green-2-400 cursor-pointer ${
            visibleTests === 'HISTORICAL_TESTS'
              ? 'text-green-2 hover:text-green-2-400'
              : 'text-green-2-400 hover:text-green-2'
          }`}
          type="button"
          onClick={e => toggleList('HISTORICAL_TESTS')}
        >
          Historical Tests
        </button>
      </div>
      <div className="w-full border border-solid border-white-400 rounded p-2">
        {visibleTests === 'LAST_TESTS' ? (
          <div className="font-body">
            {history && history.length ? (
              <div></div>
            ) : (
              <p className="font-head text-tiny text-center">No History On This Strategy</p>
            )}
          </div>
        ) : (
          <div className="font-body">
            {session && Object.keys(session).length ? (
              <div></div>
            ) : (
              <p className="font-head text-tiny text-center">
                No Backtests Have Been Run This Session
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
