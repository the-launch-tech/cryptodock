import React from 'react'
import moment from 'moment'

export default ({ strategy, recent }) => {
  const percentDiff = (start, end) => {
    start = start ? parseFloat(start) : 0
    end = end ? parseFloat(end) : 0
    return 100 * Math.abs((start - end) / ((start + end) / 2))
  }

  return (
    <div className="my-5">
      <h5 className="text-center font-head mb-3">Recent Activity</h5>
      {recent && (
        <div className="w-full flex flex-wrap justify-start items-start">
          <div className="w-full flex flex-wrap justify-start items-center border border-b-0 border-solid border-white-400">
            <span className="w-1/4 p-1 text-tiny font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
              Message
            </span>
            <span className="w-1/3 p-1 text-tiny font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
              Time
            </span>
            <span className="w-1/5 p-1 text-tiny font-head font-bold text-gray-0 text-center border-r border-solid border-white-400">
              Funds
            </span>
            <span className="w-1/6 p-1 text-tiny font-head font-bold text-gray-0 text-center">
              Change
            </span>
          </div>
          <div className="w-full flex flex-wrap justify-start items-start border border-solid border-white-400">
            {recent.map(
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
                if (live_event_message !== 'NO_SIGNAL') {
                  return (
                    <div className="w-full flex flex-wrap justify-start items-center border-b border-solid border-white-200">
                      <span className="w-1/4 h-full pl-1 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                        {live_event_message}
                      </span>
                      <pre className="w-1/3 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                        S: {moment(session_start_time).format('M-d-Y hh:mm:ss a')}
                        <br />
                        E: {moment(session_end_time).format('M-d-Y hh:mm:ss a')}
                      </pre>
                      <pre className="w-1/5 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                        S: ${parseFloat(session_start_funds).toFixed(2)}
                        <br />
                        E: ${parseFloat(session_end_funds).toFixed(2)}
                      </pre>
                      <span className="w-1/6 h-full py-1 text-center">
                        <span className="text-gray-0 text-tiny font-body">
                          {percentDiff(session_start_funds, session_end_funds).toFixed(4)}%
                        </span>
                      </span>
                    </div>
                  )
                }
              }
            )}
          </div>
        </div>
      )}
    </div>
  )
}
