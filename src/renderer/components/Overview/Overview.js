import React from 'react'

export default class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeStrategy: false,
    }
  }

  render() {
    return (
      <div className="h-full">
        {this.state.activeStrategy ? (
          <React.Fragment />
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="font-display text-red-2 cursor-default">CryptoDock</h2>
            <div className="mt-10 border-1 border-solid border-white-400 p-5 rounded-lg">
              <p className="font-head text-lg text-center cursor-default">No Active Strategies</p>
            </div>
          </div>
        )}
      </div>
    )
  }
}
