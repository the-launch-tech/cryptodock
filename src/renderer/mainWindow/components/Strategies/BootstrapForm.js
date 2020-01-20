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
          <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
            Slug/Name
          </label>
          <input
            type="text"
            name="name"
            value={newStrategy.name}
            onChange={handleTextChange}
            className="w-full appearance-none block bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
          />
        </div>
        <div className="w-1/2 block pl-2 pr-2 mt-2 mb-2">
          <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
            Label
          </label>
          <input
            type="text"
            name="label"
            value={newStrategy.label}
            onChange={handleTextChange}
            className="w-full appearance-none block bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
          />
        </div>
        <div className="w-full block pl-2 pr-2 mt-2 mb-2">
          <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={newStrategy.description}
            onChange={handleTextChange}
            className="w-full appearance-none block bg-tran text-white-850 border border-gray-1-400 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
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
