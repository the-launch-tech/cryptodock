import Strategy from '../../../common/models/Strategy'
import coinbaseproClient from '../../../common/clients/CoinbasePro'
import kucoinClient from '../../../common/clients/Kucoin'
import _key from '../../../common/helpers/_key'

const { log, error } = console
const channel = (key, id) => `res--${key}.activity-${id}`

export default {
  RECENT: (event, arg, win, key) => {
    Strategy.getRecent({ after: arg.data.after })
      .then(data => event.reply(channel(key, 'RECENT'), data))
      .catch(error)
  },
  RECENT_BY_ID: (event, arg, win, key) => {
    Strategy.getRecentById({ id: arg.data.id, after: arg.data.after })
      .then(data => event.reply(channel(key, 'RECENT_BY_ID'), data))
      .catch(error)
  },
  GET_PORTFOLIO: (event, arg, win, key) => {
    let portfolio = {
      total: 1021.02,
      exchanges: {
        kucoin: {
          total: 502.2,
          accounts: [
            {
              currency: 'BTC',
              balance: 0.001,
              available: 0.12,
              hold: 0.001,
              balance_USD: 203.23,
              available_USD: 203.23,
              hold_USD: 1,
            },
            {
              currency: 'USD',
              balance: 502.2 - 203.23,
              available: 502.2 - 203.23 - 1.23,
              hold: 1.23,
              balance_USD: 502.2 - 203.23,
              available_USD: 502.2 - 203.23 - 1.23,
              hold_USD: 1.23,
            },
          ],
        },
        coinbasepro: {
          total: 1021.02 - 502.2,
          accounts: [
            {
              currency: 'ETH',
              balance: 1.23,
              available: 2.4,
              hold: 0.001,
              balance_USD: 123.45,
              available_USD: 123.45 - 23.0,
              hold_USD: 23.0,
            },
            {
              currency: 'USD',
              balance: 1021.02 - 502.2 - 123.45,
              available: 1021.02 - 502.2 - 123.45,
              hold: 0,
              balance_USD: 1021.02 - 502.2 - 123.45,
              available_USD: 1021.02 - 502.2 - 123.45,
              hold_USD: 0,
            },
          ],
        },
      },
    }
    const CoinbasePro = coinbaseproClient.initialize()
    const Kucoin = kucoinClient.initialize()
    // CoinbasePro.getAccounts().then(coinbaseproAccounts => {
    // Kucoin.listAccounts().then({ type: 'trade' }, kucoinAccounts => {
    //   log(coinbaseproAccounts, kucoinAccounts)
    // })
    // })
    event.reply(channel(key, 'GET_PORTFOLIO'), portfolio)
  },
}
