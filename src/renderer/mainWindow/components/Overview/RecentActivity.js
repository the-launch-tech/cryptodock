import React from 'react'
import moment from 'moment'

export default ({ recentActivity }) => {
  const percentDiff = (start, end) => {
    start = start ? parseFloat(start) : 0
    end = end ? parseFloat(end) : 0
    return 100 * Math.abs((start - end) / ((start + end) / 2))
  }

  return (
    <div className="w-full flex flex-wrap justify-start items-start">
      <div className="w-full flex flex-wrap justify-start items-center border border-b-0 border-solid border-white-400">
        <span className="w-3/5 p-1 font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
          Strategy
        </span>
        <span className="w-1/5 p-1 font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
          Message
        </span>
        <span className="w-1/5 p-1 font-head font-bold text-gray-0 text-center">Change</span>
      </div>
      <div className="w-full flex flex-wrap justify-start items-start border border-solid border-white-400">
        {recentActivity.map(
          (
            {
              strategy_label,
              strategy_id,
              session_start_time,
              session_end_time,
              session_start_funds,
              session_end_funds,
              session_granularity,
              live_session_id,
              live_event_message,
            },
            i
          ) => {
            return (
              <div className="w-full flex flex-wrap justify-start items-center border-b border-solid border-white-200">
                <span className="w-3/5 pl-3 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                  {strategy_label}
                </span>
                <pre className="w-1/5 pl-3 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                  {live_event_message}
                </pre>
                <span className="w-1/5 py-1 text-center">
                  <span className="text-gray-0 text-tiny font-body">
                    {percentDiff(session_start_funds, session_end_funds).toFixed(4)}%
                  </span>
                </span>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}
