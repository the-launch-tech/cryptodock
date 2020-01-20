import React from 'react'

export default ({ visibleView, toggleView }) => {
  return (
    <div className="w-full flex justify-center items-center my-2">
      <button
        className={`outline-none font-head text-yellow-2 font-tiny mx-3 transition-all transition-100 hover:text-yellow-2-400 cursor-pointer ${
          visibleView === 'NEW_TEST'
            ? 'text-yellow-2 hover:text-yellow-2-400'
            : 'text-yellow-2-400 hover:text-yellow-2'
        }`}
        type="button"
        onClick={e => toggleView('NEW_TEST')}
      >
        New Test
      </button>
      <button
        className={`outline-none font-head text-yellow-2 font-tiny mx-3 transition-all transition-100 hover:text-yellow-2-400 cursor-pointer ${
          visibleView === 'DATA_ANALYSIS'
            ? 'text-yellow-2 hover:text-yellow-2-400'
            : 'text-yellow-2-400 hover:text-yellow-2'
        }`}
        type="button"
        onClick={e => toggleView('DATA_ANALYSIS')}
      >
        Data And Analytics
      </button>
    </div>
  )
}
