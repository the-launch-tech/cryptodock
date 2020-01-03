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

const builders = [productBuilder]

export default function() {
  const Kucoin = kucoinClient.initialize()
  const CoinbasePro = coinbaseProClient.initialize()

  const checkInitialization = ({ name, client }, exchanges, callback) => {
    const i = iOfArrObj(exchanges, 'name', name)

    if (i > -1) {
      callback(exchanges[i].id, name, client)
    } else {
      Exchange.save(name).then(id => callback(id, name, client))
    }
  }

  const loopBuilders = (id, name, client) => {
    builders.map(builder => {
      builder(id, name, client)
      // cron.schedule('1-59/5 * * * *', () => {
      //   console.log(id, name, Date.now())
      //   client && builder(id, name, client)
      // })
    })
  }

  Exchange.getAll().then(exchanges => {
    checkInitialization({ name: 'coinbasepro', client: CoinbasePro }, exchanges, loopBuilders)
    checkInitialization({ name: 'kucoin', client: Kucoin }, exchanges, loopBuilders)
  })
}
