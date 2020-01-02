import React from 'react'
import Snippet from './Snippet'

export default ({ loadedStrategies, openStrategy }) => {
  return (
    <div className="h-full w-full mt-5 p-5 rounded-lg">
      <h5 className="font-head text-white font-thin text-center cursor-default">
        Loaded Strategies
      </h5>
      <div className="mt-5 pl-2 pr-2 pt-0 pb-0 border-1 border-solid border-white-400 rounded-lg pt-5">
        {loadedStrategies && Array.isArray(loadedStrategies) ? (
          <ul>
            {loadedStrategies.map((strategy, i) => (
              <Snippet key={i} strategy={strategy} openStrategy={openStrategy} />
            ))}
          </ul>
        ) : (
          <h6 className="font-body text-white font-thin text-center cursor-default pb-5">
            No Loaded Strategies
          </h6>
        )}
      </div>
    </div>
  )
}
