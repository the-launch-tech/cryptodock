const Ticker = require('../models/Ticker')
const RequestBalancer = require('../utils/RequestBalancer')
const Product = require('../models/Product')
const exchangeMap = require('../utils/exchangeMap')

const { log, error } = console

module.exports = function(exchangeId, exchangeName, Client) {
  log('In Ticker Builder')
  const map = exchangeMap[exchangeName]
  const tickerObject = map.tickerObject
  const tickersTimeFn = map.tickersTimeFn

  const getTicker = pair => {
    return new Promise((resolve, reject) => {
      if (exchangeName === 'coinbasepro') {
        Client.getProductTicker(pair)
          .then(resolve)
          .catch(reject)
      } else if (exchangeName === 'kucoin') {
        Client.getTicker({ symbol: pair })
          .then(res => resolve(res.data))
          .catch(reject)
      }
    })
  }

  Product.getExchangeProducts(exchangeId)
    .then(products => {
      products.map(({ id, pair }) => {
        Ticker.getLastSequence(id, exchangeId)
          .then(lastSequence => {
            RequestBalancer.request(
              retry =>
                getTicker(pair)
                  .then(ticker => {
                    if (ticker[tickerObject['sequence']] > lastSequence) {
                      Ticker.save(ticker, id, exchangeId, tickerObject, tickersTimeFn)
                    }
                  })
                  .catch(error),
              exchangeName,
              exchangeName
            ).catch(error)
          })
          .catch(error)
      })
    })
    .catch(error)
}
