import React from 'react'

export default ({
  newStrategy,
  handleTextChange,
  submitStrategy,
  newStrategyValid,
  cancelSubmit,
}) => {
  return (
    <div className="w-full mt-5 border-1 border-solid border-white-400 p-5 rounded-lg">
      <h5 className="font-head text-center font-thin">New Strategy Details</h5>
      <div className="display flex flex-wrap justify-between items-start">
        <div className="w-1/2 block pl-2 pr-2 mt-2 mb-2">
          <label className="font-head text-tiny">Slug/Name</label>
          <input
            type="text"
            name="name"
            value={newStrategy.name}
            onChange={handleTextChange}
            className="w-1/2 appearance-none block w-full bg-white-650 text-gray-5 border border-red-2-400 rounded py-2 px-2 leading-tight focus:text-gray-5 focus:outline-none focus:bg-white-850 font-head transition-bg transition-200"
          />
        </div>
        <div className="w-1/2 block pl-2 pr-2 mt-2 mb-2">
          <label className="font-head text-tiny">Label</label>
          <input
            type="text"
            name="label"
            value={newStrategy.label}
            onChange={handleTextChange}
            className="w-1/2 appearance-none block w-full bg-white-650 text-gray-3 border border-red-2-400 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white-850 font-head transition-bg transition-200"
          />
        </div>
        <div className="w-full block pl-2 pr-2 mt-2 mb-2">
          <label className="font-head text-tiny">Description</label>
          <textarea
            name="description"
            value={newStrategy.description}
            onChange={handleTextChange}
            className="w-1/2 appearance-none block w-full bg-white-650 text-gray-3 border border-red-2-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white-850 font-head transition-bg transition-200"
          ></textarea>
        </div>
        <div className="w-full flex justify-start items-center pl-2 pr-2 mt-2 mb-2">
          <button
            className="w-1/4 pt-1 pb-1 pr-3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
            type="button"
            onClick={submitStrategy}
            disabled={!newStrategyValid}
          >
            Generate
          </button>
          <button
            className="w-1/4 pt-1 pb-1 pl-3 pr-3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
            type="button"
            onClick={cancelSubmit}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
