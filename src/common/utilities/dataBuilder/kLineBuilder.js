import KLine from '../../models/KLine'
import RequestBalancer from '../RequestBalancer'
import Product from '../../models/Product'
import exchangeMap from '../../clients/exchangeMap'

const { log, error } = console

Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h)
  return this
}

export default function(exchangeId, exchangeName, Client) {
  const map = exchangeMap[exchangeName]
  const klinePeriod = map.klinePeriod
  const granularity = klinePeriod['60']
  const maxCandlesInGroup = 300
  const currentTimestamp = new Date()

  const getKLinePeriod = (pair, start, end, granularity) => {
    return new Promise((resolve, reject) => {
      if (exchangeName === 'coinbasepro') {
        Client.getProductHistoricRates(pair, start, end, granularity)
          .then(resolve)
          .catch(reject)
      } else if (exchangeName === 'kucoin') {
        Client.getKlines({ symbol: pair, startAt: start, endAt: end, type: granularity })
          .then(res => resolve(res.data))
          .catch(reject)
      }
    })
  }

  Product.getExchangeProducts(exchangeId)
    .then(products => {
      products.map(({ id, pair }) => {
        KLine.getLastTimestamp(id, exchangeId)
          .then(lastTimestamp => {
            console.log('lastTimestamp', lastTimestamp)
            const prevTimeFormatted = new Date(lastTimestamp)
            const diffMs = currentTimestamp - prevTimeFormatted
            const diffMins = Math.round(diffMs / 60000)
            const candleGroupCount = Math.floor(diffMins / maxCandlesInGroup)
            let start = prevTimeFormatted
            for (let i = 0; i < candleGroupCount; i++) {
              RequestBalancer.request(
                retry =>
                  getKLinePeriod(
                    pair,
                    start,
                    new Date(start).addHours(maxCandlesInGroup / 60),
                    granularity
                  )
                    .then(history => history.map(kline => KLine.save(kline, id, exchangeId, map)))
                    .catch(error),
                exchangeName,
                exchangeName
              ).catch(error)
              start = new Date(start).addHours(maxCandlesInGroup / 60)
            }
          })
          .catch(error)
      })
    })
    .catch(error)
}
