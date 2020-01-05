const Cron = require('node-schedule')
const Exchange = require('./models/Exchange')
const coinbaseProClient = require('./clients/CoinbasePro')
const kucoinClient = require('./clients/Kucoin')
const iOfArrObj = require('./utils/iOfArrObj')
const productBuilder = require('./builders/products')
const kLineBuilder = require('./builders/klines')
const tradeBuilder = require('./builders/trades')
const tickerBuilder = require('./builders/tickers')

const { log, error } = console

module.exports = function() {
  this.productData = { fn: productBuilder, cron: '0 0 0 * * *' }
  this.tradeData = { fn: tradeBuilder, cron: '0 0 * * * *' }
  this.klineDataTight = { fn: kLineBuilder, cron: '0 0 1 * * *', args: { period: 60 } }
  this.klineDataMid = { fn: kLineBuilder, cron: '0 0 2 * * *', args: { period: 3600 } }
  this.klineDataLong = { fn: kLineBuilder, cron: '0 0 3 * * *', args: { period: 86400 } }
  this.tickerData = { fn: tickerBuilder, cron: '0 */5 * * * *' }
  this.builders = [this.tickerData]
  this.clientExchanges = [
    { client: kucoinClient.initialize(), name: 'kucoin', label: 'Kucoin' },
    { client: coinbaseProClient.initialize(), name: 'coinbasepro', label: 'CoinbasePro' },
  ]

  const run = (exchangeId, clientExchange) => {
    this.productData
      .fn(exchangeId, clientExchange.name, clientExchange.client)
      .then(() => {
        this.builders.map(builder => {
          Cron.scheduleJob(builder.cron, () => {
            builder.fn(exchangeId, clientExchange.name, clientExchange.client, builder.args)
          })
        })
      })
      .catch(error)
  }

  Exchange.getAll()
    .then(localExchanges => {
      this.clientExchanges.map(clientExchange => {
        const i = iOfArrObj(localExchanges, 'name', clientExchange.name)
        if (i > -1) {
          run(localExchanges[i].id, clientExchange)
        } else {
          Exchange.save(clientExchange)
            .then(id => run(id, clientExchange))
            .catch(error)
        }
      })
    })
    .catch(error)
}
