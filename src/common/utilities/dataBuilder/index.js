import cron from 'node-cron'
import Exchange from '../../models/Exchange'
import coinbaseProClient from '../../clients/CoinbasePro'
import kucoinClient from '../../clients/Kucoin'
import iOfArrObj from '../../helpers/iOfArrObj'
import productBuilder from './productBuilder'
import kLineBuilder from './kLineBuilder'
import tradeBuilder from './tradeBuilder'
import orderBookBuilder from './orderBookBuilder'

const { log, error } = console

export default function() {
  const builders = []

  const exchanges = [
    { client: kucoinClient.initialize(), name: 'kucoin', label: 'Kucoin' },
    { client: coinbaseProClient.initialize(), name: 'coinbasepro', label: 'CoinbasePro' },
  ]

  Exchange.getAll()
    .then(localExchanges => {
      exchanges.map(exchange => {
        const i = iOfArrObj(localExchanges, 'name', exchange.name)
        if (i > -1) {
          builders.map(builder => builder(localExchanges[i].id, exchange.name, exchange.client))
        } else {
          Exchange.save(exchange)
            .then(id => builders.map(builder => builder(id, exchange.name, exchange.client)))
            .catch(error)
        }
      })
    })
    .catch(error)
}
