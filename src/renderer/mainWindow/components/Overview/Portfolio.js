import React from 'react'
import * as d3 from 'd3'

const { log, error } = console

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props)

    this.charts = {}
    this.size = 250

    this.createChartRef = this.createChartRef.bind(this)
    this.hasAccounts = this.hasAccounts.bind(this)
    this.createCharts = this.createCharts.bind(this)

    this.state = {}
  }

  componentDidMount() {
    if (this.hasAccounts()) {
      this.createCharts()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.accounts !== prevProps.accounts) {
      if (this.hasAccounts()) {
        this.createCharts()
      }
    }
  }

  hasAccounts() {
    return (
      this.props.accounts &&
      Object.keys(this.props.accounts) &&
      Object.keys(this.props.accounts).length &&
      Object.keys(this.charts)
    )
  }

  createChartRef(ref, key) {
    this.charts[key] = ref
  }

  createCharts() {
    Object.keys(this.charts).map(key => {
      const data = this.props.accounts.exchanges[key].accounts
      const chart = this.charts[key]
      const svg = d3.create('svg')
      svg.attr('width', this.size)
      svg.attr('height', this.size)
      const radius = Math.min(this.size, this.size) / 2
      const g = svg
        .append('g')
        .attr('transform', 'translate(' + this.size / 2 + ',' + this.size / 2 + ')')
      const color = d3.scaleOrdinal(['#D55A54', '#405466', '#77BA7C', '#405466', '#818283'])
      const pie = d3.pie().value(d => d.balance_USD)
      const path = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0)
      const label = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius - 80)
      const arc = g
        .selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')
      arc
        .append('path')
        .attr('d', path)
        .attr('fill', d => color(d.data.currency))
      arc
        .append('text')
        .attr('stroke', '#fff')
        .attr('fill', '#fff')
        .attr('font-family', 'Nord')
        .attr('font-weight', 100)
        .attr('font-size', '9px')
        .attr('transform', d => 'translate(' + label.centroid(d) + ')')
        .text(d => d.data.currency)
      chart.append(svg.node())
    })
  }

  render() {
    const { accounts } = this.props
    return (
      <div className="w-full">
        <h5 className="font-head text-gray-0 font-thin text-center">Your Portfolio</h5>
        <div className="w-full">
          <div className="text-left my-5 mx-auto border border-solid border-white-200 rounded p-2 w-1/2">
            <p className="font-head text-tiny text-gray-0 flex justify-between items-center">
              Current Holdings:{' '}
              <span className="text-yellow-2 ml-3 font-head">{accounts.total.toFixed(2)} USD</span>
            </p>
            <p className="font-head text-tiny text-gray-0 flex justify-between items-center">
              Kucoin:{' '}
              <span className="text-yellow-2 ml-3 font-head">
                {accounts.exchanges.kucoin.total.toFixed(2)} USD
              </span>
            </p>
            <p className="font-head text-tiny text-gray-0 flex justify-between items-center">
              CoinbasePro:{' '}
              <span className="text-yellow-2 ml-3 font-head">
                {accounts.exchanges.coinbasepro.total.toFixed(2)} USD
              </span>
            </p>
          </div>
          <div className="w-full flex flex-wrap justify-start items-center my-5">
            {Object.keys(accounts.exchanges).map((key, i) => {
              const exchangeAccounts = accounts.exchanges[key]
              return (
                <div key={i} className="w-1/2 p-1">
                  <div className="w-full flex flex-col justify-center items-center border border-solid border-white-650 rounded-lg pt-2 overflow-hidden">
                    <h6 className="font-head text-gray-0 text-center mb-1 font-hairline">{key}</h6>
                    <div
                      ref={ref => this.createChartRef(ref, key)}
                      style={{ width: this.size, height: this.size }}
                    ></div>
                    <div className="w-full flex flex-col justify-start items-start">
                      <div className="w-full flex flex-wrap justify-center items-center border-t border-b border-solid border-white-400">
                        <span className="w-1/4 py-1 bg-blue-2 text-white text-tiny font-head font-normal text-center border-r border-solid border-white-400">
                          Coin
                        </span>
                        <span className="w-1/4 py-1 bg-blue-2 text-white text-tiny font-head font-normal text-center border-r border-solid border-white-400">
                          Gross
                        </span>
                        <span className="w-1/4 py-1 bg-blue-2 text-white text-tiny font-head font-normal text-center border-r border-solid border-white-400">
                          Net
                        </span>
                        <span className="w-1/4 py-1 bg-blue-2 text-white text-tiny font-head font-normal text-center">
                          Held
                        </span>
                      </div>
                      <div className="w-full">
                        {exchangeAccounts.accounts.map((account, p) => {
                          return (
                            <div
                              key={p}
                              className="w-full flex flex-wrap justify-center items-center border-b border-solid border-white-200"
                            >
                              <div className="w-1/4 h-full pl-2 flex justify-center items-start flex-col py-1 border-r border-solid border-white-200">
                                <span className="font-head font-thin text-tiny text-gray-0-400">
                                  {account.currency} USD
                                </span>
                                {account.currency !== 'USD' && (
                                  <strong className="text-tiny text-gray-0">
                                    {account.currency}
                                  </strong>
                                )}
                              </div>
                              <div className="w-1/4 h-full pl-2 flex justify-center items-start flex-col py-1 font-head font-thin text-tiny text-gray-0-400 border-r border-solid border-white-200">
                                {account.balance_USD.toFixed(2)}
                                <strong className="text-gray-0">
                                  {account.currency !== 'USD' && account.balance.toFixed(4)}
                                </strong>
                              </div>
                              <div className="w-1/4 h-full pl-2 flex justify-center items-start flex-col py-1 font-head font-thin text-tiny text-gray-0-400 border-r border-solid border-white-200">
                                {account.available_USD.toFixed(2)}
                                <strong className="text-gray-0">
                                  {account.currency !== 'USD' && account.available.toFixed(4)}
                                </strong>
                              </div>
                              <div className="w-1/4 h-full pl-2 flex justify-center items-start flex-col py-1 font-head font-thin text-tiny text-gray-0-400">
                                {account.hold_USD.toFixed(2)}
                                <strong className="text-gray-0">
                                  {account.currency !== 'USD' && account.hold.toFixed(4)}
                                </strong>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
