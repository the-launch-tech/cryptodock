import React from 'react'
import moment from 'moment'
import { shell } from 'electron'

export default ({ strategy, toggleActivation }) => {
  console.log('Meta', strategy)
  return (
    <div>
      <h3>Strategy Meta</h3>
      <div className="w-7/12 mb-3 pr-2">
        <div
          className={`${
            strategy.status === 'active' ? 'bg-green-2' : 'bg-yellow-2'
          } rounded-full top-20 right-20 mr-3 cursor-pointer`}
          style={{ width: 20, height: 20 }}
          onClick={toggleActivation}
        ></div>
        <h6 className="text-tiny font-head flex items-center justify-start mb-3">
          {strategy.label && strategy.label.length > 1 ? strategy.label : strategy.name}
        </h6>
        <p className="font-body font-hairline text-white-850">{strategy.description}</p>
      </div>
      <div className="w-5/12 mb-3 flex flex-col justify-start items-start pl-2 border-l border-solid border-white-400">
        <small className="mt-1 font-body text-tiny font-hairline">
          <i className="text-white-850">Last Updated:</i>{' '}
          <strong className="ml-2 text-red-1">{moment(strategy.updated).format('LLL')}</strong>
        </small>
        <small className="mt-1 font-body text-tiny font-hairline">
          <i className="text-white-850">Created At:</i>{' '}
          <strong className="ml-2 text-red-1">{moment(strategy.created).format('LLL')}</strong>
        </small>
      </div>
      <pre
        className="w-full text-tiny text-yellow-2 border-t border-solid border-white-400 pt-2 transition-all transition-200 hover:text-red-2 cursor-pointer"
        onClick={() => shell.showItemInFolder(strategy.full_path)}
      >
        {strategy.full_path}
      </pre>
    </div>
  )
}
