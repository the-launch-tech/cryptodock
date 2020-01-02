import React from 'react'

export default ({ bootstrapStrategy, addingNew }) => {
  return (
    <button
      type="button"
      className="w-full pt-1 pb-1 pl-3 pr-3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
      onClick={bootstrapStrategy}
      disabled={addingNew}
    >
      Boostrap New Strategy
    </button>
  )
}
