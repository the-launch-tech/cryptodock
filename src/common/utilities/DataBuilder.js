import cron from 'node-cron'
import KLine from '../models/KLine'
import Trade from '../models/Trade'
import OrderBook from '../models/OrderBook'
import Product from '../models/Product'
import Exchange from '../models/Exchange'
import Log from '../models/Log'
import coinbaseProClient from '../clients/CoinbasePro'
import kucoinClient from '../clients/Kucoin'

const { log, error } = console

export default function() {
  const Kucoin = kucoinClient.initialize()
  const CoinbasePro = coinbaseProClient.initialize()

  CoinbasePro.getCurrencies()
    .then(log)
    .catch(error)
  Kucoin.getCurrencies()
    .then(log)
    .catch(error)
}
