import Cron from 'node-schedule'
import Exchange from '../models/Exchange'
import coinbaseProClient from '../clients/CoinbasePro'
import kucoinClient from '../clients/Kucoin'
import iOfArrObj from '../utils/iOfArrObj'
import productBuilder from './products'
import kLineBuilder from './klines'
import tradeBuilder from './trades'
import tickerBuilder from './tickers'

const { log, error } = console

const RestBuilder = function() {
  const productData = { fn: productBuilder, cron: '0 0 0 * * *' }
  const tradeData = { fn: tradeBuilder, cron: '0 0 * * * *' }
  const klineDataTight = { fn: kLineBuilder, cron: '0 0 1 * * *', args: { period: 60 } }
  const klineDataMid = { fn: kLineBuilder, cron: '0 0 2 * * *', args: { period: 3600 } }
  const klineDataLong = { fn: kLineBuilder, cron: '0 0 3 * * *', args: { period: 86400 } }
  const tickerData = { fn: tickerBuilder, cron: '0 */5 * * * *' }
  const builders = [productData, tradeData, klineDataTight, klineDataMid, klineDataLong, tickerData]
  const clientExchanges = [
    { client: kucoinClient.initialize(), name: 'kucoin', label: 'Kucoin' },
    { client: coinbaseProClient.initialize(), name: 'coinbasepro', label: 'CoinbasePro' },
  ]

  const run = (exchangeId, clientExchange) => {
    productData
      .fn(exchangeId, clientExchange.name, clientExchange.client)
      .then(() => {
        builders.map(builder => {
          Cron.scheduleJob(builder.cron, () => {
            builder.fn(exchangeId, clientExchange.name, clientExchange.client, builder.args)
          })
        })
      })
      .catch(error)
  }

  Exchange.getAll()
    .then(localExchanges => {
      clientExchanges.map(clientExchange => {
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

export default RestBuilder
