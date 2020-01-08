/*
 * Routes For CoinbasePro Direct Endpoints
 * @param Api <Express>
 * @param CoinbaseProController <Controller>
 * @param basePath <string>
 */
export default (Api, CoinbaseProController, basePath) => {
  /*
   * Create base paths for various endpoints
   */
  const base = `${process.env.DB_API}/${basePath}`
  const publicPath = base + '/public'
  const privatePath = base + '/auth'
  const productPath = publicPath + '/products'
  const accountPath = privatePath + '/accounts'
  const singleProductPath = productPath + '/:pair'
  const singleAccountPath = accountPath + '/:accountID'

  /*
   * Get products
   */
  Api.get(`${productPath}`, CoinbaseProController.getProducts)

  /*
   * Get single product orderbook
   * @query pair <string>
   * @param level <int> [optional]
   */
  Api.get(`${singleProductPath}/orderbook`, CoinbaseProController.getProductOrderBook)

  /*
   * Get the recent ticker movements of a single product
   * @query pair <string>
   */
  Api.get(`${singleProductPath}/ticker`, CoinbaseProController.getProductTicker)

  /*
   * Get the recent trades for a single product
   * @query pair <string>
   * @param after <int> [optional]
   */
  Api.get(`${singleProductPath}/trades`, CoinbaseProController.getProductTrades)

  /*
   * Get the klines (historic rates) for a single product
   * @query pair <string>
   * @param granularity <int> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   */
  Api.get(`${singleProductPath}/historic`, CoinbaseProController.getProductHistoricRates)

  /*
   * Get the 24 hour stats for a single product
   * @query pair <string>
   */
  Api.get(`${singleProductPath}/24_hours`, CoinbaseProController.getProduct24HrStats)

  /*
   * Get list of all currencies
   */
  Api.get(`${publicPath}/currencies`, CoinbaseProController.getCurrencies)

  /*
   * Get the server_time
   */
  Api.get(`${publicPath}/time`, CoinbaseProController.getTime)

  /*
   * List your coinbase accounts
   */
  Api.get(`${accountPath}/coinbase`, CoinbaseProController.getCoinbaseAccounts)

  /*
   * Get list of payment methods
   */
  Api.get(`${accountPath}/payment_methods`, CoinbaseProController.getPaymentMethods)

  /*
   * Get list of accounts
   */
  Api.get(`${accountPath}`, CoinbaseProController.getAccounts)

  /*
   * Get single account details
   * @query accountID <string>
   */
  Api.get(`${singleAccountPath}`, CoinbaseProController.getAccount)

  /*
   * Get history of single account
   * @query accountID <string>
   */
  Api.get(`${singleAccountPath}/history`, CoinbaseProController.getAccountHistory)

  /*
   * Get transfers on single account
   * @query accountID <string>
   */
  Api.get(`${singleAccountPath}/transfers`, CoinbaseProController.getAccountTransfers)

  /*
   * Get holds on single account
   * @query accountID <string>
   */
  Api.get(`${singleAccountPath}/holds`, CoinbaseProController.getAccountHolds)

  /*
   * Create BUY on product pair
   * @query pair <string>
   * @param price <int>
   * @param size <int>
   */
  Api.get(`${privatePath}/buy/:pair`, CoinbaseProController.buy)

  /*
   * Creat SELL on product pair
   * @query pair <string>
   * @param price <int>
   * @param size <int>
   */
  Api.get(`${privatePath}/sell/:pair`, CoinbaseProController.sell)

  /*
   * Create order on product pair
   * @query pair <string>
   * @param price <int>
   * @param size <int>
   * @param side <string>
   */
  Api.get(`${privatePath}/orders/place/:pair`, CoinbaseProController.placeOrder)

  /*
   * Cancel order by id
   * @query orderID <string>
   */
  Api.get(`${privatePath}/orders/cancel/:orderID`, CoinbaseProController.cancelOrder)

  /*
   * Cancels open orders
   */
  Api.get(`${privatePath}/orders/cancel/open`, CoinbaseProController.cancelOrders)

  /*
   * Cancels all orders
   * @query pair <string>
   */
  Api.get(`${privatePath}/orders/cancel/:pair`, CoinbaseProController.cancelAllOrders)

  /*
   * Get orders
   * @param after <int> [optional]
   * @param status <string> [optional]
   */
  Api.get(`${privatePath}/orders`, CoinbaseProController.getOrders)

  /*
   * Get order
   * @query orderID <int>
   */
  Api.get(`${privatePath}/orders/:orderID`, CoinbaseProController.getOrder)

  /*
   * Get fills
   * @param pair <int>
   * @param before <int> [optional]
   */
  Api.get(`${privatePath}/fills`, CoinbaseProController.getFills)

  /*
   * Get fundings
   */
  Api.get(`${privatePath}/fundings`, CoinbaseProController.getFundings)

  /*
   * Repay amount in currency
   * @param amount <int>
   * @param currency <string>
   */
  Api.get(`${privatePath}/repay`, CoinbaseProController.repay)

  /*
   * Create a margin transfer
   * @param margin_profile_id <string>
   * @param type <string>
   * @param amount <int>
   * @param currency <string>
   */
  Api.get(`${privatePath}/margin_transfer`, CoinbaseProController.marginTransfer)

  /*
   * Close a position
   * @param repay_only <boolean>
   */
  Api.get(`${privatePath}/close_position`, CoinbaseProController.closePosition)

  /*
   * Convert a currency
   * @param from <string>
   * @param to <string>
   * @param amount <int>
   */
  Api.get(`${privatePath}/convert`, CoinbaseProController.convert)

  /*
   * Make a deposit
   * @param amount <int>
   * @param currency <string>
   * @param coinbase_account_id <string>
   */
  Api.get(`${privatePath}/deposit`, CoinbaseProController.deposit)

  /*
   * Make a withdrawal
   * @param amount <int>
   * @param currency <string>
   * @param coinbase_account_id <string>
   */
  Api.get(`${privatePath}/withdraw`, CoinbaseProController.withdraw)

  /*
   * Fetch a deposit address from your Exchange BTC account.
   * @param currency <string>
   */
  Api.get(`${privatePath}/deposit_crypto`, CoinbaseProController.depositCrypto)

  /*
   * Withdraw from your Exchange BTC account to another BTC address.
   * @param amount <int>
   * @param currency <string>
   * @param crypto_address <string>
   */
  Api.get(`${privatePath}/withdraw_crpyo`, CoinbaseProController.withdrawCrypto)

  /*
   * Schedule Deposit to your Exchange USD account from a configured payment method.
   * @param amount <int>
   * @param currency <string>
   * @param payment_method_id <string>
   */
  Api.get(`${privatePath}/deposit_payment`, CoinbaseProController.depositPayment)

  /*
   * Withdraw from your Exchange USD account to a configured payment method.
   * @param amount <int>
   * @param currency <string>
   * @param payment_method_id <string>
   */
  Api.get(`${privatePath}/withdraw_payment`, CoinbaseProController.withdrawPayment)

  /*
   * Get your 30 day trailing volumes.
   */
  Api.get(`${privatePath}/trailing_volume`, CoinbaseProController.getTrailingVolume)
}
