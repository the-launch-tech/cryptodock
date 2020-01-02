import KLine from '../../models/KLine'
import RequestBalancer from '../RequestBalancer'
import Product from '../../../models/Product'
import exchangeMap from '../../../clients/exchangeMap'

const { log, error } = console

Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h)
  return this
}

export default function(exchangeId, exchangeName, client) {
  const map = exchangeMap[exchangeName]
  const getKLinePeriod = Client[map.getKLinePeriod]
  const klineTime = map.klineTime

  const granularity = klineTime['60']
  const maxCandlesInGroup = 300
  const currentTimestamp = new Date()

  Product.getExchangeProducts(exchangeId)
    .then(products => {
      products.map(({ product_id, pair }) => {
        KLine.getLastTimestamp(product_id, exchangeId)
          .then(lastTimestamp => {
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
                    .then(history =>
                      history.map(bucket => KLine.save(bucket, product_id, exchangeId, map))
                    )
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
