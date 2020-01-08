import Controller from './Controller'
import CoinbasePro from '../clients/CoinbasePro'
import exchangeMap from '../utils/exchangeMap'

class CoinbaseProController extends Controller {
  constructor() {
    super()
  }

  /*
   * Get products
   */
  getProducts(req, res, next) {
    CoinbasePro.getProducts((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get single product orderbook
   * @query pair <string>
   * @param level <int> [optional]
   */
  getProductOrderBook(req, res, next) {
    const { level } = req.params
    if (!req.query.pair) {
      return super.err(res, 500, err)
    }
    CoinbasePro.getProductOrderBook(
      req.query.pair,
      { level: level ? level : 3 },
      (err, response, data) => {
        if (err) return super.err(res, 500, err)
        res.json(data)
      }
    )
  }

  /*
   * Get the recent ticker movements of a single product
   * @query pair <string>
   */
  getProductTicker(req, res, next) {
    if (!req.query.pair) {
      return super.err(res, 500, err)
    }
    CoinbasePro.getProductTicker(req.query.pair, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get the recent trades for a single product
   * @query pair <string>
   * @param after <int> [optional]
   */
  getProductTrades(req, res, next) {
    const { after } = req.params
    if (!req.query.pair) {
      return super.err(res, 500, err)
    }
    CoinbasePro.getProductTrades(
      req.query.pair,
      { after: after ? after : 0 },
      (err, response, data) => {
        if (err) return super.err(res, 500, err)
        res.json(data)
      }
    )
  }

  /*
   * Get the klines (historic rates) for a single product
   * @query pair <string>
   * @param granularity <int> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   */
  getProductHistoricRates(req, res, next) {
    const { granularity, start, end } = req.params
    if (!req.query.pair) {
      return super.err(res, 500, err)
    }
    CoinbasePro.getProductHistoricRates(
      req.query.pair,
      { granularity, start, end },
      (err, response, data) => {
        if (err) return super.err(res, 500, err)
        res.json(data)
      }
    )
  }

  /*
   * Get the 24 hour stats for a single product
   * @query pair <string>
   */
  getProduct24HrStats(req, res, next) {
    if (!req.query.pair) {
      return super.err(res, 500, err)
    }
    CoinbasePro.getProduct24HrStats(req.query.pair, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get list of all currencies
   */
  getCurrencies(req, res, next) {
    CoinbasePro.getCurrencies((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get the server_time
   */
  getTime(req, res, next) {
    CoinbasePro.getTime((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * List your coinbase accounts
   */
  getCoinbaseAccounts(req, res, next) {
    CoinbasePro.getCoinbaseAccounts((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get list of payment methods
   */
  getPaymentMethods(req, res, next) {
    CoinbasePro.getPaymentMethods((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get list of accounts
   */
  getAccounts(req, res, next) {
    CoinbasePro.getAccounts((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get single account details
   * @query accountID <string>
   */
  getAccount(req, res, next) {
    CoinbasePro.getAccount(req.query.accountID, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get history of single account
   * @query accountID <string>
   */
  getAccountHistory(req, res, next) {
    const { before } = req.params
    const args = {}
    if (before) {
      args['before'] = before
    }
    CoinbasePro.getAccountHistory(req.query.accountID, args, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get transfers on single account
   * @query accountID <string>
   */
  getAccountTransfers(req, res, next) {
    const { before } = req.params
    const args = {}
    if (before) {
      args['before'] = before
    }
    CoinbasePro.getAccountTransfers(req.query.accountID, args, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get holds on single account
   * @query accountID <string>
   */
  getAccountHolds(req, res, next) {
    const { before } = req.params
    const args = {}
    if (before) {
      args['before'] = before
    }
    CoinbasePro.getAccountHolds(req.query.accountID, args, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Create BUY on product pair
   * @query pair <string>
   * @param price <int>
   * @param size <int>
   */
  buy(req, res, next) {
    const { price, size, product_id } = req.params
    if (!price || !size || !product_id) {
      return super.err(res, 500, err)
    }
    CoinbasePro.buy(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Creat SELL on product pair
   * @query pair <string>
   * @param price <int>
   * @param size <int>
   */
  sell(req, res, next) {
    const { price, size, product_id } = req.params
    if (!price || !size || !product_id) {
      return super.err(res, 500, err)
    }
    CoinbasePro.sell(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Create order on product pair
   * @query pair <string>
   * @param price <int>
   * @param size <int>
   * @param side <string>
   */
  placeOrder(req, res, next) {
    const { price, size, product_id, side } = req.params
    if (!price || !size || !product_id || !side) {
      return super.err(res, 500, err)
    }
    CoinbasePro.placeOrder(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Cancel order by id
   * @query orderID <string>
   */
  cancelOrder(req, res, next) {
    if (!req.query.orderID) {
      return super.err(res, 500, err)
    }
    CoinbasePro.cancelOrder(req.query.orderID, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Cancels open orders
   */
  cancelOrders(req, res, next) {
    CoinbasePro.cancelOrders((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Cancels all orders
   * @query pair <string>
   */
  cancelAllOrders(req, res, next) {
    if (!req.query.pair) {
      return super.err(res, 500, err)
    }
    CoinbasePro.cancelAllOrders(req.query.pair, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get orders
   * @param after <int> [optional]
   * @param status <string> [optional]
   */
  getOrders(req, res, next) {
    CoinbasePro.getOrders(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get order
   * @query orderID <int>
   */
  getOrder(req, res, next) {
    if (!req.query.orderID) {
      return super.err(res, 500, err)
    }
    CoinbasePro.getOrder(req.query.orderID, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get fills
   * @param pair <int>
   * @param before <int> [optional]
   */
  getFills(req, res, next) {
    if (!req.params.pair) {
      return super.err(res, 500, err)
    }
    CoinbasePro.getFills(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get fundings
   */
  getFundings(req, res, next) {
    CoinbasePro.getFundings((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Repay amount in currency
   * @param amount <int>
   * @param currency <string>
   */
  repay(req, res, next) {
    const { amount, currency } = req.params
    if (!amount || !currency) {
      return super.err(res, 500, err)
    }
    CoinbasePro.repay(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Create a margin transfer
   * @param margin_profile_id <string>
   * @param type <string>
   * @param amount <int>
   * @param currency <string>
   */
  marginTransfer(req, res, next) {
    const { margin_profile_id, type, amount, currency } = req.params
    if (!margin_profile_id || !type || !amount || !currency) {
      return super.err(res, 500, err)
    }
    CoinbasePro.marginTransfer(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Close a position
   * @param repay_only <boolean>
   */
  closePosition(req, res, next) {
    CoinbasePro.closePosition(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Convert a currency
   * @param from <string>
   * @param to <string>
   * @param amount <int>
   */
  convert(req, res, next) {
    const { from, to, amount } = req.params
    if (!from || !to || !amount) {
      return super.err(res, 500, err)
    }
    CoinbasePro.convert(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Make a deposit
   * @param amount <int>
   * @param currency <string>
   * @param coinbase_account_id <string>
   */
  deposit(req, res, next) {
    const { amount, currency, coinbase_account_id } = req.params
    if (!amount || !currency || !coinbase_account_id) {
      return super.err(res, 500, err)
    }
    CoinbasePro.deposit(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Make a withdrawal
   * @param amount <int>
   * @param currency <string>
   * @param coinbase_account_id <string>
   */
  withdraw(req, res, next) {
    const { amount, currency, coinbase_account_id } = req.params
    if (!amount || !currency || !coinbase_account_id) {
      return super.err(res, 500, err)
    }
    CoinbasePro.withdraw(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Fetch a deposit address from your Exchange BTC account.
   * @param currency <string>
   */
  depositCrypto(req, res, next) {
    const { currency } = req.params
    if (!currency) {
      return super.err(res, 500, err)
    }
    CoinbasePro.depositCrypto(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Withdraw from your Exchange BTC account to another BTC address.
   * @param amount <int>
   * @param currency <string>
   * @param crypto_address <string>
   */
  withdrawCrypto(req, res, next) {
    const { amount, currency, crypto_address } = req.params
    if (!amount || !currency || !crypto_address) {
      return super.err(res, 500, err)
    }
    CoinbasePro.withdrawCrypto(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Schedule Deposit to your Exchange USD account from a configured payment method.
   * @param amount <int>
   * @param currency <string>
   * @param payment_method_id <string>
   */
  depositPayment(req, res, next) {
    const { amount, currency, payment_method_id } = req.params
    if (!amount || !currency || !payment_method_id) {
      return super.err(res, 500, err)
    }
    CoinbasePro.depositPayment(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Withdraw from your Exchange USD account to a configured payment method.
   * @param amount <int>
   * @param currency <string>
   * @param payment_method_id <string>
   */
  withdrawPayment(req, res, next) {
    const { amount, currency, payment_method_id } = req.params
    if (!amount || !currency || !payment_method_id) {
      return super.err(res, 500, err)
    }
    CoinbasePro.withdrawPayment(req.params, (err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }

  /*
   * Get your 30 day trailing volumes.
   */
  getTrailingVolume(req, res, next) {
    CoinbasePro.getTrailingVolume((err, response, data) => {
      if (err) return super.err(res, 500, err)
      res.json(data)
    })
  }
}

export default CoinbaseProController
