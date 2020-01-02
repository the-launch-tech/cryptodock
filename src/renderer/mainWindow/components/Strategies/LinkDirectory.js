import React from 'react'

export default ({ strategyDirectory, handleSetLinkStrategy }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <button
        type="button"
        className="pt-1 pb-1 pl-3 pr-3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
        onClick={handleSetLinkStrategy}
      >
        Link Directory
      </button>
      <pre className="inline-block text-tiny pt-1 pb-1 pr-2 pl-2 border border-solid border-yellow-2 text-yellow-1 rounded cursor-default">
        {strategyDirectory || 'No Directory Linked'}
      </pre>
    </div>
  )
}
