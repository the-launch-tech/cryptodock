import React from 'react'
import { shell } from 'electron'
import moment from 'moment'

export default ({ openStrategy, strategy, deleteStrategy }) => {
  return (
    <li className="mb-5 w-full h-full flex flex-wrap justify-between items-start p-2 border-b border-solid border-white-650">
      <div className="w-7/12 mb-1 pr-2">
        <h6
          className="text-tiny font-head flex items-center justify-start mb-3 transition-all transition-200 hover:text-red-2 cursor-pointer"
          onClick={e => openStrategy(e, strategy.id)}
        >
          <div
            className={`${
              strategy.status === 'active' ? 'bg-green-2' : 'bg-yellow-2'
            } rounded-full top-20 right-20 mr-3`}
            style={{ width: 20, height: 20 }}
          ></div>
          {strategy.label && strategy.label.length > 1 ? strategy.label : strategy.name}
        </h6>
        <p className="font-body font-hairline text-white-850">{strategy.description}</p>
      </div>
      <div className="w-5/12 mb-1 flex flex-col justify-end items-end pl-2 border-l border-solid border-white-400">
        <small className="mt-1 font-body text-tiny font-hairline">
          <i className="text-white-850">Last Updated:</i>{' '}
          <strong className="ml-2 text-red-1">{moment(strategy.updated).format('LLL')}</strong>
        </small>
        <small className="mt-1 font-body text-tiny font-hairline">
          <i className="text-white-850">Created At:</i>{' '}
          <strong className="ml-2 text-red-1">{moment(strategy.created).format('LLL')}</strong>
        </small>
      </div>
      <div className="w-full flex justify-between items-center">
        <pre
          className="w-full text-tiny text-yellow-2 pt-1 transition-all transition-200 hover:text-red-2 cursor-pointer"
          onClick={() => shell.showItemInFolder(strategy.full_path)}
        >
          {strategy.full_path.length > 40
            ? strategy.full_path.substr(0, 40) + '...'
            : strategy.full_path}
        </pre>
        <button
          type="button"
          className="py-1 px-3 mt-2 bg-tran border border-solid border-red-2 text-white rounded-lg transition transition-200 font-head text-tiny outline-none hover:bg-red-3 active:bg-red-8"
          onClick={e => deleteStrategy(strategy.id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}
