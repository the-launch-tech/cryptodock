import React from 'react'
import NewTestForm from './NewTestForm'
import PendingView from './PendingView'

export default ({
  strategy,
  handleTextChange,
  handleChoiceChange,
  toggleActivation,
  invalidInput,
  currentData,
}) => {
  return (
    <div>
      <div className="w-full mb-2">
        <h5 className="w-full font-head text-center font-thin">New Backtest</h5>
        <p className="font-body text-sm font-hairline text-center m-0 text-gray-1">
          Initialize and run a backtest on the selected strategy.
        </p>
      </div>
      {!strategy || strategy.backtester_status !== 'active' ? (
        <NewTestForm
          handleTextChange={handleTextChange}
          handleChoiceChange={handleChoiceChange}
          toggleActivation={toggleActivation}
          invalidInput={invalidInput}
        />
      ) : (
        <PendingView currentData={currentData} toggleActivation={toggleActivation} />
      )}
    </div>
  )
}
