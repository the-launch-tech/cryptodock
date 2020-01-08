/*
 * Routes for locally stored historic data endpoints
 * @param Api <Express>
 * @param LocalController <Controller>
 * @param basePath <string>
 */
export default (Api, LocalController, basePath) => {
  /*
   * Create base paths for various endpoints
   */
  const base = `${process.env.DB_API}/${basePath}`

  /*
   * Get Exchanges
   * @param name <[<string>]> [optional]
   * @param fields <obj name, label, etc...> [optional]
   */
  Api.get(`${base}/exchanges`, LocalController.getExchanges)

  /*
   * Get Products
   * @param pair <[<string>]> [optional]
   * @param fields <obj pair, base, quote, etc...> [optional]
   */
  Api.get(`${base}/products`, LocalController.getProducts)

  /*
   * Get Klines
   * @param pair <[<string>]>
   * @param fields <obj name, label, etc...> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   * @param granularity <int> [optional]
   * @param limit <int> [optional]
   */
  Api.get(`${base}/klines`, LocalController.getKlines)

  /*
   * Get Tickers
   * @param pair <[<string>]>
   * @param fields <obj name, label, etc...> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   * @param granularity <int> [optional]
   * @param limit <int> [optional]
   */
  Api.get(`${base}/tickers`, LocalController.getTickers)

  /*
   * Get Trades
   * @query pair <[<string>]>
   * @param fields <obj name, label, etc...> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   * @param granularity <int> [optional]
   * @param limit <int> [optional]
   */
  Api.get(`${base}/trades`, LocalController.getTrades)
}
