import React from 'react'
import moment from 'moment'

export default ({ recentActivity }) => {
  return (
    <div className="w-full flex flex-wrap justify-start items-start">
      <div className="w-full flex flex-wrap justify-start items-center border border-b-0 border-solid border-white-400">
        <span className="w-3/5 p-1 font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
          Strategy
        </span>
        <span className="w-1/5 p-1 font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
          Session
        </span>
        <span className="w-1/5 p-1 font-head font-bold text-gray-0 text-center">Message</span>
      </div>
      <div className="w-full flex flex-wrap justify-start items-start border border-solid border-white-400">
        {recentActivity.map(({ s__label, n__label, e__message }, i) => {
          return (
            <div className="w-full flex flex-wrap justify-start items-center border-b border-solid border-white-200">
              <span className="w-3/5 pl-3 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                {s__label}
              </span>
              <span className="w-3/5 pl-3 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                {n__label}
              </span>
              <pre className="w-1/5 pl-3 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                {e__message}
              </pre>
            </div>
          )
        })}
      </div>
    </div>
  )
}
