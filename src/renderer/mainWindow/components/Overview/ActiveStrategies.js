import React from 'react'
import { shell } from 'electron'

export default ({ activeStrategies, openStrategy }) => {
  return (
    <div className="w-full flex flex-wrap justify-between items-start">
      {activeStrategies.map((strategy, i) => (
        <div className="w-full p-1" key={i}>
          <div className="w-full p-2 border border-solid border-white-400 rounded-lg">
            <div className="w-full flex justify-end items-center mb-1">
              <div
                className={`${
                  strategy.status === 'active' ? 'text-green-2' : 'text-yellow-2'
                } ml-3 rounded-full mr-3 cursor-pointer`}
              >
                {strategy.status === 'active' ? 'Active Session' : 'Inactive'}
              </div>
              {strategy.backtest_status && (
                <div className="text-green-2 ml-3 rounded-full mr-3 cursor-pointer">
                  Backtesting
                </div>
              )}
            </div>
            <h6
              className="font-head text-sm text-gray-0 transition-200 transition-all cursor-pointer hover:text-red-2 active:text-gray-0"
              onClick={e => openStrategy(e, strategy.id)}
            >
              {strategy.label}
            </h6>
            <p className="font-body text-tiny font-hairline text-gray-0 mb-1">
              {strategy.description}
            </p>
            <pre
              className="text-tiny text-yellow-2 transition-all transition-200 cursor-pointer hover:text-red-2 active:text-yellow-2"
              onClick={() => shell.showItemInFolder(strategy.full_path)}
            >
              {strategy.full_path.length > 40
                ? strategy.full_path.substr(0, 40) + '...'
                : strategy.full_path}
            </pre>
          </div>
        </div>
      ))}
    </div>
  )
}
