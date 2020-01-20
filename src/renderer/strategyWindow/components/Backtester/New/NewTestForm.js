import React from 'react'
import fields from './fields'

export default ({ handleTextChange, handleChoiceChange, toggleActivation, invalidInput }, i) => {
  return (
    <div className="w-full flex flex-wrap justify-between items-start">
      {fields.map(({ name, label, defaultValue, value, width, min, max, placeholder, type }) => {
        if (type === 'textarea') {
          return (
            <div key={name} className={`${width} block pl-2 pr-2 mt-1 mb-1`}>
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                {label}
              </label>
              <textarea
                name={name}
                defaultValue={defaultValue}
                onChange={handleTextChange}
                placeholder={placeholder}
                className="w-full appearance-none block bg-tran text-white-850 border border-gray-1-400 transition-all transition-100 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
              ></textarea>
            </div>
          )
        } else if (type === 'checkbox') {
          return (
            <div key={name} className={`${width} block pl-2 pr-2 mt-1 mb-1`}>
              <label
                className={`flex justify-start items-center uppercase tracking-wide text-white text-tiny font-head font-bold mb-2`}
              >
                <input
                  className="pr-2 mr-2 transition-all transition-100"
                  type="checkbox"
                  name={name}
                  value={value}
                  onChange={handleChoiceChange}
                />
                {label}
              </label>
            </div>
          )
        } else {
          return (
            <div key={name} className={`${width} block pl-2 pr-2 mt-1 mb-1`}>
              <label className="block uppercase tracking-wide text-white text-tiny font-head font-bold mb-2">
                {label}
              </label>
              <input
                className="w-full appearance-none block bg-tran text-white-850 border border-gray-1-400 transition-all transition-100 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-3-200 focus:border-gray-2-400 noselect"
                type="number"
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                min={min}
                max={max}
                onChange={handleTextChange}
              />
            </div>
          )
        }
      })}
      <div className="w-full p-2 block">
        <button
          className="py-2 px-3 bg-tran border-1 border-solid border-red-2 text-white rounded transition transition-100 font-head text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
          type="button"
          onClick={toggleActivation}
          disabled={invalidInput()}
        >
          Run Backtest
        </button>
      </div>
    </div>
  )
}
