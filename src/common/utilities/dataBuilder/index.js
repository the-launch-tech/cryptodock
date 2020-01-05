import Cron from 'node-cron'
import Exchange from '../../models/Exchange'
import coinbaseProClient from '../../clients/CoinbasePro'
import kucoinClient from '../../clients/Kucoin'
import iOfArrObj from '../../helpers/iOfArrObj'
import productBuilder from './productBuilder'
import kLineBuilder from './kLineBuilder'
import tradeBuilder from './tradeBuilder'
import tickerBuilder from './tickerBuilder'

const { log, error } = console

const productData = { fn: productBuilder, cron: '* * * 1-31/3 * *' }
const tradeData = { fn: tradeBuilder, cron: '* * 1-23/4 * * *' }
const klineDataTight = { fn: kLineBuilder, cron: '* * * 1-31 * *', args: { period: 60 } }
const klineDataMid = { fn: kLineBuilder, cron: '* * * 1-31 * *', args: { period: 3600 } }
const klineDataLong = { fn: kLineBuilder, cron: '* * * 1-31 * *', args: { period: 86400 } }
const tickerData = { fn: tickerBuilder, cron: '* 1-59 * * * *' }

export default function() {
  const builders = [productData, tradeData, klineDataTight, klineDataMid, klineDataLong, tickerData]

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
            Cron.schedule(builder.cron, async () => {
              await builder.fn(id, exchange.name, exchange.client, builder.args)
            })
          })
        }

        if (i > -1) {
          mapBuilders(localExchanges[i].id)
        } else {
          Exchange.save(exchange)
            .then(mapBuilders)
            .catch(error)
        }
      })
    })
    .catch(error)
}
