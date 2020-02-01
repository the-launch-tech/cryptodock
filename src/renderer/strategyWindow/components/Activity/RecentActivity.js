import React from 'react'
import moment from 'moment'

export default ({ strategy, recent }) => {
  return (
    <div className="my-5">
      {recent && recent.length ? (
        <React.Fragment>
          <h5 className="text-center font-head mb-3 font-normal">Recent Activity</h5>
          <div className="w-full flex flex-wrap justify-start items-start border border-solid border-white-400">
            {recent.map((e, i) => {
              if (e.e__message === 'SIGNAL_QUEUED') {
                return (
                  <div className="w-full flex flex-wrap justify-start items-center border-b border-solid border-white-200">
                    <span className="w-1/4 h-full pl-1 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      Signal Queued
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.s__direction}
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.s__pair}
                    </span>
                    <span className="w-1/4 h-full py-1 text-center">{e.s__exchange}</span>
                  </div>
                )
              } else if (e__message === 'ORDER_PLACED') {
                return (
                  <div className="w-full flex flex-wrap justify-start items-center border-b border-solid border-white-200">
                    <span className="w-1/4 h-full pl-1 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      Order Placed
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.o__pair}, {e.o__exchange}
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.o__base_size} / {e.o__quote_size}
                    </span>
                    <span className="w-1/4 h-full py-1 text-center">{e.o__side}</span>
                  </div>
                )
              } else if (e__message === 'ORDER_FILLED') {
                return (
                  <div className="w-full flex flex-wrap justify-start items-center border-b border-solid border-white-200">
                    <span className="w-1/4 h-full pl-1 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      Order Filled
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.f__pair}, {e.f__exchange}
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.f_size}
                    </span>
                    <span className="w-1/4 h-full py-1 text-center">{e.f_side}</span>
                  </div>
                )
              } else if (e__message === 'ORDER_CANCELLED') {
                return (
                  <div className="w-full flex flex-wrap justify-start items-center border-b border-solid border-white-200">
                    <span className="w-1/4 h-full pl-1 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      Order Cancelled
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.o__pair}, {e.o__exchange}
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.o__base_size} / {e.o__quote_size}
                    </span>
                    <span className="w-1/4 h-full py-1 text-center">{e.o__side}</span>
                  </div>
                )
              } else if (e__message === 'SESSION_STARTED') {
                return (
                  <div className="w-full flex flex-wrap justify-start items-center border-b border-solid border-white-200">
                    <span className="w-1/4 h-full pl-1 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      Session Started
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.n__label}
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.n__start_time}
                    </span>
                    <span className="w-1/4 h-full py-1 text-center">{e.n__granularity}</span>
                  </div>
                )
              } else if (e__message === 'SESSION_FINISHED') {
                return (
                  <div className="w-full flex flex-wrap justify-start items-center border-b border-solid border-white-200">
                    <span className="w-1/4 h-full pl-1 py-1 font-head text-tiny text-gray-0 border-r border-solid border-white-200">
                      Session Ended
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.n__label}
                    </span>
                    <span className="w-1/4 h-full pl-1 py-1 text-tiny text-gray-0 border-r border-solid border-white-200">
                      {e.n__start_time}
                    </span>
                    <span className="w-1/4 h-full py-1 text-center">{e.n__end_time}</span>
                  </div>
                )
              }
            })}
          </div>
        </React.Fragment>
      ) : (
        <div className="my-10 w-full">
          <p className="font-head text-sm font-normal text-center cursor-default">
            No Recent Activity
          </p>
        </div>
      )}
    </div>
  )
}
