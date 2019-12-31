import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Strategies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      strategyDirectory: null,
      loadedStrategies: [
        {
          id: 1,
          active: false,
          name: 'Bollinger Extended',
          description: 'Bollinger Bands based strategy with other Technical Analysis utilities.',
          exchange: ['CoinbasePro'],
          created: moment().format('LL'),
          updated: moment(new Date(2019, 12, 16)).format('LL'),
          fullPath: '/Users/danielgriffiths/Desktop/strategies/bollinger-extended',
        },
        {
          id: 2,
          active: true,
          name: 'Rolling Moving Average',
          description:
            'Using a combination of RMA and EWMA along with a Statistical Arbetrage methodology.',
          exchange: ['Kraken', 'Binance', 'CoinbasePro'],
          created: moment(new Date(2019, 9, 16)).format('LL'),
          updated: moment(new Date(2019, 10, 12)).format('LL'),
          fullPath: '/Users/danielgriffiths/Desktop/strategies/rma',
        },
      ],
    }
  }

  handleLinkStrategy(e) {
    e.preventDefault()
  }

  editStrategy(e, strategy) {}

  render() {
    return (
      <div className="pt-5 pb-5 w-full h-full flex flex-col justify-start items-center">
        <h4 className="font-display text-red-2 cursor-default">Strategy Loader</h4>
        <div className="w-full mt-5 border-1 border-solid border-white-400 p-5 rounded-lg flex justify-between items-center">
          <button
            type="button"
            className="pt-1 pb-1 pl-3 pr-3 bg-tran border-1 border-solid border-red-2 text-white rounded-lg transition transition-200 font-head mr-2 ml-2 text-tiny outline-none hover:bg-red-3 active:bg-red-8 disabled:bg-gray-1-100 disabled:border-red-1-200 disabled:cursor-default"
            onClick={this.handleLinkStrategy}
          >
            Link Directory
          </button>
          <pre className="inline-block text-tiny pt-1 pb-1 pr-2 pl-2 border border-solid border-yellow-2 text-yellow-1 rounded cursor-default">
            {this.state.strategyDirectory || 'No Directory Linked'}
          </pre>
        </div>
        <div className="h-full w-full mt-5 p-5 rounded-lg">
          <h5 className="font-head text-white font-thin text-center cursor-default">
            Loaded Strategies
          </h5>
          <div className="mt-5 pl-2 pr-2 pt-0 pb-0 border-1 border-solid border-white-400 rounded-lg pt-5">
            {this.state.loadedStrategies ? (
              <ul>
                {this.state.loadedStrategies.map((strategy, i) => (
                  <li key={i} className="mb-5">
                    <Link
                      to={{
                        pathname: `/strategies/${strategy.id}`,
                        state: { strategy },
                      }}
                      className="w-full h-full flex flex-wrap justify-between items-start p-2 transition-bg transition-200 bg-tran border-b border-solid border-white-650 hover:bg-white-100 active:bg-tran"
                    >
                      <div className="w-7/12 mb-3 pr-2">
                        <h6 className="text-tiny font-head flex items-center justify-start mb-3">
                          <div
                            className={`${
                              strategy.active ? 'bg-green-2' : 'bg-yellow-2'
                            } rounded-full top-20 right-20 mr-3`}
                            style={{ width: 20, height: 20 }}
                          >
                            {strategy.active}
                          </div>
                          {strategy.name}
                        </h6>
                        <p className="font-body font-hairline text-white-850">
                          {strategy.description}
                        </p>
                      </div>
                      <div className="w-5/12 mb-3 flex flex-col justify-start items-start pl-2 border-l border-solid border-white-400">
                        <ul className="m-0 p-0 list-none">
                          {strategy.exchange &&
                            strategy.exchange.map(exchange => (
                              <li key={exchange} className="font-body text-tiny text-red-1">
                                {exchange}
                              </li>
                            ))}
                        </ul>
                        <small className="mt-1 font-body text-tiny font-hairline">
                          <i className="text-white-850">Last Updated:</i>{' '}
                          <strong className="ml-2 text-red-1">{strategy.updated}</strong>
                        </small>
                        <small className="mt-1 font-body text-tiny font-hairline">
                          <i className="text-white-850">Created At:</i>{' '}
                          <strong className="ml-2 text-red-1">{strategy.created}</strong>
                        </small>
                      </div>
                      <pre className="w-full text-tiny text-yellow-2 border-t border-solid border-white-400 pt-2">
                        {strategy.fullPath}
                      </pre>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <h6 className="font-body text-white font-thin text-center cursor-default">
                No Loaded Strategies
              </h6>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Strategies
