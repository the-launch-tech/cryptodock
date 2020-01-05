const Cron = require('node-schedule')
const Exchange = require('../models/Exchange')
const coinbaseProClient = require('../clients/CoinbasePro')
const kucoinClient = require('../clients/Kucoin')
const iOfArrObj = require('../utils/iOfArrObj')
const productBuilder = require('./productBuilder')
const kLineBuilder = require('./kLineBuilder')
const tradeBuilder = require('./tradeBuilder')
const tickerBuilder = require('./tickerBuilder')

const { log, error } = console

const productData = { fn: productBuilder, cron: '0 0 0 * * *' }
const tradeData = { fn: tradeBuilder, cron: '0 0 * * * *' }
const klineDataTight = { fn: kLineBuilder, cron: '0 0 1 * * *', args: { period: 60 } }
const klineDataMid = { fn: kLineBuilder, cron: '0 0 2 * * *', args: { period: 3600 } }
const klineDataLong = { fn: kLineBuilder, cron: '0 0 3 * * *', args: { period: 86400 } }
const tickerData = { fn: tickerBuilder, cron: '0 */5 * * * *' }

module.exports = function() {
  const builders = [tickerData]

  const exchanges = [
    { client: kucoinClient.initialize(), name: 'kucoin', label: 'Kucoin' },
    { client: coinbaseProClient.initialize(), name: 'coinbasepro', label: 'CoinbasePro' },
  ]

  Exchange.getAll()
    .then(localExchanges => {
      exchanges.map(exchange => {
        const i = iOfArrObj(localExchanges, 'name', exchange.name)

        const mapBuilders = id => {
          builders.map(builder => {
            // Cron.scheduleJob(builder.cron, () => {
            builder.fn(id, exchange.name, exchange.client, builder.args)
            // })
          })
        }

        if (i > -1) {
          productData
            .fn(localExchanges[i].id, exchange.name, exchange.client)
            .then(() => mapBuilders(localExchanges[i].id))
            .catch(error)
        } else {
          Exchange.save(exchange)
            .then(id => {
              productData
                .fn(id, exchange.name, exchange.client)
                .then(() => mapBuilders(id))
                .catch(error)
            })
            .catch(error)
        }
      })
    })
    .catch(error)
}
