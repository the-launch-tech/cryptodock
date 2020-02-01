import React from 'react'
import moment from 'moment'
import { shell } from 'electron'

export default ({ strategy, toggleActivation, sessionLabel, handleTextChange }) => {
  return (
    <div className="flex flex-wrap justify-start items-start">
      <div className="flex justify-center items-center w-full">
        <h3 className="font-display text-red-2">Meta</h3>
        <div
          className={`${
            strategy.status === 'active' ? 'bg-green-2' : 'bg-yellow-2'
          } ml-3 rounded-full mr-3 cursor-pointer`}
          style={{ width: 20, height: 20 }}
        ></div>
      </div>
      <div className="w-full my-5 block border border-solid border-white-400 rounded p-3">
        <p className="text-tiny font-head flex items-center justify-start font-hairline my-1">
          Strategy Name:{' '}
          <strong className="text-tiny font-semibold ml-3">
            {strategy.label && strategy.label.length > 1 ? strategy.label : strategy.name}
          </strong>
        </p>
        <p className="text-tiny font-head flex items-center justify-start font-hairline my-1">
          Strategy Description:{' '}
          <strong className="text-tiny font-semibold ml-3 font-body">{strategy.description}</strong>
        </p>
        <p className="text-tiny font-head flex items-center justify-start font-hairline my-1">
          Last Updated:{' '}
          <strong className="text-tiny font-hairline ml-3 font-body">
            {moment(strategy.updated).format('LLL')}
          </strong>
        </p>
        <p className="text-tiny font-head flex items-center justify-start font-hairline my-1">
          Created At:{' '}
          <strong className="text-tiny font-hairline ml-3 font-body">
            {moment(strategy.created).format('LLL')}
          </strong>
        </p>
        <div className="text-tiny font-head flex items-center justify-start font-hairline my-1">
          Full Path:
          <pre
            className="ml-3 inline text-tiny text-yellow-2 transition-all transition-200 hover:text-red-2 cursor-pointer"
            onClick={() => shell.showItemInFolder(strategy.full_path)}
          >
            {strategy.full_path}
          </pre>
        </div>
      </div>
      <div className="w-full flex flex-start items-center">
        <input
          className="w-1/2 h-full mr-2 appearance-none bg-tran text-white-850 border border-gray-1-400 transition-all transition-100 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
          type="text"
          name="session_label"
          id="session_label"
          onChange={handleTextChange}
          defaultValue="Test Session"
          placeholder="Add a session label..."
        />
        <button
          type="button"
          className={`h-full py-2 px-3 bg-tran border border-solid border-red-2 text-white rounded transition transition-100 font-head text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default ${
            strategy.status === 'active'
              ? 'border-red-2 hover:bg-red-3 active:bg-red-8'
              : 'border-green-2 hover:bg-green-3 active:bg-green-8'
          }`}
          disabled={!sessionLabel}
          onClick={toggleActivation}
        >
          {strategy.status === 'active' ? 'Stop Trading' : 'Start Trading'}
        </button>
      </div>
    </div>
  )
}
